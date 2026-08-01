import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe, Smartphone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { projects } from '@/data/projects';

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Real projects, real code."
          subtitle="A sample of what's shipped — web and mobile, from landing pages to full platforms."
        />

        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <Card tilt className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05]">
                    {project.type === 'mobile' ? (
                      <Smartphone className="h-4 w-4 text-white/70" />
                    ) : (
                      <Globe className="h-4 w-4 text-white/70" />
                    )}
                  </div>
                  <span className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60">
                    {project.type}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{project.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.07] px-2.5 py-1 font-mono text-[10px] text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-2 pt-1">
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-2.5 text-xs font-semibold text-white transition-shadow hover:shadow-glow"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" /> Live
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
