import { motion, useScroll, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Reading-progress bar pinned to the top edge. Driven by a motion value
 * (`scaleX` on a transform), so scrolling never re-renders React and the bar
 * animates on the compositor.
 */
export function ScrollProgress() {
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduceMotion ? scrollYProgress : smooth }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand-500 via-brand-300 to-leaf-400 shadow-[0_0_12px_rgba(124,58,237,0.7)]"
    />
  );
}
