'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

export default function Hero() {
  const [displayedH1, setDisplayedH1] = useState('');
  const [h1Index, setH1Index] = useState(0);
  const h1Text = "HI, I'M NOÉ";
  
  const [displayedFounder, setDisplayedFounder] = useState('');
  const [founderIndex, setFounderIndex] = useState(0);
  const founderText = 'FOUNDER OF PLANTIERS';
  
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const secondaryText = 'A Software Agency where code ages like fine wine';
  const [displayedSecondary, setDisplayedSecondary] = useState('');
  const [secondaryIndex, setSecondaryIndex] = useState(0);

  useEffect(() => {
    // Animation H1 en premier
    if (h1Index < h1Text.length) {
      const timeout = setTimeout(() => {
        setDisplayedH1(h1Text.slice(0, h1Index + 1));
        setH1Index(h1Index + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
    // Animation Founder après H1
    else if (founderIndex < founderText.length) {
      const timeout = setTimeout(() => {
        setDisplayedFounder(founderText.slice(0, founderIndex + 1));
        setFounderIndex(founderIndex + 1);
      }, 60);
      return () => clearTimeout(timeout);
    }

    // Animation texte secondaire
    else if (secondaryIndex < secondaryText.length) {
      const timeout = setTimeout(() => {
        setDisplayedSecondary(secondaryText.slice(0, secondaryIndex + 1));
        setSecondaryIndex(secondaryIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [h1Index, founderIndex, currentIndex, secondaryIndex]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/noeplantier', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/noe-plantier', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:plantiernoe50@gmail.com', label: 'Email' }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl gap-16 items-center relative z-10">
        {/* Content Centré */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 flex flex-col items-center lg:items-start"
        >
          {/* Titre H1 avec effet balayage */}
          <div className="space-y-4 w-full">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-white block mb-2">
                {h1Text.split("Noé Plantier")[0].split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: index < h1Index ? 1 : 0,
                      y: index < h1Index ? 0 : 20
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05
                    }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            
            </motion.h1>

            {/* FUNDATOR OF PLANTIERS avec effet balayage */}
            {h1Index >= h1Text.length && (
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold flex items-center justify-center lg:justify-start gap-3 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {founderText.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: index < founderIndex ? 1 : 0,
                      y: index < founderIndex ? 0 : 20
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.04
                    }}
                    className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
                {founderIndex >= founderText.length && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="inline-block"
                    style={{
                      background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #6366f1 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.5))',
                      fontSize: '48px',
                      lineHeight: '48px'
                    }}
                  >
                    🍇
                  </motion.span>
                )}
              </motion.h2>
            )}

            {/* Sous-titre tagline */}
            {founderIndex >= founderText.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 inline-block"
              >
                <span className="text-purple-300 font-semibold text-sm md:text-base uppercase">
                  A SOFTWARE AGENCY WHERE CODE AGES LIKE FINE WINE
                </span>
              </motion.div>
            )}
          </div>

      
          {/* CTA Buttons */}
          {secondaryIndex >= secondaryText.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          )}

          {/* Social Links */}
          {secondaryIndex >= secondaryText.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex gap-4 justify-center"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          )}
        </motion.div>

       
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 translate-x-1/2"
      >
        <motion.a
          href="#skills"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}