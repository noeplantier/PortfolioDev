'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Zap, Code, Rocket, Lightbulb } from 'lucide-react';
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

  const socialLinks = [
    { icon: Github, href: 'https://github.com/noeplantier', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/noe-plantier', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:plantiernoe50@gmail.com', label: 'Email' }
  ];

  const devValues = [
    { 
      icon: Zap, 
      title: "Lightning Fast", 
      description: "Optimized for performance, no bloat, just pure speed.",
    },
    { 
      icon: Code, 
      title: "Modern Stack", 
      description: "Built with TypeScript, React, and cutting-edge tools.",
    },
    { 
      icon: Rocket, 
      title: "Developer Experience", 
      description: "Designed for you, not against you.",
    },
    { 
      icon: Lightbulb, 
      title: "Innovative", 
      description: "We don't follow trends, we set them.",
    }
  ];

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
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-2 sm:gap-3 relative z-10">
        {/* H1 avec effet de traînée de poudre */}
        <AnimatePresence>
          {revealH1 && (
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="text-9xl sm:text-9xl md:text-9xl font-bold text-center text-white/90 mb-1 sm:mb-2 px-4"
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
              className="text-5xl sm:text-5xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-2 px-4"
            >
              FOUNDER OF PLANTIERS
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Tagline avec effet de traînée de poudre */}
        <AnimatePresence>
          {revealTagline && (
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-center font-extrabold text-white mb-3 sm:mb-4 max-w-2xl px-4"
            >
              A SOFTWARE AGENCY WHERE CODE AGES LIKE FINE WINE
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Modern Clean Dev Values Cards */}
        <AnimatePresence>
          {revealValues && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 w-full px-4"
            >
              {devValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0 0 0)' }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="relative group cursor-pointer"
                >
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-100 rounded-2xl blur-xl -z-10`}
                  />
                  
                  <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-100 overflow-hidden">
                    {/* Animated gradient orb */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${value.gradient} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-100 rounded-full`} />
                    
                    <div className="relative z-10 flex flex-col items-start h-full">
                      {/* Icon with gradient background */}
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${value.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Title */}
                      <h3 
                        className={`text-lg font-bold text-white mb-2  ${value.gradient}`}
                   
                      >
                        {value.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                        {value.description}
                      </p>

                      {/* Bottom accent line */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2 sm:mt-4">
          {/* Bouton "Get Started" */}
          <AnimatePresence>
            {revealButton && (
            
                <motion.a
                  href="#skills"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-base rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
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
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-base rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  
                  Ask Robot
                </motion.a>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}