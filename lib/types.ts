export interface ApplicantRecord {
  applicant_id: string;
  decision: 'approved' | 'denied';
  race?: string;
  income?: number;
  credit_score?: number;
  dti?: number;
  [key: string]: string | number | undefined;
}

export interface ColumnMapping {
  applicant_id: string;
  decision: string;
  protected_class: string;
  income?: string;
  credit_score?: string;
  dti?: string;
  additional?: Record<string, string>;
}

export interface GroupApprovalRate {
  group: string;
  approvalRate: number;
  approvedCount: number;
  totalCount: number;
}

export interface DisparityMetric {
  referenceName: string;
  comparisonName: string;
  referenceRate: number;
  comparisonRate: number;
  difference: number;
  absoluteDifference: number;
  /** Disparate Impact Ratio (DIR): comparison group rate ÷ reference group rate.
   *  Values below 0.8 (the four-fifths rule) indicate potential adverse impact. */
  disparateImpactRatio: number;
  /** Whether DIR falls below the 0.8 four-fifths-rule threshold. */
  failsFourFifthsRule: boolean;
  sampleSize: {
    reference: number;
    comparison: number;
  };
}

export interface ApprovalRateAnalysis {
  groupRates: GroupApprovalRate[];
  disparityMetrics: DisparityMetric[];
  /** Groups whose DIR < 0.8 (four-fifths rule) or approval rate gap > 10pp. */
  flaggedGroups: string[];
}

export interface ProxyVariable {
  variable: string;
  correlationLevel: 'Low' | 'Medium' | 'High';
  correlationScore: number;
  description: string;
  /** Research basis: models can reconstruct dropped proxy attributes from remaining
   *  features, so removal alone may not eliminate disparate impact. */
  reconstructionRisk: boolean;
}

export interface AdverseActionIssue {
  reason: string;
  count: number;
  suggestedImprovement: string;
}

export interface AdverseActionAudit {
  totalDenials: number;
  uniqueReasons: number;
  passesECOA: boolean;
  summary: string;
  issues: AdverseActionIssue[];
}

export interface LessDiscriminatoryAlternative {
  name: string;
  description: string;
  projectedDisparityReduction: number;
  variablesToRemove: string[];
  variablesToAdd: string[];
  tradeoffs: string;
}

export interface RemediationItem {
  id: string;
  title: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  linkedSection: string;
  completed: boolean;
}

export interface ExecutiveSummary {
  totalApplicants: number;
  overallApprovalRate: number;
  approvalRateDisparity: number;
  proxyVariableCount: number;
  overallAssessment: 'Pass' | 'Review Required' | 'Critical Flags';
  keyFindings: string[];
}

export interface AuditReport {
  id: string;
  institutionName: string;
  createdAt: string;
  disparityScore: number;
  executiveSummary: ExecutiveSummary;
  approvalRateAnalysis: ApprovalRateAnalysis;
  proxyVariables: ProxyVariable[];
  adverseActionAudit: AdverseActionAudit;
  lessDiscriminatoryAlternatives: LessDiscriminatoryAlternative[];
  remediationChecklist: RemediationItem[];
}

export interface Audit {
  id: string;
  institutionName: string;
  createdAt: string;
  status: 'processing' | 'complete' | 'failed';
  disparityScore?: number;
  reportData?: AuditReport;
}
