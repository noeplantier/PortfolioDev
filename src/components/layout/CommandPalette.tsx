import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  CornerDownLeft,
  Copy,
  Github,
  Linkedin,
  Mail,
  Search,
  Send,
  type LucideIcon,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { channels, site } from '@/data/site';
import { pageSections } from '@/data/sections';
import { copyToClipboard, scrollToSection } from '@/lib/contact';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface Command {
  id: string;
  label: string;
  hint?: string;
  group: 'Contact' | 'Navigate' | 'Links';
  icon: LucideIcon;
  keywords?: string;
  external?: boolean;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

/**
 * ⌘K / Ctrl+K command menu. The contact actions come first on purpose: the
 * fastest path from "interested" to "talking to the founder" should be three
 * keystrokes from anywhere on the page.
 *
 * Accessibility: modal dialog that traps focus and restores it on close, the
 * ARIA 1.2 combobox + listbox pattern (focus stays in the input, the visually
 * active option is announced via aria-activedescendant), Esc closes, and a
 * polite live region reports the number of matches.
 */
export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const reduceMotion = usePrefersReducedMotion();
  const { pathname } = useLocation();
  const uid = useId();
  const listId = `${uid}-list`;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');

  const goTo = useCallback(
    (hash: string) => {
      if (pathname === '/') {
        // let the dialog unmount and release its scroll lock before scrolling
        requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(hash, reduceMotion)));
      } else {
        // Same approach as the navbar's off-Home anchors: a real navigation, so the
        // browser's native hash scrolling lands on the section once Home has mounted.
        window.location.assign(`/${hash === '#hero' ? '' : hash}`);
      }
    },
    [pathname, reduceMotion],
  );

  const commands = useMemo<Command[]>(
    () => [
      {
        id: 'book',
        label: channels.book.label,
        hint: 'Calendly',
        group: 'Contact',
        icon: Calendar,
        keywords: 'calendar schedule meeting call calendly book',
        external: true,
        run: () => window.open(channels.book.href, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'email',
        label: `Email ${channels.email.address}`,
        hint: 'Opens your mail app',
        group: 'Contact',
        icon: Mail,
        keywords: 'mail write message founder contact',
        run: () => {
          window.location.href = channels.email.href;
        },
      },
      {
        id: 'copy-email',
        label: 'Copy email address',
        hint: channels.email.address,
        group: 'Contact',
        icon: Copy,
        keywords: 'clipboard founder',
        run: async () => {
          const ok = await copyToClipboard(channels.email.address);
          setToast(ok ? 'Email address copied' : 'Could not copy — select it manually');
        },
      },
      {
        id: 'linkedin',
        label: channels.linkedin.label,
        hint: 'LinkedIn',
        group: 'Contact',
        icon: Linkedin,
        keywords: 'social network company',
        external: true,
        run: () => window.open(channels.linkedin.href, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'brief',
        label: 'Send a written brief',
        hint: 'Jump to the form',
        group: 'Contact',
        icon: Send,
        keywords: 'form message project inquiry',
        run: () => goTo('#contact'),
      },
      ...pageSections.map<Command>((s) => ({
        id: `nav-${s.id}`,
        label: s.label === 'Home' ? 'Back to top' : `Go to ${s.label}`,
        group: 'Navigate',
        icon: ArrowUpRight,
        keywords: `${s.id} section scroll`,
        run: () => goTo(`#${s.id}`),
      })),
      {
        id: 'github',
        label: 'GitHub',
        hint: 'github.com/noeplantier',
        group: 'Links',
        icon: Github,
        keywords: 'code repositories open source',
        external: true,
        run: () => window.open(site.social.github, '_blank', 'noopener,noreferrer'),
      },
    ],
    [goTo],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.keywords ?? ''} ${c.hint ?? ''} ${c.group}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => setActive(0), [query, open]);

  // Open: remember what had focus, lock scroll. Close: restore both.
  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery('');
    setToast('');
    document.body.style.overflow = 'hidden';
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = '';
      returnFocus.current?.focus?.();
    };
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const execute = (command: Command | undefined) => {
    if (!command) return;
    const keepOpen = command.id === 'copy-email';
    if (!keepOpen) onClose();
    command.run();
  };

  // Keyboard handling lives on `document` while the dialog is open, not on the
  // dialog's own element: if a click ever lands on a non-focusable part of the
  // panel, focus falls back to <body> and a handler on the panel would go deaf
  // (Escape would stop closing it). The latest results/active index are read
  // through a ref so the listener is attached once per open, not per keystroke.
  const latest = useRef({ results, active, execute });
  latest.current = { results, active, execute };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      const { results: list, active: index, execute: run } = latest.current;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => (list.length ? (i + 1) % list.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => (list.length ? (i - 1 + list.length) % list.length : 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActive(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActive(Math.max(list.length - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        run(list[index]);
      } else if (e.key === 'Tab') {
        // Single focus target (the input): keep Tab from leaving the dialog.
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]">
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 bg-void/70 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            onMouseDown={(e) => {
              if (e.target !== inputRef.current) e.preventDefault();
            }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.12] bg-void-surface/95 shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(124,58,237,0.2)]"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
              <Search className="h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={results[active] ? `${uid}-opt-${results[active].id}` : undefined}
                aria-autocomplete="list"
                aria-label="Search commands"
                placeholder="Type a command or search…"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/50">
                esc
              </kbd>
            </div>

            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label="Commands"
              className="max-h-[52vh] overflow-y-auto p-2"
            >
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-white/55">No matching command.</li>
              )}
              {results.map((command, index) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                const isActive = index === active;
                return (
                  <li key={command.id} role="presentation">
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
                        {command.group}
                      </p>
                    )}
                    <div
                      id={`${uid}-opt-${command.id}`}
                      role="option"
                      aria-selected={isActive}
                      data-index={index}
                      onMouseMove={() => setActive(index)}
                      onClick={() => execute(command)}
                      className={cn(
                        'relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                        isActive ? 'text-white' : 'text-white/70',
                      )}
                    >
                      {/* CSS-transition highlight, deliberately not a shared-layout (`layoutId`) pill:
                          a layoutId element inside this exiting AnimatePresence subtree kept the exit
                          from ever completing, leaving an invisible full-screen overlay over the page. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-0 rounded-xl border border-brand-400/30 bg-brand-500/15 transition-opacity duration-150',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <command.icon
                        className={cn('relative h-4 w-4 shrink-0', isActive ? 'text-brand-300' : 'text-white/50')}
                      />
                      <span className="relative flex-1 truncate">{command.label}</span>
                      {command.hint && (
                        <span className="relative hidden truncate font-mono text-[11px] text-white/55 sm:block">
                          {command.hint}
                        </span>
                      )}
                      {command.external && (
                        <ArrowUpRight className="relative h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden="true" />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] px-4 py-2.5 font-mono text-[10px] text-white/50">
              <span className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="h-3 w-3" /> select
                </span>
              </span>
              <span>{site.name} · command menu</span>
            </div>

            <div role="status" aria-live="polite" className="sr-only">
              {toast || (query ? `${results.length} ${results.length === 1 ? 'result' : 'results'}` : '')}
            </div>
            {toast && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-x-0 bottom-12 mx-auto w-fit rounded-lg border border-leaf-400/30 bg-leaf-400/10 px-3 py-1.5 font-mono text-[11px] text-leaf-400"
              >
                {toast}
              </motion.p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
