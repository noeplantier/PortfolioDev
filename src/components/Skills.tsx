import { useState } from 'react';
import { Smartphone, Globe, Database, Zap, Star, TrendingUp, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
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
      color: 'from-purple-500 to-pink-500',
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
      color: 'from-green-500 to-emerald-500',
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
      color: 'from-orange-500 to-red-500',
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl text-white md:text-5xl font-bold mb-6">
            My <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Mastering the art of web and mobile development with cutting-edge technologies. 
            Here's my expertise across the full development stack.
          </p>
        </motion.div>

        {/* Achievements */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                <achievement.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{achievement.title}</h3>
              <p className="text-gray-600 text-sm">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === key
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
              }`}
            >
              <category.icon className="w-5 h-5" />
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
          className="grid md:grid-cols-2 gap-6"
        >
          {currentSkills.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span>{skill.experience}</span>
                    <span>•</span>
                    <span>{skill.projects} projects</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{skill.level}%</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${currentSkills.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
            <p className="text-lg mb-6 opacity-90">
              Let's bring your ideas to life with cutting-edge technology and exceptional user experiences.
            </p>
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
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