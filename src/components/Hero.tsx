'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import Loader from './Loader';

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [revealH1, setRevealH1] = useState(false);
  const [revealFounder, setRevealFounder] = useState(false);
  const [revealTagline, setRevealTagline] = useState(false);
  const [revealButton, setRevealButton] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const particlesRef = useRef(null);

  // Smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Track mouse position for cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  // Particle background effect
  useEffect(() => {
    if (!particlesRef.current) return;

    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(147, 51, 234, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Connect particles
        particles.slice(i + 1).forEach(particle2 => {
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          {/* H1 with glitch effect */}
          <AnimatePresence>
            {revealH1 && (
              <motion.div className="relative">
                <motion.h1
                  initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-8xl xl:text-9xl font-bold text-center text-white/90 mb-1 sm:mb-2 leading-tight"
                >
                  HI, I'M 
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    {' '}NOÉ
                  </span>
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Founder with typing effect */}
          <AnimatePresence>
            {revealFounder && (
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-white/90 mb-1 sm:mb-2 leading-tight flex items-center justify-center gap-3"
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

            {/* Expertise Cards with magnetic effect */}
            <AnimatePresence>
            {revealTagline && (
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-8 w-full max-w-6xl px-4"
              >
              {[
                {
                icon: '⚡',
                title: 'Full Stack',
                description: 'Back-end x Front-end Development',
                metric: '30+ Projects'
                },
                {
                icon: '📱',
                title: 'Mobile Dev',
                description: 'Modern mobile applications',
                metric: '4+ Years Experience'
                },
                {
                icon: '🚀',
                title: 'Performance',
                description: 'Lightning fast & scalable',
                metric: 'Fastest in class'
                },
                {
                icon: '🎨',
                title: 'UX Design',
                description: 'Modern & user-friendly',
                metric: 'New gen UI/UX'
                }
              ].map((card, index) => (
                <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="flex flex-col items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:border-purple-400/70 hover:shadow-xl hover:shadow-purple-500/30"
                >
                {/* Icon */}
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 transition-all duration-300">
                  <span className="text-xl sm:text-2xl">{card.icon}</span>
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-white text-sm sm:text-base text-center">
                  {card.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-white/80 text-center leading-relaxed">
                  {card.description}
                </p>
                
                {/* Metric */}
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
          

          {/* CTA Buttons with magnetic effect */}
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
                    Ask Claude
                  </motion.a>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

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