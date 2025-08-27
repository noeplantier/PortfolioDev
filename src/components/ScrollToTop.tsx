import { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Floating Scroll-To-Top button
 * - Appears when the user reaches (or is near) the bottom of the page
 * - Smoothly scrolls to top on click
 */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const checkPosition = useCallback(() => {
    const threshold = 200; // px from bottom to start showing
    const scrollPos = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    setVisible(scrollPos >= docHeight - threshold);
  }, []);

  useEffect(() => {
    // Initial check in case we load at bottom (e.g., with anchors)
    checkPosition();

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [checkPosition]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 right-6 z-50"
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
        className={[
          'pointer-events-auto flex items-center justify-center',
          'h-12 w-12 rounded-full shadow-lg border border-white/20 backdrop-blur',
          'bg-white/20 hover:bg-white/30 text-white transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-yellow-400/70 focus:ring-offset-2 focus:ring-offset-transparent',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        ].join(' ')}
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ScrollToTop;
