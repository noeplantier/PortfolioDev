import { Github, Linkedin, Mail, Globe, FacebookIcon } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/noeplantier', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/noe-plantier/', label: 'LinkedIn' },
    { icon: FacebookIcon, href: 'https://facebook.com/noe.plantier', label: 'Facebook' },
    { icon: Mail, href: 'mailto:plantiernoe50@gmail.com', label: 'Email' },
  ];

  const scrollTo = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      {/* Soft gradient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12 items-start">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Noé Plantier</h3>
            </div>
            <p className="text-gray-300 max-w-sm">
              Web & Mobile Developer crafting delightful, performant digital experiences with modern technologies.
            </p>



          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <div className="flex flex-wrap gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-5 py-2 rounded-full font-medium text-white bg-white/10 backdrop-blur-sm border-2 border-transparent hover:border-white hover:bg-transparent hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 transform hover:scale-105 transition-all duration-300"
                  aria-label={`Go to ${link.label}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
              {/* Socials */}
              <div className="flex gap-4 mt-6">
                  {socialLinks.map((s) => (
                      <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transform hover:scale-110 transition-all duration-200"
                      >
                          <s.icon className="w-5 h-5 text-white" />
                      </a>
                  ))}
              </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-10" />

        {/* Bottom bar */}
        <div className="text-sm flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400">
          <p>
            © {year} Noé Plantier. All rights reserved.
          </p>




            <div className="text-sm">
            Built with React, TypeScript & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
