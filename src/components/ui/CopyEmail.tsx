import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { copyToClipboard } from '@/lib/contact';
import { cn } from '@/lib/utils';

interface CopyEmailProps {
  address: string;
  className?: string;
}

/**
 * One-tap "copy the founder's email". The visible address is also a real
 * mailto: link elsewhere on the page — this exists for the lead who'd rather
 * paste it into their own client than switch apps.
 */
export function CopyEmail({ address, className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyToClipboard(address);
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 font-mono text-xs text-white/80 transition-colors hover:border-brand-400/40 hover:bg-white/[0.07] hover:text-white active:scale-[0.98]',
        className,
      )}
      aria-label={`Copy email address ${address}`}
    >
      <span>{address}</span>
      <span className="relative flex h-4 w-4 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="ok"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Check className="h-4 w-4 text-leaf-400" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Copy className="h-4 w-4 text-white/50 transition-colors group-hover:text-brand-300" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  );
}
