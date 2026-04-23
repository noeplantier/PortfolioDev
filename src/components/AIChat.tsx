'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Sparkles, Trash2, Copy, Check,
  Download, BotIcon, Circle, Terminal,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// ─── Variants ─────────────────────────────────────────────────────────────────
const slideIn = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0 0 0)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } },
};

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the intelligent portfolio assistant for Noé Plantier, a Full Stack Developer and Founder of Plantiers agency.

ABOUT NOÉ:
- 4+ years experience, 30+ shipped projects
- Based in Bali, Indonesia (open to remote worldwide)
- Available for freelance & full-time opportunities
- Response time: under 24 hours

TECHNICAL SKILLS:
Frontend: React 18+, Next.js 15, TypeScript, Tailwind CSS v4, Svelte 5, Astro 5, Framer Motion
Mobile: React Native (New Architecture), Expo, Flutter, Swift/SwiftUI, Kotlin/Compose
Backend: Node.js, Bun 2, Golang, tRPC, GraphQL
Databases: PostgreSQL, Supabase, Neon DB, Drizzle ORM, MongoDB, Redis, Firebase
DevOps: Docker, Kubernetes, Vercel, Cloudflare Workers, AWS, Terraform, Turborepo
Testing: Vitest, Playwright

SERVICES (Plantiers Agency):
- Web SaaS & dashboards
- Cross-platform mobile apps
- Performance-first architecture (<80ms TTI, Lighthouse 100)
- AI/ML integration (OpenAI, Anthropic, LLM workflows)
- Design systems & UI/UX

PRICING (indicative):
- Landing page: €2,000 – €3,000 (1-2 weeks)
- Showcase site: €3,000 – €5,000 (3-4 weeks)
- Web app standard: €8,000 – €12,000 (6-8 weeks)
- E-commerce: €7,000 – €15,000 (8-12 weeks)
- Complex SaaS: €15,000+ (3-6 months)

KEY PROJECTS:
- CreatorPro Suite: AI tools for content creators (React, Node.js)
- Crypto Compass: Real-time crypto dashboard, 2000+ traders (React, WebSocket)
- Feelomi: Mental health mobile platform (Flutter)
- Ti Padel: Court booking system (Next.js, Node.js)
- Universe App: Streaming mobile app (React Native)
- StudioCall: AI voice recording studio (JavaScript)
- Plantiers: Agency website & pricing platform (Next.js)

CONTACT:
- Email: plantiernoe50@gmail.com
- LinkedIn: linkedin.com/in/noeplantier
- GitHub: github.com/noeplantier
- Calendly: calendly.com/plantiernoe50/30min (free 30min call)

