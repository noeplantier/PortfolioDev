import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const PROJECT_TYPES = ['Web app', 'Mobile app', 'Landing page', 'Cloud / DevOps', 'AI integration', 'Something else'];

const inputClasses =
  'w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/25 backdrop-blur-sm transition-all duration-200 focus:border-brand-400/60 focus:bg-white/[0.07] focus:outline-none';

/**
 * Netlify Forms, no backend. The static form in index.html is what Netlify's
 * build-time scan actually detects; this one just needs to submit a matching
 * `form-name` + field set as a urlencoded POST to "/".
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full flex-col items-center justify-center rounded-2xl border border-leaf-400/20 bg-leaf-400/[0.04] p-10 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf-400/15">
          <Check className="h-6 w-6 text-leaf-400" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-white">Message sent.</h3>
        <p className="mt-2 max-w-xs text-sm text-white/55">
          Thanks for reaching out — you'll hear back within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form name="contact" data-netlify="true" onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot — off-screen (not display:none) so simple bots that skip hidden fields still fill it. */}
      <div className="absolute left-[-9999px] top-0" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-[10px] tracking-widest text-white/40">
            NAME
          </label>
          <input id="name" name="name" type="text" required placeholder="Jane Doe" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-[10px] tracking-widest text-white/40">
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-2 block font-mono text-[10px] tracking-widest text-white/40">
            COMPANY <span className="text-white/20">(optional)</span>
          </label>
          <input id="company" name="company" type="text" placeholder="Acme Inc." className={inputClasses} />
        </div>
        <div>
          <label htmlFor="projectType" className="mb-2 block font-mono text-[10px] tracking-widest text-white/40">
            PROJECT TYPE
          </label>
          <select id="projectType" name="projectType" defaultValue="" required className={inputClasses}>
            <option value="" disabled>
              Select one
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-void">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-[10px] tracking-widest text-white/40">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project, timeline, and budget…"
          className={cn(inputClasses, 'resize-none leading-relaxed')}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={status === 'idle' ? { scale: 1.01, y: -1 } : undefined}
        whileTap={status === 'idle' ? { scale: 0.99 } : undefined}
        className={cn(
          'flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-bold transition-all duration-300',
          status === 'error'
            ? 'border border-red-400/30 bg-red-500/15 text-red-300'
            : 'bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:shadow-glow disabled:opacity-60',
        )}
      >
        {status === 'sending' ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
            />
            Sending…
          </>
        ) : status === 'error' ? (
          'Something went wrong — try again or email directly'
        ) : (
          <>
            Send message
            <Send className="h-4 w-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}
