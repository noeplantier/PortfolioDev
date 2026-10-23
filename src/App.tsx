import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SectionRail } from '@/components/layout/SectionRail';
import { ContactDock } from '@/components/layout/ContactDock';
import { CursorGlow } from '@/components/layout/CursorGlow';
import { Home } from '@/pages/Home';
import { Legal } from '@/pages/Legal';
import { NotFound } from '@/pages/NotFound';

// The palette is only ever needed after a keypress or click, so its code (and
// the search/ARIA logic with it) stays out of the initial bundle.
const CommandPalette = lazy(() =>
  import('@/components/layout/CommandPalette').then((m) => ({
    default: m.CommandPalette,
  })),
);

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  // Mount once first used, then keep mounted so the exit animation can play.
  const [paletteMounted, setPaletteMounted] = useState(false);

  const openPalette = useCallback(() => {
    setPaletteMounted(true);
    setPaletteOpen(true);
  }, []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteMounted(true);
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    // reducedMotion="user": for visitors with prefers-reduced-motion, Framer Motion
    // drops transform/layout animations app-wide (opacity fades are kept) — a safety
    // net under the per-component checks, so a forgotten `y:` entrance can't slip through.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <div className="relative min-h-screen overflow-x-hidden bg-void text-white">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[1] opacity-[0.035]" />
          <CursorGlow />
          <Navbar onOpenPalette={openPalette} />
          <SectionRail />
          <main id="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ContactDock suppressed={paletteOpen} />
          <ScrollToTop />
          {paletteMounted && (
            <Suspense fallback={null}>
              <CommandPalette open={paletteOpen} onClose={closePalette} />
            </Suspense>
          )}
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
