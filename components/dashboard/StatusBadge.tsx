'use client';

import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: 'pass' | 'warning' | 'critical' | 'info';
  label?: string;
  pulse?: boolean;
}

const config = {
  pass:     { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400', default: 'Pass' },
  warning:  { bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   text: 'text-amber-400',   dot: 'bg-amber-400',   default: 'Review' },
  critical: { bg: 'bg-red-500/10',     border: 'border-red-500/20',     text: 'text-red-400',     dot: 'bg-red-500',     default: 'Critical' },
  info:     { bg: 'bg-[#6366F1]/10',   border: 'border-[#6366F1]/20',   text: 'text-[#6366F1]',  dot: 'bg-[#6366F1]',  default: 'Info' },
};

export default function StatusBadge({ status, label, pulse = false }: StatusBadgeProps) {
  const c = config[status];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] font-semibold ${c.bg} ${c.border} ${c.text}`}>
      {pulse ? (
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className={`h-1.5 w-1.5 rounded-full ${c.dot}`}
        />
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      )}
      {label ?? c.default}
    </div>
  );
}
