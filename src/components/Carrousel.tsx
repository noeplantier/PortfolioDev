import {useEffect, useMemo, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight, Info, MonitorSmartphone, Smartphone, Code2, Sparkles} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  title: string;
  prompt: string;
  imageUrl: string;
  description: string;
  tags: string[];
  type: 'web' | 'mobile';
}

const Carrousel = () => {
  // Fictitious AI-generated visuals via prompt-based URLs (no external SDK needed)
  const slides: Slide[] = useMemo(() => ([
    {
      id: 1,
      title: 'Next.js SaaS Dashboard',
      prompt: 'ultra realistic ui, modern next.js saas dashboard, glassmorphism, charts, code editor, gradient lighting, professional product shot',
      imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('ultra realistic ui, modern next.js saas dashboard, glassmorphism, charts, code editor, gradient lighting, professional product shot')}`,
      description: 'A clean, metrics-first admin dashboard concept with real‑time charts, code snippets, and a glass UI that mirrors my web stack.',
      tags: ['Next.js', 'TypeScript', 'Charts', 'UI/UX'],
      type: 'web',
    },
    {
      id: 2,
      title: 'React Native Dev Studio',
      prompt: 'photorealistic mobile development studio, react native emulator, dark theme code editor, device frames, neon accents, cinematic lighting',
      imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('photorealistic mobile development studio, react native emulator, dark theme code editor, device frames, neon accents, cinematic lighting')}`,
      description: 'Mobile development flow showcasing device previews, dark editor, and a fast iteration loop aligned with my mobile projects.',
      tags: ['React Native', 'Expo', 'Mobile', 'Dark Theme'],
      type: 'mobile',
    },
    {
      id: 3,
      title: 'Node & Express API Lab',
      prompt: 'realistic backend api lab, node.js express, logs and monitoring screens, terminal, server racks, moody blue purple gradient light',
      imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('realistic backend api lab, node.js express, logs and monitoring screens, terminal, server racks, moody blue purple gradient light')}`,
      description: 'Back‑end API environment with observability in focus — reflecting my emphasis on robust Node.js services.',
      tags: ['Node.js', 'Express', 'APIs', 'Observability'],
      type: 'web',
    },
    {
      id: 4,
      title: 'Flutter UI Playground',
      prompt: 'highly realistic mobile ui playground, flutter widgets, component gallery, material 3, soft shadows, vibrant gradient background',
      imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('highly realistic mobile ui playground, flutter widgets, component gallery, material 3, soft shadows, vibrant gradient background')}`,
      description: 'Component‑driven mobile UI exploration with crisp layouts and delightful motion — a nod to my Flutter experience.',
      tags: ['Flutter', 'Material 3', 'Animations', 'Widgets'],
      type: 'mobile',
    },
    {
      id: 5,
      title: 'Full‑Stack Dev Workspace',
      prompt: 'photo realistic developer desk setup, dual monitors code and design, typescript, graphql schema, productivity aesthetic, depth of field',
      imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('photo realistic developer desk setup, dual monitors code and design, typescript, graphql schema, productivity aesthetic, depth of field')}`,
      description: 'A holistic full‑stack station — code, design, and product in harmony, reflecting how I ship end‑to‑end features.',
      tags: ['TypeScript', 'GraphQL', 'Design Systems', 'Product'],
      type: 'web',
    },
  ]), []);

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = (i: number) => {
    const next = (i + slides.length) % slides.length;
    setIndex(next);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay with pause on hover
  useEffect(() => {
    if (hovered) return;
    timeoutRef.current && window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(next, 5000);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [index, hovered]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Touch swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next(); else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="carrousel" className="relative py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 overflow-hidden">
      {/* soft background sparkles to match Hero vibe */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-10 text-white/90">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Featured Workflows — Web & Mobile</h2>
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Slide */}
          <div className="relative aspect-[16/9] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[index].id}
                src={slides[index].imageUrl}
                alt={`${slides[index].title} — AI generated visual`}
                className="h-full w-full object-cover"
                initial={{ opacity: 0.2, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                loading="lazy"
              />
            </AnimatePresence>

            {/* Gradient overlay + info panel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <motion.div
              className="absolute left-0 right-0 bottom-0 p-6 md:p-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl p-5 md:p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  {slides[index].type === 'web' ? (
                    <MonitorSmartphone className="w-5 h-5" />
                  ) : (
                    <Smartphone className="w-5 h-5" />
                  )}
                  <h3 className="text-xl md:text-2xl font-bold">
                    {slides[index].title}
                  </h3>
                </div>
                <p className="text-white/90 leading-relaxed flex items-start gap-2">
                  <Info className="w-5 h-5 mt-1 shrink-0" />
                  {slides[index].description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {slides[index].tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="px-3 py-1 rounded-full text-sm bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-sm transition"
                      aria-label={`More about ${tag}`}
                      onClick={() => {
                        // lightweight interactivity: jump to next matching slide if exists
                        const found = slides.findIndex((s) => s.tags.includes(tag));
                        if (found !== -1) setIndex(found);
                      }}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
              <button
                type="button"
                onClick={prev}
                className="h-10 w-10 md:h-12 md:w-12 grid place-content-center rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                aria-label="Previous slide"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                type="button"
                onClick={next}
                className="h-10 w-10 md:h-12 md:w-12 grid place-content-center rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                aria-label="Next slide"
                title="Next"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={[
                    'h-2.5 rounded-full transition border border-white/30',
                    i === index ? 'w-8 bg-white/90' : 'w-2.5 bg-white/40 hover:bg-white/60',
                  ].join(' ')}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Secondary caption row to echo skills */}
        <div className="mt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
          <div className="backdrop-blur bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center gap-3">
            <Code2 className="w-5 h-5" />
            <p className="text-sm">Clean, scalable code — from APIs to UI components.</p>
          </div>
          <div className="backdrop-blur bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center gap-3">
            <MonitorSmartphone className="w-5 h-5" />
            <p className="text-sm">Responsive by default — web and mobile experiences in sync.</p>
          </div>
          <div className="backdrop-blur bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center gap-3">
            <Smartphone className="w-5 h-5" />
            <p className="text-sm">From prototypes to production — I ship iteratively and fast.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carrousel;
