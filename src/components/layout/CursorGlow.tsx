import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * A soft light that trails the cursor — never a native-cursor replacement.
 * An earlier version of this codebase hid the OS cursor entirely and drew a
 * fully custom one; that was cut as an accessibility/restraint anti-pattern
 * none of Linear/Vercel/Stripe/Raycast actually ship. This is additive only:
 * always `pointer-events-none`, never touches the real cursor, gated on
 * `(pointer: fine)` so it never appears on touch devices, and disabled under
 * prefers-reduced-motion.
 */
export function CursorGlow() {
  const reduceMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springConfig = { stiffness: 200, damping: 30, mass: 0.5 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setExpanded(!!target?.closest('a, button, [role="button"], input, textarea, select'));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled, reduceMotion, x, y]);

  if (!enabled || reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0) 70%)',
      }}
      animate={{
        width: expanded ? 260 : 170,
        height: expanded ? 260 : 170,
        opacity: expanded ? 0.9 : 0.55,
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    />
  );
}
