'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface AlertBannerProps {
  dir: number;
  group?: string;
  threshold?: number;
}

export default function AlertBanner({ dir, group = 'Hispanic vs. White', threshold = 0.8 }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dir >= threshold) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-4 px-5 py-4 rounded-2xl border border-red-500/25 bg-red-500/8 mb-5"
          style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.04) 100%)' }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-red-500/15"
          >
            <AlertTriangle size={14} className="text-red-400" />
          </motion.div>

          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs font-semibold text-red-300 mb-0.5">
              Four-Fifths Rule Failure — Immediate Review Required
            </p>
            <p className="font-mono text-[10px] text-red-400/70 leading-relaxed">
              DIR for <span className="font-semibold text-red-300">{group}</span> is{' '}
              <span className="font-bold text-red-300">{dir.toFixed(2)}</span>, below the{' '}
              <span className="font-bold text-red-300">0.80</span> EEOC Uniform Guidelines threshold.
              Business necessity documentation or Less Discriminatory Alternative adoption required.
            </p>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 p-1 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            aria-label="Dismiss alert"
          >
            <X size={12} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
