import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe, Smartphone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { viewportOnce } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { projects } from '@/data/projects';
import { SystemDiagram } from './SystemDiagram';
import { cn } from '@/lib/utils';

/**
 * Project Explorer — a master/detail interface (project rail + live detail
 * panel) rather than a static card grid, so a visitor can actually explore
 * one project in depth instead of skimming five shallow summaries at once.
 *
 * Selection is click/tap-driven everywhere, never hover-only — the rail
 * doubles as a horizontal pill scroller below `lg` (touch-first: swipe the
 * detail panel itself also works) and a vertical tablist above it, sharing
 * one `activeId` state and one animated highlight (`layoutId`).
 */
export function Portfolio() {
  const reduceMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(projects[0].id);
  const activeIndex = projects.findIndex((p) => p.id === activeId);
  const project = projects[activeIndex];
  // Separate ref arrays per rail: both the mobile pill row and the desktop
  // rail are always mounted (one is just CSS-hidden depending on viewport,
  // not conditionally rendered), so a shared refs array would have the
  // desktop buttons silently clobber the mobile ones and break focus
  // movement below the `lg` breakpoint.
  const mobileRailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const desktopRailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goToOffset = (offset: number) => {
    const next = (activeIndex + offset + projects.length) % projects.length;
    setActiveId(projects[next].id);
  };

  const onRailKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
    refs: React.MutableRefObject<(HTMLButtonElement | null)[]>,
  ) => {
    const forward = e.key === 'ArrowDown' || e.key === 'ArrowRight';
    const backward = e.key === 'ArrowUp' || e.key === 'ArrowLeft';
    if (!forward && !backward) return;
    e.preventDefault();
    const next = forward ? (index + 1) % projects.length : (index - 1 + projects.length) % projects.length;
    setActiveId(projects[next].id);
    refs.current[next]?.focus();
  };

  return (
    <section id="portfolio" className="relative py-28">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Explore the work."
          subtitle="Real, verified projects — pick one to see the role, the system, and what shipped."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Mobile/tablet: horizontal pill selector — touch-first, no hover dependency */}
          <div
            role="tablist"
            aria-label="Projects"
            className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-2 lg:hidden"
          >
            {projects.map((p, i) => {
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  ref={(el) => (mobileRailRefs.current[i] = el)}
                  role="tab"
                  id={`project-tab-mobile-${p.id}`}
                  aria-selected={isActive}
                  aria-controls="project-panel"
                  onClick={() => setActiveId(p.id)}
                  onKeyDown={(e) => onRailKeyDown(e, i, mobileRailRefs)}
                  className={cn(
                    'shrink-0 snap-start rounded-full border px-4 py-2 font-mono text-xs transition-colors',
                    isActive
                      ? 'border-brand-400/40 bg-brand-500/15 text-white'
                      : 'border-white/[0.08] bg-white/[0.03] text-white/50',
                  )}
                >
                  {p.name}
                </button>
              );
            })}
          </div>

          {/* Desktop rail */}
          <div role="tablist" aria-label="Projects" aria-orientation="vertical" className="hidden lg:block">
            <div className="flex flex-col gap-1">
              {projects.map((p, i) => {
                const isActive = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    ref={(el) => (desktopRailRefs.current[i] = el)}
                    role="tab"
                    id={`project-tab-desktop-${p.id}`}
                    aria-selected={isActive}
                    aria-controls="project-panel"
                    onClick={() => setActiveId(p.id)}
                    onKeyDown={(e) => onRailKeyDown(e, i, desktopRailRefs)}
                    className={cn(
                      'group relative flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-colors',
                      isActive ? 'text-white' : 'text-white/50 hover:text-white/80',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-rail-active"
                        transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 32 }}
                        className="absolute inset-0 rounded-xl border border-brand-400/30 bg-white/[0.06]"
                      />
                    )}
                    <span className="relative z-10 font-mono text-[11px] text-white/30">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="relative z-10 text-sm font-semibold">{p.name}</span>
                    {p.type === 'mobile' ? (
                      <Smartphone className="relative z-10 ml-auto h-3.5 w-3.5 text-white/25" />
                    ) : (
                      <Globe className="relative z-10 ml-auto h-3.5 w-3.5 text-white/25" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-7 sm:p-9" hoverLift={false}>
              <motion.div
                drag={reduceMotion ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) goToOffset(1);
                  else if (info.offset.x > 60) goToOffset(-1);
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={project.id}
                    id="project-panel"
                    role="tabpanel"
                    aria-labelledby={`project-tab-mobile-${project.id} project-tab-desktop-${project.id}`}
                    initial={reduceMotion ? undefined : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-400">
                          Project {String(activeIndex + 1).padStart(2, '0')}
                        </span>
                        <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{project.name}</h3>
                      </div>
                      <span className="mt-1 shrink-0 rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
                        {project.type}
                      </span>
                    </div>

                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60">
                      <span className="font-semibold text-white/80">Challenge — </span>
                      {project.challenge}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
                      <span className="font-semibold text-white/80">Approach — </span>
                      {project.solution}
                    </p>

                    <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Role</p>
                        <p className="mt-2 text-sm text-white/70">{project.role}</p>

                        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Stack</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Impact</p>
                        <p className="mt-2 text-sm text-white/70">{project.impact}</p>
                      </div>

                      <div>
                        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">System</p>
                        <SystemDiagram layers={project.layers} />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
                      >
                        <Github className="h-4 w-4" /> Code
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-glow"
                        >
                          Explore project
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </Card>

            {/* Prev/next — the swipe affordance made visible for mouse/keyboard users too */}
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-white/25">
                {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => goToOffset(-1)}
                  aria-label="Previous project"
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] p-2 text-white/50 transition-colors hover:text-white"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 rotate-[135deg]" />
                </button>
                <button
                  onClick={() => goToOffset(1)}
                  aria-label="Next project"
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] p-2 text-white/50 transition-colors hover:text-white"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 rotate-45" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
