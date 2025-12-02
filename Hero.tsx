import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Code2, Database, Palette, Server, Smartphone, Zap } from 'lucide-react';

const Hero = () => {
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [secondaryIndex, setSecondaryIndex] = useState(0);
  const primaryText = "Full Stack Developer";
  const secondaryText = "Crafting Digital Experiences with Passion & Precision";

  useEffect(() => {
    if (primaryIndex < primaryText.length) {
      const timeout = setTimeout(() => {
        setPrimaryIndex(primaryIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [primaryIndex]);

  useEffect(() => {
    if (primaryIndex === primaryText.length && secondaryIndex < secondaryText.length) {
      const timeout = setTimeout(() => {
        setSecondaryIndex(secondaryIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [primaryIndex, secondaryIndex]);

  const skills = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Frontend Development",
      description: "React, TypeScript, Next.js, Tailwind CSS",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Backend Development",
      description: "Node.js, Express, Python, REST APIs",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database Management",
      description: "MongoDB, PostgreSQL, Redis, Prisma",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Figma, Adobe XD, Responsive Design",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      description: "React Native, Progressive Web Apps",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "SEO, Lighthouse, Web Vitals",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-20 min-h-[200px] flex flex-col justify-center">
          {/* Title - Fixed Position */}
          <motion.div 
            className="mb-6 h-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {primaryText.substring(0, primaryIndex)}
              {primaryIndex < primaryText.length && (
                <span className="animate-pulse">|</span>
              )}
            </motion.h1>
          </motion.div>

          {/* Subtitle - Fixed Position */}
          <motion.div 
            className="h-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: primaryIndex >= primaryText.length ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-2xl md:text-3xl font-light text-gray-300 animated-gradient-text cursor-pointer"
              whileHover={{ scale: 1.02, letterSpacing: "0.05em" }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #a855f7, #3b82f6, #a855f7)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 3s ease infinite'
              }}
            >
              {secondaryText.substring(0, secondaryIndex)}
              {secondaryIndex < secondaryText.length && secondaryIndex > 0 && (
                <span className="animate-pulse">|</span>
              )}
            </motion.p>
          </motion.div>
        </div>

        {/* Skills Cards */}
        {secondaryIndex >= secondaryText.length && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <motion.div 
                    className={`inline-block p-3 rounded-xl bg-gradient-to-br ${skill.color} text-white mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {skill.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                    {skill.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {skill.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Buttons */}
        {secondaryIndex >= secondaryText.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.3 }}
            className="flex items-center flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        {secondaryIndex >= secondaryText.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
            >
              <motion.div className="w-1.5 h-1.5 bg-white rounded-full"></motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;