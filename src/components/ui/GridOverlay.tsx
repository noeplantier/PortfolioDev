import { cn } from '@/lib/utils';

/** Faint background grid — a quiet texture cue, never a decorative distraction. */
export function GridOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 z-0 opacity-[0.025]', className)}
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />
  );
}
