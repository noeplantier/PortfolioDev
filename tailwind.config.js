import { colors, glow, fontFamily } from './src/lib/tokens';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: colors.void,
        brand: colors.brand,
        leaf: colors.leaf,
      },
      fontFamily,
      boxShadow: {
        glow: glow.brand,
        'glow-soft': glow.brandSoft,
        'glow-leaf': glow.leaf,
      },
      screens: {
        xs: '475px',
        '3xl': '1792px',
      },
      // Every animation below is transform/opacity only — compositor-friendly,
      // no repaint of text or backgrounds while running.
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'icon-spin': 'icon-spin 1.1s cubic-bezier(0.65, 0, 0.35, 1)',
        'icon-tilt': 'icon-tilt 0.9s ease-in-out',
        'icon-float': 'icon-float 1.6s ease-in-out infinite',
        'icon-twinkle': 'icon-twinkle 1.2s ease-in-out infinite',
        'border-spin': 'border-spin 3.5s linear infinite',
        'aurora-a': 'aurora-a 26s ease-in-out infinite alternate',
        'aurora-b': 'aurora-b 32s ease-in-out infinite alternate',
        crossfade: 'crossfade 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'icon-spin': { to: { transform: 'rotate(360deg)' } },
        'icon-tilt': {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0)' },
          '30%': { transform: 'rotate(-14deg) translateY(-2px)' },
          '65%': { transform: 'rotate(10deg) translateY(1px)' },
        },
        'icon-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'icon-twinkle': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.22) rotate(16deg)' },
        },
        'border-spin': { to: { transform: 'rotate(360deg)' } },
        'aurora-a': {
          '0%': { transform: 'translate3d(-10%, -6%, 0) scale(1)' },
          '100%': { transform: 'translate3d(12%, 8%, 0) scale(1.18)' },
        },
        'aurora-b': {
          '0%': { transform: 'translate3d(8%, 6%, 0) scale(1.1)' },
          '100%': { transform: 'translate3d(-12%, -8%, 0) scale(0.95)' },
        },
        crossfade: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
