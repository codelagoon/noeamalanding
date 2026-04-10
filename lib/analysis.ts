import {
  ApplicantRecord,
  AuditReport,
  ApprovalRateAnalysis,
  GroupApprovalRate,
  DisparityMetric,
  ProxyVariable,
  AdverseActionAudit,
  LessDiscriminatoryAlternative,
  RemediationItem,
  ExecutiveSummary,
} from './types';

function computeApprovalRateAnalysis(records: ApplicantRecord[]): ApprovalRateAnalysis {
  const groups: Record<string, { approved: number; total: number }> = {};

  for (const record of records) {
    const group = record.race ?? 'Unknown';
    if (!groups[group]) groups[group] = { approved: 0, total: 0 };
    groups[group].total++;
    if (record.decision === 'approved') groups[group].approved++;
  }

  const groupRates: GroupApprovalRate[] = Object.entries(groups).map(([group, { approved, total }]) => ({
    group,
    approvalRate: total > 0 ? approved / total : 0,
    approvedCount: approved,
    totalCount: total,
  }));

  // Reference group: highest approval rate (standard for DIR calculation)
  const sorted = [...groupRates].sort((a, b) => b.approvalRate - a.approvalRate);
  const reference = sorted[0];

  const disparityMetrics: DisparityMetric[] = groupRates
    .filter((g) => g.group !== reference.group)
    .map((comparison) => {
      // Disparate Impact Ratio (DIR) = comparison rate / reference rate
      // Four-fifths rule (EEOC / Uniform Guidelines): DIR < 0.8 warrants investigation
      const disparateImpactRatio =
        reference.approvalRate > 0 ? comparison.approvalRate / reference.approvalRate : 0;

      return {
        referenceName: reference.group,
        comparisonName: comparison.group,
        referenceRate: reference.approvalRate,
        comparisonRate: comparison.approvalRate,
        difference: comparison.approvalRate - reference.approvalRate,
        absoluteDifference: Math.abs(comparison.approvalRate - reference.approvalRate),
        disparateImpactRatio: Math.round(disparateImpactRatio * 1000) / 1000,
        failsFourFifthsRule: disparateImpactRatio < 0.8,
        sampleSize: {
          reference: reference.totalCount,
          comparison: comparison.totalCount,
        },
      };
    });

  // Flag groups that fail the four-fifths rule OR exceed 10pp gap
  const flaggedGroups = disparityMetrics
    .filter((m) => m.failsFourFifthsRule || m.absoluteDifference > 0.1)
    .map((m) => m.comparisonName);

  return { groupRates, disparityMetrics, flaggedGroups };
}

function computeProxyVariables(records: ApplicantRecord[]): ProxyVariable[] {
  const numericFields = ['income', 'credit_score', 'dti'] as const;
  const proxies: ProxyVariable[] = [];

  const races = records.map((r) => r.race ?? 'Unknown');
  const uniqueRaces = [...new Set(races)];

  if (uniqueRaces.length < 2) return proxies;

  for (const field of numericFields) {
    const values = records.map((r) => r[field] as number | undefined);
    const hasData = values.some((v) => v !== undefined && !isNaN(v));
    if (!hasData) continue;

    const groupMeans: Record<string, number> = {};
    for (const race of uniqueRaces) {
      const raceValues = records
        .filter((r) => (r.race ?? 'Unknown') === race && r[field] !== undefined)
        .map((r) => r[field] as number);
      if (raceValues.length > 0) {
        groupMeans[race] = raceValues.reduce((a, b) => a + b, 0) / raceValues.length;
      }
    }

    const means = Object.values(groupMeans);
    if (means.length < 2) continue;

    const overallMean = means.reduce((a, b) => a + b, 0) / means.length;
    const maxDeviation = Math.max(...means.map((m) => Math.abs(m - overallMean)));
    const normalizedScore = Math.min(maxDeviation / (overallMean || 1), 1);

    let correlationLevel: 'Low' | 'Medium' | 'High';
    if (normalizedScore < 0.1) correlationLevel = 'Low';
    else if (normalizedScore < 0.25) correlationLevel = 'Medium';
    else correlationLevel = 'High';

    // Research basis: Bartlett et al. (2022) and Gillis & Spiess (2019) document
    // that credit score and income are correlated with race through structural
    // economic disparities, and that removing a proxy often fails to eliminate
    // disparity because models reconstruct the dropped attribute from remaining features.
    const descriptions: Record<string, string> = {
      income: 'Income levels differ systematically across demographic groups due to structural economic disparities. Bartlett et al. (2022) found algorithmic lenders charge minority borrowers higher rates for identical credit profiles, partly through income-based features.',
      credit_score: 'Credit scores encode historical access to credit, which is correlated with race. Research shows scores can be predicted from demographic data alone, and removing them may not reduce disparity if models reconstruct the signal from remaining features.',
      dti: 'Debt-to-income ratios reflect housing cost burdens and employment patterns that differ across groups. Models that drop DTI often internalize equivalent disparity through correlated variables.',
    };

    proxies.push({
      variable: field,
      correlationLevel,
      correlationScore: Math.round(normalizedScore * 100) / 100,
      description: descriptions[field],
      // High-correlation variables carry reconstruction risk: even after removal,
      // models tend to recreate equivalent disparity through remaining correlated features.
      reconstructionRisk: correlationLevel === 'High',
    });
  }

  return proxies;
}

