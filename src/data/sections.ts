/** Page sections in scroll order — drives the scroll-spy, the section rail and the command palette. */
export interface PageSection {
  id: string;
  label: string;
}

export const pageSections: PageSection[] = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'portfolio', label: 'Work' },
  { id: 'why-plantiers', label: 'About' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];
