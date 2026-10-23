export const site = {
  name: 'Plantiers',
  legalName: 'Plantiers Software Engineering',
  tagline: 'Engineering Digital Growth.',
  description:
    "Plantiers is a software engineering studio that designs, builds, and ships production-grade web and mobile software for teams who can't afford to get it wrong.",
  url: 'https://plantiers.com',
  email: 'founder@plantiers.com',
  calendlyUrl: 'https://calendly.com/plantiernoe50/30min',
  social: {
    github: 'https://github.com/noeplantier',
    linkedinCompany: 'https://www.linkedin.com/company/plantiers/',
    linkedinFounder: 'https://www.linkedin.com/in/noe-plantier',
  },
  founder: {
    name: 'Noé Plantier',
    role: 'Founder & Engineer',
  },
} as const;

/**
 * The three ways a lead can reach the founder directly — single source of
 * truth for every CTA (hero, nav, dock, command palette, contact, footer),
 * so a changed address or booking link is a one-line edit.
 */
export const channels = {
  book: {
    label: 'Book a free 30-min call',
    short: 'Book a call',
    href: site.calendlyUrl,
  },
  email: {
    label: 'Email the founder',
    short: 'Email',
    address: site.email,
    href: `mailto:${site.email}?subject=${encodeURIComponent('Project inquiry — Plantiers')}`,
  },
  linkedin: {
    label: 'Connect on LinkedIn',
    short: 'LinkedIn',
    href: site.social.linkedinCompany,
  },
} as const;
