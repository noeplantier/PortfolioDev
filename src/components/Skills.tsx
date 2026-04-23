import { useState } from 'react';
import { Smartphone, Globe, Database, Zap, Star, Mail, Github, Linkedin, BrainCircuit, ArrowUpRight, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Design tokens (mirrors Hero.tsx) ────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 55, damping: 18 } },
};
const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 20 } },
};

// ─── White SVG Tech Icons ─────────────────────────────────────────────────────
const TechIcon = ({ name }: { name: string }) => {
  const icons: Record<string, JSX.Element> = {
    'React': (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" className="w-6 h-6">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" /><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="1.8" fill="white" stroke="none" />
      </svg>
    ),
    'Next.js': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.087-.792-.166-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.133-1.867 3.133-4.563 0-2.386-1.715-4.052-4.163-4.052-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .07.282c-.076.312-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    ),
    'TypeScript': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M3 3h18v18H3V3zm10.5 12.5V14h-5v1.5h1.75v5H11v-5h2.5zm1.25-1H21v-1.5h-2.5V8H17v5h-2.25V8H13v1.5h1.75V14.5z"/>
      </svg>
    ),
    'Tailwind CSS': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C13.24 10.39 14.177 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C15.26 7.01 14.323 6 12 6zM7.5 11.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C8.74 15.79 9.677 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C10.76 12.41 9.823 11.4 7.5 11.4z"/>
      </svg>
    ),
    'Vue.js': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M2 3l10 18L22 3h-4l-6 11L6 3H2zm4 0l6 11L18 3h-3l-3 5.5L9 3H6z" opacity="0.6"/>
        <path d="M6 3l6 11L18 3h-3l-3 5.5L9 3H6z"/>
      </svg>
    ),
    'Svelte 5': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M20.227 5.343C18.782 3.02 15.733 2.29 13.42 3.75L6.87 7.822a5.016 5.016 0 0 0-2.27 3.34 5.263 5.263 0 0 0 .523 3.574 4.98 4.98 0 0 0-.662 1.908 5.302 5.302 0 0 0 .903 3.986c1.445 2.323 4.494 3.053 6.807 1.594l6.551-4.073a5.016 5.016 0 0 0 2.27-3.34 5.263 5.263 0 0 0-.523-3.574 4.98 4.98 0 0 0 .662-1.908 5.302 5.302 0 0 0-.903-3.986z" opacity="0.4"/>
        <path d="M10.417 20.358a3.795 3.795 0 0 1-3.047-.45 3.562 3.562 0 0 1-1.507-2.342 3.299 3.299 0 0 1 .056-.967l.14-.475.427.306a6.685 6.685 0 0 0 2.045.985l.194.056-.019.193a1.078 1.078 0 0 0 .194.737 1.146 1.146 0 0 0 .924.45 1.07 1.07 0 0 0 .56-.158l6.551-4.073a1.047 1.047 0 0 0 .476-.7 1.11 1.11 0 0 0-.194-.838 1.146 1.146 0 0 0-.924-.45 1.07 1.07 0 0 0-.56.158l-2.499 1.556a3.557 3.557 0 0 1-1.853.521 3.795 3.795 0 0 1-3.047-.45 3.562 3.562 0 0 1-1.507-2.342 3.44 3.44 0 0 1 1.56-3.537l6.551-4.073a3.557 3.557 0 0 1 1.853-.521 3.795 3.795 0 0 1 3.047.45 3.562 3.562 0 0 1 1.507 2.342 3.299 3.299 0 0 1-.056.967l-.14.475-.427-.306a6.685 6.685 0 0 0-2.045-.985l-.194-.056.019-.193a1.078 1.078 0 0 0-.194-.737 1.146 1.146 0 0 0-.924-.45 1.07 1.07 0 0 0-.56.158L9.4 10.01a1.047 1.047 0 0 0-.476.7 1.11 1.11 0 0 0 .194.838c.25.318.625.45.924.45a1.07 1.07 0 0 0 .56-.158l2.499-1.556a3.557 3.557 0 0 1 1.853-.521 3.795 3.795 0 0 1 3.047.45 3.562 3.562 0 0 1 1.507 2.342 3.44 3.44 0 0 1-1.56 3.537l-6.551 4.073a3.557 3.557 0 0 1-1.98.193z"/>
      </svg>
    ),
    'Solid.js': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M14.74 4.23c-1.82-.77-4.15-.55-6.12.74-1.97 1.29-3.14 3.3-3.14 5.43 0 1.4.47 2.72 1.33 3.8L5 17.5h14l-5-9.94c.25.02.51.03.77.03 2.37 0 4.23-1.34 4.23-3.09 0-1.26-1.1-2.18-2.26-2.18-.6 0-1.27.2-2 .51v1.4z" opacity="0.5"/>
        <path d="M7 19.5h10l1.5-2H5.5L7 19.5z"/>
      </svg>
    ),
    'Vite 6': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M21 3L12 21 8.5 14 14 8l-7 1 14-6z" opacity="0.5"/>
        <path d="M8.5 14L3 21l9-3-3.5-4z"/>
      </svg>
    ),
    'Framer Motion': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M4 4h16v8H4V4zm0 8h8l8 8H4v-8z" opacity="0.5"/>
        <path d="M4 12h8v8L4 12z"/>
      </svg>
    ),
    'React Native': (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" className="w-6 h-6">
        <ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="1.5" fill="white" stroke="none" />
      </svg>
    ),
    'Expo': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M2.5 14.5c2-4 4.5-8 9.5-12 5 4 7.5 8 9.5 12-2 1-5 1.5-9.5 1.5S4.5 15.5 2.5 14.5zm9.5 5.5c-2 0-3.5-.3-4.5-.8L12 22l4.5-2.8c-1 .5-2.5.8-4.5.8z"/>
      </svg>
    ),
    'Flutter': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm.014 11.071L8.857 16.53l5.457 5.457h7.371l-5.457-5.457 5.457-5.457-7.357-.002z"/>
      </svg>
    ),
    'Swift / SwiftUI': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M20.003 14.003c.12-4.12-2.88-8.44-7.77-10.88a.95.95 0 0 0-.11-.05c2.25 2.84 3.17 6.19 2.29 8.94-.09.28-.2.54-.32.8-.13-.11-.27-.23-.41-.34-3.44-2.73-7.14-7.4-7.14-7.4s1.43 4.2 4.77 7.37c-.21-.06-.79-.36-1.37-.74-2.74-1.79-5.19-4.63-5.19-4.63.71 4.08 3.15 7.27 5.91 8.84.47.27.95.49 1.43.67-1.23.72-2.98 1-4.6.88 2.51 1.55 7.06 1.68 9.81-.44a7.36 7.36 0 0 0 2.73-3.77z"/>
      </svg>
    ),
    'Kotlin / Compose': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M2 2h20L12 12 22 22H2V2zm2 2v5.5l5.5-5.5H4zm0 14.5V22h5.5L4 16.5z" opacity="0.5"/>
        <path d="M4 7.5L12 12l-8 4.5V7.5z"/>
      </svg>
    ),
    'Capacitor': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M9 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zm5 4h2v2h2v-2h2v-2h-2v-2h-2v2h-2v2z" opacity="0.6"/>
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35a1.55 1.55 0 0 0-.78 1.35v8.6c0 .56.3 1.07.78 1.35l7.44 4.3c.48.28 1.08.28 1.56 0l7.44-4.3c.48-.28.78-.79.78-1.35v-8.6c0-.56-.3-1.07-.78-1.35L12.78 2.05c-.23-.13-.51-.2-.78-.2z" opacity="0.3"/>
        <path d="M12 4.2L6 7.6v6.8l6 3.4 6-3.4V7.6L12 4.2zm0 2.3l4 2.3v4.6l-4 2.3-4-2.3V8.8l4-2.3z"/>
      </svg>
    ),
    'Golang': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M3 9.5h18v5H3z" opacity="0.3"/>
        <circle cx="7" cy="9" r="1.5"/><circle cx="17" cy="9" r="1.5"/>
        <circle cx="7.5" cy="8.5" r=".6" fill="black"/><circle cx="17.5" cy="8.5" r=".6" fill="black"/>
        <path d="M3 9.5c0 0 0-3 4-3h10c4 0 4 3 4 3" fill="none" stroke="white" strokeWidth="1.5"/>
        <path d="M14 6.5c0-1 .5-2 2-2M3 9.5v5c0 1.5 1 2.5 4 2.5h10c3 0 4-1 4-2.5v-5" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
      </svg>
    ),
    'GraphQL': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.2L4.8 8.5v7l7.2 4.3 7.2-4.3v-7L12 4.2z" opacity="0.3"/>
        <circle cx="12" cy="2.5" r="1.5"/><circle cx="20.5" cy="7.5" r="1.5"/><circle cx="20.5" cy="16.5" r="1.5"/><circle cx="12" cy="21.5" r="1.5"/><circle cx="3.5" cy="16.5" r="1.5"/><circle cx="3.5" cy="7.5" r="1.5"/><circle cx="12" cy="12" r="2"/>
        <path d="M12 4l8.5 5M12 4L3.5 9M20.5 9.5v7M3.5 9.5v7M12 20l8.5-5M12 20l-8.5-5M12 10v4" strokeWidth="1" stroke="white" opacity="0.4" fill="none"/>
      </svg>
    ),
    'PostgreSQL': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <ellipse cx="12" cy="6" rx="8" ry="3.5"/>
        <path d="M4 6v5c0 1.93 3.58 3.5 8 3.5S20 12.93 20 11V6" opacity="0.5"/>
        <path d="M4 11v5c0 1.93 3.58 3.5 8 3.5S20 17.93 20 16v-5" opacity="0.3"/>
      </svg>
    ),
    'Supabase': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M11.9 2.2L3 14.5h9V22l9-12.3H12V2.2h-.1z" opacity="0.5"/>
        <path d="M11.9 2.2L12 9.7h9L12 22V14.5H3l8.9-12.3z"/>
      </svg>
    ),
    'Firebase': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M5.5 19.5L7 8l4 4L5.5 19.5z" opacity="0.3"/>
        <path d="M18.5 19.5L12 7l-1 5 4 4-7 3.5 10.5 1z" opacity="0.6"/>
        <path d="M5.5 19.5L9 4l3 10-6.5 5.5z"/>
      </svg>
    ),
    'Docker': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M3 14c0 2.5 2 4 4.5 4h9c2.5 0 4-1.5 4-3.5 0 0 2-1 2-3.5h-2.5V9h-3V7h-3V5h-3v2H7.5V9H5v2H2.5c0 1.5.5 3 .5 3z" opacity="0.4"/>
        <rect x="8" y="9" width="2" height="2" rx="0.3"/><rect x="11" y="9" width="2" height="2" rx="0.3"/><rect x="14" y="9" width="2" height="2" rx="0.3"/><rect x="11" y="6" width="2" height="2" rx="0.3"/><rect x="14" y="6" width="2" height="2" rx="0.3"/>
      </svg>
    ),
    'Kubernetes': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <circle cx="12" cy="12" r="2.5"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83"/>
        <circle cx="12" cy="2" r="1.5" opacity="0.6"/><circle cx="12" cy="22" r="1.5" opacity="0.6"/><circle cx="2" cy="12" r="1.5" opacity="0.6"/><circle cx="22" cy="12" r="1.5" opacity="0.6"/>
      </svg>
    ),
    'Terraform': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M9.5 3.5L15 6.5v6l-5.5-3v-6zm5.5 3l5.5-3v6L15 12.5v-6zm-11 2l5.5 3v6L4 14.5v-6zm5.5 9l5.5-3v6l-5.5 3v-6z" opacity="0.5"/>
        <path d="M9.5 3.5v6l5.5 3V6.5L9.5 3.5zm-5.5 5v6l5.5 3v-6L4 8.5z"/>
      </svg>
    ),
    'Vercel': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 2L2 20h20L12 2z"/>
      </svg>
    ),
    'AWS': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 7c-4 0-7 2-7 5s3 5 7 5 7-2 7-5-3-5-7-5zm0 8c-2.8 0-5-1.3-5-3s2.2-3 5-3 5 1.3 5 3-2.2 3-5 3z"/>
        <path d="M7.5 20.5c-2 .8-4-1-4-1s1 2 4 2 4-1 4-1-2 .2-4 0zm9 0c-2 .2-4 0-4 0s1 1 4 1 4-2 4-2-2 2-4 1z" opacity="0.5"/>
      </svg>
    ),
    'Vitest': (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M5 3h14l2 8-9 10L3 11l2-8z" opacity="0.3"/>
        <path d="M5 3h6v10L3 11l2-8zm13 0h-6v10l8-2-2-8z" opacity="0.5"/>
        <path d="M5 3l6 10 6-10" fill="none" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
  };
  return icons[name] ?? (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="12" cy="12" r="9" opacity="0.3"/><path d="M9 9h6M9 12h6M9 15h4" opacity="0.7"/>
    </svg>
  );
};

