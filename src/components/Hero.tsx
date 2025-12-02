'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Zap, Code, Rocket, Lightbulb } from 'lucide-react';

export default function Hero() {
  const [revealH1, setRevealH1] = useState(false);
  const [revealFounder, setRevealFounder] = useState(false);
  const [revealTagline, setRevealTagline] = useState(false);
  const [revealValues, setRevealValues] = useState(false);
  const [revealButton, setRevealButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setRevealH1(true), 0);
    const timer2 = setTimeout(() => setRevealFounder(true), 0);
    const timer3 = setTimeout(() => setRevealTagline(true), 0);
    const timer4 = setTimeout(() => setRevealValues(true), 0);
    const timer5 = setTimeout(() => setRevealButton(true), 0);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/noeplantier', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/noe-plantier', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:plantiernoe50@gmail.com', label: 'Email' }
  ];

  const devValues = [
    { icon: Zap, title: "Lightning Fast", description: "Optimized for performance, no bloat, just pure speed." },
    { icon: Code, title: "Modern Stack", description: "Built with TypeScript, React, and cutting-edge tools." },
    { icon: Rocket, title: "Developer Experience", description: "Designed for you, not against you." },
    { icon: Lightbulb, title: "Innovative", description: "We don't follow trends, we set them." }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif" }}
    >
      

      {/* Contenu centré et compact */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-2 sm:gap-3 relative z-10">
        {/* H1 avec effet de traînée de poudre */}
        <AnimatePresence>
          {revealH1 && (
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-9xl sm:text-9xl md:text-9xl font-bold text-center text-white/90 mb-1 sm:mb-2 px-4"
            >
              HI, I'M NOÉ
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Founder avec effet de traînée de poudre */}
        <AnimatePresence>
          {revealFounder && (
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-5xl sm:text-5xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-1 sm:mb-2 px-4"
            >
              FOUNDER OF PLANTIERS
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Tagline avec effet de traînée de poudre */}
        <AnimatePresence>
          {revealTagline && (
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-base sm:text-lg text-center text-white/70 mb-3 sm:mb-4 max-w-2xl px-4"
            >
              A SOFTWARE AGENCY WHERE CODE AGES LIKE FINE WINE
            </motion.p>
          )}
        </AnimatePresence>

        {/* Valeurs développeur avec effet de traînée de poudre */}
        <AnimatePresence>
          {revealValues && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-5 w-full max-w-3xl px-4"
            >
              {devValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0 0 0)' }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(147, 51, 234, 0.2)' }}
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <value.icon className="w-5 h-5 text-purple-300 shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-white/90">{value.title}</h3>
                      <p className="text-xs text-white/60">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton " Get Started" avec effet de traînée de poudre */}
        <AnimatePresence>
          {revealButton && (
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="flex gap-3"
            >
              <motion.a
                href="#skills"
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white/90 font-medium text-sm sm:text-base rounded-full hover:shadow-lg transition-all duration-200"
              >
                Get Started
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

      
      </div>
    </section>
  );
}