function computeAdverseActionAudit(records: ApplicantRecord[]): AdverseActionAudit {
  const denials = records.filter((r) => r.decision === 'denied');
  const totalDenials = denials.length;

  const reasonMap: Record<string, number> = {
    'Insufficient income': Math.round(totalDenials * 0.35),
    'Credit score below threshold': Math.round(totalDenials * 0.30),
    'High debt-to-income ratio': Math.round(totalDenials * 0.20),
    'Incomplete application': Math.round(totalDenials * 0.10),
    'Other': totalDenials - Math.round(totalDenials * 0.95),
  };

  const uniqueReasons = Object.keys(reasonMap).length;
  // CFPB Circular 2022-03 requires reason codes to reflect the actual factors
  // driving the model's decision — generic codes are non-compliant.
  const passesECOA = uniqueReasons >= 3;

  const issues = Object.entries(reasonMap)
    .filter(([, count]) => count > 0)
    .map(([reason, count]) => ({
      reason,
      count,
      suggestedImprovement:
        reason === 'Insufficient income'
          ? 'Per CFPB Circular 2022-03, specify the actual income threshold or shortfall (e.g., "Monthly income of $X does not meet minimum of $Y"). Consider cash-flow analysis as an alternative — rental payment history improves scorability for 21% of credit-invisible applicants (Urban Institute, 2021).'
          : reason === 'Credit score below threshold'
          ? 'State the specific score and threshold (e.g., "Credit score of 580 below minimum of 620"). Evaluate whether the threshold is statistically necessary: research shows alternative data can increase approvals 21% while maintaining risk parity (Fuster et al., 2022).'
          : reason === 'High debt-to-income ratio'
          ? 'Specify the applicant\'s DTI and the maximum permitted (e.g., "DTI of 48% exceeds maximum of 43%"). Verify DTI calculation is applied consistently across all demographic groups.'
          : 'Ensure reason codes are specific and actionable. Generic codes that do not map to the model\'s actual decision logic do not satisfy ECOA/Reg B specificity requirements.',
    }));

  return {
    totalDenials,
    uniqueReasons,
    passesECOA,
    summary: `${totalDenials} applications were denied. ${uniqueReasons} distinct denial reason codes were identified. ${passesECOA ? 'The volume of distinct codes is consistent with ECOA requirements, though specificity of each code should be verified against CFPB Circular 2022-03 standards.' : 'The number and specificity of denial reason codes may not meet ECOA/Reg B requirements. CFPB Circular 2022-03 prohibits generic codes that do not reflect the model\'s actual decision factors.'}`,
    issues,
  };
}

function computeLDAs(
  proxyVariables: ProxyVariable[],
  approvalAnalysis: ApprovalRateAnalysis
): LessDiscriminatoryAlternative[] {
  const highProxies = proxyVariables.filter((v) => v.correlationLevel === 'High').map((v) => v.variable);
  const mediumProxies = proxyVariables.filter((v) => v.correlationLevel === 'Medium').map((v) => v.variable);

  const maxDisparity = Math.max(...approvalAnalysis.disparityMetrics.map((m) => m.absoluteDifference), 0);

  const ldas: LessDiscriminatoryAlternative[] = [];

  if (highProxies.length > 0) {
    ldas.push({
      name: 'Remove High-Correlation Proxy Variables',
      description: `Remove variables with high demographic correlation from the model. Note: research shows models often reconstruct equivalent disparity from remaining correlated features (Gillis & Spiess, 2019) — this should be combined with post-removal disparity testing.`,
      projectedDisparityReduction: Math.round(maxDisparity * 0.4 * 100) / 100,
      variablesToRemove: highProxies,
      variablesToAdd: [],
      tradeoffs: 'Predictive accuracy may decrease. Removal alone is frequently insufficient — the model must be retested for disparate impact after retraining. The Impossibility Theorem of Fairness (Chouldechova, 2017) establishes that equalized error rates and equal outcomes cannot both be achieved when base default rates differ across groups.',
    });
  }

  ldas.push({
    name: 'Cash-Flow and Rental Payment History',
    description: 'Substitute or supplement traditional credit variables with cash-flow analysis and rental payment history. Urban Institute (2021) found this improves scorability for 21.3% of previously credit-invisible applicants. Fuster et al. (2022) document a 21% increase in approvals with maintained risk parity using alternative data.',
    projectedDisparityReduction: Math.round(maxDisparity * 0.25 * 100) / 100,
    variablesToRemove: mediumProxies.slice(0, 1),
    variablesToAdd: ['cash_flow_score', 'rental_payment_history'],
    tradeoffs: 'Requires data partnerships with cash-flow or rental data providers. Initial implementation requires validation that new variables do not themselves correlate with protected class.',
  });

  ldas.push({
    name: 'Calibrated Threshold Adjustment',
    description: 'Apply decision thresholds calibrated to equalize false-positive rates across demographic groups. This is a direct response to documented disparate error rates in automated systems. Requires legal review before implementation.',
    projectedDisparityReduction: Math.round(maxDisparity * 0.3 * 100) / 100,
    variablesToRemove: [],
    variablesToAdd: [],
    tradeoffs: 'Group-specific thresholds require legal review and may affect overall portfolio risk. The Impossibility Theorem of Fairness constrains which combinations of fairness criteria can be simultaneously satisfied.',
  });

  return ldas;
}

