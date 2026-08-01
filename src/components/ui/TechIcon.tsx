import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/**
 * Dependency-free inline SVG marks for the technologies Plantiers builds
 * with. Deliberately hand-drawn rather than pulled from an icon-font/logo
 * package so every mark renders in flat white and inherits size/opacity
 * like any other icon in the design system.
 */
const ICONS: Record<string, JSX.Element> = {
  React: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.087-.792-.166-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.133-1.867 3.133-4.563 0-2.386-1.715-4.052-4.163-4.052-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .07.282c-.076.312-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm10.5 12.5V14h-5v1.5h1.75v5H11v-5h2.5zm1.25-1H21v-1.5h-2.5V8H17v5h-2.25V8H13v1.5h1.75V14.5z" />
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C13.24 10.39 14.177 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C15.26 7.01 14.323 6 12 6zM7.5 11.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C8.74 15.79 9.677 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C10.76 12.41 9.823 11.4 7.5 11.4z" />
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path
        opacity="0.3"
        d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35a1.55 1.55 0 0 0-.78 1.35v8.6c0 .56.3 1.07.78 1.35l7.44 4.3c.48.28 1.08.28 1.56 0l7.44-4.3c.48-.28.78-.79.78-1.35v-8.6c0-.56-.3-1.07-.78-1.35L12.78 2.05c-.23-.13-.51-.2-.78-.2z"
      />
      <path d="M12 4.2L6 7.6v6.8l6 3.4 6-3.4V7.6L12 4.2zm0 2.3l4 2.3v4.6l-4 2.3-4-2.3V8.8l4-2.3z" />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path
        opacity="0.4"
        d="M3 14c0 2.5 2 4 4.5 4h9c2.5 0 4-1.5 4-3.5 0 0 2-1 2-3.5h-2.5V9h-3V7h-3V5h-3v2H7.5V9H5v2H2.5c0 1.5.5 3 .5 3z"
      />
      <rect x="8" y="9" width="2" height="2" rx="0.3" />
      <rect x="11" y="9" width="2" height="2" rx="0.3" />
      <rect x="14" y="9" width="2" height="2" rx="0.3" />
      <rect x="11" y="6" width="2" height="2" rx="0.3" />
      <rect x="14" y="6" width="2" height="2" rx="0.3" />
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7c-4 0-7 2-7 5s3 5 7 5 7-2 7-5-3-5-7-5zm0 8c-2.8 0-5-1.3-5-3s2.2-3 5-3 5 1.3 5 3-2.2 3-5 3z" />
      <path
        opacity="0.5"
        d="M7.5 20.5c-2 .8-4-1-4-1s1 2 4 2 4-1 4-1-2 .2-4 0zm9 0c-2 .2-4 0-4 0s1 1 4 1 4-2 4-2-2 2-4 1z"
      />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="12" cy="6" rx="8" ry="3.5" />
      <path opacity="0.5" d="M4 6v5c0 1.93 3.58 3.5 8 3.5S20 12.93 20 11V6" />
      <path opacity="0.3" d="M4 11v5c0 1.93 3.58 3.5 8 3.5S20 17.93 20 16v-5" />
    </svg>
  ),
  Supabase: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path opacity="0.5" d="M11.9 2.2L3 14.5h9V22l9-12.3H12V2.2h-.1z" />
      <path d="M11.9 2.2L12 9.7h9L12 22V14.5H3l8.9-12.3z" />
    </svg>
  ),
  GraphQL: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path opacity="0.3" d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.2L4.8 8.5v7l7.2 4.3 7.2-4.3v-7L12 4.2z" />
      <circle cx="12" cy="2.5" r="1.5" />
      <circle cx="20.5" cy="7.5" r="1.5" />
      <circle cx="20.5" cy="16.5" r="1.5" />
      <circle cx="12" cy="21.5" r="1.5" />
      <circle cx="3.5" cy="16.5" r="1.5" />
      <circle cx="3.5" cy="7.5" r="1.5" />
      <circle cx="12" cy="12" r="2" />
      <path
        opacity="0.4"
        strokeWidth="1"
        stroke="currentColor"
        fill="none"
        d="M12 4l8.5 5M12 4L3.5 9M20.5 9.5v7M3.5 9.5v7M12 20l8.5-5M12 20l-8.5-5M12 10v4"
      />
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 20h20L12 2z" />
    </svg>
  ),
  Kubernetes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83" />
      <circle cx="12" cy="2" r="1.5" opacity="0.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="22" r="1.5" opacity="0.6" fill="currentColor" stroke="none" />
      <circle cx="2" cy="12" r="1.5" opacity="0.6" fill="currentColor" stroke="none" />
      <circle cx="22" cy="12" r="1.5" opacity="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  'React Native': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  Expo: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.5 14.5c2-4 4.5-8 9.5-12 5 4 7.5 8 9.5 12-2 1-5 1.5-9.5 1.5S4.5 15.5 2.5 14.5zm9.5 5.5c-2 0-3.5-.3-4.5-.8L12 22l4.5-2.8c-1 .5-2.5.8-4.5.8z" />
    </svg>
  ),
  Flutter: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm.014 11.071L8.857 16.53l5.457 5.457h7.371l-5.457-5.457 5.457-5.457-7.357-.002z" />
    </svg>
  ),
  'Swift / SwiftUI': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.003 14.003c.12-4.12-2.88-8.44-7.77-10.88a.95.95 0 0 0-.11-.05c2.25 2.84 3.17 6.19 2.29 8.94-.09.28-.2.54-.32.8-.13-.11-.27-.23-.41-.34-3.44-2.73-7.14-7.4-7.14-7.4s1.43 4.2 4.77 7.37c-.21-.06-.79-.36-1.37-.74-2.74-1.79-5.19-4.63-5.19-4.63.71 4.08 3.15 7.27 5.91 8.84.47.27.95.49 1.43.67-1.23.72-2.98 1-4.6.88 2.51 1.55 7.06 1.68 9.81-.44a7.36 7.36 0 0 0 2.73-3.77z" />
    </svg>
  ),
  Firebase: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path opacity="0.3" d="M5.5 19.5L7 8l4 4L5.5 19.5z" />
      <path opacity="0.6" d="M18.5 19.5L12 7l-1 5 4 4-7 3.5 10.5 1z" />
      <path d="M5.5 19.5L9 4l3 10-6.5 5.5z" />
    </svg>
  ),
};

const FALLBACK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" opacity="0.3" />
    <path d="M9 9h6M9 12h6M9 15h4" opacity="0.7" />
  </svg>
);

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className }: TechIconProps) {
  const icon = ICONS[name] ?? FALLBACK;
  return <span className={cn('inline-block h-6 w-6', className)}>{icon}</span>;
}

export const TECH_ICON_NAMES = Object.keys(ICONS);
