'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from 'framer-motion';
import {
  Sparkles, Zap, X, TrendingUp, Users, Target,
  BarChart3, ArrowRight, Terminal, GitBranch, Cpu,
  Code2, Globe, Layers, ChevronDown, Copy, Check,
  ExternalLink, ArrowUpRight, Circle,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type CardData = {
  id: string;
  label: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  color: string;
  accentColor: string;
  icon: React.ReactNode;
  stats: { label: string; value: string; icon: React.ReactNode; trend?: string }[];
  tags: string[];
};

type Particle = {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number; pulse: number; pulseSpeed: number;
};

// ─── Animation Variants ───────────────────────────────────────────────────────
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 60, damping: 18 } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 20 } },
};

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 2200) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const word = words[index];
    if (phase === 'typing') {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pausing'), pause);
        return () => clearTimeout(t);
      }
    }
    if (phase === 'pausing') {
      setPhase('deleting');
    }
    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
        return () => clearTimeout(t);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, index, words, speed, pause]);

  return displayed;
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({ children, className, href, onClick }: {
  children: React.ReactNode; className?: string;
  href?: string; onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? 'a' : 'button';
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative">
      <motion.div style={{ x: xSpring, y: ySpring }}>
        <Tag href={href} onClick={onClick} className={className}>
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}

// ─── Terminal Window ──────────────────────────────────────────────────────────
function TerminalWindow() {
  const [copied, setCopied] = useState(false);
  const lines = [
    { delay: 0.6,  prefix: '❯', text: 'npx create-next-app@latest', color: 'text-emerald-400' },
    { delay: 1.2,  prefix: '✓', text: 'TypeScript → enabled', color: 'text-sky-400' },
    { delay: 1.8,  prefix: '✓', text: 'Tailwind CSS → configured', color: 'text-sky-400' },
    { delay: 2.4,  prefix: '✓', text: 'Drizzle ORM → connected', color: 'text-sky-400' },
    { delay: 3.0,  prefix: '🚀', text: 'Deploying to Vercel...', color: 'text-amber-400' },
    { delay: 3.8,  prefix: '✓', text: 'Production → live in 12s', color: 'text-emerald-400' },
    { delay: 4.5,  prefix: '$', text: 'score: 100/100/100/100', color: 'text-purple-400' },
  ];

  const copyCmd = () => {
    navigator.clipboard.writeText('npx hire-noe-plantier');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={fadeIn}
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 "
     
    >
      {/* Traffic lights */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-white/[0.03]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <span className="ml-auto font-mono text-[11px] text-white/30 tracking-widest">
          noeplantier — zsh
        </span>
        <button onClick={copyCmd} className="ml-3 p-1 rounded hover:bg-white/10 transition-colors">
          {copied
            ? <Check className="w-3.5 h-3.5 text-emerald-400" />
            : <Copy className="w-3.5 h-3.5 text-white/30" />}
        </button>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-[13px] leading-relaxed space-y-1 min-h-[230px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay, duration: 0.3 }}
            className="flex gap-2"
          >
            <span className={`${line.color} shrink-0`}>{line.prefix}</span>
            <span className="text-white/80">{line.text}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 5, duration: 1, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-violet-400 ml-1 align-middle"
        />
      </div>

      {/* Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-violet-900/20 to-transparent pointer-events-none" />
    </motion.div>
  );
}

// ─── Live Stats Bar ───────────────────────────────────────────────────────────
function LiveStatsBar() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('fr-FR', { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { label: 'STATUS', value: 'OPEN TO WORK', color: 'text-emerald-400', dot: true },
    { label: 'LOCATION', value: 'Bali, ID', color: 'text-white/70' },
    { label: 'LOCAL TIME', value: time, color: 'text-sky-400' },
    { label: 'EXPERIENCE', value: '5+ YRS', color: 'text-violet-400' },
  ];

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8"
    >
      {stats.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          {s.dot && (
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
          )}
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">{s.label}</span>
          <span className={`font-mono text-[11px] font-semibold ${s.color}`}>{s.value}</span>
          {i < stats.length - 1 && <span className="text-white/10 ml-4">·</span>}
        </div>
      ))}
    </motion.div>
  );
}


// ─── Card Component ───────────────────────────────────────────────────────────
function HeroCard({ card, onClick }: { card: CardData; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-80, 80], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-80, 80], [-8, 8]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      whileHover={{ scale: 1.03 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl cursor-pointer overflow-hidden"
    >
      {/* Gradient spotlight on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${card.color}`} />

      {/* Top row */}
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-xl border border-white/10 bg-white/5 ${card.accentColor}`}>
            {card.icon}
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
            <Circle className={`w-1.5 h-1.5 fill-current ${card.accentColor}`} />
            <span className="font-mono text-[9px] tracking-wider text-white/40">{card.label}</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-white mb-1 group-hover:text-white transition-colors">
          {card.title}
        </h3>
        <p className="text-xs text-white/40 leading-relaxed mb-4">{card.description}</p>

        {/* Metric */}
        <div className="flex items-end justify-between">
          <div>
            <div className={`text-2xl font-black font-mono ${card.accentColor} tracking-tight`}>
              {card.metric}
            </div>
            <div className="text-[10px] text-white/30 font-mono mt-0.5">{card.metricLabel}</div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors -mb-0.5" />
        </div>
      </div>

      {/* Stats row */}
      <div className="relative z-10 flex border-t border-white/[0.06]">
        {card.stats.map((stat, i) => (
          <div
            key={i}
            className={`flex-1 px-4 py-3 ${i < card.stats.length - 1 ? 'border-r border-white/[0.06]' : ''}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-white/30">
              {stat.icon}
              <span className="text-[9px] font-mono tracking-wider">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-white font-mono">{stat.value}</span>
              {stat.trend && (
                <span className="text-[9px] text-emerald-400 font-mono">{stat.trend}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5 px-5 pb-4 pt-0">
        {card.tags.map((tag) => (
          <span key={tag} className="text-[9px] font-mono text-white/25 border border-white/[0.06] px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Corner glow */}
      <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${card.accentColor.replace('text-', 'bg-')}`} />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Hero() {
  const [showContent, setShowContent] = useState(true);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'button' | 'card'>('default');
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const role = useTypewriter(
    ['Full Stack Developer', 'Mobile Craftsman', 'UI/UX Obsessed', 'Performance Architect', 'Open Source Builder'],
    75, 2400
  );

  // ── Cursor ──────────────────────────────────────────────────────────────────
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const cursorXSpring = useSpring(cursorX, { damping: 28, stiffness: 600 });
  const cursorYSpring = useSpring(cursorY, { damping: 28, stiffness: 600 });

  useEffect(() => {
    const fn = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, [cursorX, cursorY]);

  // ── Canvas particles ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: Math.min(Math.floor(window.innerWidth / 18), 70) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.35 + 0.08,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.015,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = cursorX.get(), my = cursorY.get();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const pulsedAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${pulsedAlpha})`;
        ctx.fill();

        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          const a = (1 - dist / 140) * 0.12;
          ctx.strokeStyle = `rgba(139, 92, 246, ${a})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // inter-particle connections (near ones)
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx2 = p.x - q.x, dy2 = p.y - q.y;
          const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d2 < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - d2 / 80) * 0.07})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize(); draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, [ cursorX, cursorY]);

 

  // ── Cards data ───────────────────────────────────────────────────────────────
  const cards: CardData[] = [
    {
      id: 'fullstack',
      label: 'FULL STACK',
      title: 'End-to-End Engineering',
      description: 'From schema design to production deployment. Zero handoff friction.',
      metric: '50+',
      metricLabel: 'shipped projects',
      color: 'from-violet-600/10 to-transparent',
      accentColor: 'text-violet-400',
      icon: <Layers className="w-5 h-5" />,
      stats: [
        { label: 'UPTIME', value: '100%', icon: <Zap className="w-3 h-3" />, trend: '↑' },
        { label: 'CODE GRADE', value: 'A+', icon: <Target className="w-3 h-3" /> },
      ],
      tags: ['Next.js', 'tRPC', 'Supabase', 'Docker'],
    },
    {
      id: 'mobile',
      label: 'MOBILE',
      title: 'Cross-Platform Native',
      description: 'iOS & Android with pixel-perfect fidelity. New Architecture ready.',
      metric: '98.9%',
      metricLabel: 'crash-free sessions',
      color: 'from-sky-600/10 to-transparent',
      accentColor: 'text-sky-400',
      icon: <Code2 className="w-5 h-5" />,
      stats: [
        { label: 'APP RATING', value: '5.0★', icon: <Sparkles className="w-3 h-3" /> },
        { label: 'PLATFORMS', value: '2', icon: <BarChart3 className="w-3 h-3" /> },
      ],
      tags: ['React Native', 'Expo', 'Flutter', 'Swift'],
    },
    {
      id: 'performance',
      label: 'PERFORMANCE',
      title: 'Core Web Vitals 100',
      description: 'Obsessive about LCP, CLS, INP. Every millisecond is intentional.',
      metric: '<80ms',
      metricLabel: 'time to interactive',
      color: 'from-emerald-600/10 to-transparent',
      accentColor: 'text-emerald-400',
      icon: <Cpu className="w-5 h-5" />,
      stats: [
        { label: 'LIGHTHOUSE', value: '100', icon: <Zap className="w-3 h-3" />, trend: '/100' },
        { label: 'SEO', value: '100%', icon: <TrendingUp className="w-3 h-3" /> },
      ],
      tags: ['Partial Prerender', 'RSC', 'Edge', 'CDN'],
    },
    {
      id: 'uiux',
      label: 'UI/UX',
      title: 'Interfaces That Convert',
      description: 'Design systems, motion design, accessibility. Beauty with purpose.',
      metric: '+45%',
      metricLabel: 'avg. user retention',
      color: 'from-amber-600/10 to-transparent',
      accentColor: 'text-amber-400',
      icon: <Globe className="w-5 h-5" />,
      stats: [
        { label: 'CONVERSION', value: 'High', icon: <Users className="w-3 h-3" /> },
        { label: 'A11Y', value: 'AAA', icon: <Target className="w-3 h-3" /> },
      ],
      tags: ['Figma', 'Framer', 'Motion', 'Design System'],
    },
  ];

  return (
    <>


      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-start text-white overflow-hidden bg-[#070709]"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />

       

        {/* Subtle grid */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* ── Top nav strip ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-mono text-xs text-white/40 tracking-widest">noeplantier.com</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03]">
            <GitBranch className="w-3 h-3 text-violet-400" />
            <span className="font-mono text-[10px] text-white/40">main · v2.4.1</span>
          </div>
        </motion.div>

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-10 pb-8"
          variants={stagger}
          initial="hidden"
          animate={showContent ? 'visible' : 'hidden'}
        >
          {/* Live stats bar */}
          <LiveStatsBar />

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-start mb-14">

            {/* LEFT — Typography */}
            <div>
              <motion.div variants={fadeUp} className="mb-6">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-violet-400 uppercase">
                    Developer · Founder · Builder
                  </span>
                </div>

                {/* Main headline */}
                <h1
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="font-black leading-[0.92] tracking-[-0.04em] mb-6"
                  style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
                >
                  <span className="block text-white">HI ! I'M</span>
                    <span className="relative bg-gradient-to-r from-violet-400 via-sky-400 to-violet-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                      NOÉ
                  </span>
                </h1>

                {/* Typewriter role */}
                <div className="flex items-center gap-3 h-8 mb-6">
                  <div className="h-px w-5 bg-violet-500/50" />
                  <p className="font-mono text-base text-white/60">
                    {role}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                      className="inline-block w-[2px] h-[1.1em] bg-violet-400 ml-[2px] align-middle"
                    />
                  </p>
                </div>

                <p className="text-white/45 text-base leading-relaxed max-w-md">
                  I craft <span className="text-white/80 font-medium">scalable full-stack applications</span> and
                  {' '}<span className="text-white/80 font-medium">cross-platform mobile experiences</span>{' '}
                  that users love — and that engineers are proud to maintain.
                </p>
              </motion.div>

              {/* ── CTAs ─────────────────────────────────────────────────── */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-8">
                {/* Primary CTA */}
                <MagneticButton
                  href="#skills"
                  className="group relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white overflow-hidden transition-all"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-sky-600 to-violet-600 bg-[length:200%_auto] animate-gradient" />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-500 to-sky-500 blur-sm" />
                  <span className="relative flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    See My Work
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </MagneticButton>

                {/* Secondary CTA */}
                <MagneticButton
                  href="#ask-ai"
                  className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white/80 border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4 text-violet-400 group-hover:rotate-12 transition-transform" />
                  Ask the AI
                </MagneticButton>

                {/* Tertiary CTA */}
                <MagneticButton
                  href="https://github.com/noeplantier"
                  className="group flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white/50 hover:text-white/80 border border-white/[0.07] hover:border-white/15 bg-transparent transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  GitHub
                </MagneticButton>
              </motion.div>

            </div>

            {/* RIGHT — Terminal */}
            <motion.div variants={fadeIn} className="xl:pt-4">
              <TerminalWindow />

              {/* Below terminal: quick metrics */}
              <motion.div
                variants={stagger}
                className="grid grid-cols-3 gap-3 mt-3"
              >
                {[
                  { value: '5+', label: 'Years', icon: <Code2 className="w-3.5 h-3.5" /> },
                  { value: '50+', label: 'Projects', icon: <Layers className="w-3.5 h-3.5" /> },
                  { value: '100%', label: 'Satisfaction', icon: <Target className="w-3.5 h-3.5" /> },
                ].map((m) => (
                  <motion.div
                    key={m.label}
                    variants={fadeIn}
                    className="flex flex-col items-center py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm"
                  >
                    <div className="text-violet-400/70 mb-1">{m.icon}</div>
                    <div className="font-mono font-black text-white text-lg leading-none">{m.value}</div>
                    <div className="font-mono text-[9px] tracking-widest text-white/25 mt-1 uppercase">{m.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/20">CAPABILITIES</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          </motion.div>

          {/* ── Cards grid ─────────────────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            {cards.map((card) => (
              <HeroCard
                key={card.id}
                card={card}
                onClick={() => setSelectedCard(card)}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          className="relative z-10 flex flex-col items-center gap-2 pb-8"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/20">SCROLL</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-white/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Card Modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              className="relative w-full max-w-md bg-[#0c0c10] border border-white/[0.1] rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal ambient */}
              <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-20 ${selectedCard.accentColor.replace('text-', 'bg-')}`} />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-violet-800/20 blur-3xl" />

              {/* Header */}
              <div className="relative p-6 border-b border-white/[0.07]">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/50 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl border border-white/10 bg-white/5 ${selectedCard.accentColor}`}>
                    {selectedCard.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.25em] text-white/30 mb-1">{selectedCard.label}</div>
                    <h2 className="text-xl font-bold text-white">{selectedCard.title}</h2>
                  </div>
                </div>

                <p className="text-sm text-white/45 mt-4 leading-relaxed">{selectedCard.description}</p>
              </div>

              {/* Metric highlight */}
              <div className="relative px-6 py-5 border-b border-white/[0.07] flex items-center justify-between">
                <div>
                  <div className={`text-4xl font-black font-mono ${selectedCard.accentColor}`}>{selectedCard.metric}</div>
                  <div className="text-xs text-white/30 font-mono mt-1">{selectedCard.metricLabel}</div>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[55%]">
                  {selectedCard.tags.map((tag) => (
                    <span key={tag} className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${selectedCard.accentColor.replace('text-', 'border-')}/30 ${selectedCard.accentColor.replace('text-', 'bg-')}/10 ${selectedCard.accentColor}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="relative p-4 space-y-2">
                {selectedCard.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center gap-3 text-white/40">
                      <span className={selectedCard.accentColor}>{stat.icon}</span>
                      <span className="font-mono text-xs tracking-wider">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-base font-black font-mono ${selectedCard.accentColor}`}>{stat.value}</span>
                      {stat.trend && <span className="text-[10px] text-emerald-400 font-mono">{stat.trend}</span>}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="relative px-6 pb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                  <span className="font-mono text-[10px] text-emerald-400/80">Live verified</span>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 font-mono transition-colors"
                >
                  Close <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% center; }
          50%       { background-position: 200% center; }
        }
        .animate-gradient { animation: gradient 5s ease infinite; }
        @media (min-width: 768px) {
          body, a, button, [role="button"] { cursor: none; }
        }
      `}</style>
    </>
  );
}