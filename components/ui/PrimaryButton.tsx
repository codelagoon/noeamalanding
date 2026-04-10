import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const base = 'inline-flex items-center justify-center gap-2 font-mono font-semibold tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  solid:   'bg-accent text-[#06070A] hover:bg-[#5B95E8] active:bg-[#4882D4]',
  outline: 'border border-[#1E2635] text-[#A7B0C0] hover:border-accent/40 hover:text-[#F5F7FA] bg-transparent',
  ghost:   'text-[#A7B0C0] hover:text-[#F5F7FA] hover:bg-white/4 bg-transparent',
};

const sizes = {
  sm: 'text-[11px] px-4 py-2 rounded-[5px]',
  md: 'text-xs px-5 py-2.5 rounded-[6px]',
  lg: 'text-sm px-7 py-3.5 rounded-[6px]',
};

export default function PrimaryButton({ variant = 'solid', size = 'md', className, children, ...props }: PrimaryButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
