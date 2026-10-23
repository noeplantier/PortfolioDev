import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import type { HTMLMotionProps, Variants } from 'framer-motion';
import { springSoft, viewportOnce } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*  WordReveal — heading text that resolves word by word (blur → focus)        */
/* -------------------------------------------------------------------------- */

const wordPlain: Variants = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: springSoft },
};

/** Gradient words never animate `filter` — see the note on `.gradient-word` in index.css. */
const wordAccent: Variants = {
  hidden: { opacity: 0, y: '0.45em' },
  visible: { opacity: 1, y: 0, transition: springSoft },
};

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p';
const MOTION_TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const;

interface WordRevealProps {
  text: string;
  as?: HeadingTag;
  /** A contiguous phrase inside `text` to render as the brand gradient. */
  accent?: string;
  className?: string;
  /** Seconds between each word. */
  step?: number;
  delay?: number;
  /** Animate on mount instead of waiting for the viewport (hero use). */
  immediate?: boolean;
}

/**
 * Words are `inline-block` spans separated by real text-node spaces, so the
 * element's text content is always "Four disciplines. One team." (copy/paste,
 * search snippets and screen readers all see a normal sentence) — never the
 * "FourdisciplinesOne" run-together a layout-only line break would give.
 * No `overflow: hidden` mask is involved anywhere, so nothing can shave
 * descenders off mid-animation.
 */
export function WordReveal({
  text,
  as = 'h2',
  accent,
  className,
  step = 0.055,
  delay = 0,
  immediate = false,
}: WordRevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  const words = useMemo(() => text.split(' '), [text]);

  const accentStart = useMemo(() => {
    if (!accent) return -1;
    const accentWords = accent.split(' ');
    return words.findIndex((_, i) => accentWords.every((w, j) => words[i + j] === w));
  }, [accent, words]);
  const accentLength = accent ? accent.split(' ').length : 0;

  const Tag = MOTION_TAGS[as] as unknown as ComponentType<HTMLMotionProps<'h2'>>;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: step, delayChildren: delay } },
  };

  const trigger = immediate
    ? { initial: 'hidden', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: viewportOnce };

  return (
    <Tag variants={container} {...(reduceMotion ? { initial: 'visible', animate: 'visible' } : trigger)} className={className}>
      {words.map((word, i) => {
        const isAccent = accentStart >= 0 && i >= accentStart && i < accentStart + accentLength;
        return (
          <span key={`${word}-${i}`}>
            {i > 0 && ' '}
            <motion.span
              variants={reduceMotion ? undefined : isAccent ? wordAccent : wordPlain}
              data-text={isAccent ? word : undefined}
              className={cn('inline-block', isAccent && 'gradient-word')}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*  ScrambleText — "decode" effect for monospace labels                        */
/* -------------------------------------------------------------------------- */

const GLYPHS = '01<>/\\[]{}=+*#%&$';

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Total decode time in ms. */
  duration?: number;
  /** Re-run the decode each time the pointer enters (interactive labels). */
  replayOnHover?: boolean;
}

/**
 * Only for monospace text: every glyph has the same advance width, so the
 * label never reflows while it scrambles. Screen readers get the real text
 * from a visually-hidden sibling; the scrambling copy is aria-hidden.
 */
export function ScrambleText({ text, className, duration = 900, replayOnHover = false }: ScrambleTextProps) {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  const run = () => {
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    let last = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      if (now - last > 34 || progress === 1) {
        last = now;
        const revealed = Math.floor(progress * text.length);
        setDisplay(
          text
            .split('')
            .map((ch, i) => (ch === ' ' || i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(''),
        );
      }
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (reduceMotion || !inView) return;
    run();
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, text]);

  return (
    <span
      ref={ref}
      className={className}
      onPointerEnter={replayOnHover && !reduceMotion ? run : undefined}
    >
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  RotatingWord — a headline noun that cycles once, then settles              */
/* -------------------------------------------------------------------------- */

interface RotatingWordProps {
  words: string[];
  /** ms between swaps. */
  interval?: number;
  className?: string;
}

/**
 * Cycles through `words` once and stops on the last one. Auto-updating text
 * that runs past five seconds with no way to pause it fails WCAG 2.2.2, so
 * the whole sequence is capped (~4–5s at the default interval) rather than
 * looping forever.
 *
 * Meant for a monospace face: the box reserves `max(word length)` in `ch`
 * units, which is exact only when every glyph has the same advance. That
 * keeps the sentence around it from reflowing on every swap, without
 * rendering hidden copies of the other words into the DOM (which would
 * pollute the text a crawler or screen reader extracts).
 */
export function RotatingWord({ words, interval = 1100, className }: RotatingWordProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(reduceMotion ? words.length - 1 : 0);
  const widest = Math.max(...words.map((w) => w.length));

  useEffect(() => {
    if (reduceMotion || index >= words.length - 1) return;
    const id = window.setTimeout(() => setIndex((i) => i + 1), index === 0 ? interval + 900 : interval);
    return () => window.clearTimeout(id);
  }, [index, interval, reduceMotion, words.length]);

  return (
    <span
      className={cn('relative inline-block whitespace-nowrap text-left align-baseline', className)}
      style={{ minWidth: `${widest}ch` }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={reduceMotion ? false : { opacity: 0, y: '60%', filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reduceMotion ? undefined : { opacity: 0, y: '-60%', filter: 'blur(6px)' }}
          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
