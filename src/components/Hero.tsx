'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Zap, Code, Rocket, Lightbulb, Sparkles } from 'lucide-react';
import * as THREE from 'three';

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [revealH1, setRevealH1] = useState(false);
  const [revealFounder, setRevealFounder] = useState(false);
  const [revealTagline, setRevealTagline] = useState(false);
  const [revealValues, setRevealValues] = useState(false);
  const [revealButton, setRevealButton] = useState(false);
  const canvasRef = useRef(null);

  // 3D Grape Loading Animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x9333ea, 2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x3b82f6, 1.5);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create grape bunch
    const grapeGroup = new THREE.Group();
    
    // Main grape spheres with realistic material
    const grapeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6b21a8,
      metalness: 0.1,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      reflectivity: 0.8,
      transparent: true,
      opacity: 0.95
    });

    // Create multiple grapes in a bunch formation
    const grapePositions = [
      { x: 0, y: 0, z: 0, scale: 1.2 },
      { x: -0.8, y: 0.8, z: 0.2, scale: 1 },
      { x: 0.8, y: 0.8, z: -0.2, scale: 1 },
      { x: -0.6, y: -0.9, z: 0.3, scale: 0.9 },
      { x: 0.6, y: -0.9, z: -0.3, scale: 0.9 },
      { x: 0, y: 1.5, z: 0, scale: 0.85 },
      { x: -1.2, y: 0, z: 0, scale: 0.8 },
      { x: 1.2, y: 0, z: 0.1, scale: 0.8 },
      { x: 0, y: -1.6, z: 0, scale: 0.75 }
    ];

    grapePositions.forEach(pos => {
      const geometry = new THREE.SphereGeometry(0.5 * pos.scale, 32, 32);
      const grape = new THREE.Mesh(geometry, grapeMaterial);
      grape.position.set(pos.x, pos.y, pos.z);
      grapeGroup.add(grape);
    });

    // Add stem
    const stemGeometry = new THREE.CylinderGeometry(0.08, 0.12, 1.5, 8);
    const stemMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4a5568,
      metalness: 0.2,
      roughness: 0.7
    });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 2.2;
    grapeGroup.add(stem);

    scene.add(grapeGroup);

    // Animation
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      grapeGroup.rotation.y += 0.01;
      grapeGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      grapeGroup.position.y = Math.sin(Date.now() * 0.002) * 0.3;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Loading timer
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setRevealH1(true), 100);
      setTimeout(() => setRevealFounder(true), 100);
      setTimeout(() => setRevealTagline(true), 200);
      setTimeout(() => setRevealValues(true), 300);
      setTimeout(() => setRevealButton(true), 300);
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);


  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif" }}
    >
      {/* 3D Grape Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <canvas ref={canvasRef} className="absolute inset-0" />
         
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 relative z-10 px-4 sm:px-6 md:px-8">
  {/* H1 avec effet de traînée de poudre */}
  <AnimatePresence>
    {revealH1 && (
      <motion.h1
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        exit={{ clipPath: 'inset(0 100% 0 0)' }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center text-white/90 mb-1 sm:mb-2 leading-tight"
      >
        HI, I'M 
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> NOÉ</span>
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
        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-white/90 mb-1 sm:mb-2 leading-tight"
      >
        FOUNDER OF 
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> PLANTIERS</span>

      </motion.h2>
    )}
  </AnimatePresence>

  

  {/* Expertise Cards */}
<AnimatePresence>
  {revealTagline && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 w-full max-w-6xl px-4"
    >
      {[
        {
          icon: '⚡',
          title: 'Full Stack',
          description: 'Back-end x Front-end Development',
          gradient: 'from-purple-500/20 to-blue-500/20',
          hoverGradient: 'from-purple-500 to-blue-500'
        },
        {
          icon: '📱',
          title: 'Mobile Dev',
          description: 'Modern mobile applications',
          gradient: 'from-purple-500/20 to-blue-500/20',
          hoverGradient: 'from-purple-500 to-blue-500'
        },
        {
          icon: '🚀',
          title: 'Performance',
          description: 'Lightning fast & scalable',
          gradient: 'from-purple-500/20 to-blue-500/20',
          hoverGradient: 'from-purple-500 to-blue-500'
        },
        {
          icon: '🎨',
          title: 'UX Design',
          description: 'Modern & user-friendly',
          gradient: 'from-purple-500/20 to-blue-500/20',
          hoverGradient: 'from-purple-500 to-blue-500'
        }
      ].map((card, index) => (
        <motion.div
          key={card.title}
          className="group relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          {/* Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          <div className="relative flex flex-col gap-2 sm:gap-3 p-4 sm:p-5 bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/10 group-hover:border-purple-400/30 transition-all duration-300 h-full">
            {/* Icon */}
            <div className="text-3xl sm:text-4xl mb-1">{card.icon}</div>
            
            {/* Title */}
            <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
              {card.title}
            </h3>
            
            {/* Description */}
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              {card.description}
            </p>
            
          
          </div>
        </motion.div>
      ))}
    </motion.div>
  )}
</AnimatePresence>

  {/* CTA Buttons */}
  <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 w-full max-w-xs xs:max-w-none xs:w-auto">
    {/* Bouton "Get Started" */}
    <AnimatePresence>
      {revealButton && (
        <motion.a
          href="#skills"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-center"
        >
          Get Started
        </motion.a>
      )}
    </AnimatePresence>

    {/* Bouton "Ask AI" */}
    <AnimatePresence>
      {revealButton && (
        <motion.a
          href="#ask-ai"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          Ask AI
        </motion.a>
      )}
      </AnimatePresence>
        </div>
      </div>
    </section>
  );
}