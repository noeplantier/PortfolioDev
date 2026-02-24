'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, Variants } from 'framer-motion';
import { Sparkles, Zap, X, TrendingUp, Users, Target, BarChart3, ArrowRight } from 'lucide-react';
import Loader from './Loader';

// --- Types ---
type CardData = {
  icon: string;
  title: string;
  description: string;
  metric: string;
  stats: { label: string; value: string; icon: React.ReactNode }[];
};

// --- Animations Configuration ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 50, damping: 20 } 
  },
};

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'button' | 'card'>('default');
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- Mouse Tracking & Custom Cursor ---
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  // --- Particles Animation System (Optimized) ---
  useEffect(() => {
    if (isLoading) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let requestID: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Légèrement moins de particules pour garder le look épuré original
      const particleCount = Math.min(window.innerWidth / 15, 80); 
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Vitesse plus lente et subtile
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${p.alpha})`;
        ctx.fill();

        // Connexions subtiles
        const dx = cursorX.get() - p.x;
        const dy = cursorY.get() - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(cursorX.get(), cursorY.get());
          ctx.strokeStyle = `rgba(147, 51, 234, ${0.15 - distance / 120 * 0.15})`;
          ctx.stroke();
        }
      });
      
      requestID = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestID);
    };
  }, [isLoading, cursorX, cursorY]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  const cards: CardData[] = [
    {
      icon: '⚡',
      title: 'Full Stack',
      description: 'Robust Architectures',
      metric: '30+ Projects',
      stats: [
        { label: 'Uptime', value: '100%', icon: <Zap className="w-4 h-4" /> },
        { label: 'Code Quality', value: 'A+', icon: <Target className="w-4 h-4" /> },
      ]
    },
    {
      icon: '📱',
      title: 'Mobile Dev',
      description: 'Seamless Experiences',
      metric: 'iOS & Android',
      stats: [
        { label: 'Rating', value: '5.0', icon: <Sparkles className="w-4 h-4" /> },
        { label: 'Crash Free', value: '99.9%', icon: <BarChart3 className="w-4 h-4" /> },
      ]
    },
    {
      icon: '🚀',
      title: 'Performance',
      description: 'Next.js Optimization',
      metric: '< 100ms TTI',
      stats: [
        { label: 'Core Vitals', value: '100', icon: <Zap className="w-4 h-4" /> },
        { label: 'SEO Score', value: '100%', icon: <TrendingUp className="w-4 h-4" /> },
      ]
    },
    {
      icon: '🎨',
      title: 'UI/UX',
      description: 'Pixel Perfect Design',
      metric: 'Award Winning',
      stats: [
        { label: 'Retention', value: '+45%', icon: <Users className="w-4 h-4" /> },
        { label: 'Conversion', value: 'High', icon: <TrendingUp className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onLoadingComplete={handleLoadingComplete} key="loader" />}
      </AnimatePresence>

      {/* Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-exclusion"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={{
          default: { height: 20, width: 20, backgroundColor: '#fff', opacity: 0.8 },
          button: { height: 60, width: 60, backgroundColor: '#fff', opacity: 0.2 },
          card: { height: 80, width: 80, backgroundColor: 'rgba(147, 51, 234, 1)', opacity: 0.2, border: '1px solid white' }
        }}
        animate={cursorVariant}
      />

      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-white selection:bg-purple-500/30"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
        />
        
        {/* Original Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[100px] animate-pulse delay-1000" />

        <motion.div 
          className="w-full max-w-7xl flex flex-col items-center justify-center relative z-10 px-4 py-8"
          variants={containerVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
        >
          
          {/* Main Title - Preserved Original Styling */}
          <motion.div variants={itemVariants} className="relative z-20 text-center mb-0">
            <h1 
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="font-extrabold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 text-[16vw] sm:text-[14vw] xl:text-[13rem]"
            >
              HI! I'M
              <span className="relative inline-block ml-4 md:ml-8">
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-50"></span>
                <span className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  NOÉ
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle - Preserved Original Styling */}
          <motion.div variants={itemVariants} className="relative z-20 text-center mb-12">
            <h1 
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="font-extrabold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 text-[8vw] sm:text-[6vw] xl:text-[5rem]"
            >
              FOUNDER OF
              <span className="relative inline-block ml-4 md:ml-8">
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-50"></span>
                <span className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  PLANTIERS
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Cards - Preserved Original Layout */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mb-12"
          >
            {cards.map((card) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedCard(card)}
                onMouseEnter={() => setCursorVariant('card')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group relative p-6 rounded-2xl  border border-white/10  backdrop-blur-xl cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="mb-4 text-4xl p-3 bg-white/1 rounded-full border border-white/5 shadow-inner">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{card.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{card.description}</p>
                  
                  <div className="mt-auto w-full pt-4 border-t border-white/10 flex justify-center items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-400">{card.metric}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons - Preserved Original Styling */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto"
          >
            <motion.a
              href="#skills"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl  bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-white font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow"
            >
              Get Started <Zap className="w-4 h-4" />
            </motion.a>

            <motion.a
              href="#ask-ai"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-white/20 transition-colors"
            >
              Ask AI <Sparkles className="w-4 h-4" />
            </motion.a>
          </motion.div>

        </motion.div>
      </section>

      {/* Modal - Improved Code, Same Visuals */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 blur-[80px]" />

              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 text-4xl">
                    {selectedCard.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{selectedCard.title}</h2>
                    <p className="text-purple-400 font-medium">{selectedCard.metric}</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {selectedCard.stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-purple-400">{stat.icon}</span>
                        <span>{stat.label}</span>
                      </div>
                      <span className="text-lg font-bold text-white font-mono tracking-tight">
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                   <div className="flex gap-2 items-center text-sm text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Verified Metrics
                   </div>
                   <button onClick={() => setSelectedCard(null)} className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                      Close <ArrowRight className="w-3 h-3" />
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
        @media (min-width: 768px) {
           body { cursor: none; }
           a, button, [role="button"] { cursor: none; }
        }
      `}</style>
    </>
  );
}