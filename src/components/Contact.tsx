import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Phone, Send, Calendar, Clock,
  Github, Linkedin, PhoneCall, ArrowUpRight, Check, Circle,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'sent';

// ─── Variants ─────────────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 55, damping: 18 } },
};

// ─── Contact Info Items ───────────────────────────────────────────────────────
const INFO_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'plantiernoe50@gmail.com',
    href: 'mailto:plantiernoe50@gmail.com',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10 border-violet-400/20',
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '+33 6 66 16 77 88',
    href: 'tel:+33666167788',
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
  {
    icon: Clock,
    label: 'Availability',
    value: 'Mon – Fri · 9 AM – 6 PM (WITA)',
    href: null,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border-amber-400/20',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/noeplantier',
    href: 'https://github.com/noeplantier',
    color: 'text-white/70',
    bg: 'bg-white/5 border-white/10',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/noeplantier',
    href: 'https://linkedin.com/in/noeplantier',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10 border-sky-400/20',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', subject: '', message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const text =
      `*New contact message*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Subject:* ${formData.subject}\n\n` +
      `*Message:*\n${formData.message}`;

    const url = `https://wa.me/33666167788?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3500);
    }, 600);
  };

  const inputBase =
    'w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white text-sm placeholder-white/25 focus:outline-none focus:border-violet-400/60 focus:bg-white/[0.07] transition-all duration-200 backdrop-blur-sm font-mono';

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-violet-400 uppercase">
              Let's Work Together
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch{' '}
            <PhoneCall className="inline-block w-9 h-9 text-white ml-2 mb-1" />
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? I respond within 24 hours.
          </p>

          {/* Live status badge */}
          <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.04]">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
            <span className="font-mono text-[11px] text-emerald-400/80 tracking-wide">
              Available for new projects
            </span>
          </div>
        </motion.div>

        {/* ── Main grid ─────────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

          {/* ── Left: Contact info ────────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {/* Header card */}
            <motion.div
              variants={fadeUp}
              className="p-7 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08]"
            >
              <h3 className="text-xl font-bold text-white mb-1">Contact Information</h3>
              <p className="text-white/40 text-sm font-mono">All the ways to reach me</p>
            </motion.div>

            {/* Info items */}
            <div className="grid grid-cols-1 gap-3">
              {INFO_ITEMS.map(({ icon: Icon, label, value, href, color, bg }) => (
                <motion.div key={label} variants={fadeUp}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 p-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/[0.07] hover:border-white/15 transition-all duration-200"
                    >
                      <div className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-xl border ${bg}`}>
                        <Icon className={`w-4.5 h-4.5 ${color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[10px] tracking-widest text-white/30 mb-0.5">{label.toUpperCase()}</p>
                        <p className={`text-sm font-medium truncate ${color} group-hover:opacity-100 opacity-80 transition-opacity`}>
                          {value}
                        </p>
                      </div>
                      <ArrowUpRight className={`w-3.5 h-3.5 shrink-0 ${color} opacity-0 group-hover:opacity-60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all`} />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/[0.07]">
                      <div className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-xl border ${bg}`}>
                        <Icon className={`w-4.5 h-4.5 ${color}`} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-widest text-white/30 mb-0.5">{label.toUpperCase()}</p>
                        <p className={`text-sm font-medium ${color} opacity-80`}>{value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3 mt-1">
              <a
                href="https://calendly.com/plantiernoe50/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300"
              >
                <Calendar className="w-4.5 h-4.5" />
                Book a Free 30min Call
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="mailto:plantiernoe50@gmail.com"
                className="flex items-center justify-center gap-3 px-6 py-3.5 bg-white/[0.05] hover:bg-white/[0.08] text-white/80 hover:text-white rounded-xl font-semibold text-sm border border-white/[0.1] hover:border-white/20 transition-all duration-300"
              >
                <Mail className="w-4.5 h-4.5" />
                Send an Email
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Form ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="p-8 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08] relative overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <h3 className="text-xl font-bold text-white mb-1">Send a Message</h3>
              <p className="font-mono text-[11px] tracking-widest text-white/30 mb-7">
                VIA WHATSAPP · INSTANT DELIVERY
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-mono text-[10px] tracking-widest text-white/40 mb-2">
                      NAME
                    </label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      required placeholder="John Doe"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-mono text-[10px] tracking-widest text-white/40 mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      required placeholder="john@company.com"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block font-mono text-[10px] tracking-widest text-white/40 mb-2">
                    SUBJECT
                  </label>
                  <input
                    type="text" id="subject" name="subject"
                    value={formData.subject} onChange={handleChange}
                    required placeholder="Project Discussion · Freelance · Full-time"
                    className={inputBase}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] tracking-widest text-white/40 mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    required rows={5}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className={`${inputBase} resize-none leading-relaxed`}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status !== 'idle'}
                  whileHover={status === 'idle' ? { scale: 1.02, y: -1 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    status === 'sent'
                      ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 cursor-default'
                      : status === 'sending'
                      ? 'bg-violet-500/30 text-white/60 cursor-wait'
                      : 'bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:shadow-lg hover:shadow-violet-500/30'
                  }`}
                >
                  {status === 'sent' ? (
                    <>
                      <Check className="w-5 h-5" />
                      Message Sent via WhatsApp!
                    </>
                  ) : status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      Send via WhatsApp
                      <Send className="w-4.5 h-4.5" />
                    </>
                  )}
                </motion.button>

                {/* Footer hint */}
                <p className="text-center font-mono text-[10px] text-white/25 tracking-wide">
                  Opens WhatsApp · Response within 24 hours
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom stats strip ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
        >
          {[
            { value: '< 24h', label: 'Response Time' },
            { value: '100%', label: 'Client Satisfaction' },
            { value: '5+',   label: 'Years Experience' },
            { value: '30+',  label: 'Projects Shipped' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center p-4 bg-white/[0.03] rounded-xl border border-white/[0.07]">
              <div className="text-2xl font-black font-mono bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-1">
                {value}
              </div>
              <div className="font-mono text-[10px] tracking-widest text-white/30">{label.toUpperCase()}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;