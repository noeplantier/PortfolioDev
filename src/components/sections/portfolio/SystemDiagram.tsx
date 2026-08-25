import { motion } from 'framer-motion';
import { Database, Monitor, Server, Smartphone, Sparkles, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SystemLayer } from '@/data/projects';
import { cn } from '@/lib/utils';

const LAYER_META: Record<SystemLayer, { label: string; icon: LucideIcon }> = {
  frontend: { label: 'Frontend', icon: Monitor },
  backend: { label: 'Backend', icon: Server },
  mobile: { label: 'Mobile', icon: Smartphone },
  realtime: { label: 'Realtime', icon: Zap },
  database: { label: 'Database', icon: Database },
  ai: { label: 'AI Layer', icon: Sparkles },
};

interface SystemDiagramProps {
  layers: SystemLayer[];
}

/**
 * A small connected-node stack representing which architectural layers a
 * project touches — the same visual language as the Hero's NeuralField
 * (dot + connecting line), reused deliberately rather than inventing a new
 * diagram style per section. Green is reserved for the AI layer specifically
 * everywhere else in this design system; it stays reserved here too.
 */
export function SystemDiagram({ layers }: SystemDiagramProps) {
  return (
    <div role="list" aria-label="System layers" className="flex flex-col">
      {layers.map((layer, i) => {
        const meta = LAYER_META[layer];
        const isAI = layer === 'ai';
        const isLast = i === layers.length - 1;
        return (
          <motion.div
            key={layer}
            role="listitem"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            className="relative flex items-center gap-3 py-2 first:pt-0 last:pb-0"
          >
            {!isLast && <span className="absolute left-[7.5px] top-7 h-full w-px bg-white/10" aria-hidden="true" />}
            <span
              className={cn(
                'relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                isAI ? 'border-leaf-400/40 bg-leaf-400/10' : 'border-brand-400/40 bg-brand-400/10',
              )}
            >
              <span className={cn('h-1.5 w-1.5 rounded-full', isAI ? 'bg-leaf-400' : 'bg-brand-400')} />
            </span>
            <meta.icon className={cn('h-3.5 w-3.5 shrink-0', isAI ? 'text-leaf-400' : 'text-brand-400/80')} />
            <span className="font-mono text-xs text-white/70">{meta.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
