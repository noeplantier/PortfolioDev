import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Slow-drifting colour fields behind the hero. Pure radial gradients (already
 * soft — no `filter: blur`, which is far more expensive) moved with
 * transform-only keyframes, and paused the moment the section scrolls out of
 * view so an off-screen hero costs nothing.
 */
export function Aurora({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '120px 0px' });
  const state = inView ? 'running' : 'paused';

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div
        className="absolute -left-[20%] -top-[30%] h-[75vh] w-[70vw] animate-aurora-a"
        style={{
          animationPlayState: state,
          background: 'radial-gradient(closest-side, rgba(124,58,237,0.34), rgba(124,58,237,0) 100%)',
        }}
      />
      <div
        className="absolute -right-[18%] top-[18%] h-[65vh] w-[55vw] animate-aurora-b"
        style={{
          animationPlayState: state,
          background: 'radial-gradient(closest-side, rgba(91,33,182,0.3), rgba(91,33,182,0) 100%)',
        }}
      />
      <div
        className="absolute -bottom-[25%] left-[28%] h-[55vh] w-[48vw] animate-aurora-a"
        style={{
          animationPlayState: state,
          animationDirection: 'alternate-reverse',
          background: 'radial-gradient(closest-side, rgba(34,197,94,0.1), rgba(34,197,94,0) 100%)',
        }}
      />
    </div>
  );
}
