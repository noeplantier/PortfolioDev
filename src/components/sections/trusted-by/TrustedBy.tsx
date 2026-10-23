import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { TechIcon } from '@/components/ui/TechIcon';
import { Container } from '@/components/ui/Container';
import { ScrambleText } from '@/components/ui/AnimatedText';
import { techStack } from '@/data/tech-stack';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { fadeUp, viewportOnce } from '@/lib/motion';

/** Wrap `v` into [min, max) — keeps the marquee offset inside one loop period. */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const COPIES = 4;

/**
 * A marquee that responds to the reader: it drifts at a calm base speed, and
 * scrolling the page pushes it faster in the direction of travel (and
 * reverses it when scrolling back up). Position lives in a motion value
 * updated from one animation frame callback, so nothing re-renders; the loop
 * is skipped entirely while the strip is off-screen.
 *
 * Four copies of the list, translating over a quarter of the track, keep the
 * strip seamless even on ultra-wide viewports where half a list wouldn't
 * cover the screen.
 */
function VelocityMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const baseX = useMotionValue(0);
  const direction = useRef(-1);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smoothVelocity, [-3000, 0, 3000], [-5, 0, 5], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);

  // Calm base drift, in % of the whole track per second (~150px/s at desktop widths).
  const BASE_SPEED = 1.6;

  useAnimationFrame((_, delta) => {
    if (!inView) return;
    const factor = boost.get();
    if (factor < -0.05) direction.current = 1;
    else if (factor > 0.05) direction.current = -1;
    baseX.set(baseX.get() + direction.current * BASE_SPEED * (delta / 1000) * (1 + Math.abs(factor)));
  });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-void to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-void to-transparent sm:w-24" />

      <motion.div className="flex w-max items-center" style={{ x }}>
        {Array.from({ length: COPIES }).map((_, copy) => (
          <ul
            key={copy}
            // Only the first copy is exposed to assistive tech; the rest exist purely for the loop.
            aria-hidden={copy > 0}
            className="flex shrink-0 items-center gap-14 pr-14"
          >
            {techStack.map((name) => (
              <li
                key={name}
                className="group flex shrink-0 items-center gap-2.5 text-white/60 transition-colors duration-300 hover:text-white"
              >
                <TechIcon
                  name={name}
                  className="h-5 w-5 transition-[transform,filter,color] duration-300 group-hover:scale-125 group-hover:-rotate-6 group-hover:text-brand-300 group-hover:drop-shadow-[0_0_10px_rgba(167,139,250,0.8)]"
                />
                <span className="whitespace-nowrap text-sm">{name}</span>
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
}

export function TrustedBy() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="stack" className="relative border-y border-white/[0.06] bg-white/[0.015] py-14">
      <Container>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/60"
        >
          <ScrambleText text="THE STACK BEHIND EVERY ENGAGEMENT" />
        </motion.p>
      </Container>

      {reduceMotion ? (
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6">
          {techStack.map((name) => (
            <li key={name} className="flex items-center gap-2.5 text-white/60">
              <TechIcon name={name} className="h-5 w-5" />
              <span className="text-sm">{name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <VelocityMarquee />
      )}
    </section>
  );
}
