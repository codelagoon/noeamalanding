'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number;
  decimalPlaces?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  decimalPlaces = 0,
  className,
  prefix = '',
  suffix = '',
}: NumberTickerProps) {
  const [displayed, setDisplayed] = useState(direction === 'down' ? value : 0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const start = direction === 'down' ? value : 0;
    const end = direction === 'down' ? 0 : value;
    const duration = 1800;
    let startTime: number | null = null;

    const timer = setTimeout(() => {
      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        setDisplayed(start + (end - start) * eased);
        if (progress < 1) {
          raf.current = requestAnimationFrame(step);
        }
      }
      raf.current = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf.current);
    };
  }, [value, direction, delay]);

  return (
    <span className={cn('tabular-nums', className)}>
      {prefix}
      {displayed.toFixed(decimalPlaces)}
      {suffix}
    </span>
  );
}
