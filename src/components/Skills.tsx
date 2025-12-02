import { useState } from 'react';
import { Smartphone, Globe, Database, Zap, Star, TrendingUp, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Globe,
      color: 'from-blue-400 to-cyan-400',
      skills: [
        { name: 'React', level: 89, experience: '3+ years', projects: 25 },
        { name: 'Vue.js', level: 80, experience: '3+ years', projects: 8 },
        { name: 'TypeScript', level: 92, experience: '3+ years', projects: 30 },
        { name: 'Next.js', level: 88, experience: '2+ years', projects: 7 },
        { name: 'Tailwind CSS', level: 85, experience: '3+ years', projects: 10 },
        { name: 'JavaScript (ES6+)', level: 96, experience: '5+ years', projects: 32 },
        { name: 'HTML5 & CSS3', level: 98, experience: '5+ years', projects: 39 },
        { name: 'Sass/SCSS', level: 75, experience: '3+ years', projects: 17 }
      ]
    },
    mobile: {
      title: 'Mobile Development',
      icon: Smartphone,
      color: 'from-purple-400 to-pink-400',
      skills: [
        { name: 'React Native', level: 92, experience: '3+ years', projects: 12 },
        { name: 'Flutter', level: 85, experience: '2+ years', projects: 10 },
        { name: 'Expo', level: 90, experience: '3+ years', projects: 5 },
        { name: 'iOS Development', level: 75, experience: '2+ years', projects: 5 },
        { name: 'Android Development', level: 76, experience: '1+ years', projects: 2 },
        { name: 'Firebase', level: 88, experience: '2+ years', projects: 8 },
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Database,
      color: 'from-green-400 to-emerald-400',
      skills: [
        { name: 'Node.js', level: 96, experience: '4+ years', projects: 22 },
        { name: 'Express.js', level: 90, experience: '4+ years', projects: 22 },
        { name: 'MongoDB', level: 80, experience: '2+ years', projects: 8 },
        { name: 'PostgreSQL', level: 85, experience: '3+ years', projects: 12 },
        { name: 'REST APIs', level: 95, experience: '4+ years', projects: 25 },
        { name: 'Docker', level: 85, experience: '2+ years', projects: 15 }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      icon: Zap,
      color: 'from-orange-400 to-red-400',
      skills: [
        { name: 'Git & GitHub', level: 97, experience: '4+ years', projects: 47 },
        { name: 'VS Code', level: 98, experience: '4+ years', projects: 47 },
        { name: 'Figma', level: 89, experience: '3+ years', projects: 25 },
        { name: 'Vercel', level: 90, experience: '2+ years', projects: 20 },
        { name: 'Netlify', level: 88, experience: '2+ years', projects: 12 },
        { name: 'Jest', level: 80, experience: '2+ years', projects: 8 },
      ]
    }
  };

  const achievements = [
    { icon: Award, title: '30+ Projects Completed', description: 'Successfully delivered diverse web and mobile applications' },
    { icon: Star, title: '4.9/5 Client Rating', description: 'Consistently high satisfaction scores from clients' },
    { icon: TrendingUp, title: '4+ Years Experience', description: 'Proven track record in modern development practices' },
    { icon: CheckCircle, title: '100% On-Time Delivery', description: 'Never missed a project deadline' }
  ];

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
            Mastering the art of web and mobile development with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="grid md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ y: -3 }}
            >
              <div className="p-3 bg-white/20 rounded-lg">
                <achievement.icon className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h3 className="font-medium text-white/90 text-sm">{achievement.title}</h3>
                <p className="text-white/60 text-xs">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                activeCategory === key
                  ? 'bg-white/20 text-white/90 border border-white/30'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 border border-white/10'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {currentSkills.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex items-center gap-4 p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="w-full">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-white/90 text-lg">{skill.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
                      <span>{skill.experience}</span>
                      <span>•</span>
                      <span>{skill.projects} projects</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-purple-300">{skill.level}%</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full`}
                      style={{ background: `linear-gradient(90deg, rgba(147,51,234,0.8) 0%, rgba(96,165,250,0.8) 100%)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 max-w-2xl mx-auto">
            <div className="p-3 bg-white/20 rounded-lg">
              <Zap className="w-6 h-6 text-purple-300" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white/90 text-lg">Ready to Work Together?</h3>
              <p className="text-white/70 text-sm mt-1">
                Let's bring your ideas to life with cutting-edge technology and exceptional user experiences.
              </p>
            </div>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 bg-white/20 text-white/90 rounded-lg font-medium hover:bg-white/30 transition-all duration-200 text-sm border border-white/20"
            >
              Start a Project
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
