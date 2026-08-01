import { Link } from 'react-router-dom';
import { Calendar, Github, Linkedin, Mail } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { navLinks } from '@/data/nav-links';
import { site } from '@/data/site';

const social = [
  { icon: Github, label: 'GitHub', href: site.social.github },
  { icon: Linkedin, label: 'LinkedIn', href: site.social.linkedinCompany },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pb-8 pt-16">
      <GridOverlay className="opacity-[0.018]" />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-white/50">{site.description}</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf-400" />
              <span className="font-mono text-[10px] tracking-wide text-leaf-400/90">Available for new projects</span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-5 font-mono text-[10px] tracking-[0.2em] text-white/40">NAVIGATION</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/legal" className="text-sm text-white/60 transition-colors hover:text-white">
                  Legal
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-5 font-mono text-[10px] tracking-[0.2em] text-white/40">CONTACT</p>
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/10">
                <Mail className="h-3.5 w-3.5 text-brand-300" />
              </span>
              <span className="min-w-0 truncate text-sm text-white/70 group-hover:text-white">{site.email}</span>
            </a>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <div>
              <p className="mb-5 font-mono text-[10px] tracking-[0.2em] text-white/40">FOLLOW</p>
              <div className="flex flex-wrap gap-2">
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-xs text-white/50 transition-colors hover:border-white/20 hover:text-white"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <Button href={site.calendlyUrl} target="_blank" rel="noopener noreferrer" icon={<Calendar className="h-4 w-4" />}>
              Book a call
            </Button>
          </div>
        </div>

        <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono text-[11px] text-white/30">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <Link to="/legal" className="font-mono text-[11px] text-white/30 transition-colors hover:text-brand-300">
            Legal &amp; Privacy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
