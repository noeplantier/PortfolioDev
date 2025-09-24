import { useState, useEffect } from 'react';
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Globe,
  FacebookIcon,
  LayoutDashboard,
  BrainCog,
  SearchCode,
  ShieldCheck,
  Rocket,
  Lightbulb,
  Zap,
  ShieldHalf
} from 'lucide-react';

const skills = [
  {
    icon: LayoutDashboard,
    label: 'Development',
    description: 'End-to-end development for seamless, high-performance applications that scale with your business needs.',
    color: 'text-blue-400',
  },
  {
    icon: BrainCog,
    label: 'Custom Solutions',
    description: 'Tailored software solutions designed specifically to address your unique business challenges and goals.',
    color: 'text-purple-400',
  },
  {
    icon: SearchCode,
    label: 'Clean & Efficient Code',
    description: 'Well-structured, maintainable, and optimized code that ensures scalability and reduces technical debt.',
    color: 'text-green-400',
  },
  {
    icon: ShieldCheck,
    label: 'Security & Compliance',
    description: 'Robust security practices and compliance with industry standards to protect your data and users.',
    color: 'text-yellow-400',
  },
 

];

const socialLinks = [
  { icon: Github, href: 'https://github.com/noeplantier', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/noe-plantier/', label: 'LinkedIn' },
  { icon: FacebookIcon, href: 'https://facebook.com/noe.plantier', label: 'Facebook' },
  { icon: Mail, href: 'mailto:plantiernoe50@gmail.com', label: 'Email' },
];

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'Full Stack Developer';
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

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="/images/dev.jpg"
        alt="Noé Plantier Developer"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{ filter: 'blur(6px) brightness(0.7)' }}
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-0" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-4 py-12 text-center">
        {/* Title */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white mt-6 mb-8 drop-shadow-lg">
          Hello, I'm <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Noé</span>
        </h1>
        {/* Subtitle */}
        <div className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white/90  md:mb-14 flex items-center justify-center drop-shadow-lg">
          <span className="flex items-center gap-3">
            <Globe className="w-10 h-10 md:w-12 md:h-12" />
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* Skills Cards Section */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 pb-2 mb-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="relative w-full h-48 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden group hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex flex-col items-start justify-start"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 from-transparent via-white/10 to-white/20" />
              <div className="flex flex-col items-start justify-start gap-3 relative z-10 h-full">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${skill.color} bg-opacity-20`}>
                  <skill.icon className={`w-6 h-6 ${skill.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{skill.label}</h3>
                <p className="text-white/80 text-sm flex-grow">{skill.description}</p>
               
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-2 rounded-full font-semibold text-white bg-white/20 backdrop-blur-sm border-2 border-transparent transform hover:scale-105 transition-all duration-300 hover:bg-transparent hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:border-white text-base"
          >
            My projects
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full font-semibold text-white bg-white/20 backdrop-blur-sm border-2 border-transparent transform hover:scale-105 transition-all duration-300 hover:bg-transparent hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:border-white text-base"
          >
            Contact Me
          </button>
        </div>

        {/* Social Links
        <div className="flex justify-center space-x-6 mb-10">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transform hover:scale-110 transition-all duration-200"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6 md:w-6 md:h-6 text-white" />
            </a>
          ))}
        </div> */}

        {/* Scroll Indicator */}
        <button
          onClick={() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' })}
          className="animate-bounce cursor-pointer focus:outline-none"
          aria-label="Scroll to Skills"
          title="Scroll down"
        >
          <ChevronDown className="w-10 h-10 text-white/70 mx-auto " />
        </button>
      </div>
    </section>
  );
};

export default Hero;
