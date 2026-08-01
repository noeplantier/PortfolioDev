import type { Transition, Variants } from 'framer-motion';

/**
 * Shared Framer Motion primitives. The old codebase redefined near-identical
 * fadeUp/fadeIn/stagger objects in five different section files — this is
 * the single source going forward.
 */

export const springSnappy: Transition = { type: 'spring', stiffness: 300, damping: 25 };
export const springSoft: Transition = { type: 'spring', stiffness: 60, damping: 18 };
export const springGentle: Transition = { type: 'spring', stiffness: 80, damping: 20 };

export const viewportOnce = { once: true, margin: '-80px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: springSoft },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: springGentle },
};

export function stagger(staggerChildren = 0.08, delayChildren = 0.1): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
  };
}

/** Whole-section reveal-on-scroll, used to wrap each <Section>. */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
