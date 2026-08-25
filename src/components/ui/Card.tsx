import { useRef } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Subtle mouse-driven 3D tilt — used sparingly (portfolio/hero cards), not the default. */
  tilt?: boolean;
  hoverLift?: boolean;
  /** Soft light that follows the cursor across the card surface. On by default — this is the shared "cards feel alive" signature, not a special case. */
  glow?: boolean;
}

export function Card({ children, className, tilt = false, hoverLift = true, glow = true }: CardProps) {
  const reduceMotion = usePrefersReducedMotion();
  const tiltEnabled = tilt && !reduceMotion;
  const glowEnabled = glow && !reduceMotion;

  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-80, 80], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mx, [-80, 80], [-6, 6]), { stiffness: 200, damping: 25 });

  const onMouseMove = (e: ReactMouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (tiltEnabled) {
      mx.set(e.clientX - rect.left - rect.width / 2);
      my.set(e.clientY - rect.top - rect.height / 2);
    }
    if (glowEnabled) {
      // CSS custom properties, not React state — the glow repaints on every
      // mousemove and a card grid can have a dozen of these on screen at
      // once, so this deliberately never triggers a re-render.
      ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltEnabled ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 } : undefined}
      whileHover={hoverLift && !reduceMotion ? { y: -4 } : undefined}
      className={cn(
        // `isolate` pins down a real stacking context regardless of whether Framer
        // Motion happens to have a transform applied at this instant, so the glow's
        // negative z-index is guaranteed to stay under `children` — deliberately NOT
        // wrapping `children` in an extra div to get that ordering, since several call
        // sites (Portfolio, Testimonials) pass `flex h-full flex-col` and rely on their
        // children being direct flex participants.
        //
        // backdrop-blur-sm rather than -xl: this component renders many-at-once (every
        // Service/Portfolio card), and backdrop-filter is one of the more expensive things
        // a browser composites — a lighter blur is nearly as convincing here and much cheaper
        // multiplied across a whole grid.
        'group isolate relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.15]',
        className,
      )}
    >
      {glowEnabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(124,58,237,0.13), transparent 65%)',
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
