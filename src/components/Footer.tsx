import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Facebook, Calendar, MapPin, ArrowUpRight, Circle, Terminal } from 'lucide-react';

// ─── Component ────────────────────────────────────────────────────────────────
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'plantiernoe50@gmail.com',
      href: 'mailto:plantiernoe50@gmail.com',
      color: 'text-violet-400',
      bg: 'bg-violet-400/10 border-violet-400/20',
    },
    {
      icon: Calendar,
      label: 'Calendly',
      value: 'Book a free 30min call',
      href: 'https://calendly.com/plantiernoe50/30min',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bali, Indonesia',
      href: null,
      color: 'text-sky-400',
      bg: 'bg-sky-400/10 border-sky-400/20',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/noeplantier',
      accent: 'hover:border-white/30 hover:text-white',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/noe-plantier',
      accent: 'hover:border-sky-400/40 hover:text-sky-400',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://www.facebook.com/noe.plantier/',
      accent: 'hover:border-blue-400/40 hover:text-blue-400',
    },
  ];

  const navLinks = [
    { name: 'Home',     href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills',   href: '#skills' },
    { name: 'Contact',  href: '#contact' },
    { name: 'Ask AI',   href: '#ask-ai' },
  ];

  return (
    <footer className="relative bg-[#070709] border-t border-white/[0.07] pt-16 pb-8 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-violet-700/08 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sky-700/06 rounded-full blur-[80px] translate-y-1/2 pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Main grid ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo mark */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shrink-0">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] text-white/30 mb-0.5">FOUNDER OF</p>
                <h3 className="text-lg font-black bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent leading-none">
                  NOÉPLANTIER.DEV
                </h3>
              </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Full Stack Developer & Founder of Plantiers agency. Building scalable products that users love and engineers are proud to maintain.
            </p>

            {/* Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04]">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              />
              <span className="font-mono text-[10px] text-emerald-400/80 tracking-wide">
                Open to work · Bali, ID
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/30 mb-5">NAVIGATION</p>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/30 mb-5">CONTACT</p>
            <div className="space-y-2">
              {contactMethods.map(method => (
                method.href ? (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:bg-white/[0.06] hover:border-white/15 transition-all duration-200"
                  >
                    <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg border ${method.bg}`}>
                      <method.icon className={`w-3.5 h-3.5 ${method.color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[9px] tracking-widest text-white/25 mb-0.5">{method.label.toUpperCase()}</p>
                      <p className={`text-xs font-medium truncate ${method.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                        {method.value}
                      </p>
                    </div>
                    <ArrowUpRight className={`w-3 h-3 shrink-0 ml-auto ${method.color} opacity-0 group-hover:opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5`} />
                  </a>
                ) : (
                  <div
                    key={method.label}
                    className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.07] rounded-xl"
                  >
                    <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg border ${method.bg}`}>
                      <method.icon className={`w-3.5 h-3.5 ${method.color}`} />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] tracking-widest text-white/25 mb-0.5">{method.label.toUpperCase()}</p>
                      <p className={`text-xs font-medium ${method.color} opacity-70`}>{method.value}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Social + CTA */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-white/30 mb-5">FOLLOW</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/40 text-xs font-mono transition-all duration-200 ${s.accent}`}
                  >
                    <s.icon className="w-4 h-4" />
                    <span className="tracking-wider text-[10px]">{s.label.toUpperCase()}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mini CTA */}
            <motion.a
              href="https://calendly.com/plantiernoe50/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-violet-500 to-sky-500 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              Book a Free Call
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>

            <p className="font-mono text-[10px] text-white/20 leading-relaxed tracking-wide">
              Available for freelance & full-time opportunities worldwide.
            </p>
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────────────────── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-7" />

        {/* ── Bottom bar ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="font-mono text-[11px] text-white/25">
              © {currentYear} Noé Plantier — All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-white/20">
            <span className="tracking-widest">BUILT WITH</span>
            <span className="mx-1 text-violet-400/60">Next.js · TypeScript · Tailwind · Framer</span>
          </div>
          <div className="flex gap-5 font-mono text-[10px] text-white/25">
            <a href="#" className="hover:text-violet-400 transition-colors">Legal Notice</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;