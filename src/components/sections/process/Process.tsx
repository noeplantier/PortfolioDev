import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { processSteps } from '@/data/process';

export function Process() {
  return (
    <section id="process" className="relative py-28">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A process built for clarity, not ceremony."
          subtitle="No bloated rituals — five stages that keep you informed and the work moving."
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

          {processSteps.map((step) => (
            <motion.div key={step.id} variants={fadeUp} className="relative flex flex-col items-start">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-brand-400/25 bg-void">
                <step.icon className="h-5 w-5 text-brand-300" />
              </div>
              <span className="mt-4 font-mono text-xs text-white/25">{step.step}</span>
              <h3 className="mt-1 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
