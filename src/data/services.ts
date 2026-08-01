import { Cloud, Globe, Smartphone, Sparkles, type LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

/** The four pillars from the Plantiers LinkedIn banner — kept verbatim as the service taxonomy. */
export const services: Service[] = [
  {
    id: 'web-apps',
    title: 'Web Apps',
    description:
      'Fast, scalable web applications built on modern foundations — React, Next.js, and TypeScript, engineered for growth from day one.',
    icon: Globe,
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description:
      'Native-feel iOS and Android experiences from a single, well-architected codebase — built to ship fast and scale cleanly.',
    icon: Smartphone,
    tags: ['React Native', 'Expo', 'Flutter'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description:
      'Infrastructure that scales quietly — CI/CD, containerization, and cloud architecture that stays out of your way.',
    icon: Cloud,
    tags: ['Docker', 'AWS', 'Vercel'],
  },
  {
    id: 'ai-integrations',
    title: 'AI Integrations',
    description:
      'LLM-powered features and workflows, scoped realistically against what the model can actually do, and shipped production-ready.',
    icon: Sparkles,
    tags: ['LLM APIs', 'RAG', 'Automation'],
  },
];
