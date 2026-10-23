import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconTileProps {
  icon: LucideIcon;
  /**
   * A literal `group-hover:animate-*` class (Tailwind has to see the whole
   * string in source to generate it) chosen per icon — a globe turns, a phone
   * tilts, a cloud floats — so each icon has its own small personality.
   */
  hoverAnimation?: string;
  className?: string;
}

/**
 * Icon in a tile whose 1px border is lit by a light that orbits it while the
 * parent `.group` is hovered. The orbiting element is a rotated conic
 * gradient (transform-only animation, paused unless hovered, so idle tiles
 * cost nothing); the opaque inner tile masks everything but the border.
 */
export function IconTile({ icon: Icon, hoverAnimation, className }: IconTileProps) {
  return (
    <span className={cn('relative inline-flex h-14 w-14 overflow-hidden rounded-2xl bg-brand-400/20 p-px', className)}>
      <span
        aria-hidden="true"
        className="absolute -inset-[70%] animate-border-spin opacity-0 transition-opacity duration-300 [animation-play-state:paused] group-hover:opacity-100 group-hover:[animation-play-state:running]"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, transparent 250deg, #b79bff 320deg, #efe6ff 345deg, transparent 360deg)',
        }}
      />
      <span className="relative flex h-full w-full items-center justify-center rounded-[15px] bg-void-elevated">
        <Icon className={cn('h-6 w-6 text-brand-300 transition-colors duration-300 group-hover:text-white', hoverAnimation)} />
      </span>
    </span>
  );
}