// ─── Category accent colours (subtle, like Hero card accents) ─────────────────
const CATEGORY_ACCENT: Record<string, { dot: string; ring: string; bar: string }> = {
  frontend: { dot: 'bg-violet-400', ring: 'border-violet-400/40', bar: 'from-violet-500 to-sky-500' },
  mobile:   { dot: 'bg-sky-400',    ring: 'border-sky-400/40',    bar: 'from-sky-500 to-cyan-500' },
  backend:  { dot: 'bg-emerald-400',ring: 'border-emerald-400/40',bar: 'from-emerald-500 to-teal-500' },
  devops:   { dot: 'bg-amber-400',  ring: 'border-amber-400/40',  bar: 'from-amber-500 to-orange-500' },
};

// ─── Component ────────────────────────────────────────────────────────────────
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      title: 'Frontend',
      fullTitle: 'Frontend Development',
      icon: Globe,
      skills: [
        { name: 'React',        level: 95, experience: '4+ years', projects: 35, description: 'Advanced hooks, Context API, Redux, performance optimization' },
        { name: 'Next.js',      level: 92, experience: '4+ years', projects: 18, description: 'SSR, SSG, API routes, middleware, App Router, Partial Prerendering' },
        { name: 'TypeScript',   level: 94, experience: '4+ years', projects: 40, description: 'Advanced types, generics, utility types, strict mode, decorators' },
        { name: 'Tailwind CSS', level: 96, experience: '4+ years', projects: 32, description: 'Custom designs, plugins, responsive utilities, JIT, v4 cascade layers' },
        { name: 'Vue.js',       level: 85, experience: '3+ years', projects: 12, description: 'Composition API, Pinia, Nuxt.js, Vue Vapor compiler' },
        { name: 'Svelte 5',     level: 82, experience: '2+ years', projects: 9,  description: 'Runes reactivity system, SvelteKit, zero-runtime overhead' },
        { name: 'Solid.js',     level: 78, experience: '2+ years', projects: 7,  description: 'Fine-grained reactivity, signals, SolidStart, SSR without VDOM' },
        { name: 'Vite 6',       level: 91, experience: '3+ years', projects: 28, description: 'Environment API, module federation, custom plugins, Rolldown' },
        { name: 'Framer Motion',level: 90, experience: '4+ years', projects: 25, description: 'Complex animations, gestures, layout animations, scroll-linked' },
      ],
    },
    mobile: {
      title: 'Mobile',
      fullTitle: 'Mobile Development',
      icon: Smartphone,
      skills: [
        { name: 'React Native',   level: 93, experience: '4+ years', projects: 20, description: 'New Architecture, JSI, Fabric renderer, Turbo Modules' },
        { name: 'Expo',           level: 91, experience: '4+ years', projects: 15, description: 'EAS Build, OTA updates, Expo Router v4, push notifications' },
        { name: 'Flutter',        level: 87, experience: '3+ years', projects: 8,  description: 'Impeller engine, custom widgets, Riverpod, platform channels' },
        { name: 'Swift / SwiftUI',level: 80, experience: '3+ years', projects: 10, description: 'Swift Concurrency, Observation framework, Swift Data, visionOS' },
        { name: 'Kotlin / Compose',level:82, experience: '2+ years', projects: 12, description: 'Jetpack Compose, Coroutines, Flow, KMP multiplatform' },
        { name: 'Capacitor',      level: 78, experience: '2+ years', projects: 6,  description: 'Native plugins, community ecosystem, modern web APIs on mobile' },
      ],
    },
    backend: {
      title: 'Backend',
      fullTitle: 'Backend & Database',
      icon: Database,
      skills: [
        { name: 'Node.js',    level: 96, experience: '4+ years', projects: 38, description: 'Fastify, microservices, streams, worker threads, native ESM' },
        { name: 'Golang',     level: 87, experience: '4+ years', projects: 10, description: 'Goroutines, channels, slog, generics, HTMX backends' },
        { name: 'GraphQL',    level: 88, experience: '3+ years', projects: 16, description: 'Schema-first, Federation v2, DataLoader, real-time subscriptions' },
        { name: 'PostgreSQL', level: 88, experience: '4+ years', projects: 16, description: 'JSONB, pgvector, complex queries, RLS, connection pooling' },
        { name: 'Supabase',   level: 87, experience: '2+ years', projects: 15, description: 'Realtime, Edge Functions, RLS, pgvector AI search, branching' },
        { name: 'Firebase',   level: 90, experience: '4+ years', projects: 25, description: 'Firestore, App Check, Cloud Functions v2, Data Connect' },
      ],
    },
    devops: {
      title: 'DevOps',
      fullTitle: 'DevOps & Tools',
      icon: Zap,
      skills: [
        { name: 'Docker',     level: 87, experience: '3+ years', projects: 22, description: 'Multi-stage builds, Compose v3, BuildKit, Docker Scout, OCI images' },
        { name: 'Kubernetes', level: 76, experience: '2+ years', projects: 10, description: 'Helm charts, KEDA autoscaling, ArgoCD GitOps, service mesh' },
        { name: 'Terraform',  level: 78, experience: '2+ years', projects: 9,  description: 'IaC, OpenTofu, modules, state management, multi-cloud provisioning' },
        { name: 'Vercel',     level: 93, experience: '3+ years', projects: 28, description: 'Edge Functions, Fluid compute, Analytics, preview deployments, AI SDK' },
        { name: 'AWS',        level: 82, experience: '4+ years', projects: 12, description: 'Lambda, S3, CloudFront, RDS, ECS, CDK infrastructure as code' },
        { name: 'Vitest',     level: 88, experience: '2+ years', projects: 20, description: 'Browser mode, coverage v8, component testing, workspace projects' },
      ],
    },
  };

  const cat = skillCategories[activeCategory as keyof typeof skillCategories];
  const accent = CATEGORY_ACCENT[activeCategory];

  return (
    <section id="skills" className="py-20 bg-transparent relative overflow-hidden">
      {/* Ambient glows — same system as Hero */}
      <div className="absolute top-1/4 left-0 w-[35vw] h-[35vw] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[30vw] h-[30vw] rounded-full bg-sky-900/08 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-violet-400 uppercase">
              Stack · 5+ Years
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Main Skills{' '}
            <BrainCircuit className="inline-block w-10 h-10 text-white ml-1 mb-1" />
          </h2>
          <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            Crafting exceptional web and mobile applications with modern, production-grade technologies.
          </p>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {Object.entries(skillCategories).map(([key, category]) => {
            const a = CATEGORY_ACCENT[key];
            const isActive = activeCategory === key;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex flex-col items-center gap-3 px-5 py-5 rounded-2xl font-semibold text-sm transition-all duration-300 overflow-hidden ${
                  isActive
                    ? `bg-white/[0.07] text-white border-2 ${a.ring} shadow-lg`
                    : 'bg-white/[0.03] text-white/45 hover:bg-white/[0.06] border-2 border-white/[0.07] hover:border-white/15 hover:text-white/70'
                }`}
              >
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${a.bar} opacity-[0.08]`} />
                )}
                <div className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                  isActive ? `bg-gradient-to-br ${a.bar}` : 'bg-white/[0.08]'
                }`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <span className="relative text-center leading-tight">{category.title}</span>
                {isActive && (
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-gradient-to-r ${a.bar}`} />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Skill count badge ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-center mb-8"
          >
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${accent.ring} bg-white/[0.03]`}>
              <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
              <span className="font-mono text-[10px] tracking-widest text-white/40">
                {cat.fullTitle.toUpperCase()} · {cat.skills.length} TECHNOLOGIES
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Skills Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto mb-16"
          >
            {cat.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                className="group relative"
                whileHover={{ y: -4 }}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${accent.bar} opacity-0 group-hover:opacity-[0.08] rounded-2xl blur-xl transition-opacity duration-400`} />

                <div className={`relative flex flex-col gap-4 p-5 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08] group-hover:border-white/15 transition-all duration-300 h-full overflow-hidden`}>

                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Icon */}
                      <div className={`shrink-0 w-10 h-10 flex items-center justify-center bg-white/[0.07] rounded-xl border border-white/[0.07] group-hover:bg-white/10 transition-colors`}>
                        <TechIcon name={skill.name} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-base leading-tight truncate">
                          {skill.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-2.5 h-2.5 text-white/30" />
                          <span className="font-mono text-[10px] text-white/35 tracking-wide">{skill.experience}</span>
                          <span className="text-white/20">·</span>
                          <span className="font-mono text-[10px] text-white/35">{skill.projects} projects</span>
                        </div>
                      </div>
                    </div>

                    {/* Proficiency */}
                    <div className="shrink-0 text-right">
                      <div className={`text-xl font-black font-mono bg-gradient-to-r ${accent.bar} bg-clip-text text-transparent`}>
                        {skill.level}%
                      </div>
                      <div className="font-mono text-[9px] text-white/25 tracking-widest">PROF.</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-white/45 leading-relaxed group-hover:text-white/60 transition-colors">
                    {skill.description}
                  </p>

                  {/* Progress bar */}
                  <div className="relative">
                    <div className="w-full bg-white/[0.07] rounded-full h-[3px] overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${accent.bar}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.1, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                    {/* Marker dot */}
                    <motion.div
                      className={`absolute -top-[3px] w-[9px] h-[9px] rounded-full bg-gradient-to-r ${accent.bar} shadow-lg`}
                      initial={{ left: '0%' }}
                      animate={{ left: `${skill.level}%` }}
                      transition={{ duration: 1.1, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ transform: 'translateX(-50%)' }}
                    />
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r ${accent.bar} transition-all duration-500 rounded-full`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-10 max-w-6xl mx-auto">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/20">COLLABORATE</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>

        {/* ── CTA panel ── */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-xl p-8 md:p-10">
            {/* Ambient */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-sky-600/08 rounded-full blur-3xl pointer-events-none" />

            <div className="relative text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="inline-flex p-4 bg-gradient-to-br from-violet-500 to-sky-500 rounded-2xl mb-5"
              >
                <Zap className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Let's Build Something Amazing
              </h3>
              <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
                Transform your vision into reality with cutting-edge technology and expert craftsmanship.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { value: '5+',   label: 'Years Exp.' },
                { value: '30+',  label: 'Projects' },
                { value: '100%', label: 'Satisfaction' },
                { value: '24/7', label: 'Support' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center p-4 bg-white/[0.04] rounded-xl border border-white/[0.07]">
                  <div className="text-2xl font-black font-mono bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent mb-1">
                    {value}
                  </div>
                  <div className="font-mono text-[10px] tracking-widest text-white/30">{label.toUpperCase()}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { href: 'mailto:plantiernoe50@gmail.com', icon: Mail,    label: 'Email Me',  primary: true  },
                { href: 'https://linkedin.com/in/noe-plantier', icon: Linkedin, label: 'LinkedIn', primary: false },
                { href: 'https://github.com/noeplantier',       icon: Github,   label: 'GitHub',   primary: false },
              ].map(({ href, icon: Icon, label, primary }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    primary
                      ? 'bg-gradient-to-r from-violet-500 to-sky-500 text-white hover:shadow-lg hover:shadow-violet-500/30'
                      : 'bg-white/[0.05] text-white/70 hover:text-white border border-white/[0.1] hover:border-white/20 hover:bg-white/[0.08]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </motion.a>
              ))}
            </div>

            <p className="mt-5 text-center font-mono text-[10px] tracking-widest text-white/20">
              RESPONSE WITHIN 24H · FREELANCE & FULL-TIME OPEN
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;