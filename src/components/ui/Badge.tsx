import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ children, className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70',
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-leaf-400" />
        </span>
      )}
      {children}
    </span>
  );
}
