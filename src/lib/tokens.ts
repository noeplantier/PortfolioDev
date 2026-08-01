/**
 * Single source of truth for brand design tokens.
 * Consumed by tailwind.config.js (theme classes) AND directly by components
 * that need raw values Tailwind classes can't provide — Framer Motion
 * `animate` targets, gradient strings, inline SVG fill/stroke.
 *
 * Derived from the Plantiers logo (violet ribbon "P" + green leaf sprout)
 * and LinkedIn banner (near-black background, violet-only accent).
 */

export const colors = {
  void: {
    DEFAULT: '#07060B',
    elevated: '#0C0A14',
    surface: '#120F1E',
  },
  brand: {
    50: '#F5F1FF',
    100: '#EAE1FF',
    200: '#D3C2FF',
    300: '#B79BFF',
    400: '#9B74FA',
    500: '#7C3AED',
    600: '#6D28D9',
    700: '#5B21B6',
    800: '#4C1D95',
    900: '#3B1578',
    950: '#240B4D',
  },
  leaf: {
    400: '#4ADE80',
    500: '#22C55E',
  },
} as const;

export const glow = {
  brand: '0 0 32px rgba(124, 58, 237, 0.35)',
  brandSoft: '0 0 60px rgba(124, 58, 237, 0.18)',
  leaf: '0 0 20px rgba(34, 197, 94, 0.3)',
} as const;

export const gradients = {
  brand: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 45%, #B79BFF 100%)',
  brandText: 'linear-gradient(90deg, #B79BFF 0%, #7C3AED 50%, #B79BFF 100%)',
} as const;

export const fontFamily = {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
} as const;

/**
 * Text-opacity scale, replacing the old codebase's ad hoc white/25-white/40
 * usage (which fails WCAG AA in many places on a near-black background).
 * `tertiary` is the floor for anything that must remain legible; anything
 * decorative-only (e.g. a hairline divider label) may go lower but must
 * never be the sole carrier of meaning.
 */
export const textOpacity = {
  primary: 0.95,
  secondary: 0.72,
  tertiary: 0.58,
} as const;
