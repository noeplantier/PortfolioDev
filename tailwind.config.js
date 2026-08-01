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
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        gradient: 'gradient 6s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
