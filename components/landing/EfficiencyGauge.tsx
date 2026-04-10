'use client';

import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, ReferenceLine, Legend,
} from 'recharts';
import NumberTicker from '@/components/magicui/NumberTicker';

// Unit cost model: (Model Inference + Governance Review) / Total Loans Processed
// GPT-class LLM inference: ~$15/M tokens → ~$0.045 per loan at 3k tokens/review
// SLM extraction (Noema):  ~$0.30/M tokens → ~$0.0009 per loan
// Manual underwriter loaded cost: ~$75/hr, 15 min/loan = $18.75/loan
// Automated Noema review: $0.0009 inference + $0.05 governance overhead ≈ $0.051/loan
// 40-50% workload reduction → 2.5x throughput at same headcount

const volumeData = [
  { loans: '1k',   gpCost: 45.09, slmCost: 0.95,  manual: 18750 },
  { loans: '10k',  gpCost: 450,   slmCost: 9.5,   manual: 187500 },
  { loans: '100k', gpCost: 4500,  slmCost: 95,    manual: 1875000 },
  { loans: '1M',   gpCost: 45000, slmCost: 950,   manual: 18750000 },
];

const workloadData = [
  { stage: 'Data ingestion',   manual: 25, automated: 2,  unit: 'min' },
  { stage: 'DIR computation',  manual: 60, automated: 0.5, unit: 'min' },
  { stage: 'Proxy audit',      manual: 90, automated: 1,  unit: 'min' },
  { stage: 'Adverse action',   manual: 45, automated: 1,  unit: 'min' },
  { stage: 'Report assembly',  manual: 120, automated: 0,  unit: 'min' },
];

export default function EfficiencyGauge() {
  return (
    <section className="px-8 py-24 border-t border-[#1F2E48]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#7A90A8] mb-4">
          CXO Efficiency Gauge
        </p>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#E8EDF5] mb-4 max-w-2xl">
          Token Cost per Loan
        </h2>
        <p className="font-mono text-sm text-[#7A90A8] mb-4 max-w-xl leading-relaxed">
          Total cost of ownership is the wrong metric. What matters is unit economics per loan processed.
        </p>

        {/* Formula card */}
        <div className="mb-10 p-5 rounded-xl border border-[#1F2E48] bg-[#0C1220] font-mono">
          <p className="text-[10px] uppercase tracking-wider text-[#7A90A8] mb-3">Unit cost formula</p>
          <p className="text-sm text-[#E8EDF5]">
            Unit Cost = (Model Inference + Governance Review) ÷ Total Loans Processed
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-[#7A90A8] text-[10px] mb-0.5">GPT-4o class (per loan)</p>
              <p className="text-red-400 font-bold text-base">~$0.045</p>
            </div>
            <div>
              <p className="text-[#7A90A8] text-[10px] mb-0.5">Noema SLM (per loan)</p>
              <p className="text-[#6366F1] font-bold text-base">~$0.001</p>
            </div>
            <div>
              <p className="text-[#7A90A8] text-[10px] mb-0.5">Manual underwriter (per loan)</p>
              <p className="text-[#7A90A8] font-bold text-base">~$18.75</p>
            </div>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { value: 40, suffix: '%', label: 'reduction in manual underwriter workload', source: 'Industry benchmark', color: '#6366F1' },
            { value: 2.5, suffix: 'x', label: 'loan closure throughput vs. industry average', source: 'Sub-500ms audit latency', color: '#F59E0B', decimals: 1 },
            { value: 70, suffix: '%', label: 'API cost reduction vs. GPT-class inference', source: 'SLM vs. GPT-4o pricing', color: '#818CF8' },
          ].map(({ value, suffix, label, source, color, decimals }) => (
            <div key={label} className="rounded-xl border border-[#1F2E48] bg-[#0C1220] p-5">
              <p className="font-mono font-bold text-4xl mb-1" style={{ color }}>
                <NumberTicker value={value} suffix={suffix} delay={0.3} decimalPlaces={decimals ?? 0} />
              </p>
              <p className="font-mono text-xs text-[#E8EDF5] font-semibold mb-0.5">{label}</p>
              <p className="font-mono text-[10px] text-[#7A90A8]">{source}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost at scale */}
          <div className="rounded-xl border border-[#1F2E48] bg-[#0C1220] p-6">
            <p className="font-mono text-xs font-semibold text-[#7A90A8] uppercase tracking-wider mb-1">
              Governance cost at scale (USD, log scale)
            </p>
            <p className="font-mono text-sm text-[#E8EDF5] font-semibold mb-4">
              SLM unit costs stay manageable at any volume
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={volumeData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="loans"
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#94a3b8' }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  scale="log"
                  domain={['auto', 'auto']}
                  tick={{ fontFamily: 'monospace', fontSize: 8, fill: '#7A90A8' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => v >= 1000 ? `$${(v/1000).toFixed(0)}k` : `$${v}`}
                  width={42}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="bg-[#080D1A] border border-[#1F2E48] rounded-lg px-3 py-2">
                        <p className="font-mono text-xs text-[#7A90A8] mb-1">{label} loans</p>
                        {payload.map((p, i) => (
                          <p key={i} className="font-mono text-xs" style={{ color: p.color }}>
                            {p.name}: ${Number(p.value).toLocaleString()}
                          </p>
                        ))}
                      </div>
                    );
                  }}
                />
                <Legend
                  wrapperStyle={{ fontFamily: 'monospace', fontSize: 9 }}
                  formatter={(value: string) => <span style={{ color: '#94a3b8' }}>{value}</span>}
                />
                <Bar dataKey="gpCost" name="GPT-class LLM" fill="#7A90A8" radius={[4, 4, 0, 0]} barSize={20} />
                <Line dataKey="slmCost" name="Noema SLM" stroke="#6366F1" strokeWidth={2.5} dot={{ fill: '#6366F1', r: 4 }} type="monotone" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Time-per-stage comparison */}
          <div className="rounded-xl border border-[#1F2E48] bg-[#0C1220] p-6">
            <p className="font-mono text-xs font-semibold text-[#7A90A8] uppercase tracking-wider mb-1">
              Time per audit stage (minutes)
            </p>
            <p className="font-mono text-sm text-[#E8EDF5] font-semibold mb-4">
              Where underwriter hours go — and where automation recovers them
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart
                layout="vertical"
                data={workloadData}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                barSize={11}
              >
                <XAxis
                  type="number"
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#7A90A8' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `${v}m`}
                />
                <YAxis
                  type="category"
                  dataKey="stage"
                  width={88}
                  tick={{ fontFamily: 'monospace', fontSize: 8, fill: '#94a3b8' }}
                  axisLine={false} tickLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as typeof workloadData[0];
                    const saved = d.manual - d.automated;
                    return (
                      <div className="bg-[#080D1A] border border-[#1F2E48] rounded-lg px-3 py-2">
                        <p className="font-mono text-xs font-semibold text-[#E8EDF5] mb-1">{d.stage}</p>
                        <p className="font-mono text-[10px] text-[#7A90A8]">Manual: {d.manual}min</p>
                        <p className="font-mono text-[10px] text-[#6366F1]">Automated: {d.automated}min</p>
                        <p className="font-mono text-[10px] text-[#F59E0B]">Saved: {saved}min</p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="manual" name="Manual (min)" fill="#475569" radius={[0, 4, 4, 0]} />
                <Bar dataKey="automated" name="Automated (min)" fill="#6366F1" radius={[0, 4, 4, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
            <p className="mt-2 font-mono text-[9px] text-[#7A90A8]">
              Report assembly time = 0 automated (generated instantly). 40–50% total workload reduction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
