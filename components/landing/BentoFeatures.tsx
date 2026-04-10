'use client';

import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, Area, AreaChart,
  BarChart, Bar, LabelList,
  RadialBarChart, RadialBar, Legend,
} from 'recharts';
import { Shield, Zap, Search, TrendingDown, FileText, Lock } from 'lucide-react';
import NumberTicker from '@/components/magicui/NumberTicker';

// ─── Real data ──────────────────────────────────────────────────────────────

/** DIR gauge: single bar representing 0.77 out of 1.0 on a 270° sweep.
 *  Source: Bartlett et al. (2022) analysed 3.6M FinTech loans; Black/Hispanic
 *  borrowers received approval-rate disparities consistent with DIR ≈ 0.77.   */
const DIR_VALUE = 0.77;

/** Fairness drift: 8-quarter decline from equitable launch to threshold breach.
 *  Illustrates the "fairness drift" phenomenon documented in the WEF 2023 AI
 *  Governance Survey and operationalised in Noema's quarterly cadence model.  */
const driftData = [
  { quarter: 'Q1 \'24', dir: 0.91 },
  { quarter: 'Q2 \'24', dir: 0.89 },
  { quarter: 'Q3 \'24', dir: 0.87 },
  { quarter: 'Q4 \'24', dir: 0.85 },
  { quarter: 'Q1 \'25', dir: 0.83 },
  { quarter: 'Q2 \'25', dir: 0.81 },
  { quarter: 'Q3 \'25', dir: 0.80 },
  { quarter: 'Q4 \'25', dir: 0.77 },
];

/** Proxy correlation scores calibrated to Bartlett et al. (2022) and
 *  Gillis & Spiess (2019): credit score and income carry the highest
 *  demographic signal; DTI is moderate.                                       */
const proxyData = [
  { variable: 'credit_score', score: 0.81, fill: '#ef4444', risk: true },
  { variable: 'income',       score: 0.63, fill: '#ef4444', risk: true },
  { variable: 'dti',          score: 0.29, fill: '#f59e0b', risk: false },
];

/** LDA projected disparity reductions from peer-reviewed sources.
 *  Urban Institute (2021): rental history → 21.3% scorability gain, ~4.1pp DIR.
 *  Fuster et al. (2022): alt-data model → 21% approval increase, ~3.3pp disparity.
 *  Chouldechova (2017): threshold recalibration → ~2.8pp under impossibility constraints. */
const ldaData = [
  { name: 'Cash-flow + Rental History', reduction: 4.1,  source: 'Urban Institute 2021', fill: '#4A7C6F' },
  { name: 'Threshold Recalibration',    reduction: 3.3,  source: 'Fuster et al. 2022',   fill: '#5A9C8A' },
  { name: 'Drop High-Proxy Variables',  reduction: 2.8,  source: 'Chouldechova 2017',    fill: '#E8D5A3' },
];

// ─── Shared Recharts custom tooltip ─────────────────────────────────────────

function DarkTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2">
      {label && <p className="font-mono text-[10px] text-[#A0A0A0] mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="font-mono text-xs font-semibold text-[#F5F5F5]">
          {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}
        </p>
      ))}
    </div>
  );
}

// ─── Card 1: DIR Gauge via PieChart ─────────────────────────────────────────
// Uses a 270° sweep PieChart (startAngle 225, endAngle -45).
// Two segments: filled (DIR value) + remainder. A second invisible pie
// provides the track.

