export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

/**
 * Intentionally empty. The old codebase shipped fabricated named quotes
 * ("Alex Rivers, CTO @ TechFlow") that were never actually said — a real
 * credibility risk in front of technical/investor audiences. The
 * Testimonials section only renders once this array has real entries;
 * add them here when available, nothing else needs to change.
 */
export const testimonials: Testimonial[] = [];
