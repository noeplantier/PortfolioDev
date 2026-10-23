import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Linkedin, Mail } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { channels } from '@/data/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ContactDockProps {
  /** Hidden while the command palette (or any overlay) is open. */
  suppressed?: boolean;
}

/**
 * A floating "reach the founder" pill — the three fastest paths (book,
 * email, LinkedIn) one tap away from anywhere on the page, so a lead never
 * has to scroll back to find a contact section. It steps aside while the
 * real Contact section is on screen (no duplicate CTAs competing with the
 * form) and until the visitor has scrolled past the hero's own CTAs.
 */
export function ContactDock({ suppressed = false }: ContactDockProps) {
  const reduceMotion = usePrefersReducedMotion();
  const { pathname } = useLocation();
  const [pastHero, setPastHero] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    let ticking = false;
    const check = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.85);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setContactInView(false);
    const target = document.getElementById('contact');
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  const visible = pastHero && !contactInView && !suppressed;

  return (
    <AnimatePresence>
      {visible && (
        // Centering lives on this static wrapper, NOT on the motion element: Framer
        // writes an inline `transform` for y/scale, which would silently replace a
        // Tailwind `-translate-x-1/2` and shove the dock half its width to the right.
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <motion.aside
            aria-label="Contact the founder"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="pointer-events-auto"
          >
            <div className="flex items-center gap-1 rounded-2xl border border-white/[0.12] bg-void/80 p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_32px_rgba(124,58,237,0.18)] backdrop-blur-xl">
              <a
                href={channels.book.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-[box-shadow,transform] hover:shadow-glow active:scale-[0.97]"
              >
                <Calendar className="h-4 w-4" />
                <span>{channels.book.short}</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[700%]"
                />
              </a>
              <a
                href={channels.email.href}
                aria-label={`Email the founder at ${channels.email.address}`}
                className="group flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-white/80 transition-[background-color,color,transform] hover:bg-white/[0.08] hover:text-white active:scale-[0.95]"
              >
                <Mail className="h-4 w-4 transition-transform group-hover:-rotate-12" />
                <span className="hidden sm:inline">{channels.email.short}</span>
              </a>
              <a
                href={channels.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${channels.linkedin.label} (opens in a new tab)`}
                className="group flex h-10 w-10 items-center justify-center rounded-xl text-white/80 transition-[background-color,color,transform] hover:bg-white/[0.08] hover:text-white active:scale-[0.95]"
              >
                <Linkedin className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
