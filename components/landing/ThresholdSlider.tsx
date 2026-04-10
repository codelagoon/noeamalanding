'use client';

import { useState, useMemo } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, Label, CartesianGrid,
} from 'recharts';
import NumberTicker from '@/components/magicui/NumberTicker';

// Fairness–Accuracy Pareto Frontier data
// Each point = (threshold, accuracy, DIR) from a logistic regression model
// calibrated to match Bartlett et al. (2022) disparity levels.
// Lowering the approval threshold → higher approval rate → better DIR but lower precision.
const paretoPoints = [
  { threshold: 0.30, accuracy: 61, dir: 0.94, approvals: 82 },
  { threshold: 0.35, accuracy: 63, dir: 0.92, approvals: 79 },
  { threshold: 0.40, accuracy: 65, dir: 0.90, approvals: 76 },
  { threshold: 0.45, accuracy: 67, dir: 0.88, approvals: 73 },
  { threshold: 0.50, accuracy: 70, dir: 0.86, approvals: 70 },
  { threshold: 0.55, accuracy: 72, dir: 0.84, approvals: 67 },
  { threshold: 0.60, accuracy: 74, dir: 0.82, approvals: 64 },
  { threshold: 0.65, accuracy: 76, dir: 0.80, approvals: 61 },  // four-fifths boundary
  { threshold: 0.70, accuracy: 78, dir: 0.77, approvals: 58 },  // current failing state
  { threshold: 0.75, accuracy: 80, dir: 0.74, approvals: 55 },
  { threshold: 0.80, accuracy: 82, dir: 0.71, approvals: 52 },
];

// LDA alternatives — each shifts the frontier outward (better accuracy AND better DIR)
const ldaPoints = [
  { threshold: 0.50, accuracy: 73, dir: 0.90, approvals: 72, lda: 'Cash-flow data' },
  { threshold: 0.60, accuracy: 76, dir: 0.87, approvals: 68, lda: 'Cash-flow data' },
  { threshold: 0.70, accuracy: 79, dir: 0.84, approvals: 63, lda: 'Cash-flow data' },
  { threshold: 0.50, accuracy: 71, dir: 0.92, approvals: 74, lda: 'Rental history' },
  { threshold: 0.60, accuracy: 74, dir: 0.89, approvals: 70, lda: 'Rental history' },
  { threshold: 0.70, accuracy: 77, dir: 0.85, approvals: 65, lda: 'Rental history' },
];

function interpolate(threshold: number) {
  const lo = paretoPoints.findLast((p) => p.threshold <= threshold) ?? paretoPoints[0];
  const hi = paretoPoints.find((p) => p.threshold >= threshold) ?? paretoPoints[paretoPoints.length - 1];
  if (lo === hi) return lo;
  const t = (threshold - lo.threshold) / (hi.threshold - lo.threshold);
  return {
    threshold,
    accuracy: lo.accuracy + t * (hi.accuracy - lo.accuracy),
    dir: lo.dir + t * (hi.dir - lo.dir),
    approvals: lo.approvals + t * (hi.approvals - lo.approvals),
  };
}

