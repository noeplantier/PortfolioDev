'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Zap, X, TrendingUp, Users, Target, BarChart3 } from 'lucide-react';
import Loader from './Loader';

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [revealH1, setRevealH1] = useState(false);
  const [revealFounder, setRevealFounder] = useState(false);
  const [revealTagline, setRevealTagline] = useState(false);
  const [revealButton, setRevealButton] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [selectedCard, setSelectedCard] = useState(null);
  const particlesRef = useRef(null);

  // Smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Track mouse position for cursor and particles
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);



  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setRevealH1(true), 100);
    setTimeout(() => setRevealFounder(true), 200);
    setTimeout(() => setRevealTagline(true), 400);
    setTimeout(() => setRevealButton(true), 600);
  };

  const cursorVariants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(147, 51, 234, 0.5)',
      border: '2px solid rgba(147, 51, 234, 1)',
      mixBlendMode: 'difference'
    },
    button: {
      height: 64,
      width: 64,
      backgroundColor: 'rgba(147, 51, 234, 0.2)',
      border: '2px solid rgba(147, 51, 234, 1)',
      mixBlendMode: 'difference'
    }
  };

  const cards = [
    {
      icon: '⚡',
      title: 'Full Stack',
      description: 'Back-end x Front-end Development',
      metric: '30+ Projects',
      stats: [
        { label: 'Uptime', value: '100%', icon: <Zap className="w-4 h-4" /> },
        { label: 'Code Quality', value: 'A+', icon: <Target className="w-4 h-4" /> },
        { label: 'Latency', value: '< 100ms', icon: <TrendingUp className="w-4 h-4" /> }
      ]
    },
    {
      icon: '📱',
      title: 'Mobile Dev',
      description: 'Modern mobile applications',
      metric: '4+ Years Experience',
      stats: [
        { label: 'Active Users', value: '10+', icon: <Users className="w-4 h-4" /> },
        { label: 'App Rating', value: '5/5', icon: <Sparkles className="w-4 h-4" /> },
        { label: 'Crash Rate', value: '0.01%', icon: <BarChart3 className="w-4 h-4" /> }
      ]
    },
    {
      icon: '🚀',
      title: 'Performance',
      description: 'Lightning fast & scalable',
      metric: 'Fastest in class',
      stats: [
        { label: 'Load Time', value: '0.8s', icon: <Zap className="w-4 h-4" /> },
        { label: 'Optimization', value: '100%', icon: <Target className="w-4 h-4" /> },
        { label: 'Scalability', value: 'Infinite', icon: <TrendingUp className="w-4 h-4" /> }
      ]
    },
    {
      icon: '🎨',
      title: 'UX Design',
      description: 'Modern & user-friendly',
      metric: 'New gen UI/UX',
      stats: [
        { label: 'User Retention', value: '85%', icon: <Users className="w-4 h-4" /> },
        { label: 'Satisfaction', value: '100%', icon: <Sparkles className="w-4 h-4" /> },
        { label: 'Conversion', value: '+40%', icon: <TrendingUp className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <>
      {/* Loader Component */}
      <AnimatePresence>
        {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Custom Futuristic Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 700 }}
      />

      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden cursor-none"
        style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif" }}
      >
        {/* Particle Background */}
        <canvas
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.6 }}
        />

        {/* Main Content */}
        <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 relative z-10 px-4 sm:px-6 md:px-8 py-8">
          {/* H1 with React Bits SplitText */}
          {/* H1 Title */}
          <div className="relative min-h-[120px] flex items-center justify-center">
            <AnimatePresence>
              {revealH1 && (
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-7xl xs:text-8xl sm:text-[9rem] md:text-[10rem] lg:text-[11rem] xl:text-[13rem] font-extrabold text-center text-white/90 mb-1 sm:mb-2 leading-none tracking-tighter"
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  HI ! I'M       <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    {' '}NOÉ
                  </span>
                </span>
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
          {/* Founder with typing effect */}
          <AnimatePresence>
            {revealFounder && (
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center text-white/90 mb-1 sm:mb-2 leading-tight flex items-center justify-center gap-3"
              >
                FOUNDER OF 
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    {' '}PLANTIERS
                  </span>
                </span>
              </motion.h2>
            )}
          </AnimatePresence>

          {/* Expertise Cards */}
          <AnimatePresence>
            {revealTagline && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-8 w-full max-w-6xl px-4"
              >
                {cards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCard(card)}
                    onMouseEnter={() => setCursorVariant('button')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="flex flex-col items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:border-purple-400/70 hover:shadow-xl hover:shadow-purple-500/30 cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 transition-all duration-300">
                      <span className="text-xl sm:text-2xl">{card.icon}</span>
                    </div>
                    <h3 className="font-bold text-white text-sm sm:text-base text-center">{card.title}</h3>
                    <p className="text-xs text-white/80 text-center leading-relaxed">{card.description}</p>
                    <div className="mt-auto pt-1.5 sm:pt-2 border-t border-white/20 w-full">
                      <div className="text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center">
                        {card.metric}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 w-full max-w-xs xs:max-w-none xs:w-auto">
            <AnimatePresence>
              {revealButton && (
                <>
                  <motion.a
                    href="#skills"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setCursorVariant('button')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 text-m font-semibold justify-center"
                  >
                    <Zap className="w-4 h-4" />
                    Get Started
                  </motion.a>

                  <motion.a
                    href="#ask-ai"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setCursorVariant('button')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 text-m font-semibold justify-center relative"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    Ask IA
                  </motion.a>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Modal for Cards */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-gradient-to-br from-gray-900 to-purple-900/50 border border-purple-500/30 rounded-2xl p-6 shadow-2xl overflow-hidden"
            >
              {/* Modal Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 blur-[100px]" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[100px]" />

              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-2xl">
                  {selectedCard.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCard.title}</h2>
                  <p className="text-purple-300/80">{selectedCard.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                {selectedCard.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3 text-white/70">
                      {stat.icon}
                      <span>{stat.label}</span>
                    </div>
                    <div className="text-xl font-bold text-white font-mono">
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Status</span>
                  <span className="flex items-center gap-2 text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Live Data Active
                  </span>
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
          animation: gradient 3s ease infinite;
        }
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
