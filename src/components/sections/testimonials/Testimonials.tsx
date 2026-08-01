import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { testimonials } from '@/data/testimonials';

/** Renders nothing until data/testimonials.ts has real entries — see that file for why. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative py-28">
      <Container>
        <SectionHeading eyebrow="Client feedback" title="What clients say" />
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp}>
              <Card className="flex h-full flex-col p-6">
                <Quote className="h-6 w-6 text-brand-400/60" />
                <p className="mt-4 flex-1 text-sm italic leading-relaxed text-white/75">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 border-t border-white/[0.07] pt-4">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/65">
                    {t.role}
                    {t.company ? ` · ${t.company}` : ''}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