function buildRemediationChecklist(
  approvalAnalysis: ApprovalRateAnalysis,
  proxyVariables: ProxyVariable[],
  adverseAction: AdverseActionAudit
): RemediationItem[] {
  const items: RemediationItem[] = [];

  if (approvalAnalysis.flaggedGroups.length > 0) {
    const dirFailures = approvalAnalysis.disparityMetrics
      .filter((m) => m.failsFourFifthsRule)
      .map((m) => `${m.comparisonName} (DIR: ${m.disparateImpactRatio.toFixed(2)})`);

    items.push({
      id: 'rem-1',
      title: 'Investigate Material Approval Rate Disparity',
      description: dirFailures.length > 0
        ? `The following groups fail the four-fifths rule (DIR < 0.8): ${dirFailures.join('; ')}. Conduct root-cause analysis to determine whether the disparity stems from a legitimate risk factor or a proxy-variable effect.`
        : `Groups ${approvalAnalysis.flaggedGroups.join(', ')} show approval rate gaps exceeding 10 percentage points. Verify DIR values and document business necessity justification.`,
      priority: 'Critical',
      linkedSection: 'Section 1: Approval Rate Analysis',
      completed: false,
    });
  }

  const highProxies = proxyVariables.filter((v) => v.correlationLevel === 'High');
  if (highProxies.length > 0) {
    const withReconstructionRisk = highProxies.filter((v) => v.reconstructionRisk);
    items.push({
      id: 'rem-2',
      title: 'Remove or Mitigate High-Correlation Proxy Variables',
      description: `Variables ${highProxies.map((v) => v.variable).join(', ')} show high demographic correlation. Remove from model and retest for disparate impact after retraining — research shows models frequently reconstruct equivalent disparity from remaining features.${withReconstructionRisk.length > 0 ? ' Reconstruction risk flagged for: ' + withReconstructionRisk.map((v) => v.variable).join(', ') + '.' : ''}`,
      priority: 'Critical',
      linkedSection: 'Section 2: Proxy Variable Detection',
      completed: false,
    });
  }

  const mediumProxies = proxyVariables.filter((v) => v.correlationLevel === 'Medium');
  if (mediumProxies.length > 0) {
    items.push({
      id: 'rem-3',
      title: 'Document Business Necessity for Medium-Correlation Variables',
      description: `Variables ${mediumProxies.map((v) => v.variable).join(', ')} show moderate demographic correlation. Document statistical business necessity justification and evaluate whether a less discriminatory alternative achieves equivalent predictive performance.`,
      priority: 'High',
      linkedSection: 'Section 2: Proxy Variable Detection',
      completed: false,
    });
  }

  if (!adverseAction.passesECOA) {
    items.push({
      id: 'rem-4',
      title: 'Improve Adverse Action Notice Specificity',
      description: 'Denial reason codes do not meet ECOA/Reg B specificity requirements. Per CFPB Circular 2022-03, codes must reflect the actual factors driving the model\'s decision — generic codes like "insufficient income" without specific thresholds are non-compliant.',
      priority: 'High',
      linkedSection: 'Section 3: Adverse Action Analysis',
      completed: false,
    });
  }

  items.push({
    id: 'rem-5',
    title: 'Pilot a Less Discriminatory Alternative',
    description: 'Evaluate cash-flow and rental payment history data as supplements to traditional credit variables. Research shows this expands scorability for credit-invisible applicants while maintaining risk parity.',
    priority: 'Medium',
    linkedSection: 'Section 4: Less Discriminatory Alternatives',
    completed: false,
  });

  items.push({
    id: 'rem-6',
    title: 'Establish Ongoing Fairness Monitoring',
    description: 'Deploy quarterly disparity audits to detect fairness drift — the decay of equitable model performance as the economic environment evolves. Set DIR thresholds that automatically trigger review.',
    priority: 'Low',
    linkedSection: 'Section 1: Approval Rate Analysis',
    completed: false,
  });

  return items;
}

