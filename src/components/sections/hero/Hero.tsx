import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown, Linkedin, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Aurora } from '@/components/ui/Aurora';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { RotatingWord, ScrambleText } from '@/components/ui/AnimatedText';
import { fadeIn, fadeUp, fadeUpPlain, stagger } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { channels } from '@/data/site';
import { TerminalCard } from './TerminalCard';
import { NeuralField } from './NeuralField';

const ROTATING = ['web apps', 'mobile apps', 'cloud platforms', 'AI integrations', 'digital products'];

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked depth: the copy drifts down and fades as the hero leaves,
  // the aurora drifts up — different rates read as parallax without any
  // scroll listener of our own (motion values update outside React).
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], reduceMotion ? [1, 1] : [1, 0.2]);
  const backdropY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -120]);

  // Light that reveals a brighter grid under the cursor. CSS variables on the
  // section node — updating them never re-renders React.
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onPointerMove={onPointerMove}
      className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32"
    >
      <motion.div aria-hidden="true" style={{ y: backdropY }} className="pointer-events-none absolute inset-0">
        <Aurora />
      </motion.div>
      <GridOverlay />
      {!reduceMotion && <div aria-hidden="true" className="spotlight-grid pointer-events-none absolute inset-0" />}
      <NeuralField className="opacity-70" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
            <motion.div variants={stagger()} initial="hidden" animate="visible">
              <motion.div variants={fadeUp}>
                <Badge dot>
                  <ScrambleText text="Software Engineering Studio" />
                </Badge>
              </motion.div>

              {/*
                The headline is built from real, space-separated words — not two
                block-level fragments glued together — so its text content reads
                "Engineering Digital Growth." for copy/paste, link previews and
                search snippets. Each line owns its reveal; the gradient words
                use the filter-free variant (see .gradient-word in index.css).
              */}
              {/*
                Tailwind's `text-*` size utilities also set `line-height: 1`, and the
                responsive ones (`sm:text-6xl`, `lg:text-7xl`) are emitted AFTER a plain
                `leading-*`, so a single `leading-[1.12]` is silently overridden from
                640px up. That is what shaved the bottom of the "g" off the gradient
                line: the clip box was only 1em tall. The leading is therefore repeated
                at every breakpoint (it sorts after font-size within a breakpoint), and
                .gradient-word pads its own box as a second, independent safeguard.
              */}
              <h1 className="mt-6 text-[2.75rem] font-black leading-[1.12] tracking-tight text-white sm:text-6xl sm:leading-[1.12] lg:text-7xl lg:leading-[1.12]">
                <motion.span variants={fadeUp} className="block">
                  Engineering
                </motion.span>{' '}
                <span className="block">
                  <motion.span variants={fadeUpPlain} data-text="Digital" className="gradient-word">
                    Digital
                  </motion.span>{' '}
                  <motion.span variants={fadeUpPlain} data-text="Growth." className="gradient-word">
                    Growth.
                  </motion.span>
                </span>
              </h1>

              <motion.p variants={fadeUp} className="mt-5 font-mono text-sm tracking-wide text-brand-300">
                <span aria-hidden="true">❯ </span>
                we engineer <RotatingWord words={ROTATING} />
              </motion.p>

              <motion.p variants={fadeUp} className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
                Plantiers designs, builds, and ships production-grade web and mobile software for teams who can't
                afford to get it wrong.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  href={channels.book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  magnetic
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                >
                  <Calendar className="h-4 w-4" />
                  {channels.book.label}
                </Button>
                <Button
                  href={channels.email.href}
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                  icon={<Mail className="h-4 w-4 transition-transform group-hover:-rotate-12 group-hover:scale-110" />}
                >
                  {channels.email.label}
                </Button>
                <a
                  href={channels.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${channels.linkedin.label} (opens in a new tab)`}
                  className="group flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-white/70 transition-[border-color,background-color,color,transform] hover:border-brand-400/50 hover:bg-white/[0.08] hover:text-white active:scale-95"
                >
                  <Linkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="flex items-center gap-2.5 text-sm text-white/70">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf-400" />
                  </span>
                  Accepting new engagements · replies within 24h
                </span>
                <CopyEmail address={channels.email.address} />
              </motion.div>
            </motion.div>

            <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <TerminalCard />
            </motion.div>
          </div>
        </Container>
      </motion.div>

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
