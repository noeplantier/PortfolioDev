import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { IconTile } from '@/components/ui/IconTile';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { services } from '@/data/services';

/** Full class strings, not built dynamically — Tailwind only generates what it can read in source. */
const ICON_MOTION: Record<string, string> = {
  'web-apps': 'group-hover:animate-icon-spin',
  'mobile-apps': 'group-hover:animate-icon-tilt',
  'cloud-devops': 'group-hover:animate-icon-float',
  'ai-integrations': 'group-hover:animate-icon-twinkle',
};

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-28">
      <GlowOrb color="brand" className="left-0 top-1/3 h-[35vw] w-[35vw] -translate-x-1/2" />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="What we do"
          title="Four disciplines. One team."
          accent="One team."
          subtitle="Every engagement draws on the same senior engineering bar, whether it's a marketing site or a full product build."
        />

        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {services.map((service, index) => (
            <motion.div key={service.id} variants={fadeUp}>
              <Card className="h-full p-7" hoverLift>
                <div className="mb-6 flex items-start justify-between">
                  <IconTile icon={service.icon} hoverAnimation={ICON_MOTION[service.id]} />
                  <span className="font-mono text-xs text-white/40 transition-colors group-hover:text-brand-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{service.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] text-white/60 transition-colors duration-300 group-hover:border-brand-400/30 group-hover:text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-400 via-brand-300 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
