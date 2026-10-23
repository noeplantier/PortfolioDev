import { motion } from 'framer-motion';
import { CornerDownLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { channels } from '@/data/site';

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
 *
 * The last "command" is a real link: the terminal ends on the one action the
 * page actually wants — booking a call — so the hero's visual centrepiece is
 * also a conversion path, not just decoration.
 */
export function TerminalCard() {
  return (
    <Card tilt hoverLift={false} className="rounded-2xl">
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-amber-500/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="ml-auto font-mono text-[11px] tracking-widest text-white/60">plantiers — zsh</span>
      </div>

      <div className="min-h-[250px] space-y-2 p-5 font-mono text-[13px] leading-relaxed">
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

        <motion.a
          href={channels.book.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.4 }}
          aria-label="Book a free 30-minute call"
          className="group mt-4 flex items-center gap-2 rounded-lg border border-brand-400/25 bg-brand-500/10 px-3 py-2.5 transition-colors hover:border-brand-400/60 hover:bg-brand-500/20"
        >
          <span className="text-brand-300">❯</span>
          <span className="text-white">plantiers book --call</span>
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block h-4 w-2 bg-brand-400"
          />
          <span className="ml-auto flex items-center gap-1 rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/60 transition-colors group-hover:border-brand-300/60 group-hover:text-white">
            <CornerDownLeft className="h-3 w-3" /> click
          </span>
        </motion.a>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-900/30 to-transparent" />
    </Card>
  );
}
