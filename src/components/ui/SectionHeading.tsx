import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

/** The eyebrow + h2 + subhead pattern every section in the old codebase hand-rolled slightly differently. */
export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <motion.div
      variants={stagger()}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className)}
    >
      {eyebrow && (
        <motion.div variants={fadeUp} className={cn('mb-5 flex items-center gap-3', centered && 'justify-center')}>
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-500" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-400">{eyebrow}</span>
          {centered && <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-500" />}
        </motion.div>
      )}
      <motion.h2 variants={fadeUp} className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-white/70">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
