import { useState } from 'react';
import { Smartphone, Globe, Database, Zap, Star, Calendar, Mail, MessageCircle, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Globe,
      color: 'from-blue-400 to-cyan-400',
      skills: [
        { 
          name: 'React', 
          level: 95, 
          experience: '4+ years', 
          projects: 35,
          icon: '⚛️',
          description: 'Advanced hooks, Context API, Redux, performance optimization'
        },
        { 
          name: 'Next.js', 
          level: 92, 
          experience: '4+ years', 
          projects: 18,
          icon: '▲',
          description: 'SSR, SSG, API routes, middleware, App Router'
        },
        { 
          name: 'TypeScript', 
          level: 94, 
          experience: '4+ years', 
          projects: 40,
          icon: '🔷',
          description: 'Advanced types, generics, utility types, strict mode'
        },
        { 
          name: 'Tailwind CSS', 
          level: 96, 
          experience: '4+ years', 
          projects: 32,
          icon: '🎨',
          description: 'Custom designs, plugins, responsive utilities, JIT mode'
        },
        { 
          name: 'Vue.js', 
          level: 85, 
          experience: '3+ years', 
          projects: 12,
          icon: '💚',
          description: 'Composition API, Pinia, Nuxt.js integration'
        },
        { 
          name: 'Framer Motion', 
          level: 90, 
          experience: '4+ years', 
          projects: 25,
          icon: '🎭',
          description: 'Complex animations, gestures, layout animations'
        }
      ]
    },
    mobile: {
      title: 'Mobile Development',
      icon: Smartphone,
      color: 'from-purple-400 to-pink-400',
      skills: [
        { 
          name: 'React Native', 
          level: 93, 
          experience: '4+ years', 
          projects: 20,
          icon: '📱',
          description: 'Native modules, performance optimization, cross-platform'
        },
        { 
          name: 'Expo', 
          level: 91, 
          experience: '4+ years', 
          projects: 15,
          icon: '🚀',
          description: 'EAS Build, OTA updates, push notifications'
        },
        { 
          name: 'Flutter', 
          level: 87, 
          experience: '3+ years', 
          projects: 8,
          icon: '🦋',
          description: 'Custom widgets, state management, platform channels'
        },
        { 
          name: 'iOS Development', 
          level: 80, 
          experience: '3+ years', 
          projects: 10,
          icon: '🍎',
          description: 'Swift, UIKit, SwiftUI, App Store deployment'
        },
        { 
          name: 'Android Development', 
          level: 82, 
          experience: '2+ years', 
          projects: 12,
          icon: '🤖',
          description: 'Kotlin, Jetpack Compose, Play Store optimization'
        },
        { 
          name: 'PWA', 
          level: 89, 
          experience: '3+ years', 
          projects: 14,
          icon: '🌐',
          description: 'Service workers, offline-first, app manifest'
        }
      ]
    },
    backend: {
      title: 'Backend & Database',
      icon: Database,
      color: 'from-green-400 to-emerald-400',
      skills: [
        { 
          name: 'Node.js', 
          level: 96, 
          experience: '4+ years', 
          projects: 38,
          icon: '🟢',
          description: 'Express, Fastify, microservices, real-time apps'
        },
        { 
          name: 'PostgreSQL', 
          level: 88, 
          experience: '4+ years', 
          projects: 16,
          icon: '🐘',
          description: 'Complex queries, indexes, optimization, migrations'
        },
        { 
          name: 'MongoDB', 
          level: 85, 
          experience: '4+ years', 
          projects: 20,
          icon: '🍃',
          description: 'Aggregations, indexes, Mongoose, Atlas'
        },
        { 
          name: 'Golang', 
          level: 87, 
          experience: '4+ years', 
          projects: 10,
          icon: '🐹',
          description: 'Goroutines, channels, microservices, REST APIs, concurrency patterns, performance optimization'
        },
        { 
          name: 'Firebase', 
          level: 90, 
          experience: '4+ years', 
          projects: 25,
          icon: '🔥',
          description: 'Firestore, Auth, Cloud Functions, Hosting'
        },
        { 
          name: 'REST APIs', 
          level: 97, 
          experience: '4+ years', 
          projects: 42,
          icon: '🔌',
          description: 'RESTful design, authentication, rate limiting'
        }
      ]
    },
    devops: {
      title: 'DevOps & Tools',
      icon: Zap,
      color: 'from-orange-400 to-red-400',
      skills: [
        { 
          name: 'Docker', 
          level: 87, 
          experience: '3+ years', 
          projects: 22,
          icon: '🐳',
          description: 'Containers, Docker Compose, optimization'
        },
        { 
          name: 'Git & GitHub', 
          level: 98, 
          experience: '4+ years', 
          projects: 50,
          icon: '📦',
          description: 'Advanced workflows, CI/CD, GitHub Actions'
        },
        { 
          name: 'Vercel', 
          level: 93, 
          experience: '3+ years', 
          projects: 28,
          icon: '▲',
          description: 'Edge functions, analytics, preview deployments'
        },
        { 
          name: 'AWS', 
          level: 82, 
          experience: '4+ years', 
          projects: 12,
          icon: '☁️',
          description: 'S3, Lambda, EC2, CloudFront, RDS'
        },
        { 
          name: 'CI/CD', 
          level: 86, 
          experience: '4+ years', 
          projects: 24,
          icon: '🔄',
          description: 'GitHub Actions, automated testing, deployments'
        },
        { 
          name: 'Testing', 
          level: 85, 
          experience: '4+ years', 
          projects: 30,
          icon: '✅',
          description: 'Jest, React Testing Library, E2E with Cypress'
        }
      ]
    }
  };

  const currentSkills = skillCategories[activeCategory as keyof typeof skillCategories];

  return (
    <section id="skills" className="py-20 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Skills
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            4+ years of experience crafting exceptional web and mobile applications with modern technologies
          </p>
        </motion.div>

        {/* Category Tabs - Full Width */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {Object.entries(skillCategories).map(([key, category]) => (
            <motion.button
              key={key}
              onClick={() => setActiveCategory(key)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center gap-3 px-6 py-5 rounded-2xl font-semibold text-base transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/20'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border-2 border-white/10 hover:border-white/20'
              }`}
            >
              <div className={`p-3 rounded-xl transition-all duration-300 ${
                activeCategory === key 
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                  : 'bg-white/10'
              }`}>
                <category.icon className="w-6 h-6" />
              </div>
              <span className="text-center">{category.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid - Enhanced Cards */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12"
        >
          {currentSkills.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 group-hover:border-purple-400/30 transition-all duration-300 h-full">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{skill.icon}</div>
                    <div>
                      <h3 className="font-bold text-white text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                        {skill.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-white/50 mt-1">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {skill.experience}
                        </span>
                        <span>•</span>
                        <span>{skill.projects} projects</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {skill.level}%
                    </div>
                    <div className="text-xs text-white/40">proficiency</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed">
                  {skill.description}
                </p>

                {/* Progress Bar */}
                <div className="relative mt-2">
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="absolute -top-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-3 h-3 shadow-lg shadow-purple-500/50" 
                    style={{ left: `${skill.level}%`, transform: 'translateX(-50%)' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Collaboration Section */}
        <motion.div
          className="max-w-6xl mx-auto mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            <div className="relative backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4"
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Let's Build Something Amazing
                </h3>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                  Transform your vision into reality with cutting-edge technology and expert craftsmanship
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                    4+
                  </div>
                  <div className="text-sm text-white/60">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                    50+
                  </div>
                  <div className="text-sm text-white/60">Projects Delivered</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                    100%
                  </div>
                  <div className="text-sm text-white/60">Client Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-white/60">Support Available</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid md:grid-cols-3 gap-4">
                <motion.a
                  href="mailto:plantiernoe50@gmail.com"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                > 
                  <Mail className="w-5 h-5" />
                  <span>Email Me</span>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/noe-plantier"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </motion.a>

                <motion.a
                  href="https://github.com/noeplantier"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </motion.a>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center text-sm text-white/50">
                <p>Response time: Usually within 24 hours • Available for freelance & full-time opportunities</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;