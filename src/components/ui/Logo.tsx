import { cn } from '@/lib/utils';

interface LogoMarkProps {
  className?: string;
}

/**
 * Hand-built vector recreation of the Plantiers mark (ribbon "P" + leaf
 * sprout) — a flat-gradient interpretation of the source glossy 3D logo,
 * closer to how Vercel/Linear/Stripe treat their own marks. Swap this file
 * for the real hi-res source asset when available; every consumer imports
 * from here, so the swap is a one-file change.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 100 108" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('h-8 w-auto', className)}>
      <defs>
        <linearGradient id="plantiers-ribbon" x1="20" y1="24" x2="78" y2="98" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B79BFF" />
          <stop offset="45%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
        <linearGradient id="plantiers-leaf" x1="14" y1="2" x2="44" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
      </defs>
      <path d="M33 37C33 31 35 27 37 23" stroke="url(#plantiers-leaf)" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 34C24 30 16 24 13 14C23 16 30 22 32 34Z" fill="url(#plantiers-leaf)" />
      <path d="M32 34C38 24 44 14 44 3C34 8 30 20 32 34Z" fill="url(#plantiers-leaf)" />
      <path
        d="M32 100V34C32 28 40 24 50 24C62 24 70 32 70 42C70 52 62 58 50 58H34"
        stroke="url(#plantiers-ribbon)"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LogoProps {
  variant?: 'mark' | 'full';
  className?: string;
}

/** Full lockup: mark + "PLANTIERS / SOFTWARE ENGINEERING" wordmark, matching the LinkedIn banner treatment. */
export function Logo({ variant = 'full', className }: LogoProps) {
  if (variant === 'mark') return <LogoMark className={className} />;

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark className="h-8 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-white">PLANTIERS</span>
        <span className="font-mono text-[9px] tracking-[0.25em] text-brand-300/80">SOFTWARE ENGINEERING</span>
      </span>
    </span>
  );
}
