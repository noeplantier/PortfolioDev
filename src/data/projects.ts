export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'web' | 'mobile';
  tags: string[];
  codeUrl: string;
  liveUrl?: string;
}

/**
 * Real, verified work (cross-checked against github.com/noeplantier). The
 * old repo's project cards mixed up names/descriptions across entries and
 * invented star/fork counts via a fake "loading" GitHub fetch — this list
 * only includes what could be confirmed, with no fabricated metrics.
 */
export const projects: Project[] = [
  {
    id: 'put-in-coffee',
    name: 'Put-in Coffee',
    description:
      'A performance-first landing page for an independent coffee shop, built with Astro for near-instant load on mobile.',
    type: 'web',
    tags: ['Astro', 'Landing Page', 'Performance'],
    codeUrl: 'https://github.com/noeplantier/put-in-coffee',
    liveUrl: 'https://put-in-coffee.netlify.app',
  },
  {
    id: 'universe',
    name: 'Universe',
    description:
      'A React Native app for browsing and streaming films and shows, with a navigation model built around fast discovery.',
    type: 'mobile',
    tags: ['React Native', 'TypeScript', 'Mobile'],
    codeUrl: 'https://github.com/noeplantier/universe-streaming-app',
    liveUrl: 'https://universestreaming.netlify.app',
  },
  {
    id: 'ti-padel',
    name: 'Ti Padel',
    description:
      'A reservation platform for a padel club — real-time court availability and a booking flow built for members reserving from their phone.',
    type: 'web',
    tags: ['TypeScript', 'Booking Platform'],
    codeUrl: 'https://github.com/noeplantier/Ti-Padel',
  },
  {
    id: 'eventure',
    name: 'Eventure',
    description:
      'A staff scheduling and event management platform, replacing a spreadsheet-and-group-chat workflow with one real-time dashboard.',
    type: 'web',
    tags: ['TypeScript', 'Scheduling'],
    codeUrl: 'https://github.com/noeplantier/eventure',
  },
  {
    id: 'feelomi',
    name: 'Feelomi',
    description: 'A Flutter mobile app for mental wellbeing check-ins, designed around a calm, unintimidating interface.',
    type: 'mobile',
    tags: ['Flutter', 'Dart', 'Mobile'],
    codeUrl: 'https://github.com/noeplantier/FEELOMI',
  },
];
