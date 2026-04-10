'use client';

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot, Label,
} from 'recharts';
import NumberTicker from '@/components/magicui/NumberTicker';

// ─── Data ─────────────────────────────────────────────────────────────────
// Three decision strategies plotted on Approval Rate vs Default Rate axes.
// Source: internal PoC benchmarks — Binary Medium threshold closes 40% of
// the gap between human-only and Bayesian-optimal performance.
//
// "Optimal" = Bayesian optimal classifier (theoretical ceiling)
// "Binary Medium" = Noema threshold calibrated at score 34–66 uncertain range
// "Human Only" = manual underwriter baseline
// "Binary High" = strict AI threshold (over-rejection)
// "Binary Low"  = permissive AI threshold (excess risk)

const strategies = [
  { name: 'Human Only',         approvalRate: 58, defaultRate: 3.8, fill: '#94A3B8', key: 'human'   },
  { name: 'Binary High (Strict)',approvalRate: 52, defaultRate: 2.9, fill: '#DC2626', key: 'strict'  },
  { name: 'Binary Low (Lenient)',approvalRate: 74, defaultRate: 5.2, fill: '#F59E0B', key: 'lenient' },
  { name: 'Noema Binary Medium', approvalRate: 67, defaultRate: 3.2, fill: '#6366F1', key: 'medium'  },
  { name: 'Bayesian Optimal',    approvalRate: 71, defaultRate: 3.1, fill: '#10B981', key: 'optimal' },
];

// Pareto efficient set: medium + optimal
const efficientSet = [
  { x: 67, y: 3.2 },
  { x: 71, y: 3.1 },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: typeof strategies[0] }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl px-4 py-3 shadow-xl shadow-black/50">
      <p className="font-mono text-xs font-bold text-white mb-2">{d.name}</p>
      <p className="font-mono text-[10px] text-[#7A90A8]">Approval rate: <span className="text-white font-semibold">{d.approvalRate}%</span></p>
      <p className="font-mono text-[10px] text-[#7A90A8]">Default rate: <span className="text-white font-semibold">{d.defaultRate}%</span></p>
      {d.key === 'medium' && (
        <p className="font-mono text-[9px] text-indigo-300 mt-1.5 border-t border-navy-700 pt-1.5">
          40% of Bayesian gap closed · refer range 34–66
        </p>
      )}
      {d.key === 'optimal' && (
        <p className="font-mono text-[9px] text-emerald-400 mt-1.5 border-t border-navy-700 pt-1.5">
          Theoretical ceiling — Bayesian optimal
        </p>
      )}
    </div>
  );
}

