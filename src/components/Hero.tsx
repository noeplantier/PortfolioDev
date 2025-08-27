import { useState, useEffect } from 'react';
import {ChevronDown, Github, Linkedin, Mail, Globe, FacebookIcon} from 'lucide-react';

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
        { icon: Github, href: 'https://github.com/noeplantier', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/noe-plantier/', label: 'LinkedIn' },
        { icon: FacebookIcon, href: 'https://facebook.com/noe.plantier', label: 'Facebook' },
        { icon: Mail, href: 'plantiernoe50@gmail.com', label: 'Email' },
    ];

    return (
        <section id="home" className="min-h-screen relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 mt-14">
                {/* Main Heading */}
                <h1 className="text-9xl md:text-9xl font-bold text-white mb-6">
                    Hello, I'm <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Noé</span>
                </h1>

                {/* Typing Effect */}
                <div className="text-4xl font-bold md:text-4xl text-white/90 mb-8 h-12 flex items-center justify-center">
          <span className="flex items-center gap-2">
            <Globe className="w-6 h-6" />
              {text}
              <span className="animate-pulse">|</span>
          </span>
                </div>

                {/* Description */}
                <p className="text-2xl font-semibold text-white mb-12 max-w-2xl mx-auto leading-relaxed">
                    Passionate about creating exceptional digital experiences.<br></br>
                    Let's build something amazing together !
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <button
                        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 rounded-full font-semibold text-white bg-white/20 backdrop-blur-sm border-2 border-transparent transform hover:scale-110 transition-all duration-200 hover:bg-transparent hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:border-white"
                    >
                        View My Work
                    </button>
                    <button
                        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 rounded-full font-semibold text-white bg-white/20 backdrop-blur-sm border-2 border-transparent transform hover:scale-110 transition-all duration-200 hover:bg-transparent hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:border-white"
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
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transform hover:scale-110 transition-all duration-200"
                            aria-label={social.label}
                        >
                            <social.icon className="w-6 h-6 text-white" />
                        </a>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <button
                    onClick={() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' })}
                    className="animate-bounce cursor-pointer focus:outline-none"
                    aria-label="Scroll to Projects"
                    title="Scroll down"
                >
                    <ChevronDown className="w-8 h-8 text-white/70 mx-auto" />
                </button>
            </div>
        </section>
    );
};

export default Hero;