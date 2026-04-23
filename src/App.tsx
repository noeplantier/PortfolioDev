import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChat from './components/AIChat';

// ─── Cursor State Types ───────────────────────────────────────────────────────
type CursorState =
  | 'default'   // small dot + ring
  | 'button'    // pulsing ring + "RUN" label
  | 'link'      // arrow → with trail
  | 'text'      // I-beam caret
  | 'card'      // bracket frame [ ]
  | 'input'     // blinking beam
  | 'code'      // . glyph
  | 'image'     // crosshair + corner marks
  | 'delete';   // × symbol

// ─── Cursor state detector ────────────────────────────────────────────────────
function detectCursorState(el: Element | null): CursorState {
  if (!el) return 'default';

  // Walk up to find meaningful ancestor (max 6 levels)
  let node: Element | null = el;
  for (let i = 0; i < 6 && node; i++) {
    const tag  = node.tagName?.toLowerCase() ?? '';
    const role = node.getAttribute('role') ?? '';
    const type = (node as HTMLInputElement).type ?? '';
    const cls  = node.className ?? '';

    if (tag === 'button' || role === 'button') return 'button';
    if (tag === 'a')                           return 'link';
    if (tag === 'input' || tag === 'textarea') return type === 'submit' || type === 'button' ? 'button' : 'input';
    if (tag === 'code'  || tag === 'pre')      return 'code';
    if (tag === 'img'   || tag === 'video' || tag === 'canvas') return 'image';
    if (tag === 'select')                      return 'input';

    // Tailwind-class heuristics
    const c = typeof cls === 'string' ? cls : '';
    if (c.includes('cursor-pointer') || c.includes('onClick')) return 'button';
    if (c.includes('group') && (c.includes('card') || c.includes('rounded-2xl') || c.includes('rounded-3xl'))) return 'card';
    if (c.includes('font-mono') || c.includes('tracking-wider')) return 'code';

    // Heading / paragraph → text cursor
    if (['h1','h2','h3','h4','h5','h6','p','span','label'].includes(tag)) return 'text';

    node = node.parentElement;
  }
  return 'default';
}

