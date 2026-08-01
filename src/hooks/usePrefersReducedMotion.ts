import { useReducedMotion } from 'framer-motion';

/**
 * The old codebase had zero reduced-motion handling despite constant
 * ambient animation (canvas particles, infinite pulses, gradient shifts).
 * Every looping/ambient animation in this codebase should gate on this.
 */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}