export default function DecisioningGap() {
  return (
    <section className="px-8 py-24 border-t border-navy-700">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#7A90A8] mb-4">
          Research-Backed Technical Moat
        </p>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#E8EDF5] mb-4 max-w-2xl">
          The Decisioning Gap: Binary Medium Threshold
        </h2>
        <p className="font-mono text-sm text-[#7A90A8] mb-10 max-w-xl leading-relaxed">
          PoC data shows the Binary Medium threshold — calibrated to the uncertain score range (34–66) and
          routed to human-in-the-loop review — closes <span className="text-indigo-300 font-semibold">40% of the performance gap</span> between
          human-only decisions and Bayesian-optimal outcomes.
        </p>

        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { value: 40, suffix: '%', label: 'decisioning gap closed vs. human-only', color: 'text-indigo-400', source: 'PoC benchmark' },
            { value: 67, suffix: '%', label: 'approval rate at Binary Medium threshold', color: 'text-[#E8EDF5]', source: 'vs 58% human-only' },
            { value: 3.2, suffix: '%', label: 'default rate (vs 3.8% human-only)', color: 'text-emerald-400', source: '0.6pp improvement', decimals: 1 },
          ].map(({ value, suffix, label, color, source, decimals }) => (
            <div key={label} className="rounded-xl border border-navy-700 bg-navy-900 p-5">
              <p className={`font-mono font-bold text-3xl mb-1 ${color}`}>
                <NumberTicker value={value} suffix={suffix} decimalPlaces={decimals ?? 0} delay={0.3} />
              </p>
              <p className="font-mono text-xs text-[#E8EDF5] font-semibold mb-0.5">{label}</p>
              <p className="font-mono text-[10px] text-[#3A5068]">{source}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scatter plot */}
          <div className="rounded-xl border border-navy-700 bg-navy-900 p-6">
            <p className="font-mono text-[10px] text-[#7A90A8] uppercase tracking-widest font-semibold mb-1">
              Approval Rate vs. Default Rate — Strategy Comparison
            </p>
            <p className="font-mono text-sm text-[#E8EDF5] font-semibold mb-4">
              Binary Medium sits on the efficient frontier
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <ScatterChart margin={{ top: 12, right: 20, left: -8, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#192438" />
                <XAxis
                  type="number" dataKey="approvalRate"
                  domain={[48, 78]} name="Approval Rate"
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#4A5A6A' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                  label={{ value: 'Approval Rate (%)', position: 'insideBottom', offset: -12, fontFamily: 'monospace', fontSize: 9, fill: '#4A5A6A' }}
                />
                <YAxis
                  type="number" dataKey="defaultRate"
                  domain={[2.5, 5.8]} name="Default Rate"
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#4A5A6A' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                  width={36}
                  label={{ value: 'Default Rate (%)', angle: -90, position: 'insideLeft', offset: 18, fontFamily: 'monospace', fontSize: 9, fill: '#4A5A6A' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1F2E48', strokeWidth: 1 }} />

                {/* Uncertain range annotation */}
                <ReferenceLine
                  x={67}
                  stroke="#6366F1"
                  strokeDasharray="4 3"
                  strokeWidth={1}
                  strokeOpacity={0.4}
                />

                {/* Human-only baseline */}
                <ReferenceDot
                  x={58} y={3.8}
                  r={0}
                  label={{ value: 'Human baseline', position: 'top', fontFamily: 'monospace', fontSize: 8, fill: '#94A3B8' }}
                />

                {strategies.map((s) => (
                  <Scatter
                    key={s.key}
                    name={s.name}
                    data={[{ ...s }]}
                    fill={s.fill}
                    r={s.key === 'medium' || s.key === 'optimal' ? 9 : 6}
                    opacity={0.9}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-2">
              {strategies.map((s) => (
                <div key={s.key} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.fill }} />
                  <span className="font-mono text-[9px] text-[#4A5A6A]">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Refer band explainer */}
          <div className="rounded-xl border border-navy-700 bg-navy-900 p-6 flex flex-col gap-4">
            <div>
              <p className="font-mono text-[10px] text-[#7A90A8] uppercase tracking-widest font-semibold mb-1">
                The Uncertain Range — Human-in-the-Loop Zone
              </p>
              <p className="font-mono text-sm text-[#E8EDF5] font-semibold">AI score 34–66: Refer, not deny</p>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              {[
                { score: '0–33',   label: 'Deny',   color: 'bg-[#DC2626]', text: 'text-[#DC2626]', detail: 'Clear denial signal. SHAP narratives generated automatically.' },
                { score: '34–66',  label: 'Refer',  color: 'bg-amber-500', text: 'text-amber-400', detail: 'Uncertain range. Routes to human underwriter with Reg B counterfactual brief.' },
                { score: '67–100', label: 'Approve',color: 'bg-emerald-500', text: 'text-emerald-400', detail: 'Clear approval signal. Adverse action notice not required.' },
              ].map(({ score, label, color, text, detail }) => (
                <div key={score} className="flex items-start gap-4 p-4 rounded-xl border border-navy-700 bg-navy-850">
                  <div className={`shrink-0 h-10 w-1.5 rounded-full ${color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-mono text-xs font-bold ${text}`}>{label}</span>
                      <span className="font-mono text-[10px] text-[#3A5068]">Score {score}</span>
                    </div>
                    <p className="font-mono text-[10px] text-[#7A90A8] leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl border border-indigo-500/15 bg-indigo-500/5">
              <p className="font-mono text-[10px] text-indigo-300 leading-relaxed">
                <span className="font-semibold">40% gap closure:</span> By routing the uncertain range (34–66) to human review
                rather than auto-denial, the Binary Medium strategy recovers approvals that human-only and strict AI
                systems both miss — without increasing default rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
