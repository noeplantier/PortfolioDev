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

/**
 * Same reveal, no blur filter. Animating `filter` on an ancestor of a
 * `background-clip: text` gradient element is a known WebKit/Chrome
 * compositing trap — the browser can lose track of the clip layer mid
 * transition and render the glyphs corrupted (missing chunks, letters
 * fused together) until the next repaint. Use this for any element that
 * is, or wraps, gradient/clipped text; use `fadeUp` everywhere else.
 */
export const fadeUpPlain: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: springSoft },
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
