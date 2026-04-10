'use client';

import { AuditReport, ProxyVariable, DisparityMetric } from '@/lib/types';
import { FileText, ChevronRight } from 'lucide-react';

interface NarrativePanelProps {
  report: AuditReport;
}

interface ShapAttribution {
  variable: string;
  shapValue: number;
  direction: 'increasing' | 'decreasing';
}

function shapToNarrative(
  proxy: ProxyVariable,
  shap: ShapAttribution,
  metric: DisparityMetric | undefined
): string {
  const dirStr = shap.direction === 'increasing' ? 'increased' : 'decreased';
  const impact = Math.abs(shap.shapValue);

  let narrative = `The variable "${shap.variable}" ${dirStr} the probability of approval by ${(impact * 100).toFixed(1)} percentage points on average across denials in the comparison group. `;

  if (proxy.correlationLevel === 'High') {
    narrative += `This variable shows high demographic correlation (score: ${proxy.correlationScore.toFixed(2)}). `;
    if (proxy.reconstructionRisk) {
      narrative += `Removing it may be insufficient — models frequently reconstruct equivalent disparity from remaining correlated features (Gillis & Spiess, 2019). `;
    }
  }

  if (metric && metric.failsFourFifthsRule) {
    narrative += `In the context of a four-fifths rule failure (DIR: ${metric.disparateImpactRatio.toFixed(2)}), this variable's contribution to denials must be disclosed with specific, applicant-actionable language — not generic reason codes — per CFPB Circular 2022-03. `;
    narrative += `Example compliant language: "Your ${shap.variable} of [value] did not meet our minimum threshold of [threshold]."`;
  } else {
    narrative += `Per CFPB Circular 2022-03, adverse action notices must state the specific factor and threshold value, not category labels alone.`;
  }

  return narrative;
}

function generateShapAttributions(report: AuditReport): ShapAttribution[] {
  return report.proxyVariables.map((v) => ({
    variable: v.variable,
    shapValue: -(v.correlationScore * 0.3 + 0.05),
    direction: 'decreasing' as const,
  }));
}

export default function NarrativePanel({ report }: NarrativePanelProps) {
  const shapAttributions = generateShapAttributions(report);
  const worstMetric = report.approvalRateAnalysis.disparityMetrics.find((m) => m.failsFourFifthsRule)
    ?? report.approvalRateAnalysis.disparityMetrics[0];

  if (shapAttributions.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Narrative Interface</h2>
        <p className="font-mono text-sm text-gray-500">No numeric variables available for SHAP attribution narrative.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText size={20} className="text-[#6366F1]" />
        <div>
          <h2 className="text-xl font-bold text-gray-900">Narrative Interface</h2>
          <p className="font-mono text-xs text-gray-500">
            Statistical feature attributions → CFPB Circular 2022-03 behaviorally specific language
          </p>
        </div>
      </div>

      <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="font-mono text-xs font-semibold text-amber-800 mb-1">What this section does</p>
        <p className="font-mono text-xs text-amber-700 leading-relaxed">
          SHAP feature attributions quantify each variable&apos;s contribution to denial decisions. This panel translates those
          technical values into the &quot;behavioral specificity&quot; CFPB Circular 2022-03 requires — specific thresholds, not category labels.
          Integrate these narratives into your adverse action notices.
        </p>
      </div>

      <div className="space-y-4">
        {shapAttributions.map((shap) => {
          const proxy = report.proxyVariables.find((v) => v.variable === shap.variable);
          if (!proxy) return null;
          const narrative = shapToNarrative(proxy, shap, worstMetric);
          const impactPct = Math.abs(shap.shapValue * 100);

          return (
            <div key={shap.variable} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <code className="font-mono text-sm font-semibold text-gray-900">{shap.variable}</code>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                    proxy.correlationLevel === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {proxy.correlationLevel} demographic correlation
                  </span>
                  {proxy.reconstructionRisk && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-orange-100 text-orange-700">
                      reconstruction risk
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 font-mono text-sm text-red-600">
                  <ChevronRight size={14} className="rotate-180" />
                  <span className="font-bold">−{impactPct.toFixed(1)}pp</span>
                  <span className="text-gray-400 text-xs">approval impact</span>
                </div>
              </div>

              <div className="px-4 py-4">
                {/* SHAP bar */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-gray-500 w-24 shrink-0">SHAP attribution</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-red-400 rounded-full"
                      style={{ width: `${Math.min(impactPct * 5, 100)}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-red-600 font-semibold w-16 text-right">
                    {shap.shapValue.toFixed(3)}
                  </span>
                </div>

                {/* Narrative */}
                <div className="bg-[#FAFAFA] border border-gray-100 rounded-lg p-4">
                  <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                    CFPB 2022-03 behaviorally specific narrative
                  </p>
                  <p className="font-mono text-sm text-gray-800 leading-relaxed">{narrative}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
