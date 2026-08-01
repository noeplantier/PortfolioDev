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
}

export function Card({ children, className, tilt = false, hoverLift = true }: CardProps) {
  const reduceMotion = usePrefersReducedMotion();
  const tiltEnabled = tilt && !reduceMotion;

  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-80, 80], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mx, [-80, 80], [-6, 6]), { stiffness: 200, damping: 25 });

  const onMouseMove = (e: ReactMouseEvent) => {
    if (!tiltEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
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
        'group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.15]',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
