import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { ScrambleText, WordReveal } from './AnimatedText';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** A phrase inside `title` rendered in the brand gradient. */
  accent?: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

/**
 * Eyebrow decodes (monospace scramble), the title resolves word by word, the
 * subtitle follows — one choreography shared by every section so the page
 * has a recognisable "entrance" rhythm rather than ten different fades.
 */
export function SectionHeading({ eyebrow, title, accent, subtitle, align = 'center', className }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <motion.div
      variants={stagger(0.1, 0)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className)}
    >
      {eyebrow && (
        <motion.div variants={fadeUp} className={cn('mb-5 flex items-center gap-3', centered && 'justify-center')}>
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-500" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-400">
            <ScrambleText text={eyebrow.toUpperCase()} />
          </span>
          {centered && <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-500" />}
        </motion.div>
      )}
      <WordReveal
        text={title}
        accent={accent}
        className="text-4xl font-bold leading-[1.15] text-white sm:text-5xl sm:leading-[1.15]"
        delay={0.1}
      />
      {subtitle && (
        <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-white/70">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
