import { cn } from '@/lib/utils';

interface GlowOrbProps {
  className?: string;
  color?: 'brand' | 'leaf';
}

/**
 * The ambient background blur blob used throughout every section. The old
 * codebase copy-pasted a slightly different version of this div into every
 * component; this is the one shared version.
 */
export function GlowOrb({ className, color = 'brand' }: GlowOrbProps) {
  const bg = color === 'brand' ? 'bg-brand-700/20' : 'bg-leaf-500/10';
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute rounded-full blur-[110px]', bg, className)}
    />
  );
}
