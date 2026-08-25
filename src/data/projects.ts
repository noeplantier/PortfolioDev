export type SystemLayer = 'frontend' | 'backend' | 'mobile' | 'realtime' | 'database' | 'ai';

export interface Project {
  id: string;
  name: string;
  role: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  type: 'web' | 'mobile';
  tags: string[];
  layers: SystemLayer[];
  codeUrl: string;
  liveUrl?: string;
}

/**
 * Real, verified work (cross-checked against github.com/noeplantier). The
 * old repo's project cards mixed up names/descriptions across entries and
 * invented star/fork counts via a fake "loading" GitHub fetch — this list
 * only includes what could be confirmed, with no fabricated metrics. Impact
 * lines stay to what's actually verifiable (live/shipped status), never
 * invented numbers.
 */
export const projects: Project[] = [
  {
    id: 'put-in-coffee',
    name: 'Put-in Coffee',
    role: 'Full-stack build & design',
    description:
      'A performance-first landing page for an independent coffee shop, built with Astro for near-instant load on mobile.',
    challenge:
      'An independent coffee shop needed a web presence that loads instantly on the phones customers actually browse with — not a bloated template.',
    solution:
      'Built on Astro for near-zero JS by default, with hand-tuned image loading and a layout that reads clearly on a five-inch screen.',
    impact: "Live as the shop's primary web presence, optimized mobile-first.",
    type: 'web',
    tags: ['Astro', 'Landing Page', 'Performance'],
    layers: ['frontend'],
    codeUrl: 'https://github.com/noeplantier/put-in-coffee',
    liveUrl: 'https://put-in-coffee.netlify.app',
  },
  {
    id: 'universe',
    name: 'Universe',
    role: 'Mobile engineering',
    description:
      'A React Native app for browsing and streaming films and shows, with a navigation model built around fast discovery.',
    challenge: 'Streaming and browsing apps often bury content behind slow, cluttered navigation.',
    solution:
      'A React Native app built around fast discovery — a navigation model designed so finding something to watch takes seconds.',
    impact: 'Shipped as a working cross-platform mobile app.',
    type: 'mobile',
    tags: ['React Native', 'TypeScript', 'Mobile'],
    layers: ['mobile'],
    codeUrl: 'https://github.com/noeplantier/universe-streaming-app',
    liveUrl: 'https://universestreaming.netlify.app',
  },
  {
    id: 'ti-padel',
    name: 'Ti Padel',
    role: 'Full-stack engineering',
    description:
      'A reservation platform for a padel club — real-time court availability and a booking flow built for members reserving from their phone.',
    challenge: 'A padel club was managing court bookings by phone call and a shared spreadsheet — double-bookings were routine.',
    solution: 'A reservation platform with real-time court availability, built for members booking between games.',
    impact: 'Replaced manual, error-prone booking with a live availability system.',
    type: 'web',
    tags: ['TypeScript', 'Booking Platform'],
    layers: ['frontend', 'backend', 'realtime'],
    codeUrl: 'https://github.com/noeplantier/Ti-Padel',
  },
  {
    id: 'eventure',
    name: 'Eventure',
    role: 'Full-stack engineering',
    description:
      'A staff scheduling and event management platform, replacing a spreadsheet-and-group-chat workflow with one real-time dashboard.',
    challenge: 'Staff scheduling and event coordination were spread across spreadsheets and group chats — no single source of truth.',
    solution: 'One real-time dashboard for scheduling and event management.',
    impact: 'Consolidated staff coordination into a single live system.',
    type: 'web',
    tags: ['TypeScript', 'Scheduling'],
    layers: ['frontend', 'backend', 'realtime'],
    codeUrl: 'https://github.com/noeplantier/eventure',
  },
  {
    id: 'feelomi',
    name: 'Feelomi',
    role: 'Mobile engineering',
    description: 'A Flutter mobile app for mental wellbeing check-ins, designed around a calm, unintimidating interface.',
    challenge: 'Wellbeing check-in apps can feel clinical or overwhelming at the exact moment someone needs simplicity.',
    solution: 'A Flutter app designed around a calm interface — a check-in that takes seconds, not a form to dread.',
    impact: 'Shipped as a working Flutter mobile app.',
    type: 'mobile',
    tags: ['Flutter', 'Dart', 'Mobile'],
    layers: ['mobile'],
    codeUrl: 'https://github.com/noeplantier/FEELOMI',
  },
];
