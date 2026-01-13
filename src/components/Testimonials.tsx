import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivers",
    role: "CTO @ TechFlow",
    content: "Plantiers a transformé notre infrastructure. Le code est d'une qualité exceptionnelle et les performances sont au rendez-vous.",
    avatar: "AR"
  },
  {
    name: "Sarah Chen",
    role: "Product Designer",
    content: "L'approche UX de Noé est révolutionnaire. Chaque interaction est pensée pour l'utilisateur final. Un vrai plaisir de collaborer.",
    avatar: "SC"
  },
  {
    name: "Marc Durand",
    role: "Founder @ StartUp",
    content: "Rapidité, efficacité et innovation. Plantiers est le partenaire idéal pour tout projet ambitieux.",
    avatar: "MD"
  }
];

const Testimonials = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-12 px-4">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-white text-center mb-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
      >
        Ce qu'ils disent de nous
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            
            {/* Card Content */}
            <div className="relative h-full bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col">
              <Quote className="w-8 h-8 text-purple-500/50 mb-4" />
              
              <p className="text-white/80 text-sm leading-relaxed mb-6 flex-grow italic">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-purple-500/20">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>

              {/* Shiny Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
