import { motion } from 'framer-motion';
import { TechIcon } from '@/components/ui/TechIcon';
import { Container } from '@/components/ui/Container';
import { techStack } from '@/data/tech-stack';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { fadeUp, viewportOnce } from '@/lib/motion';

export function TrustedBy() {
  const reduceMotion = usePrefersReducedMotion();
  const loopItems = [...techStack, ...techStack];

  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015] py-14">
      <Container>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/35"
        >
          The stack behind every engagement
        </motion.p>
      </Container>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-void to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-void to-transparent sm:w-24" />

        {reduceMotion ? (
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6">
            {techStack.map((name) => (
              <div key={name} className="flex items-center gap-2.5 text-white/40">
                <TechIcon name={name} className="h-5 w-5" />
                <span className="text-sm">{name}</span>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex w-max items-center gap-14"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          >
            {loopItems.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex shrink-0 items-center gap-2.5 text-white/40 transition-colors hover:text-white/80"
              >
                <TechIcon name={name} className="h-5 w-5" />
                <span className="whitespace-nowrap text-sm">{name}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
