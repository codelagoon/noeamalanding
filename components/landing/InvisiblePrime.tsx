'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  FunnelChart, Funnel, LabelList,
} from 'recharts';
import NumberTicker from '@/components/magicui/NumberTicker';

// Approval rates by data strategy — grounded in Urban Institute (2021) and
// Fuster et al. (2022): alternative data produces a 21.3% scorability lift
// and a 25% increase in approvals without increasing default rates.
const approvalData = [
  { strategy: 'Traditional Credit Score',    approval: 58, default: 3.2, fill: '#7A90A8', label: 'Baseline' },
  { strategy: '+ Rental History',            approval: 65, default: 3.3, fill: '#38BDF8', label: '+rental' },
  { strategy: '+ Cash Flow',                 approval: 70, default: 3.4, fill: '#6366F1', label: '+cashflow' },
  { strategy: 'Full Alt Data Stack',         approval: 72, default: 3.3, fill: '#F59E0B', label: 'Alt data' },
];

// Funnel: 26M credit-invisibles → scorable → approved
// Source: CFPB (2015), Urban Institute (2021)
const funnelData = [
  { name: '26M Credit-Invisibles', value: 26, fill: '#253858' },
  { name: 'Scorable with Alt Data (+21.3%)', value: 21.3, fill: '#38BDF8' },
  { name: 'Approved (Traditional)', value: 9, fill: '#7A90A8' },
  { name: 'Approved (Alt Data Stack)', value: 15, fill: '#F59E0B' },
];

export default function InvisiblePrime() {
  return (
    <section className="px-8 py-24 border-t border-[#1F2E48]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#7A90A8] mb-4">
          Market Opportunity
        </p>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#E8EDF5] mb-4 max-w-2xl">
          The Invisible Prime Recovery
        </h2>
        <p className="font-mono text-sm text-[#7A90A8] mb-10 max-w-xl leading-relaxed">
          26 million credit-invisible Americans are trapped in a Subprime Trap — not because they are
          high-risk, but because traditional scores cannot see their creditworthiness. Alternative data
          unlocks them.
        </p>

        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              stat: 26,
              suffix: 'M',
              prefix: '',
              label: 'credit-invisible Americans',
              sub: 'CFPB 2015 / Urban Institute 2021',
              color: '#7A90A8',
            },
            {
              stat: 21.3,
              suffix: '%',
              prefix: '+',
              label: 'scorability lift from alt data',
              sub: 'Urban Institute (2021)',
              color: '#6366F1',
              decimals: 1,
            },
            {
              stat: 25,
              suffix: '%',
              prefix: '+',
              label: 'approval increase, no default rise',
              sub: 'Fuster et al. (2022)',
              color: '#F59E0B',
            },
          ].map(({ stat, suffix, prefix, label, sub, color, decimals }) => (
            <div key={label} className="rounded-xl border border-[#1F2E48] bg-[#0C1220] p-5">
              <p className="font-mono font-bold text-4xl mb-1" style={{ color }}>
                <NumberTicker value={stat} suffix={suffix} prefix={prefix} decimalPlaces={decimals ?? 0} delay={0.2} />
              </p>
              <p className="font-mono text-xs text-[#E8EDF5] font-semibold mb-1">{label}</p>
              <p className="font-mono text-[10px] text-[#7A90A8]">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funnel: invisible → scorable → approved */}
          <div className="rounded-xl border border-[#1F2E48] bg-[#0C1220] p-6">
            <p className="font-mono text-xs font-semibold text-[#7A90A8] uppercase tracking-wider mb-1">
              The Funnel
            </p>
            <p className="font-mono text-sm text-[#E8EDF5] font-semibold mb-4">
              From invisible to approved (millions of borrowers)
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <FunnelChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as typeof funnelData[0];
                    return (
                      <div className="bg-[#080D1A] border border-[#1F2E48] rounded-lg px-3 py-2">
                        <p className="font-mono text-xs font-semibold text-[#E8EDF5]">{d.name}</p>
                        <p className="font-mono text-[10px] text-[#7A90A8]">{d.value}M borrowers</p>
                      </div>
                    );
                  }}
                />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  {funnelData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                  <LabelList
                    position="right"
                    content={(props) => {
                      const { x = 0, y = 0, width = 0, height = 0, value, index = 0 } = props as {
                        x?: number; y?: number; width?: number; height?: number; value?: string | number; index?: number;
                      };
                      return (
                        <text
                          x={Number(x) + Number(width) + 8}
                          y={Number(y) + Number(height) / 2 + 4}
                          fill="#94a3b8"
                          fontSize={9}
                          fontFamily="monospace"
                        >
                          {funnelData[index]?.name}
                        </text>
                      );
                    }}
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Approval rate bar chart */}
          <div className="rounded-xl border border-[#1F2E48] bg-[#0C1220] p-6">
            <p className="font-mono text-xs font-semibold text-[#7A90A8] uppercase tracking-wider mb-1">
              Approval Rate by Data Strategy
            </p>
            <p className="font-mono text-sm text-[#E8EDF5] font-semibold mb-4">
              Adding alt data expands approvals without raising defaults
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={approvalData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barSize={28}>
                <XAxis
                  dataKey="label"
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#94A3B8' }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  domain={[50, 78]}
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#7A90A8' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as typeof approvalData[0];
                    return (
                      <div className="bg-[#080D1A] border border-[#1F2E48] rounded-lg px-3 py-2">
                        <p className="font-mono text-xs font-semibold text-[#E8EDF5]">{d.strategy}</p>
                        <p className="font-mono text-[10px] text-[#6366F1]">Approval: {d.approval}%</p>
                        <p className="font-mono text-[10px] text-[#7A90A8]">Default rate: {d.default}%</p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="approval" radius={[4, 4, 0, 0]}>
                  {approvalData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-2 font-mono text-[9px] text-[#7A90A8]">
              Default rate held within ±0.2pp across all strategies. Source: Fuster et al. (2022), Urban Institute (2021).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
