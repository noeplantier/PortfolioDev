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
  /** Public repository — omitted for closed-source products. */
  codeUrl?: string;
  liveUrl?: string;
}

/**
 * Real, verified work (cross-checked against github.com/noeplantier, and
 * kretopia.com for the one closed-source product). The
 * old repo's project cards mixed up names/descriptions across entries and
 * invented star/fork counts via a fake "loading" GitHub fetch — this list
 * only includes what could be confirmed, with no fabricated metrics. Impact
 * lines stay to what's actually verifiable (live/shipped status), never
 * invented numbers.
 */
export const projects: Project[] = [
  {
    id: 'kretopia',
    name: 'Kretopia',
    role: 'CTO — technology & mobile app',
    description:
      'The Creative Economy OS: a mobile app and platform where creative professionals build a verified Creative Passport, find work that fits it, and run projects from brief to payment.',
    challenge:
      'Creative careers run on claims — profiles and follower counts — with no trusted record of the work someone has actually done, and opportunities scattered across the web.',
    solution:
      'A Creative Passport that holds credits, projects, co-signs and evidence; Scout and Match surface opportunities and collaborators from that record; Studio runs the project from brief to payment. Kreto, an AI "Executive Producer", suggests next steps — its output is labelled AI-assisted, stays editable, and only joins the record once the user confirms it.',
    impact: 'Live in beta at kretopia.com.',
    type: 'mobile',
    tags: ['Mobile', 'AI-assisted', 'Creative Economy'],
    layers: ['mobile', 'backend', 'ai'],
    // Commercial product — no public repository, so only the live site is linked.
    liveUrl: 'https://www.kretopia.com',
  },
  {
    id: 'put-in-coffee',
    name: 'Put in Coffee',
    role: 'Full-stack engineering',
    description:
      'A platform for managing coffee subscriptions, with a live dashboard for tracking orders and deliveries.',
    challenge: 'Coffee subscriptions were managed via spreadsheets and email, with no real-time visibility into orders or deliveries.',
    solution: 'A live dashboard that tracks coffee subscriptions in real-time, replacing spreadsheets and email with a single source of truth.',
    impact: 'Shipped as a working web app, with live tracking of coffee subscriptions.',
    type: 'web',
    tags: ['TypeScript', 'React', 'Realtime'],
    layers: ['frontend', 'backend', 'realtime'],
    codeUrl:'https://github.com/noeplantier/put-in-coffee',
    liveUrl: 'https://put-in-coffee.netlify.app/',

    
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
    id: 'plantiers-outreach-os',
    name: 'Plantiers - Outreach OS',
    role: 'Full-stack engineering',
    description:
      'A platform for managing outreach campaigns, with a live dashboard for tracking progress and results.',
    challenge: 'Outreach campaigns were managed via spreadsheets and email, with no real-time visibility into progress or results.',
    solution: 'A live dashboard that tracks outreach campaigns in real-time, replacing spreadsheets and email with a single source of truth.',
    impact: 'Shipped as a working web app, with live tracking of outreach campaigns.',
    type: 'web',
    tags: ['TypeScript', 'React', 'Realtime'],
    layers: ['frontend', 'backend', 'realtime'],
    codeUrl: 'https://github.com/noeplantier/ClawPilot',
    liveUrl: 'https://plantiers-outreach-os.netlify.app/',
  },
  {
    id: 'monis-rent',
    name: 'Monis Rent',
    role: 'Full-stack engineering',
    description:
      'A platform for managing staff scheduling and event coordination, with a live dashboard for tracking schedules and events.',
    challenge: 'Staff scheduling and event coordination were managed via spreadsheets and email, with no real-time visibility into schedules or events.',
    solution: 'A live dashboard that tracks staff schedules and events in real-time, replacing spreadsheets and email with a single source of truth.',
    impact: 'Shipped as a working web app, with live tracking of staff schedules and events.',
    type: 'web',
    tags: ['TypeScript', 'Scheduling'],
    layers: ['frontend', 'backend', 'realtime'],
    codeUrl: 'https://github.com/noeplantier/monis.rent',
    liveUrl: 'https://monisrent.netlify.app/',
  },

];
