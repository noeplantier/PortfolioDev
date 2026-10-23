import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ScrambleText } from '@/components/ui/AnimatedText';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

const STATEMENT =
  "We don't just build websites. We engineer intelligent digital products — architected to scale, instrumented to learn, and ready for AI.";
const ACCENT = 'intelligent digital products';

interface ScrollWordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  accent: boolean;
  reduceMotion: boolean;
}

function ScrollWord({ word, index, total, progress, accent, reduceMotion }: ScrollWordProps) {
  // Each word owns an equal slice of the scroll range and fades 0.4 → 1 across it.
  // The floor is 0.4, not lower: unlit words are still text a reader can see, and below
  // ~0.35 white-on-void drops under the 3:1 large-text contrast minimum (WCAG 1.4.3).
  const start = index / total;
  const end = Math.min((index + 1.6) / total, 1);
  const opacity = useTransform(progress, [start, end], [0.4, 1]);

  return (
    <motion.span
      style={reduceMotion ? undefined : { opacity }}
      className={cn(accent && 'gradient-word')}
      data-text={accent ? word : undefined}
    >
      {word}
    </motion.span>
  );
}

/**
 * A scroll-linked statement: the words light up one by one as the paragraph
 * travels up the viewport, so reading and scrolling become the same gesture.
 * The scroll never hijacked — it's a pure read of scroll progress through the
 * element's own box, rendered as per-word opacity on the compositor. Under
 * reduced motion the whole sentence is simply fully visible.
 */
export function Manifesto() {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });

  const words = STATEMENT.split(' ');
  const accentWords = ACCENT.split(' ');
  const accentStart = words.findIndex((_, i) => accentWords.every((w, j) => words[i + j] === w));

  return (
    <section id="manifesto" className="relative py-28 sm:py-36">
      <Container size="narrow" className="text-center">
        <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-brand-400">
          <ScrambleText text="MANIFESTO" />
        </p>
        <p
          ref={ref}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-[1.25] lg:text-5xl lg:leading-[1.2] leading-[1.25]"
        >
          {words.map((word, i) => (
            <span key={`${word}-${i}`}>
              {i > 0 && ' '}
              <ScrollWord
                word={word}
                index={i}
                total={words.length}
                progress={scrollYProgress}
                reduceMotion={reduceMotion}
                accent={accentStart >= 0 && i >= accentStart && i < accentStart + accentWords.length}
              />
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}
