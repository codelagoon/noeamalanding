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
  { strategy: 'Traditional Credit Score',    approval: 58, default: 3.2, fill: '#6b7280', label: 'Baseline' },
  { strategy: '+ Rental History',            approval: 65, default: 3.3, fill: '#4A7C6F', label: '+rental' },
  { strategy: '+ Cash Flow',                 approval: 70, default: 3.4, fill: '#5A9C8A', label: '+cashflow' },
  { strategy: 'Full Alt Data Stack',         approval: 72, default: 3.3, fill: '#E8D5A3', label: 'Alt data' },
];

// Funnel: 26M credit-invisibles → scorable → approved
// Source: CFPB (2015), Urban Institute (2021)
const funnelData = [
  { name: '26M Credit-Invisibles', value: 26, fill: '#374151' },
  { name: 'Scorable with Alt Data (+21.3%)', value: 21.3, fill: '#4A7C6F' },
  { name: 'Approved (Traditional)', value: 9, fill: '#6b7280' },
  { name: 'Approved (Alt Data Stack)', value: 15, fill: '#E8D5A3' },
];

export default function InvisiblePrime() {
  return (
    <section className="px-8 py-24 border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A0A0A0] mb-4">
          Market Opportunity
        </p>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#F5F5F5] mb-4 max-w-2xl">
          The Invisible Prime Recovery
        </h2>
        <p className="font-mono text-sm text-[#A0A0A0] mb-10 max-w-xl leading-relaxed">
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
              color: '#6b7280',
            },
            {
              stat: 21.3,
              suffix: '%',
              prefix: '+',
              label: 'scorability lift from alt data',
              sub: 'Urban Institute (2021)',
              color: '#4A7C6F',
              decimals: 1,
            },
            {
              stat: 25,
              suffix: '%',
              prefix: '+',
              label: 'approval increase, no default rise',
              sub: 'Fuster et al. (2022)',
              color: '#E8D5A3',
            },
          ].map(({ stat, suffix, prefix, label, sub, color, decimals }) => (
            <div key={label} className="rounded-xl border border-[#2A2A2A] bg-[#141414] p-5">
              <p className="font-mono font-bold text-4xl mb-1" style={{ color }}>
                <NumberTicker value={stat} suffix={suffix} prefix={prefix} decimalPlaces={decimals ?? 0} delay={0.2} />
              </p>
              <p className="font-mono text-xs text-[#F5F5F5] font-semibold mb-1">{label}</p>
              <p className="font-mono text-[10px] text-[#A0A0A0]">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funnel: invisible → scorable → approved */}
          <div className="rounded-xl border border-[#2A2A2A] bg-[#141414] p-6">
            <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider mb-1">
              The Funnel
            </p>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-4">
              From invisible to approved (millions of borrowers)
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <FunnelChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as typeof funnelData[0];
                    return (
                      <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2">
                        <p className="font-mono text-xs font-semibold text-[#F5F5F5]">{d.name}</p>
                        <p className="font-mono text-[10px] text-[#A0A0A0]">{d.value}M borrowers</p>
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
                          fill="#9ca3af"
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
          <div className="rounded-xl border border-[#2A2A2A] bg-[#141414] p-6">
            <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider mb-1">
              Approval Rate by Data Strategy
            </p>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-4">
              Adding alt data expands approvals without raising defaults
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={approvalData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barSize={28}>
                <XAxis
                  dataKey="label"
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#9ca3af' }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  domain={[50, 78]}
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#6b7280' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as typeof approvalData[0];
                    return (
                      <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2">
                        <p className="font-mono text-xs font-semibold text-[#F5F5F5]">{d.strategy}</p>
                        <p className="font-mono text-[10px] text-[#4A7C6F]">Approval: {d.approval}%</p>
                        <p className="font-mono text-[10px] text-[#A0A0A0]">Default rate: {d.default}%</p>
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
            <p className="mt-2 font-mono text-[9px] text-[#A0A0A0]">
              Default rate held within ±0.2pp across all strategies. Source: Fuster et al. (2022), Urban Institute (2021).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
