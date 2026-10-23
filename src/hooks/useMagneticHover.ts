import { useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const SPRING = { stiffness: 300, damping: 25 };
const PULL = 0.35;

/**
 * Magnetic-pull physics: the element drifts a fraction of the way toward the
 * cursor and springs back on leave. Returns motion values (applied as
 * `style={{ x, y }}`), so tracking never triggers a React render.
 */
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