// ─── IT-themed SVG glyphs per state ──────────────────────────────────────────
const CursorGlyph = ({ state }: { state: CursorState }) => {
  const glyphs: Partial<Record<CursorState, JSX.Element>> = {
    button: (
      <svg width="44" height="20" viewBox="0 0 44 20" fill="none">
        <rect x="1" y="1" width="42" height="18" rx="4" stroke="white" strokeWidth="1"/>
        <text x="22" y="13.5" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" letterSpacing="1">RUN</text>
      </svg>
    ),
    link: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 16L16 4M16 4H8M16 4V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: (
      <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
        <line x1="6" y1="0" x2="6" y2="22" stroke="white" strokeWidth="1.5"/>
        <line x1="1" y1="0" x2="11" y2="0" stroke="white" strokeWidth="1.5"/>
        <line x1="1" y1="22" x2="11" y2="22" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
    card: (
      <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
        <path d="M10 4H4V12M10 28H4V20M30 4H36V12M30 28H36V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    input: (
      <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
        <line x1="6" y1="0" x2="6" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    code: (
      <svg width="38" height="20" viewBox="0 0 38 20" fill="none">
        <path d="M12 4L4 10L12 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 4L34 10L26 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="17" y1="3" x2="21" y2="17" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    image: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <line x1="16" y1="0" x2="16" y2="32" stroke="white" strokeWidth="0.8" opacity="0.6"/>
        <line x1="0" y1="16" x2="32" y2="16" stroke="white" strokeWidth="0.8" opacity="0.6"/>
        <path d="M4 4H10M4 4V10M28 4H22M28 4V10M4 28H10M4 28V22M28 28H22M28 28V22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    delete: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 4L16 16M16 4L4 16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return glyphs[state] ?? null;
};

// ─── Cursor dimensions per state ─────────────────────────────────────────────
const RING_SIZE: Record<CursorState, number> = {
  default: 28,
  button:  56,
  link:    36,
  text:    20,
  card:    64,
  input:   20,
  code:    52,
  image:   52,
  delete:  40,
};
const DOT_SIZE: Record<CursorState, number> = {
  default: 6,
  button:  0,
  link:    0,
  text:    0,
  card:    0,
  input:   0,
  code:    0,
  image:   0,
  delete:  0,
};

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const [state, setState]         = useState<CursorState>('default');
  const [visible, setVisible]     = useState(false);
  const [clicking, setClicking]   = useState(false);
  const [trail, setTrail]         = useState<{ x: number; y: number; id: number }[]>([]);
  const trailId                   = useRef(0);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Spring config: high stiffness for snappy feel, damping for smooth stop
  const springCfg = { stiffness: 520, damping: 30, mass: 0.4 };
  const rx = useSpring(mx, springCfg);
  const ry = useSpring(my, springCfg);

  // Ring trails slightly behind
  const trailCfg = { stiffness: 160, damping: 22, mass: 0.6 };
  const rtx = useSpring(mx, trailCfg);
  const rty = useSpring(my, trailCfg);

  useEffect(() => {
    // Only on md+ screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);

      // Particle trail for button / link states
      if (state === 'button' || state === 'link') {
        const id = ++trailId.current;
        setTrail(t => [...t.slice(-6), { x: e.clientX, y: e.clientY, id }]);
        setTimeout(() => setTrail(t => t.filter(p => p.id !== id)), 500);
      }

      // Detect cursor state from element under pointer
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setState(detectCursorState(el));
    };

    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);
    const onDown   = () => setClicking(true);
    const onUp     = () => setClicking(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    // Hide native cursor via stylesheet injection
    const style = document.createElement('style');
    style.id = '__cursor_override__';
    style.textContent = '* { cursor: none !important; }';
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.getElementById('__cursor_override__')?.remove();
    };
  }, [mx, my, state]);

  const ringSize = RING_SIZE[state];
  const dotSize  = DOT_SIZE[state];
  const showGlyph = state !== 'default' && state !== 'text' && state !== 'input';

  return (
    <>
      {/* ── Particle trail ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {trail.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: p.x,
              top: p.y,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'white',
              transform: 'translate(-50%, -50%)',
              opacity: (i + 1) / trail.length * 0.4,
            }}
          />
        ))}
      </AnimatePresence>

      {/* ── Ring (trails cursor with slight lag) ────────────────────────────── */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: rtx,
          y: rty,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
          top: 0,
          left: 0,
        }}
        animate={{
          width: clicking ? ringSize * 0.7 : ringSize,
          height: clicking ? ringSize * 0.7 : ringSize,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-full h-full rounded-full border border-white/70 flex items-center justify-center"
          animate={{
            borderColor: state === 'button'
              ? 'rgba(139,92,246,0.9)'
              : state === 'code'
              ? 'rgba(56,189,248,0.8)'
              : state === 'card'
              ? 'rgba(52,211,153,0.7)'
              : 'rgba(255,255,255,0.7)',
            boxShadow: state === 'button'
              ? '0 0 18px rgba(139,92,246,0.35), inset 0 0 12px rgba(139,92,246,0.1)'
              : state === 'code'
              ? '0 0 16px rgba(56,189,248,0.25)'
              : state === 'card'
              ? '0 0 16px rgba(52,211,153,0.2)'
              : '0 0 8px rgba(255,255,255,0.08)',
          }}
          transition={{ duration: 0.2 }}
        >
        

          {/* Text-state I-beam */}
          <AnimatePresence mode="wait">
            {(state === 'text' || state === 'input') && (
              <motion.div
                key="beam"
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, repeat: Infinity, repeatType: 'loop' }}
              >
                <CursorGlyph state={state} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Rotating dashes for button state */}
        {state === 'button' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px dashed rgba(139,92,246,0.4)',
              borderRadius: '50%',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </motion.div>

      {/* ── Dot (follows cursor exactly) ────────────────────────────────────── */}
      <AnimatePresence>
        {dotSize > 0 && (
          <motion.div
            key="dot"
            className="fixed pointer-events-none z-[9999] rounded-full bg-white"
            style={{
              x: rx,
              y: ry,
              top: 0,
              left: 0,
              translateX: '-50%',
              translateY: '-50%',
              width: dotSize,
              height: dotSize,
            }}
            animate={{
              opacity: visible ? 1 : 0,
              scale: clicking ? 0.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 600, damping: 28 }}
          />
        )}
      </AnimatePresence>

      {/* ── Scan-line ripple on click ────────────────────────────────────────── */}
      {clicking && (
        <motion.div
          key="click-ripple"
          className="fixed pointer-events-none z-[9996] rounded-full border border-white/30"
          style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%', top: 0, left: 0 }}
          initial={{ width: 8, height: 8, opacity: 0.6 }}
          animate={{ width: 60, height: 60, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </>
  );
}

// ─── Section wrapper with stagger reveal ─────────────────────────────────────
const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#070709] text-white">

      {/* ── Custom cursor (md+ only, hidden on touch) ── */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #7c3aed, #38bdf8, #7c3aed)',
          backgroundSize: '200% 100%',
          boxShadow: '0 0 12px rgba(139,92,246,0.6)',
        }}
      />

      {/* ── Global grid overlay ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Page content ── */}
      <div className="relative z-10">
        {/* Hero: no wrapper — it manages its own entrance animation */}
        <Hero />

        <Section><Projects /></Section>
        <Section><Skills /></Section>
        <Section><AIChat /></Section>
        <Section><Contact /></Section>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default App;