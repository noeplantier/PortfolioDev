import React from 'react';
import { Mail, Github, Linkedin, Twitter, Calendar, MapPin, Facebook } from 'lucide-react';
import { Stack } from 'three/src/nodes/TSL.js';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'founder@plantiers.com',
      href: 'mailto:contact@founder@plantiers.com',
    },
    {
      icon: Calendar,
      label: 'Calendly',
      value: 'Schedule a call',
      href: 'https://calendly.com/plantiernoe50/30min',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bali, Indonesia',
    },
  ];

  const socialLinks = [
    { 
      icon: Github, 
      label: 'GitHub', 
      href: 'https://github.com/noeplantier', 
      color: 'hover:bg-gray-800 hover:text-white hover:shadow-gray-500/20' 
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      href: 'www.linkedin.com/in/noe-plantier', 
      color: 'hover:bg-[#0077b5] hover:text-white hover:shadow-blue-500/20' 
    },
    { 
      icon: Facebook, 
      label: 'Facebook', 
      href: 'https://www.facebook.com/noe.plantier/', 
      color: 'hover:bg-[#1877F2] hover:text-white hover:shadow-sky-500/20' 
    },
  
    
  ];

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/10 pt-16 pb-8 overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Noé Plantier
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Passionate developer creating innovative digital experiences. Let's turn your ideas into reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6 text-white">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
            <div className="space-y-3">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <method.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{method.label}</p>
                    <p className="text-sm text-gray-200 group-hover:text-purple-200 transition-colors">
                      {method.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Socials Section - Richer & Positioned Right */}
          <div className="lg:col-span-3 flex flex-col lg:items-end">
            <h4 className="text-lg font-semibold mb-6 text-white text-center lg:text-right">Follow Me</h4>
            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`p-3 bg-white/5 border border-white/5 rounded-xl text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-lg ${s.color}`}
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center lg:text-right max-w-xs">
              Let's connect on social media to discuss tech and development.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Noé Plantier. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-purple-400 transition-colors">Legal Notice</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;