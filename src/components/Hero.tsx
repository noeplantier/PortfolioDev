import { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Globe, FacebookIcon, Code, Monitor, Smartphone, Database, Figma, GitBranch, TerminalSquare } from 'lucide-react';

const techs = [
    { icon: Code, label: 'React' },
    { icon: Smartphone, label: 'React Native' },
    { icon: Monitor, label: 'Next.js' },
    { icon: Database, label: 'MongoDB' },
    { icon: GitBranch, label: 'Git' },
    { icon: TerminalSquare, label: 'VS Code' },
    { icon: Figma, label: 'Figma' },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com/noeplantier', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/noe-plantier/', label: 'LinkedIn' },
    { icon: FacebookIcon, href: 'https://facebook.com/noe.plantier', label: 'Facebook' },
    { icon: Mail, href: 'mailto:plantiernoe50@gmail.com', label: 'Email' },
];

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

    return (
        <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <img
                src="/images/dev.jpg"
                alt="Noé Plantier développeur"
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
                style={{
                    filter: 'blur(6px) brightness(0.7)',
                }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-0" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-4 py-12 text-center">
                <h1 className="text-9xl sm:text-9xl md:text-9xl font-extrabold text-white mt-6 mb-6 drop-shadow-lg">
                    Hello, I'm <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Noé</span>
                </h1>
                <div className="text-lg sm:text-6xl md:text-6xl font-bold text-white/90 mb-24 flex items-center justify-center drop-shadow-lg">
                    <span className="flex items-center gap-2">
                        <Globe className="w-10 h-10" />
                        {text}
                        <span className="animate-pulse">|</span>
                    </span>
                </div>

     

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <button
                        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 rounded-full font-semibold text-white bg-white/20 backdrop-blur-sm border-2 border-transparent transform hover:scale-110 transition-all duration-600 hover:bg-transparent hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:border-white"
                    >
                        Voir mes projets
                    </button>
                    <button
                        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 rounded-full font-semibold text-white bg-white/20 backdrop-blur-sm border-2 border-transparent transform hover:scale-110 transition-all duration-600 hover:bg-transparent hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:border-white"
                    >
                        Me contacter
                    </button>
                </div>

                {/* Social Links */}
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
                            <social.icon className="w-6 h-6 text-white" />
                        </a>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <button
                    onClick={() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' })}
                    className="animate-bounce cursor-pointer focus:outline-none"
                    aria-label="Scroll to Skills"
                    title="Scroll down"
                >
                    <ChevronDown className="w-10 h-10 text-white/70 mx-auto mt-10" />
                </button>
            </div>
        </section>
    );
};

export default Hero;