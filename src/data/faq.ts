export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'How does an engagement typically start?',
    answer:
      "With a short discovery call to understand the problem, timeline, and constraints. If it's a good fit, you get a clear scope and a fixed or milestone-based quote before any commitment.",
  },
  {
    question: 'Fixed-price projects or retainers?',
    answer:
      'Both. Well-scoped work — a landing page, an MVP, a defined feature — fits fixed-price. Ongoing product work is better suited to a monthly retainer.',
  },
  {
    question: "What's a typical timeline?",
    answer:
      "A focused landing page ships in 1-2 weeks. A full product MVP usually runs 6-10 weeks depending on scope. You'll get a specific estimate after discovery, not a generic range.",
  },
  {
    question: 'Who owns the code?',
    answer:
      'You do. Every engagement includes full IP transfer and a clean, documented handoff — no vendor lock-in, no dependency on Plantiers to keep it running.',
  },
  {
    question: 'Can you join an existing codebase and team?',
    answer:
      "Yes — a good share of the work is joining an existing codebase, not just greenfield builds. A short codebase audit up front sets realistic expectations before anything is scoped.",
  },
  {
    question: "What's the tech stack?",
    answer:
      'React, Next.js, and TypeScript on the web; React Native and Flutter on mobile; Node.js, PostgreSQL, and Supabase on the backend. The stack is chosen for the problem, not the other way around.',
  },
];
