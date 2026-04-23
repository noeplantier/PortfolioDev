import { useState, useEffect } from 'react';
import {
  Github, ExternalLink, Star, GitFork, Calendar,
  Smartphone, Globe, FolderGit2, Code2, Layers,
  ArrowUpRight, Circle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
  featured?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const LANGUAGE_META: Record<string, { dot: string; badge: string }> = {
  React:       { dot: 'bg-sky-400',     badge: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
  Next:        { dot: 'bg-white',       badge: 'text-white/80 bg-white/5 border-white/20' },
  'React Native': { dot: 'bg-sky-400', badge: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
  Flutter:     { dot: 'bg-cyan-400',    badge: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
  Nuxt:        { dot: 'bg-emerald-400', badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  'Embedded JavaScript': { dot: 'bg-amber-400', badge: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  Glide:       { dot: 'bg-violet-400',  badge: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  TypeScript:  { dot: 'bg-blue-400',    badge: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
};

const getLangMeta = (lang: string) =>
  LANGUAGE_META[lang] ?? { dot: 'bg-purple-400', badge: 'text-purple-400 bg-purple-400/10 border-purple-400/20' };

const getProjectIcon = (topics: string[]) => {
  if (topics.some(t => ['react-native', 'flutter', 'mobile'].includes(t)))
    return <Smartphone className="w-5 h-5 text-white" />;
  if (topics.some(t => ['ai', 'openai', 'claude'].includes(t)))
    return <Code2 className="w-5 h-5 text-white" />;
  if (topics.some(t => ['nodejs', 'microservices', 'api'].includes(t)))
    return <Layers className="w-5 h-5 text-white" />;
  return <Globe className="w-5 h-5 text-white" />;
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-11 h-11 rounded-xl bg-white/10" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/10 rounded w-2/3" />
        <div className="h-3 bg-white/10 rounded w-1/3" />
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-3 bg-white/10 rounded w-full" />
      <div className="h-3 bg-white/10 rounded w-5/6" />
      <div className="h-3 bg-white/10 rounded w-4/5" />
    </div>
    <div className="flex gap-2">
      <div className="h-6 w-16 bg-white/10 rounded-full" />
      <div className="h-6 w-12 bg-white/10 rounded-full" />
    </div>
  </div>
);

// ─── Variants ─────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 55, damping: 18 } },
};

// ─── Filter Tab ───────────────────────────────────────────────────────────────
const FILTERS = [
  { key: 'all',    label: 'All Projects', icon: FolderGit2 },
  { key: 'web',    label: 'Web Apps',     icon: Globe },
  { key: 'mobile', label: 'Mobile Apps',  icon: Smartphone },
];

// ─── Component ────────────────────────────────────────────────────────────────
const Projects = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const mockRepositories: Repository[] = [
    {
      id: 9,
      name: 'CreatorPro Suite',
      description: 'Comprehensive suite of AI-powered tools for content creators — video editing, script generation, and social media management in one place.',
      html_url: 'https://github.com/noeplantier/creator-studio-suite',
      homepage: 'https://creatorprosuite.netlify.app/',
      stargazers_count: 200,
      forks_count: 50,
      language: 'React',
      updated_at: '2026-05-10T12:00:00Z',
      topics: ['react', 'ai', 'content-creation', 'video-editing'],
      featured: true,
    },
    {
      id: 10,
      name: 'Crypto Compass',
      description: 'Real-time cryptocurrency tracking dashboard with interactive charts, price alerts, and portfolio management tools.',
      html_url: 'https://github.com/noeplantier/crypto-compass',
      homepage: 'https://cryptocompass.netlify.app/',
      stargazers_count: 180,
      forks_count: 40,
      language: 'React',
      updated_at: '2026-06-15T14:30:00Z',
      topics: ['react', 'crypto', 'dashboard', 'real-time'],
      featured: true,
    },
    {
      id: 4,
      name: 'Skin Metrics Lab',
      description: 'AI-powered skin analysis platform built with Nuxt.js and TensorFlow.js, delivering personalised skincare recommendations from uploaded photos.',
      html_url: 'https://github.com/noeplantier/Skin-Metrics-Lab',
      homepage: '',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Nuxt',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['nuxt', 'ai', 'skincare', 'health'],
    },
    {
      id: 2,
      name: 'Ti Padel',
      description: 'Full-stack padel court booking platform with optimised UX, rate limiting, and comprehensive test coverage.',
      html_url: 'https://github.com/noeplantier/Ti-Padel',
      homepage: 'https://ti-padel.com',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Next',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['nodejs', 'microservices', 'express', 'react'],
    },
    {
      id: 0,
      name: 'Feelomi',
      description: 'Medical and mental-health mobile platform built with Flutter — optimised UX, secure auth, and in-app consultation flows.',
      html_url: 'https://github.com/noeplantier/FEELOMI',
      homepage: '',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Flutter',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['flutter', 'mobile', 'health', 'mental-health'],
    },
    {
      id: 1,
      name: "Clem's Coffee Shop",
      description: 'No-code coffee shop booking PWA built with Glide — ordering, reservations, and loyalty programme in a slick mobile wrapper.',
      html_url: 'https://clems-coffee-shop.glide.page/',
      homepage: 'https://clems-coffee-shop.glide.page/',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Glide',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['glide', 'mobile', 'coffee', 'booking'],
    },
    {
      id: 8,
      name: 'Universe App',
      description: 'React Native streaming app for movies and TV shows — sleek UI, personalised recommendations, and smooth navigation.',
      html_url: 'https://github.com/noeplantier/universe-streaming-app',
      homepage: '',
      stargazers_count: 120,
      forks_count: 30,
      language: 'React Native',
      updated_at: '2026-04-21T18:00:00Z',
      topics: ['react-native', 'mobile', 'streaming', 'movies'],
    },
    {
      id: 3,
      name: 'Plantiers',
      description: 'Agency pricing and showcase platform — modular architecture, edge-optimised delivery, and real-time quote generation.',
      html_url: 'https://github.com/noeplantier/plantiers',
      homepage: 'https://plantiers.com',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Next',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['nodejs', 'microservices', 'express', 'react'],
      featured: true,
    },
    {
      id: 5,
      name: 'StudioCall',
      description: 'AI-assisted voice-over and voicemail recording studio for the web — record takes, manage scripts, share previews with clients in one click.',
      html_url: 'https://github.com/hugoisidore/studiocall-front',
      homepage: 'https://www.studiocall.fr/',
      stargazers_count: 89,
      forks_count: 21,
      language: 'Embedded JavaScript',
      updated_at: '2024-01-10T14:20:00Z',
      topics: ['JavaScript', 'Voicemail', 'AI'],
    },
    {
      id: 6,
      name: 'Mots De Maître',
      description: 'Daily motivational quotes mobile app — curated content, offline support, and beautiful typography-first design.',
      html_url: 'https://github.com/noeplantier/Mots-de-ma-tre',
      homepage: 'https://motsdemaitre.netlify.app/',
      stargazers_count: 75,
      forks_count: 18,
      language: 'Next',
      updated_at: '2024-02-15T10:00:00Z',
      topics: ['nextjs', 'nodejs', 'quotes', 'motivation'],
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      setRepositories(mockRepositories);
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = repositories.filter(repo => {
    if (filter === 'all') return true;
    if (filter === 'web')
      return repo.topics.some(t => ['react', 'vue', 'next', 'javascript', 'typescript', 'nuxt', 'nextjs'].includes(t));
    if (filter === 'mobile')
      return repo.topics.some(t => ['react-native', 'flutter', 'mobile', 'glide'].includes(t));
    return true;
  });

  return (
    <section id="projects" className="py-20 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ────────────────────────────────────────────────────────── */}
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
              Open Source · Production
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Main Projects{' '}
            <FolderGit2 className="inline-block w-10 h-10 text-white ml-1 mb-1" />
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Explore my latest work — innovative solutions shipped across web and mobile.
          </p>
        </motion.div>

        {/* ── Filter Tabs ───────────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {FILTERS.map(({ key, label, icon: Icon }) => (
            <motion.button
              key={key}
              onClick={() => setFilter(key)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center gap-3 px-6 py-5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                filter === key
                  ? 'bg-gradient-to-br from-violet-500/25 to-blue-500/25 text-white border-2 border-violet-400/50 shadow-lg shadow-violet-500/15'
                  : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.07] border-2 border-white/[0.08] hover:border-white/15 hover:text-white/80'
              }`}
            >
              <div className={`p-3 rounded-xl transition-all duration-300 ${
                filter === key ? 'bg-gradient-to-br from-violet-500 to-blue-500' : 'bg-white/10'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span>{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* ── Count badge ───────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-center mb-8"
          >
            <span className="font-mono text-[11px] tracking-widest text-white/30 border border-white/[0.08] px-3 py-1 rounded-full">
              {loading ? '—' : filtered.length} PROJECT{filtered.length !== 1 ? 'S' : ''}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* ── Grid ──────────────────────────────────────────────────────────── */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto"
            >
              {filtered.map((repo) => {
                const meta = getLangMeta(repo.language);
                return (
                  <motion.div
                    key={repo.id}
                    variants={cardVariants}
                    className="group relative"
                    whileHover={{ y: -6 }}
                    viewport={{ once: true }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 to-blue-500/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                    <div className="relative flex flex-col h-full p-6 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08] group-hover:border-violet-400/25 transition-all duration-300 overflow-hidden">

                      {/* Featured badge */}
                      {repo.featured && (
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-400/25">
                          <Circle className="w-1.5 h-1.5 fill-violet-400 text-violet-400" />
                          <span className="font-mono text-[9px] tracking-widest text-violet-400">FEATURED</span>
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-start gap-3 mb-4 pr-16">
                        <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-white/[0.07] rounded-xl group-hover:bg-white/10 transition-colors border border-white/[0.07]">
                          {getProjectIcon(repo.topics)}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-blue-300 transition-all duration-300">
                            {repo.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[11px] text-white/35 mt-1 font-mono">
                            <Calendar className="w-3 h-3" />
                            {formatDate(repo.updated_at)}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white/55 text-sm leading-relaxed line-clamp-3 mb-4 group-hover:text-white/75 transition-colors duration-300 flex-1">
                        {repo.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-medium rounded-full border ${meta.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                          {repo.language}
                        </span>
                        {repo.topics.slice(0, 2).map(topic => (
                          <span key={topic} className="px-2.5 py-1 bg-white/[0.05] text-white/35 text-[10px] font-mono rounded-full border border-white/[0.08]">
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Stats row */}
                      <div className="flex items-center gap-4 text-[11px] text-white/35 font-mono mb-4">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400/70" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-sky-400/70" />
                          {repo.forks_count}
                        </span>
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-2 mt-auto">
                        <motion.a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white rounded-xl transition-all text-xs font-semibold flex-1 border border-white/[0.08] hover:border-white/15"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </motion.a>
                        {repo.homepage && (
                          <motion.a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-xl text-xs font-semibold flex-1 hover:shadow-lg hover:shadow-violet-500/30 transition-all"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            Live Demo
                          </motion.a>
                        )}
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500 rounded-full" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── GitHub CTA ────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/noeplantier"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/[0.05] hover:bg-white/[0.08] text-white rounded-2xl font-semibold border border-white/[0.1] hover:border-violet-400/30 transition-all duration-300 group"
          >
            <Github className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            View All Projects on GitHub
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-violet-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;