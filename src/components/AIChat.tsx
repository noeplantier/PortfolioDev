'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Trash2, Copy, Check, Download } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [revealTitle, setRevealTitle] = useState(false);
  const [revealSubtitle, setRevealSubtitle] = useState(false);
  const [revealChat, setRevealChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setRevealTitle(true), 100);
    const timer2 = setTimeout(() => setRevealSubtitle(true), 200);
    const timer3 = setTimeout(() => setRevealChat(true), 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const websiteContext = `
    Website: Plantiers - A Software Agency
    Founder: Noé Plantier
    Tagline: "Code that ages like fine wine"
    Services: Custom software development, web applications, modern tech stack solutions
    Tech Stack: TypeScript, React, Next.js, Tailwind CSS, Framer Motion, cutting-edge tools
    Contact: plantiernoe50@gmail.com
    LinkedIn: linkedin.com/in/noe-plantier
    GitHub: github.com/noeplantier
    Values: Lightning fast performance, modern stack, excellent developer experience, innovative solutions
    Philosophy: We build software that doesn't just work today, but continues to deliver value for years to come
  `;

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input, 
      timestamp: new Date().toISOString() 
    };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Utiliser la route API Next.js au lieu d'appeler directement l'API Anthropic
      const requestBody = {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: 'user',
            content: `You are an AI assistant for the Plantiers website. Context: ${websiteContext}\n\nUser question: ${userInput}\n\nProvide a helpful, detailed, and professional response. Be conversational, friendly, and informative. If asked about technical details, provide thorough explanations. Format your response with proper spacing and structure for readability.`
          }
        ]
      };

      console.log('📤 Sending request to API...');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📥 Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error:', errorData);
        throw new Error(`API_ERROR_${response.status}: ${errorData.error?.message || errorData.error?.type || 'Request failed'}`);
      }

      const data = await response.json();
      console.log('✅ Data parsed successfully');
      
      const aiResponse = data.content
        .filter((block: any) => block.type === 'text')
        .map((block: any) => block.text)
        .join('\n');

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('❌ Full error details:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      let displayMessage = '';
      
      if (errorMessage.includes('API_ERROR_401')) {
        displayMessage = '⚠️ **Invalid API Key**\n\nYour Anthropic API key is invalid or expired.\n\n**Solution:**\n1. Go to https://console.anthropic.com/settings/keys\n2. Create a new API key\n3. Update your `.env.local` file:\n   `ANTHROPIC_API_KEY=your_new_key`\n4. Restart your server: `npm run dev`';
      } else if (errorMessage.includes('API_ERROR_429')) {
        displayMessage = '⚠️ **Rate Limit Exceeded**\n\nYou\'ve sent too many requests. Please wait a moment and try again.';
      } else if (errorMessage.includes('API_ERROR_400')) {
        displayMessage = '⚠️ **Bad Request**\n\nThere was an error with the request format. Please try again or refresh the page.';
      } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        displayMessage = '⚠️ **Network Error**\n\nCould not connect to the API. Please check:\n- Your internet connection\n- If the API route `/api/chat` exists\n- Your server is running';
      } else if (errorMessage.includes('API_ERROR')) {
        displayMessage = `⚠️ **API Error**\n\n${errorMessage.split(':')[1] || 'Unknown error occurred'}`;
      } else {
        displayMessage = '⚠️ **Service Unavailable**\n\nThe AI service is currently unavailable. Please:\n1. Check the browser console for details\n2. Verify your API route is configured\n3. Ensure your server is running\n4. Try again in a moment';
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: displayMessage,
        timestamp: new Date().toISOString(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the conversation?')) {
      setMessages([]);
    }
  };

  const handleCopyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleExportChat = () => {
    const chatData = messages.map(msg => 
      `[${msg.role.toUpperCase()}] ${new Date(msg.timestamp).toLocaleString()}\n${msg.content}\n`
    ).join('\n---\n\n');
    
    const blob = new Blob([chatData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantiers-chat-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const suggestedQuestions = [
    "What services does Plantiers offer?",
    "Tell me about the tech stack you use",
    "How can I contact Noé?",
    "What makes Plantiers different?"
  ];

  return (
    <section
      id="ask-ai"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 overflow-hidden"
      style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif" }}
    >
      <div className="w-full max-w-5xl flex flex-col items-center gap-6 relative z-10">
        
        {/* Title Animation */}
        <AnimatePresence>
          {revealTitle && (
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Ask Artificial Intelligence
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Subtitle Animation */}
        <AnimatePresence>
          {revealSubtitle && (
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-lg text-center text-white/70 mb-6 max-w-2xl"
            >
              Get instant answers about our services and how we can help your business
            </motion.p>
          )}
        </AnimatePresence>

        {/* Chat Interface Animation */}
        <AnimatePresence>
          {revealChat && (
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="w-full"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                
                {/* Chat Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white/90">Claude AI Assistant</h3>
                      <p className="text-sm text-white/60">Powered by Claude Sonnet 4</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {messages.length > 0 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleExportChat}
                          className="p-2.5 hover:bg-white/10 rounded-lg transition-colors group"
                          title="Export chat"
                        >
                          <Download className="w-5 h-5 text-white/70 group-hover:text-purple-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleClearChat}
                          className="p-2.5 hover:bg-white/10 rounded-lg transition-colors group"
                          title="Clear chat"
                        >
                          <Trash2 className="w-5 h-5 text-white/70 group-hover:text-red-400" />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>

                {/* Messages Container */}
                <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-black/20">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-white/50">
                      <div className="text-center max-w-xl">
                        <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400/50" />
                        <h4 className="text-xl font-semibold text-white/70 mb-3">Start a Conversation</h4>
                        <p className="text-sm mb-6">Ask me anything about Plantiers, our services, tech stack, or how we can help you.</p>
                        
                        {/* Suggested Questions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                          {suggestedQuestions.map((question, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setInput(question)}
                              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/30 rounded-xl text-sm text-white/70 hover:text-white transition-all text-left"
                            >
                              {question}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] group relative ${msg.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                        <div
                          className={`p-4 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                              : msg.isError
                              ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                              : 'bg-white/10 text-white/90 border border-white/10'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        
                        {/* Message Actions */}
                        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-white/40">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </span>
                          {msg.role === 'assistant' && !msg.isError && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleCopyMessage(msg.content, idx)}
                              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                              title="Copy message"
                            >
                              {copiedIndex === idx ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-white/50" />
                              )}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-5 border-t border-white/10 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
                  <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                      <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type your question... (Shift+Enter for new line)"
                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-purple-400/50 transition-colors resize-none min-h-[52px] max-h-[200px]"
                        disabled={isLoading}
                        rows={1}
                      />
                    </div>
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex-shrink-0"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-white/40 mt-2 text-center">
                    Press Enter to send • Shift+Enter for new line
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6"
        >
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <h4 className="font-semibold text-white/90 mb-1">⚡ Real-Time</h4>
            <p className="text-sm text-white/60">Instant responses powered by Claude AI</p>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <h4 className="font-semibold text-white/90 mb-1">🎯 Context-Aware</h4>
            <p className="text-sm text-white/60">Understands your conversation history</p>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <h4 className="font-semibold text-white/90 mb-1">💡 Intelligent</h4>
            <p className="text-sm text-white/60">Detailed answers about Plantiers</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}