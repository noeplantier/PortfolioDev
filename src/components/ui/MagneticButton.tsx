import { useRef } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const SPRING = { stiffness: 300, damping: 25 };
const PULL = 0.35;

/** Shared magnetic-pull physics, reused directly by Button and standalone here for anything else. */
export function useMagneticHover<T extends HTMLElement>(disabled = false) {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, SPRING);
  const ySpring = useSpring(y, SPRING);

  const onMouseMove = (e: ReactMouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * PULL);
    y.set((e.clientY - rect.top - rect.height / 2) * PULL);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, xSpring, ySpring, onMouseMove, onMouseLeave };
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

/** Wraps arbitrary content with a subtle cursor-following pull. Disabled under prefers-reduced-motion. */
export function MagneticButton({ children, className }: MagneticButtonProps) {
  const reduceMotion = usePrefersReducedMotion();
  const { ref, xSpring, ySpring, onMouseMove, onMouseLeave } = useMagneticHover<HTMLDivElement>(reduceMotion);

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={cn('relative inline-block', className)}>
      <motion.div style={{ x: xSpring, y: ySpring }}>{children}</motion.div>
    </div>
  );
}
