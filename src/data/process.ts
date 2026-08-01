import { Code2, LifeBuoy, PenTool, Rocket, Search, type LucideIcon } from 'lucide-react';

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    step: '01',
    title: 'Discover',
    description:
      'We start with the problem, not the feature list — your users, constraints, and what success actually looks like.',
    icon: Search,
  },
  {
    id: 'design',
    step: '02',
    title: 'Design',
    description: 'Architecture and interface decisions made together, before a line of production code is written.',
    icon: PenTool,
  },
  {
    id: 'build',
    step: '03',
    title: 'Build',
    description:
      'Senior-level engineering and short iteration loops, on a codebase built to be handed off — not just shipped.',
    icon: Code2,
  },
  {
    id: 'ship',
    step: '04',
    title: 'Ship',
    description: 'Production deploys, monitored and measured — not a demo that quietly becomes someone else\'s problem.',
    icon: Rocket,
  },
  {
    id: 'support',
    step: '05',
    title: 'Support',
    description: 'Every engagement includes a post-launch window to fix what only real usage reveals.',
    icon: LifeBuoy,
  },
];
