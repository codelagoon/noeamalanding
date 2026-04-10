import { GroupApprovalRate, DisparityMetric } from '@/lib/types';

interface DisparityChartProps {
  groupRates: GroupApprovalRate[];
  disparityMetrics?: DisparityMetric[];
}

export default function DisparityChart({ groupRates, disparityMetrics = [] }: DisparityChartProps) {
  if (groupRates.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400 font-mono text-sm">
        No group data available
      </div>
    );
  }

  const maxRate = Math.max(...groupRates.map((g) => g.approvalRate));

  const dirByGroup: Record<string, DisparityMetric> = {};
  for (const m of disparityMetrics) {
    dirByGroup[m.comparisonName] = m;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Approval Rate by Demographic Group
        </p>
        <p className="font-mono text-xs text-gray-400">
          DIR = Disparate Impact Ratio &mdash; four-fifths rule flags DIR &lt; 0.80
        </p>
      </div>
      {groupRates
        .slice()
        .sort((a, b) => b.approvalRate - a.approvalRate)
        .map(({ group, approvalRate, approvedCount, totalCount }) => {
          const isReference = approvalRate === maxRate;
          const metric = dirByGroup[group];
          const failsRule = metric?.failsFourFifthsRule ?? false;

          return (
            <div key={group}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-gray-900 w-28 truncate">{group}</span>
                  <span className="font-mono text-xs text-gray-500">
                    {approvedCount}/{totalCount}
                  </span>
                  {isReference && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#6366F1]/10 text-[#6366F1] rounded">
                      reference
                    </span>
                  )}
                  {metric && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded ${
                        failsRule
                          ? 'bg-red-100 text-red-700'
                          : metric.disparateImpactRatio < 0.9
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      DIR {metric.disparateImpactRatio.toFixed(2)}
                      {failsRule ? ' ⚠' : ''}
                    </span>
                  )}
                </div>
                <span className="font-mono text-sm font-bold text-gray-900">
                  {(approvalRate * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 relative overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all ${
                    isReference
                      ? 'bg-indigo-500'
                      : failsRule
                      ? 'bg-crimson-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${approvalRate * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-2">
        <p className="font-mono text-xs text-gray-400">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#6366F1] mr-1.5 align-middle" />
          Reference group
        </p>
        <p className="font-mono text-xs text-gray-400">
          <span className="inline-block w-3 h-3 rounded-sm bg-red-400 mr-1.5 align-middle" />
          Fails four-fifths rule (DIR &lt; 0.80)
        </p>
        <p className="font-mono text-xs text-gray-400">
          <span className="inline-block w-3 h-3 rounded-sm bg-amber-400 mr-1.5 align-middle" />
          Passes — monitor
        </p>
      </div>
    </div>
  );
}
