import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Command, Linkedin, Mail, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { navLinks } from '@/data/nav-links';
import { channels } from '@/data/site';
import { pageSections } from '@/data/sections';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

const SPY_IDS = pageSections.map((s) => s.id);

interface NavbarProps {
  onOpenPalette: () => void;
}

export function Navbar({ onOpenPalette }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shortcut, setShortcut] = useState('Ctrl K');
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const onHome = location.pathname === '/';
  const activeSection = useScrollSpy(SPY_IDS);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (/mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent)) setShortcut('⌘K');
  }, []);

  useEffect(() => {
    let ticking = false;
    const check = () => {
      setIsScrolled(window.scrollY > 20);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(check);
    };
    check();
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

  // The mobile menu locks body scroll (overflow: hidden) while open, released by
  // an effect that runs after this state update commits. A native anchor jump
  // fired synchronously on click loses that race and silently does nothing —
  // so on Home, take over the scroll explicitly once the lock is actually gone.
  const handleMobileNavClick = (e: React.MouseEvent, hash: string) => {
    setIsMenuOpen(false);
    if (!onHome) return;
    e.preventDefault();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  };

  const openPaletteFromMenu = () => {
    setIsMenuOpen(false);
    // let the menu's scroll-lock release and focus return before the dialog traps focus
    requestAnimationFrame(() => requestAnimationFrame(onOpenPalette));
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,padding,backdrop-filter] duration-300',
        isScrolled ? 'border-white/[0.08] bg-void/80 py-3 backdrop-blur-xl' : 'border-transparent py-5',
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link to="/" className="shrink-0">
          <Logo />
          <span className="sr-only">— home</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = onHome && activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={hrefFor(link.href)}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'relative py-1 text-sm font-medium transition-colors hover:text-white',
                  isActive ? 'text-white' : 'text-white/70',
                )}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent shadow-[0_0_8px_rgba(167,139,250,0.9)]"
                  />
                )}
              </a>
            );
          })}

          <button
            type="button"
            onClick={onOpenPalette}
            aria-haspopup="dialog"
            aria-keyshortcuts="Control+K Meta+K"
            className="group flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] px-2.5 py-1.5 text-xs text-white/70 transition-[background-color,border-color,color,transform] hover:border-brand-400/40 hover:bg-white/[0.07] hover:text-white active:scale-95"
          >
            <Command className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            <span>Explore</span>
            <kbd className="rounded border border-white/15 px-1.5 font-mono text-[10px] text-white/60">{shortcut}</kbd>
            <span className="sr-only">command menu</span>
          </button>

          <Button
            href={channels.book.href}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            icon={<Calendar className="h-4 w-4" />}
          >
            {channels.book.short}
          </Button>
        </div>

        <button
          ref={toggleRef}
          className="p-2 text-white/70 hover:text-white lg:hidden"
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
            className="overflow-hidden border-b border-white/[0.08] bg-void lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={hrefFor(link.href)}
                  onClick={(e) => handleMobileNavClick(e, link.href)}
                  className="w-full py-3 text-center text-base font-medium text-white/80 hover:text-white"
                >
                  {link.name}
                </a>
              ))}

              <div className="mt-3 flex flex-col gap-3">
                <Button
                  href={channels.book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  icon={<Calendar className="h-4 w-4" />}
                >
                  {channels.book.label}
                </Button>
                <div className="grid grid-cols-[1fr_auto] gap-3">
                  <Button
                    href={channels.email.href}
                    variant="secondary"
                    className="w-full"
                    icon={<Mail className="h-4 w-4" />}
                  >
                    {channels.email.address}
                  </Button>
                  <Button
                    href={channels.linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    aria-label={`${channels.linkedin.label} (opens in a new tab)`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
                <button
                  type="button"
                  onClick={openPaletteFromMenu}
                  aria-haspopup="dialog"
                  className="flex items-center justify-center gap-2 py-2 font-mono text-xs text-white/60 hover:text-white"
                >
                  <Command className="h-3.5 w-3.5" /> Explore the site
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
