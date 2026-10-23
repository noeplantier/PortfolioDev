import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { pageSections } from '@/data/sections';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

const IDS = pageSections.map((s) => s.id);

/**
 * Vertical "you are here" rail on wide screens. Each stop is a real anchor
 * (works without JS-driven scrolling, keyboard focusable, labelled), the
 * active one is marked with aria-current and a shared-layout highlight that
 * glides between stops instead of cutting.
 */
export function SectionRail() {
  const { pathname } = useLocation();
  const active = useScrollSpy(IDS);
  const reduceMotion = usePrefersReducedMotion();

  if (pathname !== '/') return null;

  return (
    <nav aria-label="Page sections" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 2xl:block">
      <div className="relative">
      <span aria-hidden="true" className="absolute right-[3px] top-1 h-[calc(100%-0.5rem)] w-px bg-white/10" />
      <ul className="relative flex flex-col items-end gap-3.5">
        {pageSections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id} className="relative">
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'location' : undefined}
                className="group flex items-center gap-3 py-0.5"
              >
                <span
                  className={cn(
                    'font-mono text-[10px] uppercase tracking-[0.2em] transition-[opacity,transform,color] duration-300',
                    isActive
                      ? 'translate-x-0 text-brand-300 opacity-100'
                      : 'translate-x-1 text-white/60 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100',
                  )}
                >
                  {section.label}
                </span>
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                      isActive ? 'bg-brand-300' : 'bg-white/30 group-hover:bg-white/60',
                    )}
                  />
                  {isActive && (
                    <motion.span
                      layoutId="section-rail-active"
                      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute -inset-1.5 rounded-full border border-brand-400/60 shadow-[0_0_14px_rgba(124,58,237,0.6)]"
                    />
                  )}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      </div>
    </nav>
  );
}
