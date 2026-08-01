import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeIn } from '@/lib/motion';

const TERMINAL_LINES = [
  { delay: 0.6, prefix: '❯', text: 'plantiers deploy', color: 'text-white/70' },
  { delay: 1.1, prefix: '✓', text: 'Type-checking passed', color: 'text-emerald-400' },
  { delay: 1.6, prefix: '✓', text: 'Build optimized', color: 'text-emerald-400' },
  { delay: 2.1, prefix: '✓', text: 'Assets compressed', color: 'text-emerald-400' },
  { delay: 2.6, prefix: '🚀', text: 'Deploying to production…', color: 'text-amber-400' },
  { delay: 3.3, prefix: '✓', text: 'Live', color: 'text-brand-300' },
] as const;

/**
 * Illustrative deploy-log animation — deliberately generic ("Live", not a
 * specific fabricated latency number) so it reads as a workflow motif
 * rather than an unverifiable performance claim.
 */
export function TerminalCard() {
  return (
    <motion.div
      variants={fadeIn}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-amber-500/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="ml-auto font-mono text-[11px] tracking-widest text-white/60">plantiers — zsh</span>
      </div>

      <div className="min-h-[220px] space-y-2 p-5 font-mono text-[13px] leading-relaxed">
        {TERMINAL_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay, duration: 0.3 }}
            className="flex gap-2"
          >
            <span className={cn('shrink-0', line.color)}>{line.prefix}</span>
            <span className="text-white/80">{line.text}</span>
          </motion.div>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 4, duration: 1, repeat: Infinity }}
          className="ml-1 inline-block h-4 w-2 bg-brand-400 align-middle"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-900/30 to-transparent" />
    </motion.div>
  );
}