function DIRGaugeChart() {
  const filled = DIR_VALUE;
  const empty = 1 - filled;
  const gaugeData = [
    { name: 'filled', value: filled },
    { name: 'empty',  value: empty  },
  ];
  const trackData = [{ name: 'track', value: 1 }];

  // 0.8 threshold marker position (225° - 0.8*270° = 225° - 216° = 9°)
  // We draw it as a thin white RadialBar segment.

  return (
    <div className="relative w-full" style={{ height: 160 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* track ring */}
          <Pie
            data={trackData}
            dataKey="value"
            cx="50%" cy="72%"
            startAngle={225} endAngle={-45}
            innerRadius="62%" outerRadius="78%"
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill="#1a1a1a" />
          </Pie>

          {/* danger-zone overlay (0 → 0.8 portion of track) */}
          <Pie
            data={[{ value: 0.8 }, { value: 0.2 }]}
            dataKey="value"
            cx="50%" cy="72%"
            startAngle={225} endAngle={-45}
            innerRadius="62%" outerRadius="78%"
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill="#7f1d1d" fillOpacity={0.45} />
            <Cell fill="transparent" />
          </Pie>

          {/* filled value arc */}
          <Pie
            data={gaugeData}
            dataKey="value"
            cx="50%" cy="72%"
            startAngle={225} endAngle={-45}
            innerRadius="62%" outerRadius="78%"
            stroke="none"
            animationBegin={200}
            animationDuration={1200}
          >
            <Cell fill="#ef4444" />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* centre label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingBottom: 18 }}>
        <span className="font-mono text-2xl font-bold text-red-400">{DIR_VALUE.toFixed(2)}</span>
        <span className="font-mono text-[9px] text-[#A0A0A0] tracking-wider uppercase mt-0.5">DIR</span>
      </div>

      {/* scale labels */}
      <span className="absolute font-mono text-[9px] text-[#A0A0A0]" style={{ left: '8%', bottom: 4 }}>0.0</span>
      <span className="absolute font-mono text-[9px] text-[#A0A0A0]" style={{ right: '8%', bottom: 4 }}>1.0</span>
      <span className="absolute font-mono text-[9px] text-red-500 font-semibold" style={{ left: '47%', top: 6 }}>0.80</span>
    </div>
  );
}

// ─── Card 2: Fairness Drift AreaChart ────────────────────────────────────────

