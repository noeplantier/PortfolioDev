import { cn } from '@/lib/utils';
import logoMarkSrc from '@/assets/logo-mark.png';

interface LogoMarkProps {
  className?: string;
}

/** The real Plantiers mark (ribbon "P" + leaf sprout), background-removed from the source render. */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <img
      src={logoMarkSrc}
      alt="Plantiers"
      className={cn('h-8 w-auto object-contain', className)}
      style={{ aspectRatio: '200 / 280' }}
    />
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
      <LogoMark className="h-9 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-white">PLANTIERS</span>
        <span className="font-mono text-[9px] tracking-[0.25em] text-brand-300/80">SOFTWARE ENGINEERING</span>
      </span>
    </span>
  );
}
