'use client';

import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, ReferenceLine,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { motion } from 'framer-motion';

interface DataPoint { quarter: string; dir: number; }

const defaultData: DataPoint[] = [
  { quarter: 'Q1 \'24', dir: 0.91 },
  { quarter: 'Q2 \'24', dir: 0.89 },
  { quarter: 'Q3 \'24', dir: 0.87 },
  { quarter: 'Q4 \'24', dir: 0.85 },
  { quarter: 'Q1 \'25', dir: 0.83 },
  { quarter: 'Q2 \'25', dir: 0.81 },
  { quarter: 'Q3 \'25', dir: 0.80 },
  { quarter: 'Q4 \'25', dir: 0.77 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const v = payload[0].value as number;
  const breached = v < 0.8;
  return (
    <div className="bg-[#0D1117] border border-[#2A3540] rounded-xl px-4 py-3 shadow-xl shadow-black/40">
      <p className="font-mono text-[10px] text-[#4A5A6A] mb-1">{label}</p>
      <p className={`font-mono text-sm font-bold ${breached ? 'text-red-400' : 'text-[#4A7C6F]'}`}>
        DIR {v.toFixed(2)}
      </p>
      <p className={`font-mono text-[9px] mt-0.5 ${breached ? 'text-red-400/70' : 'text-[#3A4A5A]'}`}>
        {breached ? '⚠ Below four-fifths rule (0.80)' : '✓ Above four-fifths threshold'}
      </p>
    </div>
  );
}

export default function FairnessDrift({
  data = defaultData,
  threshold = 0.8,
}: {
  data?: DataPoint[];
  threshold?: number;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const breachIdx = data.findIndex((d) => d.dir < threshold);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[10px] text-[#4A5A6A] uppercase tracking-widest font-semibold">
          DIR Over Time — Fairness Drift
        </p>
        {breachIdx >= 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 border border-red-500/25 rounded-full"
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-red-500"
            />
            <span className="font-mono text-[9px] text-red-400 font-semibold">
              Breach — {data[breachIdx].quarter}
            </span>
          </motion.div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={170}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
          onMouseMove={(e) => setHovered(typeof e?.activeLabel === 'string' ? e.activeLabel : null)}
          onMouseLeave={() => setHovered(null)}
        >
          <defs>
            <linearGradient id="driftFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#4A7C6F" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#4A7C6F" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="driftFillBreach" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#1A2030" vertical={false} />

          <XAxis
            dataKey="quarter"
            tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#3A4A5A' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            domain={[0.72, 0.94]}
            ticks={[0.75, 0.80, 0.85, 0.90]}
            tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#3A4A5A' }}
            axisLine={false} tickLine={false}
            tickFormatter={(v: number) => v.toFixed(2)}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2A3540', strokeWidth: 1 }} />

          <ReferenceLine
            y={threshold}
            stroke="#ef4444"
            strokeDasharray="5 4"
            strokeWidth={1.5}
            strokeOpacity={0.6}
            label={{ value: '0.80', position: 'right', fontFamily: 'monospace', fontSize: 9, fill: '#ef4444', opacity: 0.7 }}
          />

          <Area
            type="monotone"
            dataKey="dir"
            stroke="#4A7C6F"
            strokeWidth={2.5}
            fill="url(#driftFill)"
            dot={(props) => {
              const { cx = 0, cy = 0, index = 0 } = props as { cx?: number; cy?: number; index?: number };
              const breached = (data[index]?.dir ?? 1) < threshold;
              const isActive = data[index]?.quarter === hovered;
              return (
                <g key={index}>
                  {breached && (
                    <circle cx={cx} cy={cy} r={8} fill="#ef4444" fillOpacity={0.15} />
                  )}
                  <circle
                    cx={cx} cy={cy}
                    r={isActive ? 5 : breached ? 5 : 3.5}
                    fill={breached ? '#ef4444' : '#4A7C6F'}
                    stroke={breached ? '#fca5a5' : '#0D1117'}
                    strokeWidth={1.5}
                  />
                </g>
              );
            }}
            activeDot={{ r: 6, fill: '#E8D5A3', stroke: '#0D1117', strokeWidth: 2 }}
            isAnimationActive
            animationDuration={1600}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* legend */}
      <div className="flex items-center gap-5 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-5 bg-[#4A7C6F] rounded-full" />
          <span className="font-mono text-[9px] text-[#3A4A5A]">DIR trajectory</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-5 border-t border-dashed border-red-500/60" />
          <span className="font-mono text-[9px] text-[#3A4A5A]">0.80 threshold</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="font-mono text-[9px] text-[#4A5A6A]">Breach point</span>
        </div>
      </div>
    </div>
  );
}
