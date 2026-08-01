import { motion } from 'framer-motion';
import { Calendar, Github, Linkedin, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { Button } from '@/components/ui/Button';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { site } from '@/data/site';
import { ContactForm } from './ContactForm';

const infoItems = [
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: Github, label: 'GitHub', value: 'github.com/noeplantier', href: site.social.github },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/company/plantiers', href: site.social.linkedinCompany },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <GlowOrb color="brand" className="bottom-0 left-1/2 h-[40vw] w-[40vw] -translate-x-1/2 translate-y-1/2" />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's build something."
          subtitle="Tell me about your project — I respond within 24 hours."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-3 lg:col-span-2"
          >
            {infoItems.map((item) => (
              <motion.a
                key={item.label}
                variants={fadeUp}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-400/20 bg-brand-400/10">
                  <item.icon className="h-4 w-4 text-brand-300" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] tracking-widest text-white/60">
                    {item.label.toUpperCase()}
                  </span>
                  <span className="block truncate text-sm font-medium text-white/80">{item.value}</span>
                </span>
              </motion.a>
            ))}

            <motion.div variants={fadeUp}>
              <Button
                href={site.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="mt-1 w-full"
                icon={<Calendar className="h-4 w-4" />}
              >
                Book a free 30-min call
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-xl lg:col-span-3"
          >
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