INSTRUCTIONS:
- Be concise, professional, and helpful
- Answer in the language the user writes in (French or English)
- For technical questions, give precise answers based on Noé's actual stack
- When relevant, encourage them to book a call or send an email
- Keep responses under 300 words unless a detailed breakdown is explicitly requested
- Use markdown formatting (bold, bullet points) for clarity`;

// ─── Suggested Questions ──────────────────────────────────────────────────────
const SUGGESTIONS = [
  "What's your full tech stack?",
  "How much does a web app cost?",
  "How long does a typical project take?",
  "Can you show me some projects?",
  "Are you available for freelance?",
  "How can I contact Noé?",
];

// ─── Format message (basic markdown → JSX) ────────────────────────────────────
const FormattedMessage = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-1.5 text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**'))
          return <p key={i} className="font-bold text-white">{line.slice(2, -2)}</p>;
        if (line.startsWith('• ') || line.startsWith('- '))
          return (
            <p key={i} className="flex gap-2 text-white/75">
              <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-violet-400" />
              <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
            </p>
          );
        if (!line.trim()) return <div key={i} className="h-1" />;
        return (
          <p key={i} className="text-white/75"
            dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
        );
      })}
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
  }, [input]);

  // ── API Call ────────────────────────────────────────────────────────────────
  const sendMessage = async (userInput: string) => {
    if (!userInput.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: userInput,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });

      if (!response.ok) throw new Error(`API ${response.status}`);

      const data = await response.json();
      const text = data.content?.[0]?.text ?? "I couldn't generate a response. Please try again.";

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: text,
        timestamp: new Date().toISOString(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm temporarily unavailable. You can reach Noé directly at **plantiernoe50@gmail.com** or book a call at calendly.com/plantiernoe50/30min",
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleCopy = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClear = () => {
    if (window.confirm('Clear this conversation?')) setMessages([]);
  };

  const handleExport = () => {
    const text = messages
      .map(m => `[${m.role.toUpperCase()}] ${new Date(m.timestamp).toLocaleString()}\n${m.content}`)
      .join('\n\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noeplantier-chat-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="ask-ai"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sky-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col items-center gap-6 relative z-10">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {visible && (
            <>
              <motion.div
                variants={slideIn}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-violet-400 uppercase">
                    Powered by Claude · Anthropic
                  </span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-violet-500" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Ask AI{' '}
                  <BotIcon className="inline-block w-10 h-10 text-white ml-2 mb-1" />
                </h2>
                <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
                  Get instant answers about Noé's skills, services, projects, and rates.
                </p>
              </motion.div>

              {/* ── Chat window ─────────────────────────────────────────────── */}
              <motion.div
                variants={slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="w-full"
              >
                <div
                  className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden"
                  style={{ boxShadow: '0 0 80px rgba(139,92,246,0.06), 0 0 0 1px rgba(255,255,255,0.04)' }}
                >
                  {/* Top bar */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07] bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl">
                        <Sparkles className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Portfolio Assistant</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                          />
                          <span className="font-mono text-[10px] text-emerald-400/80">Online · Noé Plantier</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {messages.length > 0 && (
                      <div className="flex items-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          onClick={handleExport}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/30 hover:text-white/70"
                          title="Export chat"
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          onClick={handleClear}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/30 hover:text-red-400"
                          title="Clear chat"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Messages */}
                  <div className="h-[480px] overflow-y-auto p-6 space-y-5 scroll-smooth">

                    {/* Empty state */}
                    {messages.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="p-5 bg-violet-500/10 rounded-2xl border border-violet-400/15 mb-6">
                          <Terminal className="w-10 h-10 text-violet-400/60" />
                        </div>
                        <h4 className="text-lg font-bold text-white/70 mb-2">Start a conversation</h4>
                        <p className="text-sm text-white/35 max-w-xs mb-8 leading-relaxed">
                          Ask me anything about Noé's skills, projects, availability, or pricing.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                          {SUGGESTIONS.map((q, i) => (
                            <motion.button
                              key={i}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + i * 0.06 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => sendMessage(q)}
                              className="p-3 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-violet-400/25 rounded-xl text-xs text-white/50 hover:text-white/80 transition-all text-left leading-relaxed"
                            >
                              {q}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Messages */}
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`group max-w-[80%] ${msg.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                          {/* Sender label */}
                          <p className={`font-mono text-[9px] tracking-widest mb-1.5 ${msg.role === 'user' ? 'text-right text-white/25' : 'text-white/25'}`}>
                            {msg.role === 'user' ? 'YOU' : 'ASSISTANT'}
                          </p>

                          <div className={`p-4 rounded-2xl ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-br from-violet-500 to-blue-500 text-white'
                              : 'bg-white/[0.06] border border-white/[0.08]'
                          }`}>
                            {msg.role === 'assistant'
                              ? <FormattedMessage content={msg.content} />
                              : <p className="text-sm leading-relaxed">{msg.content}</p>}
                          </div>

                          {/* Meta row */}
                          <div className={`flex items-center gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            <span className="font-mono text-[9px] text-white/25">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {msg.role === 'assistant' && (
                              <motion.button
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                onClick={() => handleCopy(msg.content, idx)}
                                className="p-1 rounded hover:bg-white/10 transition-colors"
                              >
                                {copiedIndex === idx
                                  ? <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  : <Copy className="w-3.5 h-3.5 text-white/30" />}
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="p-4 bg-white/[0.06] rounded-2xl border border-white/[0.08]">
                          <div className="flex gap-1.5 items-center">
                            {[0, 150, 300].map(delay => (
                              <motion.div
                                key={delay}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: delay / 1000 }}
                                className="w-2 h-2 bg-violet-400/70 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input bar */}
                  <div className="px-5 py-4 border-t border-white/[0.07] bg-white/[0.02]">
                    <div className="flex gap-3 items-end">
                      <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything… (Enter to send · Shift+Enter for new line)"
                        rows={1}
                        disabled={isLoading}
                        className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-2xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-400/50 focus:bg-white/[0.08] transition-all resize-none min-h-[46px] max-h-[160px] font-mono leading-relaxed disabled:opacity-50"
                      />
                      <motion.button
                        onClick={() => sendMessage(input)}
                        disabled={isLoading || !input.trim()}
                        whileHover={!isLoading && input.trim() ? { scale: 1.05, y: -1 } : {}}
                        whileTap={!isLoading && input.trim() ? { scale: 0.95 } : {}}
                        className="shrink-0 w-11 h-11 flex items-center justify-center bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl disabled:opacity-35 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200"
                      >
                        <Send className="w-4.5 h-4.5 text-white" />
                      </motion.button>
                    </div>
                    <p className="font-mono text-[9px] text-white/20 mt-2 text-center tracking-wide">
                      POWERED BY CLAUDE · ANTHROPIC AI
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ── Feature pills ───────────────────────────────────────────── */}
              <motion.div
                variants={slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full"
              >
                {[
                  { icon: '⚡', title: 'Instant', desc: 'Real-time responses, zero latency' },
                  { icon: '🎯', title: 'Accurate', desc: 'Trained on Noé\'s full portfolio' },
                  { icon: '🔒', title: 'Private', desc: 'No chat history stored' },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/[0.07]"
                  >
                    <span className="text-xl">{icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white/80">{title}</p>
                      <p className="text-xs text-white/35 font-mono">{desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}