'use client';

import { cn } from '@/lib/utils';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export default function BorderBeam({
  className,
  size = 200,
  duration = 8,
  colorFrom = '#6EA8FE',
  colorTo = '#F2C14E',
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          '--size': size,
          '--duration': duration,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--size)*0.01px)_solid_transparent]',
        '[background:linear-gradient(var(--bg,#0A0D12),var(--bg,#0A0D12))_padding-box,linear-gradient(calc(var(--angle,0)*1deg),var(--color-from),var(--color-to))_border-box]',
        '[animation:border-spin_calc(var(--duration)*1s)_linear_infinite] [animation-delay:var(--delay)]',
        className,
      )}
    />
  );
}
