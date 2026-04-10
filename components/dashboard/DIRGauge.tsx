'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface DIRGaugeProps {
  value: number;
  label?: string;
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const sx = cx + r * Math.cos(toRad(startDeg));
  const sy = cy + r * Math.sin(toRad(startDeg));
  const ex = cx + r * Math.cos(toRad(endDeg));
  const ey = cy + r * Math.sin(toRad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

export default function DIRGauge({ value, label }: DIRGaugeProps) {
  const clamp = Math.max(0, Math.min(1, value));
  const prefersReduced = useReducedMotion();

  // Animate arc sweep from 0 → clamp
  const [displayVal, setDisplayVal] = useState(prefersReduced ? clamp : 0);
  const raf = useRef(0);
  useEffect(() => {
    if (prefersReduced) { setDisplayVal(clamp); return; }
    const duration = 1400;
    const start = performance.now();
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayVal(clamp * ease);
      if (t < 1) raf.current = requestAnimationFrame(step);
    }
    const timer = setTimeout(() => { raf.current = requestAnimationFrame(step); }, 300);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf.current); };
  }, [clamp, prefersReduced]);

  const CX = 100; const CY = 105; const R = 74;
  const START_DEG = -225; // 225° from 3 o'clock = bottom-left
  const SWEEP = 270;

  const endDeg = START_DEG + displayVal * SWEEP;
  const thresholdDeg = START_DEG + 0.8 * SWEEP;

  // needle tip position
  const needleRad = ((endDeg) * Math.PI) / 180;
  const nx = CX + R * Math.cos(needleRad);
  const ny = CY + R * Math.sin(needleRad);

  const passes = clamp >= 0.8;
  const arcColor = clamp < 0.8 ? '#ef4444' : clamp < 0.9 ? '#f59e0b' : '#4A7C6F';

  // 0.8 tick position
  const tickRad = (thresholdDeg * Math.PI) / 180;
  const t1x = CX + (R - 10) * Math.cos(tickRad);
  const t1y = CY + (R - 10) * Math.sin(tickRad);
  const t2x = CX + (R + 10) * Math.cos(tickRad);
  const t2y = CY + (R + 10) * Math.sin(tickRad);
  const tlx = CX + (R + 22) * Math.cos(tickRad);
  const tly = CY + (R + 22) * Math.sin(tickRad);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center w-full"
    >
      <svg viewBox="0 0 200 160" className="w-full max-w-[240px]">
        {/* glow filter */}
        <defs>
          <filter id="glow-arc">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-needle">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* track */}
        <path d={arcPath(CX, CY, R, START_DEG, START_DEG + SWEEP)} fill="none" stroke="#1E2530" strokeWidth="10" strokeLinecap="round" />

        {/* danger zone 0→0.8 */}
        <path d={arcPath(CX, CY, R, START_DEG, thresholdDeg)} fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" strokeOpacity="0.15" />

        {/* filled arc */}
        {displayVal > 0.005 && (
          <path
            d={arcPath(CX, CY, R, START_DEG, endDeg)}
            fill="none"
            stroke={arcColor}
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#glow-arc)"
          />
        )}

        {/* threshold tick */}
        <line x1={t1x} y1={t1y} x2={t2x} y2={t2y} stroke="#ef4444" strokeWidth="2" strokeOpacity="0.7" />
        <text x={tlx} y={tly + 3} fill="#ef4444" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="600" opacity="0.8">0.80</text>

        {/* needle */}
        <line x1={CX} y1={CY} x2={nx} y2={ny} stroke={arcColor} strokeWidth="2.5" strokeLinecap="round" filter="url(#glow-needle)" />
        <circle cx={CX} cy={CY} r="5" fill={arcColor} filter="url(#glow-needle)" />
        <circle cx={CX} cy={CY} r="3" fill="#0D1117" />

        {/* centre readout */}
        <text x={CX} y={CY + 26} textAnchor="middle" fill={arcColor} fontSize="24" fontFamily="monospace" fontWeight="700">
          {displayVal.toFixed(2)}
        </text>
        <text x={CX} y={CY + 40} textAnchor="middle" fill="#3A4A5A" fontSize="8" fontFamily="monospace" letterSpacing="2">
          DISP. IMPACT RATIO
        </text>

        {/* scale ends */}
        <text x="16" y="148" fill="#2A3A4A" fontSize="8" fontFamily="monospace">0.0</text>
        <text x="166" y="148" fill="#2A3A4A" fontSize="8" fontFamily="monospace">1.0</text>
      </svg>

      {/* status pill */}
      <motion.div
        key={passes ? 'pass' : 'fail'}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`mt-1 flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs font-semibold ${
          passes
            ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
            : 'bg-red-500/10 border-red-500/25 text-red-400'
        }`}
      >
        {!passes && (
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"
          />
        )}
        {passes
          ? `✓ DIR ${clamp.toFixed(2)} — four-fifths rule satisfied`
          : `DIR ${clamp.toFixed(2)} — four-fifths rule failure`}
      </motion.div>

      {label && <p className="mt-1.5 font-mono text-[10px] text-[#3A4A5A] text-center">{label}</p>}
    </motion.div>
  );
}
