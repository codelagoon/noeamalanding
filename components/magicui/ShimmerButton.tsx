'use client';

import { cn } from '@/lib/utils';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ShimmerButton({
  shimmerColor = '#6EA8FE',
  shimmerSize = '0.08em',
  shimmerDuration = '3s',
  borderRadius = '4px',
  background = '#06070A',
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          '--spread': '90deg',
          '--shimmer-color': shimmerColor,
          '--radius': borderRadius,
          '--speed': shimmerDuration,
          '--cut': shimmerSize,
          '--bg': background,
        } as React.CSSProperties
      }
      className={cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 [background:var(--bg)] [border-radius:var(--radius)]',
        'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
        className,
      )}
      {...props}
    >
      {/* shimmer layer */}
      <div
        className={cn(
          'absolute inset-0 overflow-hidden [border-radius:var(--radius)]',
        )}
      >
        <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--shimmer-color)_360deg)]" />
      </div>
      {/* inner background mask */}
      <div className="absolute inset-[var(--cut)] rounded-[calc(var(--radius)-var(--cut))] [background:var(--bg)]" />
      <span className="relative z-10 font-mono text-sm font-semibold text-[#F5F7FA]">
        {children}
      </span>
    </button>
  );
}
