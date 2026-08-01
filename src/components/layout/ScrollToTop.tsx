import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const checkPosition = useCallback(() => {
    setVisible(window.scrollY > window.innerHeight * 0.6);
  }, []);

  useEffect(() => {
    checkPosition();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        checkPosition();
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [checkPosition]);

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
      aria-label="Scroll to top"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.25 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.06] text-white/70 backdrop-blur-md transition-colors hover:bg-white/[0.12] hover:text-white"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}