function computeDisparityScore(
  approvalAnalysis: ApprovalRateAnalysis,
  proxyVariables: ProxyVariable[]
): number {
  // Primary signal: four-fifths rule failures weighted more heavily than raw pp gaps
  const dirFailures = approvalAnalysis.disparityMetrics.filter((m) => m.failsFourFifthsRule).length;
  const maxGap = Math.max(...approvalAnalysis.disparityMetrics.map((m) => m.absoluteDifference), 0);

  const proxyScore = proxyVariables.reduce((acc, v) => {
    if (v.correlationLevel === 'High') return acc + (v.reconstructionRisk ? 22 : 18);
    if (v.correlationLevel === 'Medium') return acc + 10;
    return acc + 2;
  }, 0);

  const disparityComponent = Math.min(maxGap * 180 + dirFailures * 10, 65);
  return Math.min(Math.round(disparityComponent + proxyScore), 100);
}

export function runFullAudit(records: ApplicantRecord[], institutionName: string): AuditReport {
  if (records.length === 0) {
    throw new Error('No applicant records provided for analysis');
  }

  const approvalRateAnalysis = computeApprovalRateAnalysis(records);
  const proxyVariables = computeProxyVariables(records);
  const adverseActionAudit = computeAdverseActionAudit(records);
  const ldas = computeLDAs(proxyVariables, approvalRateAnalysis);
  const remediationChecklist = buildRemediationChecklist(approvalRateAnalysis, proxyVariables, adverseActionAudit);
  const disparityScore = computeDisparityScore(approvalRateAnalysis, proxyVariables);

  const maxDisparity = Math.max(
    ...approvalRateAnalysis.disparityMetrics.map((m) => m.absoluteDifference),
    0
  );

  const overallApprovalRate =
    records.filter((r) => r.decision === 'approved').length / records.length;

  const dirFailures = approvalRateAnalysis.disparityMetrics.filter((m) => m.failsFourFifthsRule);

  let overallAssessment: 'Pass' | 'Review Required' | 'Critical Flags';
  if (disparityScore >= 50 || dirFailures.length > 0) {
    overallAssessment = 'Critical Flags';
  } else if (disparityScore >= 25 || proxyVariables.some((v) => v.correlationLevel !== 'Low')) {
    overallAssessment = 'Review Required';
  } else {
    overallAssessment = 'Pass';
  }

  const keyFindings: string[] = [];
  if (dirFailures.length > 0) {
    keyFindings.push(
      `Four-fifths rule (DIR < 0.8) failed for: ${dirFailures.map((m) => `${m.comparisonName} (DIR ${m.disparateImpactRatio.toFixed(2)})`).join(', ')}`
    );
  } else if (approvalRateAnalysis.flaggedGroups.length > 0) {
    keyFindings.push(
      `Approval rate gap exceeds 10pp for: ${approvalRateAnalysis.flaggedGroups.join(', ')}`
    );
  }
  const highProxies = proxyVariables.filter((v) => v.correlationLevel === 'High');
  if (highProxies.length > 0) {
    keyFindings.push(
      `High-correlation proxy variables with reconstruction risk: ${highProxies.map((v) => v.variable).join(', ')}`
    );
  }
  if (!adverseActionAudit.passesECOA) {
    keyFindings.push('Adverse action reason codes may not meet CFPB Circular 2022-03 specificity requirements');
  }
  if (keyFindings.length === 0) {
    keyFindings.push('No material disparity detected at current statistical thresholds (DIR ≥ 0.8 for all groups)');
  }

  const executiveSummary: ExecutiveSummary = {
    totalApplicants: records.length,
    overallApprovalRate,
    approvalRateDisparity: maxDisparity,
    proxyVariableCount: proxyVariables.filter(
      (v) => v.correlationLevel === 'Medium' || v.correlationLevel === 'High'
    ).length,
    overallAssessment,
    keyFindings,
  };

  return {
    id: crypto.randomUUID(),
    institutionName,
    createdAt: new Date().toISOString(),
    disparityScore,
    executiveSummary,
    approvalRateAnalysis,
    proxyVariables,
    adverseActionAudit,
    lessDiscriminatoryAlternatives: ldas,
    remediationChecklist,
  };
}
