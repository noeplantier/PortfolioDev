import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { services } from '@/data/services';

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-28">
      <GlowOrb color="brand" className="left-0 top-1/3 h-[35vw] w-[35vw] -translate-x-1/2" />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="What we do"
          title="Four disciplines. One team."
          subtitle="Every engagement draws on the same senior engineering bar, whether it's a marketing site or a full product build."
        />

        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={fadeUp}>
              <Card className="h-full p-7" hoverLift>
                <div className="mb-5 inline-flex rounded-xl border border-brand-400/20 bg-brand-400/10 p-3">
                  <service.icon className="h-6 w-6 text-brand-300" />
                </div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{service.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
