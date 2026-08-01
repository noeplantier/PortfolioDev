import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { site } from '@/data/site';

const pillars = [
  {
    title: 'Direct communication',
    description: 'You talk to the person building your product — not an account manager relaying messages.',
  },
  {
    title: 'Senior-level craft',
    description: 'Architecture, code review, and deployment held to a production bar from the first commit.',
  },
  {
    title: 'Built to be maintained',
    description: 'Code handed off clean and documented — not a black box only one person can touch.',
  },
  {
    title: 'Honest scoping',
    description: 'Realistic timelines and honest trade-offs, even when that means saying no.',
  },
];

export function WhyPlantiers() {
  return (
    <section id="why-plantiers" className="relative overflow-hidden py-28">
      <GlowOrb color="leaf" className="right-0 top-0 h-[30vw] w-[30vw] translate-x-1/3" />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
          <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.div variants={fadeUp}>
              <Badge>Why Plantiers</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Senior attention, not a rotating cast.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-white/65">
              Plantiers is led by {site.founder.name} — every engagement gets senior-level attention from day one,
              not a chain of account managers between you and the person actually writing the code.
            </motion.p>

            <motion.a
              variants={fadeUp}
              href={site.social.linkedinFounder}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 pr-6 transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
                NP
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{site.founder.name}</span>
                <span className="block font-mono text-xs text-white/40">{site.founder.role}</span>
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg border border-leaf-400/25 bg-leaf-400/10">
                  <Check className="h-4 w-4 text-leaf-400" />
                </div>
                <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
