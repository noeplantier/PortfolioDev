import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMagneticHover } from './MagneticButton';
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
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none';

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

/** Primary interactive control. Set `magnetic` for hero/CTA-weight buttons only — it's a deliberate accent, not a default. */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  icon,
  className,
  href,
  ...props
}: ButtonProps) {
  const reduceMotion = usePrefersReducedMotion();
  const magnet = useMagneticHover<HTMLDivElement>(!magnetic || reduceMotion);

  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      {variant === 'primary' && (
        <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60" />
      )}
      <span className="relative flex items-center gap-2">
        {children}
        {icon}
      </span>
    </>
  );

  const element = href ? (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  ) : (
    <button className={classes} {...props}>
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
