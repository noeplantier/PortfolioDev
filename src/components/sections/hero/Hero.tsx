import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { fadeIn, fadeUp, stagger } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { TerminalCard } from './TerminalCard';

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28">
      <GridOverlay />
      <GlowOrb color="brand" className="-top-40 left-1/4 h-[45vw] w-[45vw]" />
      <GlowOrb color="leaf" className="bottom-0 right-0 h-[25vw] w-[25vw]" />

      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute right-[12%] top-[20%] hidden h-2 w-2 rounded-full bg-brand-300/60 blur-[1px] sm:block"
          />
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="pointer-events-none absolute left-[8%] top-[55%] hidden h-1.5 w-1.5 rounded-full bg-leaf-400/70 blur-[1px] sm:block"
          />
        </>
      )}

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <motion.div variants={stagger()} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <Badge dot>Software Engineering Studio</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              <span className="block">Engineering</span>
              <span className="text-gradient animate-gradient block">Digital Growth.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
              Plantiers designs, builds, and ships production-grade web and mobile software for teams who can't
              afford to get it wrong.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href="#contact"
                size="lg"
                magnetic
                icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
              >
                Start a project
              </Button>
              <Button href="#portfolio" size="lg" variant="secondary">
                See our work
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2.5 text-sm text-white/65">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf-400" />
              </span>
              Currently accepting new engagements
            </motion.div>
          </motion.div>

          <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
            <TerminalCard />
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/60">SCROLL</span>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
