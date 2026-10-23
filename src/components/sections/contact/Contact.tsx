import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Linkedin, Mail, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { Card } from '@/components/ui/Card';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { ScrambleText } from '@/components/ui/AnimatedText';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { channels } from '@/data/site';
import { cn } from '@/lib/utils';
import { ContactForm } from './ContactForm';

interface ChannelCard {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  external: boolean;
  featured?: boolean;
}

const cards: ChannelCard[] = [
  {
    id: 'book',
    icon: Calendar,
    tag: 'Fastest',
    title: channels.book.label,
    body: 'Pick a slot that suits you — no forms, no back-and-forth. Straight onto the founder’s calendar.',
    cta: 'Open calendar',
    href: channels.book.href,
    external: true,
    featured: true,
  },
  {
    id: 'email',
    icon: Mail,
    tag: 'Direct',
    title: 'Write to the founder',
    body: 'Send a few lines about what you’re building. You’ll get a personal reply within 24 hours.',
    cta: 'Send an email',
    href: channels.email.href,
    external: false,
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    tag: 'Network',
    title: 'Connect on LinkedIn',
    body: 'Follow the studio, see recent work, or message the founder where you already are.',
    cta: 'Open LinkedIn',
    href: channels.linkedin.href,
    external: true,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <GlowOrb color="brand" className="bottom-0 left-1/2 h-[40vw] w-[40vw] -translate-x-1/2 translate-y-1/2" />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's build something."
          accent="something."
          subtitle="Choose the fastest way to reach the founder — I respond within 24 hours."
        />

        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.li key={card.id} variants={fadeUp}>
              <Card
                hoverLift
                className={cn(
                  'flex h-full flex-col p-7',
                  card.featured && 'border-brand-400/40 bg-brand-500/[0.07] shadow-[0_0_40px_rgba(124,58,237,0.18)]',
                )}
              >
                <div className="mb-6 flex items-start justify-between">
                  <span
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6',
                      card.featured ? 'border-brand-300/40 bg-brand-500/25' : 'border-brand-400/20 bg-brand-400/10',
                    )}
                  >
                    <card.icon className="h-5 w-5 text-brand-200" />
                  </span>
                  <span className="rounded-full border border-white/[0.1] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60">
                    <ScrambleText text={card.tag.toUpperCase()} replayOnHover />
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">{card.body}</p>

                {card.id === 'email' && (
                  <div className="relative z-10 mt-4">
                    <CopyEmail address={channels.email.address} />
                  </div>
                )}

                {/* Stretched link: the whole card is the click target (after:inset-0),
                    while the copy button above sits on a higher z-index and stays independent. */}
                <a
                  href={card.href}
                  {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={cn(
                    'group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors after:absolute after:inset-0 after:content-[""]',
                    card.featured ? 'text-brand-200 hover:text-white' : 'text-white/80 hover:text-white',
                  )}
                >
                  {card.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                  {card.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </Card>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
              Prefer to write it down?
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
          </div>
          <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-xl">
            <ContactForm />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
