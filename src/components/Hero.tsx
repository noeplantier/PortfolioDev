import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Smartphone, Globe } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'Web & Mobile Developer';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:noe.plantier@example.com', label: 'Email' },
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700"></div>
      

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Hello, I'm <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Noé</span>
            </h1>

            {/* Typing Effect */}
            <div className="text-2xl md:text-3xl text-white/90 mb-8 h-12 flex items-center justify-center">
              <span className="flex items-center gap-2">
                <Globe className="w-6 h-6" />
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Passionate about creating exceptional digital experiences through innovative web and mobile applications. 
              Let's build something amazing together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                View My Work
              </button>
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-16">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transform hover:scale-110 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-white/70 mx-auto" />
            </div>
          </div>
    </section>
  );
};

export default Hero;