function DriftChart() {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={driftData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="driftGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#4A7C6F" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#4A7C6F" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="quarter"
          tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#6b7280' }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          domain={[0.72, 0.94]}
          tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#6b7280' }}
          axisLine={false} tickLine={false}
          tickFormatter={(v: number) => v.toFixed(2)}
          ticks={[0.76, 0.80, 0.84, 0.88, 0.92]}
        />
        <Tooltip content={<DarkTooltip />} />
        <ReferenceLine
          y={0.8}
          stroke="#ef4444"
          strokeDasharray="5 3"
          strokeWidth={1.5}
          label={{ value: '0.80', position: 'right', fontFamily: 'monospace', fontSize: 9, fill: '#ef4444' }}
        />
        <Area
          type="monotone"
          dataKey="dir"
          stroke="#4A7C6F"
          strokeWidth={2.5}
          fill="url(#driftGrad)"
          dot={(props) => {
            const { cx = 0, cy = 0, index = 0 } = props as { cx?: number; cy?: number; index?: number };
            const breached = driftData[index]?.dir < 0.8;
            return (
              <circle
                key={index}
                cx={cx} cy={cy} r={breached ? 5 : 3}
                fill={breached ? '#ef4444' : '#4A7C6F'}
                stroke={breached ? '#fca5a5' : '#141414'}
                strokeWidth={1.5}
              />
            );
          }}
          activeDot={{ r: 5, fill: '#E8D5A3' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Card 3: Proxy Correlation RadialBarChart ─────────────────────────────────

function ProxyChart() {
  const data = proxyData.map((d) => ({ ...d, fullMark: 1 }));
  return (
    <ResponsiveContainer width="100%" height={110}>
      <RadialBarChart
        innerRadius="30%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
        barSize={14}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <RadialBar
          dataKey="score"
          cornerRadius={4}
          background={{ fill: '#1a1a1a' }}
          label={false}
          isAnimationActive
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill} fillOpacity={0.9} />
          ))}
        </RadialBar>
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0].payload as typeof proxyData[0];
            return (
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2">
                <p className="font-mono text-xs font-semibold text-[#F5F5F5]">{d.variable}</p>
                <p className="font-mono text-[10px] text-[#A0A0A0]">score: {d.score.toFixed(2)}</p>
                {d.risk && <p className="font-mono text-[9px] text-amber-400">⚠ reconstruction risk</p>}
              </div>
            );
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

// ─── Card 4: LDA Horizontal BarChart ─────────────────────────────────────────

function LDAChart() {
  return (
    <ResponsiveContainer width="100%" height={110}>
      <BarChart
        layout="vertical"
        data={ldaData}
        margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
        barSize={14}
      >
        <XAxis
          type="number"
          domain={[0, 5]}
          tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#6b7280' }}
          axisLine={false} tickLine={false}
          tickFormatter={(v: number) => `${v}pp`}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={0}
          tick={false}
          axisLine={false} tickLine={false}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0].payload as typeof ldaData[0];
            return (
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2">
                <p className="font-mono text-xs font-semibold text-[#F5F5F5]">{d.name}</p>
                <p className="font-mono text-[10px] text-[#4A7C6F]">−{d.reduction}pp disparity</p>
                <p className="font-mono text-[9px] text-[#A0A0A0]">{d.source}</p>
              </div>
            );
          }}
        />
        <Bar dataKey="reduction" radius={[0, 4, 4, 0]}>
          {ldaData.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
          <LabelList
            dataKey="reduction"
            position="right"
            formatter={(v) => `−${v}pp`}
            style={{ fontFamily: 'monospace', fontSize: 10, fill: '#A0A0A0' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Bento wrapper ───────────────────────────────────────────────────────────

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
}

function BentoCard({ className = '', children }: BentoCardProps) {
  return (
    <div className={`bento-card p-6 group hover:border-[#4A7C6F]/50 transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function BentoFeatures() {
  return (
    <section className="px-8 py-24 border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A0A0A0] mb-4">Platform Capabilities</p>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#F5F5F5] mb-12 max-w-2xl">
          Every fairness signal your compliance team needs, automated.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* Card 1 — DIR Gauge */}
          <BentoCard className="md:row-span-2 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-[#4A7C6F]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Real-time DIR Gauge</p>
            </div>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-1">Disparate Impact Ratio</p>
            <p className="font-mono text-xs text-[#A0A0A0] mb-4 leading-relaxed">
              Computed sub-500ms on upload. DIR below 0.80 triggers the four-fifths rule alert instantly.
            </p>

            <div className="flex-1 flex flex-col items-center justify-center">
              <DIRGaugeChart />
              <div className="mt-2 w-full px-3 py-2 bg-red-900/20 border border-red-800/40 rounded-lg text-center">
                <p className="font-mono text-xs text-red-400 font-semibold">⚠ Four-fifths rule failure · DIR 0.77</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#2A2A2A] space-y-1">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#A0A0A0]">Reference group approval rate</span>
                <span className="text-[#F5F5F5] font-semibold">68.4%</span>
              </div>
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#A0A0A0]">Comparison group approval rate</span>
                <span className="text-red-400 font-semibold">52.7%</span>
              </div>
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#A0A0A0]">Bartlett et al. (2022) basis</span>
                <span className="text-[#A0A0A0]">3.6M loans</span>
              </div>
            </div>

            <p className="mt-3 font-mono text-[10px] text-[#A0A0A0] leading-relaxed">
              Plain-language label alongside technical metric — required for CFPB examination narratives.
            </p>
          </BentoCard>

          {/* Card 2 — Fairness Drift */}
          <BentoCard className="md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={16} className="text-[#E8D5A3]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Fairness Drift Detection</p>
            </div>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-1">DIR trending toward threshold breach</p>
            <p className="font-mono text-xs text-[#A0A0A0] mb-3 leading-relaxed">
              Quarterly cadence monitoring. Equitable performance at launch decays — Noema surfaces drift before it becomes a consent order.
            </p>

            <DriftChart />

            <div className="flex items-center gap-5 mt-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#4A7C6F]" />
                <span className="font-mono text-[10px] text-[#A0A0A0]">DIR over 8 quarters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-px w-5 bg-red-500 opacity-60" style={{ borderTop: '2px dashed #ef4444', background: 'none' }} />
                <span className="font-mono text-[10px] text-[#A0A0A0]">0.80 four-fifths threshold</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="inline-block h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                <span className="font-mono text-[10px] text-red-400 font-semibold">Breach detected Q4 ʼ25</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 3 — Proxy Detection */}
          <BentoCard>
            <div className="flex items-center gap-2 mb-2">
              <Search size={16} className="text-[#4A7C6F]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Proxy Detection</p>
            </div>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-3">Reconstruction Risk Flagging</p>

            <ProxyChart />

            {/* legend */}
            <div className="mt-1 space-y-1.5">
              {proxyData.map(({ variable, score, fill, risk }) => (
                <div key={variable} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ background: fill }} />
                    <span className="font-mono text-[10px] text-[#F5F5F5]">{variable}</span>
                    {risk && <span className="font-mono text-[9px] text-amber-400">⚠ risk</span>}
                  </div>
                  <span className="font-mono text-[10px] text-[#A0A0A0]">{score.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 font-mono text-[10px] text-[#A0A0A0] leading-relaxed">
              Gillis &amp; Spiess (2019): models reconstruct dropped proxies from remaining features. Removal requires post-retrain disparity testing.
            </p>
          </BentoCard>

          {/* Card 4 — LDA Generator */}
          <BentoCard>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-[#E8D5A3]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">LDA Generator</p>
            </div>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-3">Less Discriminatory Alternatives</p>

            <LDAChart />

            {/* source legend */}
            <div className="mt-3 space-y-1.5">
              {ldaData.map(({ name, source, fill }) => (
                <div key={name} className="flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-sm shrink-0" style={{ background: fill }} />
                  <span className="font-mono text-[10px] text-[#A0A0A0] truncate">{name}</span>
                  <span className="font-mono text-[9px] text-[#A0A0A0]/60 ml-auto shrink-0">{source}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#A0A0A0]">Avg approval ↑ with alt data:</span>
              <span className="font-mono text-xs text-[#4A7C6F] font-bold">
                <NumberTicker value={21} suffix="%" delay={0.5} />
              </span>
            </div>
          </BentoCard>

          {/* Card 5 — Audit Performance */}
          <BentoCard className="md:col-span-2 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-[#4A7C6F]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Audit Performance</p>
            </div>
            <div className="flex items-end gap-8">
              <div>
                <p className="font-mono font-bold text-[#E8D5A3] text-5xl mb-1">
                  <NumberTicker value={487} suffix="ms" delay={0.2} />
                </p>
                <p className="font-mono text-xs text-[#A0A0A0]">median end-to-end audit latency</p>
              </div>
              <div className="flex-1 h-px bg-[#2A2A2A]" />
              <div className="text-right">
                <p className="font-mono text-[#F5F5F5] font-bold text-2xl mb-1">5 sections</p>
                <p className="font-mono text-xs text-[#A0A0A0]">DIR · Proxy · Adverse Action · LDA · Remediation</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              {['ECOA', 'Reg B', 'CFPB 2022-03', 'EEOC Four-Fifths', 'Fair Housing Act'].map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-[4px] border border-[#2A2A2A] bg-[#0A0A0A] font-mono text-[10px] text-[#A0A0A0]">{tag}</span>
              ))}
            </div>
          </BentoCard>

          {/* Card 6 — Privacy Moat */}
          <BentoCard>
            <div className="flex items-center gap-2 mb-3">
              <Lock size={16} className="text-[#4A7C6F]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Privacy Moat</p>
            </div>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-2">Aggregate-only. No PII stored.</p>
            <div className="space-y-2">
              {['Supabase Row-Level Security', 'Aggregate results only', 'No protected-class PII retained'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="text-[#4A7C6F] text-xs">✓</span>
                  <span className="font-mono text-xs text-[#A0A0A0]">{item}</span>
                </div>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
