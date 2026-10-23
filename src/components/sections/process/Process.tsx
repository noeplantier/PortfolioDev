import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { processSteps } from '@/data/process';
import type { ProcessStep as ProcessStepData } from '@/data/process';

interface StepProps {
  step: ProcessStepData;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}

function ProcessStep({ step, index, total, progress, reduceMotion }: StepProps) {
  // Node i is "reached" when scroll progress hits i/(total-1); the connector to
  // the next node fills across the span between the two thresholds.
  const reachedAt = index / (total - 1);
  const nextAt = (index + 1) / (total - 1);
  const activation = useTransform(progress, [Math.max(reachedAt - 0.07, 0), reachedAt], [0, 1]);
  const segment = useTransform(progress, [reachedAt, nextAt], [0, 1]);
  // Floor of 0.75 (not lower): text dimmed below ~0.7 falls under the 4.5:1 minimum for body-size text on the void.
  const textOpacity = useTransform(activation, [0, 1], [0.75, 1]);
  const nodeScale = useTransform(activation, [0, 1], [0.6, 1]);
  const isLast = index === total - 1;

  return (
    <li className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
      {!isLast && (
        <>
          {/* One track per connector (vertical below lg, horizontal at lg) so it
              stays correct however tall each step's copy happens to be. */}
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 h-[calc(100%+2.5rem)] w-px bg-white/10 lg:left-1/2 lg:h-px lg:w-[calc(100%+1.5rem)]"
          />
          <motion.span
            aria-hidden="true"
            style={reduceMotion ? { scaleY: 1 } : { scaleY: segment }}
            className="absolute left-6 top-6 h-[calc(100%+2.5rem)] w-px origin-top bg-gradient-to-b from-brand-300 to-brand-500 shadow-[0_0_10px_rgba(167,139,250,0.8)] lg:hidden"
          />
          <motion.span
            aria-hidden="true"
            style={reduceMotion ? { scaleX: 1 } : { scaleX: segment }}
            className="absolute left-1/2 top-6 hidden h-px w-[calc(100%+1.5rem)] origin-left bg-gradient-to-r from-brand-300 to-brand-500 shadow-[0_0_10px_rgba(167,139,250,0.8)] lg:block"
          />
        </>
      )}

      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-void">
        <motion.span
          aria-hidden="true"
          style={reduceMotion ? { opacity: 1 } : { opacity: activation, scale: nodeScale }}
          className="absolute inset-0 rounded-full border border-brand-300 bg-brand-500/15 shadow-[0_0_22px_rgba(124,58,237,0.65)]"
        />
        <step.icon className="relative h-5 w-5 text-brand-200" />
      </div>

      <motion.div style={reduceMotion ? undefined : { opacity: textOpacity }} className="lg:mt-5">
        <span className="font-mono text-xs text-brand-300">{step.step}</span>
        <h3 className="mt-1 text-lg font-bold text-white">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/65">{step.description}</p>
      </motion.div>
    </li>
  );
}

/**
 * The process timeline draws itself as you scroll through it: each connector
 * fills when the reader reaches that stage and the stage's node lights up —
 * progress is felt, not just listed. All of it is transform/opacity driven by
 * one scroll-progress motion value, so it costs no React renders.
 */
export function Process() {
  const reduceMotion = usePrefersReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <section id="process" className="relative py-28">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A process built for clarity, not ceremony."
          accent="not ceremony."
          subtitle="No bloated rituals — five stages that keep you informed and the work moving."
        />

        <ol ref={listRef} className="relative mt-20 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
              total={processSteps.length}
              progress={progress}
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}
