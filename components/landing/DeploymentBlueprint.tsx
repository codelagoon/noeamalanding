'use client';

import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface Phase {
  phase: string;
  label: string;
  start: number;
  duration: number;
  color: string;
  deliverables: string[];
  metric: string;
}

const phases: Phase[] = [
  {
    phase: 'Phase 1',
    label: 'Feasibility & Data Readiness',
    start: 0,
    duration: 30,
    color: '#4A7C6F',
    deliverables: [
      'Inventory all AI/ML underwriting models',
      'Map input variables to protected-class proxies',
      'Establish baseline Adverse Impact Ratio (AIR)',
      'Data governance policy review',
    ],
    metric: 'Baseline DIR established',
  },
  {
    phase: 'Phase 2',
    label: 'Pilot & Model Validation',
    start: 30,
    duration: 30,
    color: '#E8D5A3',
    deliverables: [
      'Parallel-run AI vs. traditional scoring',
      'Bias testing across all demographic groups',
      'Proxy variable reconstruction risk audit',
      'CFPB Circular 2022-03 adverse action review',
    ],
    metric: '100% of denials carry behaviorally specific codes',
  },
  {
    phase: 'Phase 3',
    label: 'Production Governance',
    start: 60,
    duration: 30,
    color: '#5A9C8A',
    deliverables: [
      'Automated monitoring dashboards live',
      'AIR threshold alerts configured',
      'Fairness drift quarterly cadence scheduled',
      'Examiner-ready report template finalised',
    ],
    metric: 'DIR monitored · four-fifths rule enforced',
  },
];

// Gantt chart: each phase is a stacked bar — transparent gap bar + filled duration bar
const ganttData = [
  {
    name: 'Days 1–30',
    gap: 0, p1: 30, p2: 0,  p3: 0,
    label: 'Feasibility',
  },
  {
    name: 'Days 31–60',
    gap: 30, p1: 0, p2: 30, p3: 0,
    label: 'Pilot',
  },
  {
    name: 'Days 61–90',
    gap: 60, p1: 0, p2: 0,  p3: 30,
    label: 'Production',
  },
];

function GanttChart() {
  return (
    <ResponsiveContainer width="100%" height={110}>
      <BarChart
        layout="vertical"
        data={ganttData}
        margin={{ top: 4, right: 12, left: 0, bottom: 4 }}
        barSize={18}
        barCategoryGap="30%"
      >
        <XAxis
          type="number"
          domain={[0, 90]}
          tickCount={10}
          tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#6b7280' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) => `Day ${v}`}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={72}
          tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#A0A0A0' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const row = payload[0]?.payload as typeof ganttData[0];
            return (
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2">
                <p className="font-mono text-xs text-[#F5F5F5] font-semibold">{row.label}</p>
                <p className="font-mono text-[10px] text-[#A0A0A0]">30-day sprint</p>
              </div>
            );
          }}
        />
        {/* invisible spacer bar */}
        <Bar dataKey="gap" stackId="a" fill="transparent" isAnimationActive={false} />
        <Bar dataKey="p1" stackId="a" fill="#4A7C6F" radius={[4, 4, 4, 4]}>
          <LabelList dataKey="label" position="insideLeft" style={{ fontFamily: 'monospace', fontSize: 9, fill: '#0A0A0A', fontWeight: 'bold' }} />
        </Bar>
        <Bar dataKey="p2" stackId="a" fill="#E8D5A3" radius={[4, 4, 4, 4]}>
          <LabelList dataKey="label" position="insideLeft" style={{ fontFamily: 'monospace', fontSize: 9, fill: '#0A0A0A', fontWeight: 'bold' }} />
        </Bar>
        <Bar dataKey="p3" stackId="a" fill="#5A9C8A" radius={[4, 4, 4, 4]}>
          <LabelList dataKey="label" position="insideLeft" style={{ fontFamily: 'monospace', fontSize: 9, fill: '#0A0A0A', fontWeight: 'bold' }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function DeploymentBlueprint() {
  return (
    <section className="px-8 py-24 border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A0A0A0] mb-4">
          Implementation
        </p>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#F5F5F5] mb-4 max-w-2xl">
          90-Day Express Lane to Production Governance
        </h2>
        <p className="font-mono text-sm text-[#A0A0A0] mb-10 max-w-xl leading-relaxed">
          A structured implementation roadmap that eliminates institutional lag — from baseline
          AIR measurement to automated fairness drift monitoring in three 30-day sprints.
        </p>

        {/* Gantt */}
        <div className="mb-10 p-5 rounded-xl border border-[#2A2A2A] bg-[#141414]">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0] mb-4">Timeline</p>
          <GanttChart />
          <div className="flex gap-5 mt-3">
            {phases.map((p) => (
              <div key={p.phase} className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-3 rounded-sm" style={{ background: p.color }} />
                <span className="font-mono text-[9px] text-[#A0A0A0]">{p.phase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {phases.map((p, i) => (
            <div key={p.phase} className="relative overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#141414] p-5">
              <div className="absolute top-0 left-0 h-1 w-full" style={{ background: p.color }} />
              <div className="flex items-center gap-2 mb-3 mt-1">
                <span className="font-mono text-[10px] font-bold" style={{ color: p.color }}>
                  {`0${i + 1}`}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]">
                  Days {p.start + 1}–{p.start + p.duration}
                </span>
              </div>
              <h3 className="font-mono text-sm font-semibold text-[#F5F5F5] mb-4">{p.label}</h3>
              <ul className="space-y-2">
                {p.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 font-mono text-xs" style={{ color: p.color }}>→</span>
                    <span className="font-mono text-xs text-[#A0A0A0] leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-[#2A2A2A]">
                <p className="font-mono text-[10px] text-[#A0A0A0]">
                  <span className="font-semibold" style={{ color: p.color }}>Exit gate: </span>
                  {p.metric}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
