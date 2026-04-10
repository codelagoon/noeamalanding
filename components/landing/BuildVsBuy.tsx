'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import NumberTicker from '@/components/magicui/NumberTicker';

const costData = [
  { label: 'Build In-House', months: 15, cost: 100, fill: '#6b7280' },
  { label: 'SaaS-Only',     months: 3,  cost: 55,  fill: '#9ca3af' },
  { label: 'Noema Hybrid',  months: 1,  cost: 30,  fill: '#4A7C6F' },
];

const rows = [
  {
    dimension: 'Time to first audit',
    inHouse: '12–18 months',
    saas: '2–4 weeks',
    hybrid: '< 48 hours',
    winner: 'hybrid',
  },
  {
    dimension: 'Inference token cost',
    inHouse: 'GPT-4o class (~$15/M tokens)',
    saas: 'GPT-4o class (~$15/M tokens)',
    hybrid: 'SLM extraction (~$0.30/M tokens)',
    winner: 'hybrid',
  },
  {
    dimension: 'API cost reduction',
    inHouse: 'Baseline',
    saas: '−20%',
    hybrid: '−70% vs. GPT-class LLMs',
    winner: 'hybrid',
  },
  {
    dimension: 'Proprietary model control',
    inHouse: '✓ Full',
    saas: '✗ Vendor lock-in',
    hybrid: '✓ Your models, our governance layer',
    winner: 'hybrid',
  },
  {
    dimension: 'CFPB 2022-03 compliance',
    inHouse: 'Manual — internal legal review',
    saas: 'Partial — generic reason codes',
    hybrid: 'Automated behaviorally specific narratives',
    winner: 'hybrid',
  },
  {
    dimension: 'EU AI Act readiness',
    inHouse: 'Requires new engineering sprint',
    saas: 'Roadmap — Aug 2026 deadline',
    hybrid: 'Audit trail built-in from day 1',
    winner: 'hybrid',
  },
  {
    dimension: 'SMPC cross-lender benchmarking',
    inHouse: '✗ Not available',
    saas: '✗ Not available',
    hybrid: '✓ Architecture-ready',
    winner: 'hybrid',
  },
];

export default function BuildVsBuy() {
  return (
    <section className="px-8 py-24 border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A0A0A0] mb-4">
          CTO Decision Framework
        </p>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#F5F5F5] mb-4 max-w-2xl">
          Build vs. Buy vs. Hybrid
        </h2>
        <p className="font-mono text-sm text-[#A0A0A0] mb-10 max-w-xl leading-relaxed">
          Building fair-lending governance in-house means 12–18 months of engineering against a moving
          regulatory target. The hybrid approach gives you pre-built narrative infrastructure and SMPC
          protocols while your proprietary risk models stay yours.
        </p>

        {/* SLM cost headline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="md:col-span-1 rounded-xl border border-[#4A7C6F]/40 bg-[#4A7C6F]/10 p-6 flex flex-col justify-between">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#4A7C6F] mb-3">
              SLM vs. GPT-class token cost
            </p>
            <p className="font-mono font-bold text-[#E8D5A3] text-5xl mb-1">
              <NumberTicker value={70} suffix="%" delay={0.2} />
            </p>
            <p className="font-mono text-xs text-[#A0A0A0] leading-relaxed">
              reduction in API inference cost by using Small Language Models for document
              extraction instead of GPT-4o class models (~$0.30/M vs $15/M tokens)
            </p>
          </div>

          {/* cost comparison chart */}
          <div className="md:col-span-2 rounded-xl border border-[#2A2A2A] bg-[#141414] p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0] mb-4">
              Relative implementation cost (indexed to 100)
            </p>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={costData} margin={{ top: 4, right: 8, left: -18, bottom: 0 }} barSize={36}>
                <XAxis
                  dataKey="label"
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 110]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as typeof costData[0];
                    return (
                      <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2">
                        <p className="font-mono text-xs font-semibold text-[#F5F5F5]">{d.label}</p>
                        <p className="font-mono text-[10px] text-[#A0A0A0]">Cost index: {d.cost}</p>
                        <p className="font-mono text-[10px] text-[#A0A0A0]">Time to deploy: ~{d.months}mo</p>
                      </div>
                    );
                  }}
                />
                <ReferenceLine y={30} stroke="#4A7C6F" strokeDasharray="4 3" strokeWidth={1} />
                <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                  {costData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison table */}
        <div className="rounded-xl border border-[#2A2A2A] overflow-hidden">
          <div className="grid grid-cols-4 bg-[#141414] border-b border-[#2A2A2A] px-5 py-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]">Dimension</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]">Build in-house</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]">SaaS-only</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#4A7C6F]">Noema Hybrid ✓</p>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.dimension}
              className={`grid grid-cols-4 px-5 py-3.5 gap-4 ${i < rows.length - 1 ? 'border-b border-[#2A2A2A]' : ''} hover:bg-[#141414]/60 transition-colors`}
            >
              <p className="font-mono text-xs text-[#A0A0A0] font-semibold">{row.dimension}</p>
              <p className="font-mono text-xs text-[#6b7280]">{row.inHouse}</p>
              <p className="font-mono text-xs text-[#6b7280]">{row.saas}</p>
              <p className="font-mono text-xs text-[#4A7C6F] font-semibold">{row.hybrid}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 font-mono text-[10px] text-[#A0A0A0]">
          SLM cost comparison based on published OpenAI / open-weight model pricing (April 2026). Hybrid architecture keeps proprietary risk-model weights on your infrastructure — Noema processes only aggregated fairness statistics.
        </p>
      </div>
    </section>
  );
}
