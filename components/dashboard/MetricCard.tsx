'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  status?: 'pass' | 'warning' | 'critical';
  icon?: React.ReactNode;
  animate?: boolean;
  delay?: number;
}

const statusConfig = {
  pass:     { pill: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', label: 'Pass',    dot: 'bg-emerald-500' },
  warning:  { pill: 'bg-amber-500/10  text-amber-400  border-amber-500/20',    label: 'Review',  dot: 'bg-amber-400' },
  critical: { pill: 'bg-red-500/10    text-red-400    border-red-500/20',      label: 'Critical', dot: 'bg-red-500' },
};

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [val, setVal] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now();
      function step(now: number) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setVal(target * ease);
        if (t < 1) raf.current = requestAnimationFrame(step);
      }
      raf.current = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf.current); };
  }, [target, duration, delay]);
  return val;
}

export default function MetricCard({ label, value, subtext, status, icon, animate = true, delay = 0 }: MetricCardProps) {
  const isNum = typeof value === 'number';
  const counted = useCountUp(isNum && animate ? value : 0, 1000, delay * 1000);
  const displayed = isNum && animate ? Math.round(counted) : value;
  const cfg = status ? statusConfig[status] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      className="relative overflow-hidden rounded-2xl border border-[#1E2635] bg-[#0A0D12] p-5 flex flex-col gap-3"
    >
      {/* subtle gradient bleed */}
      {status === 'critical' && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(ellipse at top left, rgba(239,68,68,0.06) 0%, transparent 60%)' }} />
      )}
      {status === 'pass' && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(ellipse at top left, rgba(16,185,129,0.07) 0%, transparent 60%)' }} />
      )}

      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-semibold text-[#6E788A] uppercase tracking-widest">{label}</p>
        {icon && <span className="text-[#6E788A]">{icon}</span>}
      </div>

      <p className="font-mono text-3xl font-bold text-white leading-none tabular-nums">
        {displayed}
      </p>

      <div className="flex items-center justify-between gap-2">
        {subtext && <p className="font-mono text-[10px] text-[#6E788A] leading-tight">{subtext}</p>}
        {cfg && (
          <div className={`ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10px] font-mono font-semibold shrink-0 ${cfg.pill}`}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}
            />
            {cfg.label}
          </div>
        )}
      </div>
    </motion.div>
  );
}
