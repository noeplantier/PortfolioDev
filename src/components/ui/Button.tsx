import type { MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMagneticHover } from '@/hooks/useMagneticHover';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

export interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  icon?: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[background-color,background-position,border-color,box-shadow,opacity,transform] duration-300 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none';

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm',
};

const variants: Record<Variant, string> = {
  primary:
    'text-white bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 bg-[length:200%_auto] hover:bg-[position:100%_center] hover:shadow-glow',
  secondary:
    'text-white/90 bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/20 backdrop-blur-sm',
  ghost: 'text-white/60 hover:text-white',
};

/**
 * Primary interactive control. Set `magnetic` for hero/CTA-weight buttons
 * only — it's a deliberate accent, not a default.
 *
 * Hover feedback is layered and cheap: a soft light that follows the cursor
 * across the surface (CSS variables set on the node, never React state), a
 * one-shot diagonal sheen on primary buttons (transform-only), and an
 * `active:` press-down so a click always answers immediately.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  icon,
  className,
  href,
  onClick,
  ...props
}: ButtonProps) {
  const reduceMotion = usePrefersReducedMotion();
  const magnet = useMagneticHover<HTMLDivElement>(!magnetic || reduceMotion);

  const classes = cn(base, sizes[size], variants[variant], className);

  const trackLight = (e: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--bx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--by', `${e.clientY - rect.top}px`);
  };

  const content = (
    <>
      {variant === 'primary' && (
        <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60" />
      )}
      {variant !== 'ghost' && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <span
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                variant === 'primary'
                  ? 'radial-gradient(110px circle at var(--bx, 50%) var(--by, 50%), rgba(255,255,255,0.28), transparent 70%)'
                  : 'radial-gradient(120px circle at var(--bx, 50%) var(--by, 50%), rgba(167,139,250,0.2), transparent 70%)',
            }}
          />
          {variant === 'primary' && !reduceMotion && (
            <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-transform duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100" />
          )}
        </span>
      )}
      <span className="relative flex items-center gap-2">
        {children}
        {icon}
      </span>
    </>
  );

  const element = href ? (
    <a href={href} className={classes} onClick={onClick} onMouseMove={trackLight} {...props}>
      {content}
    </a>
  ) : (
    <button className={classes} onClick={onClick} onMouseMove={trackLight} {...props}>
      {content}
    </button>
  );

  if (!magnetic) return element;

  return (
    <div
      ref={magnet.ref}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      className="relative inline-block"
    >
      <motion.div style={{ x: magnet.xSpring, y: magnet.ySpring }}>{element}</motion.div>
    </div>
  );
}