export default function ThresholdSlider() {
  const [threshold, setThreshold] = useState(0.70);
  const current = useMemo(() => interpolate(threshold), [threshold]);
  const passes = current.dir >= 0.8;

  const scatterData = paretoPoints.map((p) => ({ x: p.accuracy, y: p.dir, threshold: p.threshold }));
  const ldaScatter = ldaPoints.map((p) => ({ x: p.accuracy, y: p.dir, lda: p.lda, threshold: p.threshold }));
  const currentPoint = [{ x: current.accuracy, y: current.dir }];

  return (
    <section className="px-8 py-24 border-t border-[#1E2635]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A7B0C0] mb-4">
          Scenario Modelling
        </p>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#F5F7FA] mb-4 max-w-2xl">
          Interactive Fairness–Accuracy Pareto Frontier
        </h2>
        <p className="font-mono text-sm text-[#A7B0C0] mb-10 max-w-xl leading-relaxed">
          Slide the approval threshold to watch DIR and model accuracy trade off in real time.
          LDA alternatives (Rashomon Set) shift the entire frontier outward — more equitable
          and more accurate simultaneously.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Slider + live metrics */}
          <div className="rounded-xl border border-[#1E2635] bg-[#0A0D12] p-6 flex flex-col gap-5">
            <div>
              <label className="font-mono text-xs font-semibold text-[#A7B0C0] uppercase tracking-wider block mb-3">
                Approval threshold
              </label>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[#A7B0C0]">Permissive 0.30</span>
                <span className="font-mono text-[10px] text-[#A7B0C0]">Strict 0.80</span>
              </div>
              <input
                type="range"
                min={0.30}
                max={0.80}
                step={0.01}
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full accent-[#6EA8FE] cursor-pointer"
                style={{ accentColor: passes ? '#6EA8FE' : '#FF5C6C' }}
              />
              <p className="font-mono text-center text-lg font-bold mt-2" style={{ color: passes ? '#6EA8FE' : '#FF5C6C' }}>
                {threshold.toFixed(2)}
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: 'Disparate Impact Ratio',
                  value: current.dir.toFixed(2),
                  sub: current.dir < 0.8 ? '⚠ Below four-fifths rule' : '✓ Passes four-fifths rule',
                  valueColor: current.dir < 0.8 ? 'text-red-400' : 'text-[#6EA8FE]',
                },
                {
                  label: 'Model Accuracy',
                  value: `${current.accuracy.toFixed(0)}%`,
                  sub: 'Precision on held-out set',
                  valueColor: 'text-[#F5F7FA]',
                },
                {
                  label: 'Approval Rate',
                  value: `${current.approvals.toFixed(0)}%`,
                  sub: 'All applicants',
                  valueColor: 'text-[#F2C14E]',
                },
              ].map(({ label, value, sub, valueColor }) => (
                <div key={label} className="p-3 rounded-lg bg-[#06070A] border border-[#1E2635]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#A7B0C0]">{label}</span>
                    <span className={`font-mono text-sm font-bold ${valueColor}`}>{value}</span>
                  </div>
                  <p className="font-mono text-[9px] text-[#A7B0C0] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            <div className={`p-3 rounded-lg border font-mono text-xs leading-relaxed ${
              passes
                ? 'bg-[#6EA8FE]/10 border-[#6EA8FE]/30 text-[#6EA8FE]'
                : 'bg-red-900/20 border-red-800/40 text-red-400'
            }`}>
              {passes
                ? 'DIR ≥ 0.80 · Four-fifths rule satisfied · No mandatory investigation required'
                : 'DIR < 0.80 · Four-fifths rule failure · Requires business necessity documentation or LDA adoption'}
            </div>

            <div className="p-3 rounded-lg bg-[#06070A] border border-[#1E2635]">
              <p className="font-mono text-[10px] text-[#A7B0C0] mb-1 font-semibold">Rashomon Set</p>
              <p className="font-mono text-[10px] text-[#A7B0C0] leading-relaxed">
                Multiple models achieve similar accuracy. Noema searches this set to surface the
                least discriminatory alternative at your current threshold.
              </p>
            </div>
          </div>

          {/* Pareto frontier chart */}
          <div className="lg:col-span-2 rounded-xl border border-[#1E2635] bg-[#0A0D12] p-6">
            <p className="font-mono text-xs font-semibold text-[#A7B0C0] uppercase tracking-wider mb-1">
              Fairness–Accuracy Pareto Frontier
            </p>
            <p className="font-mono text-sm text-[#F5F7FA] font-semibold mb-4">
              LDA alternatives shift the frontier outward — better accuracy and better DIR
            </p>

            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 8, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                  dataKey="x"
                  type="number"
                  domain={[59, 85]}
                  name="Accuracy"
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#A7B0C0' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                  label={{ value: 'Model Accuracy (%)', position: 'insideBottom', offset: -12, fontFamily: 'monospace', fontSize: 9, fill: '#A7B0C0' }}
                />
                <YAxis
                  dataKey="y"
                  type="number"
                  domain={[0.68, 0.97]}
                  name="DIR"
                  tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#A7B0C0' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => v.toFixed(2)}
                  label={{ value: 'DIR', angle: -90, position: 'insideLeft', offset: 16, fontFamily: 'monospace', fontSize: 9, fill: '#A7B0C0' }}
                  width={40}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as { x: number; y: number; threshold?: number; lda?: string };
                    return (
                      <div className="bg-[#06070A] border border-[#1E2635] rounded-lg px-3 py-2">
                        {d.lda && <p className="font-mono text-[10px] text-[#F2C14E] font-semibold mb-1">{d.lda}</p>}
                        <p className="font-mono text-xs text-[#F5F7FA]">Accuracy: {d.x.toFixed(0)}%</p>
                        <p className="font-mono text-xs" style={{ color: d.y >= 0.8 ? '#6EA8FE' : '#FF5C6C' }}>
                          DIR: {d.y.toFixed(2)} {d.y >= 0.8 ? '✓' : '⚠'}
                        </p>
                        {d.threshold !== undefined && (
                          <p className="font-mono text-[10px] text-[#A7B0C0]">Threshold: {d.threshold.toFixed(2)}</p>
                        )}
                      </div>
                    );
                  }}
                />

                {/* four-fifths rule horizontal line */}
                <ReferenceLine y={0.8} stroke="#FF5C6C" strokeDasharray="5 4" strokeWidth={1.5}>
                  <Label value="0.80 four-fifths rule" position="right" fontFamily="monospace" fontSize={8} fill="#FF5C6C" />
                </ReferenceLine>

                {/* Baseline frontier */}
                <Scatter name="Baseline model" data={scatterData} fill="#253858" shape="circle" r={5} opacity={0.7} />

                {/* LDA frontier */}
                <Scatter name="LDA alternatives (Rashomon Set)" data={ldaScatter} fill="#F2C14E" shape="diamond" r={5} opacity={0.85} />

                {/* Current selection */}
                <Scatter
                  name="Your current threshold"
                  data={currentPoint}
                  fill={passes ? '#6EA8FE' : '#FF5C6C'}
                  shape="circle"
                  r={9}
                />
              </ScatterChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap gap-5 mt-2">
              {[
                { color: '#253858', shape: '●', label: 'Baseline model (current data)' },
                { color: '#F2C14E', shape: '◆', label: 'LDA alternatives (Rashomon Set)' },
                { color: passes ? '#6EA8FE' : '#FF5C6C', shape: '●', label: 'Your selected threshold' },
              ].map(({ color, shape, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span style={{ color, fontSize: 14 }}>{shape}</span>
                  <span className="font-mono text-[10px] text-[#A7B0C0]">{label}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 font-mono text-[10px] text-[#A7B0C0] leading-relaxed">
              The Impossibility Theorem (Chouldechova, 2017) constrains how much accuracy and fairness can simultaneously improve
              on a fixed feature set. LDA alternatives from the Rashomon Set circumvent this by changing the feature set itself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
