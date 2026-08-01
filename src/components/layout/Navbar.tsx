import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { navLinks } from '@/data/nav-links';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Focus trap + Escape-to-close for the mobile menu overlay.
  useEffect(() => {
    if (!isMenuOpen) return;

    const focusables = menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // On any page other than Home, in-page anchors become absolute (/#services)
  // so they resolve correctly instead of scrolling a section that isn't there.
  const hrefFor = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        isScrolled ? 'border-white/[0.08] bg-void/80 py-3 backdrop-blur-xl' : 'border-transparent py-5',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link to="/" className="shrink-0" aria-label="Plantiers home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={hrefFor(link.href)}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <Button href={hrefFor('#contact')} size="md" variant="secondary">
            Start a project
          </Button>
        </div>

        <button
          ref={toggleRef}
          className="p-2 text-white/70 hover:text-white md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/[0.08] bg-void md:hidden"
          >
            <div className="flex flex-col items-center gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={hrefFor(link.href)}
                  className="w-full py-3 text-center text-base font-medium text-white/80 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <Button href={hrefFor('#contact')} className="mt-3 w-full" variant="primary">
                Start a project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
