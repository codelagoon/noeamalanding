'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AuditReport } from '@/lib/types';
import AuditSummary from '@/components/dashboard/AuditSummary';
import MetricCard from '@/components/dashboard/MetricCard';
import DisparityChart from '@/components/dashboard/DisparityChart';
import VariableTable from '@/components/dashboard/VariableTable';
import { Download, AlertCircle } from 'lucide-react';
import NarrativePanel from '@/components/dashboard/NarrativePanel';

export default function AuditReportPage() {
  const params = useParams();
  const [report, setReport] = useState<AuditReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`/api/report/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch report');
        }

        setReport(data.report);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch report';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700 font-mono">{error || 'Report not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Report</h1>
          <p className="text-gray-600 font-mono text-sm">
            Detailed fairness analysis and recommendations
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#6EA8FE] text-white font-mono rounded-lg hover:bg-[#2B58D8] transition-colors">
          <Download size={20} />
          Download PDF
        </button>
      </div>

      <div className="space-y-8">
        <AuditSummary report={report} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            label="Disparity Score"
            value={report.disparityScore}
            subtext="0–100 scale, higher = more disparity"
            status={report.disparityScore > 50 ? 'critical' : report.disparityScore > 30 ? 'warning' : 'pass'}
          />
          <MetricCard
            label="Lowest DIR"
            value={
              report.approvalRateAnalysis.disparityMetrics.length > 0
                ? Math.min(...report.approvalRateAnalysis.disparityMetrics.map((m) => m.disparateImpactRatio)).toFixed(2)
                : 'N/A'
            }
            subtext="Disparate Impact Ratio — four-fifths rule flags DIR < 0.80"
            status={
              report.approvalRateAnalysis.disparityMetrics.some((m) => m.failsFourFifthsRule)
                ? 'critical'
                : report.approvalRateAnalysis.disparityMetrics.some((m) => m.disparateImpactRatio < 0.9)
                ? 'warning'
                : 'pass'
            }
          />
          <MetricCard
            label="Approval Rate Gap"
            value={`${(report.executiveSummary.approvalRateDisparity * 100).toFixed(1)}pp`}
            subtext="Max gap between highest and lowest group"
            status={report.executiveSummary.approvalRateDisparity > 0.2 ? 'critical' : report.executiveSummary.approvalRateDisparity > 0.1 ? 'warning' : 'pass'}
          />
          <MetricCard
            label="Proxy Variables"
            value={report.executiveSummary.proxyVariableCount}
            subtext="Medium/high demographic correlation"
            status={report.executiveSummary.proxyVariableCount > 2 ? 'warning' : 'pass'}
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Section 1: Approval Rate Analysis</h2>
          
          {report.approvalRateAnalysis.flaggedGroups.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-mono font-semibold text-red-700 mb-1">Material Disparity Detected</p>
                  <p className="text-sm font-mono text-red-600 mb-2">
                    {report.approvalRateAnalysis.disparityMetrics.some((m) => m.failsFourFifthsRule)
                      ? 'The following groups fail the four-fifths rule (Disparate Impact Ratio < 0.80), the standard screening threshold under EEOC Uniform Guidelines and fair lending doctrine: '
                      : 'The following groups show approval rate gaps exceeding 10 percentage points from the reference group: '}
                    {report.approvalRateAnalysis.flaggedGroups.join(', ')}
                  </p>
                  <p className="text-xs font-mono text-red-500">
                    A DIR below 0.80 indicates the comparison group&apos;s approval rate is less than 80% of the reference group&apos;s rate and warrants investigation and potential mitigation.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DisparityChart groupRates={report.approvalRateAnalysis.groupRates} disparityMetrics={report.approvalRateAnalysis.disparityMetrics} />

          <div className="mt-6 space-y-4">
            {report.approvalRateAnalysis.disparityMetrics.map((metric, index) => (
              <div
                key={index}
                className={`border-l-4 pl-4 ${metric.failsFourFifthsRule ? 'border-red-400' : 'border-gray-300'}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-sm font-mono text-gray-900">
                    <span className="font-bold">{metric.comparisonName}</span> vs{' '}
                    <span className="font-bold">{metric.referenceName}</span>
                  </p>
                  <span
                    className={`px-2 py-0.5 text-xs font-mono font-semibold rounded ${
                      metric.failsFourFifthsRule
                        ? 'bg-red-100 text-red-700'
                        : metric.disparateImpactRatio < 0.9
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    DIR {metric.disparateImpactRatio.toFixed(2)}{metric.failsFourFifthsRule ? ' — fails four-fifths rule' : ''}
                  </span>
                </div>
                <p className="text-sm font-mono text-gray-700">
                  Approval rate gap:{' '}
                  <span className="font-bold">{(metric.absoluteDifference * 100).toFixed(1)}pp</span>{' '}
                  ({(metric.comparisonRate * 100).toFixed(1)}% vs {(metric.referenceRate * 100).toFixed(1)}%)
                </p>
                <p className="text-xs font-mono text-gray-500 mt-1">
                  Sample sizes: {metric.sampleSize.comparison.toLocaleString()} comparison / {metric.sampleSize.reference.toLocaleString()} reference
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Section 2: Proxy Variable Detection</h2>
          <VariableTable variables={report.proxyVariables} />
          
          {report.proxyVariables.filter(v => v.correlationLevel === 'High').length > 0 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-mono font-semibold text-red-700 mb-1">Reconstruction Risk</p>
                  <p className="text-sm font-mono text-red-600">
                    High-correlation variables should be removed, but removal alone is frequently insufficient.
                    Research shows models often reconstruct equivalent disparity from remaining correlated features
                    (Gillis &amp; Spiess, 2019). The model must be retested for disparate impact after retraining
                    with the variable removed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Section 3: Adverse Action Analysis</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <MetricCard label="Total Denials" value={report.adverseActionAudit.totalDenials} />
            <MetricCard
              label="Unique Denial Reasons"
              value={report.adverseActionAudit.uniqueReasons}
              status={report.adverseActionAudit.passesECOA ? 'pass' : 'warning'}
            />
          </div>

          <p className="text-sm font-mono text-gray-700 mb-4">{report.adverseActionAudit.summary}</p>

          {report.adverseActionAudit.issues.length > 0 && (
            <div className="space-y-3">
              {report.adverseActionAudit.issues.map((issue, index) => (
                <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm font-mono text-amber-900 font-semibold mb-1">
                    {issue.reason} ({issue.count} denials)
                  </p>
                  <p className="text-xs font-mono text-amber-700">{issue.suggestedImprovement}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Section 4: Less Discriminatory Alternatives</h2>
          
          <div className="space-y-6">
            {report.lessDiscriminatoryAlternatives.map((lda, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-mono font-bold text-gray-900">{lda.name}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-mono font-semibold rounded">
                    -{lda.projectedDisparityReduction.toFixed(1)}pp disparity
                  </span>
                </div>
                <p className="text-sm font-mono text-gray-700 mb-3">{lda.description}</p>
                
                {lda.variablesToRemove.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-mono text-gray-600 mb-1">Remove:</p>
                    <div className="flex flex-wrap gap-2">
                      {lda.variablesToRemove.map((v) => (
                        <span key={v} className="px-2 py-1 bg-red-100 text-red-700 text-xs font-mono rounded">{v}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {lda.variablesToAdd.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-mono text-gray-600 mb-1">Add:</p>
                    <div className="flex flex-wrap gap-2">
                      {lda.variablesToAdd.map((v) => (
                        <span key={v} className="px-2 py-1 bg-green-100 text-green-700 text-xs font-mono rounded">{v}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs font-mono text-gray-600">
                    <span className="font-semibold">Tradeoffs:</span> {lda.tradeoffs}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NarrativePanel report={report} />

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Section 5: Remediation Checklist</h2>
          
          <div className="space-y-3">
            {report.remediationChecklist.map((item) => {
              const priorityColors: Record<string, string> = {
                Critical: 'bg-red-100 text-red-700',
                High: 'bg-orange-100 text-orange-700',
                Medium: 'bg-amber-100 text-amber-700',
                Low: 'bg-blue-100 text-blue-700',
              };

              return (
                <div key={item.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input type="checkbox" checked={item.completed} readOnly className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-mono font-semibold ${priorityColors[item.priority]}`}>
                        {item.priority}
                      </span>
                      <h3 className="font-mono font-semibold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-sm font-mono text-gray-700 mb-2">{item.description}</p>
                    <p className="text-xs font-mono text-gray-500">→ {item.linkedSection}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
