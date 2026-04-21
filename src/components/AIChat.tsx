'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Trash2, Copy, Check, Download, BotIcon } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
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
    setTimeout(() => setRevealTitle(true), 100);
    setTimeout(() => setRevealSubtitle(true), 200);
    setTimeout(() => setRevealChat(true), 300);
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

  const portfolioKnowledge = {
    competences: `🚀 **Compétences de Noé Plantier :**

**Frontend Expert**
• React 18+ & Next.js 14/15 (App Router, Server Components)
• TypeScript avancé (génériques, utility types)
• Tailwind CSS & Framer Motion
• Redux Toolkit, Zustand, React Query
• Performance & SEO optimisés

**Backend Solide**
• Node.js & Express (APIs RESTful)
• PostgreSQL, MongoDB, Prisma ORM
• NextAuth.js, JWT, OAuth 2.0
• GraphQL & tRPC

**DevOps & IA**
• Vercel, AWS, Docker, CI/CD
• Intégration OpenAI, Claude, chatbots
• Automatisation & workflows IA

Stack moderne et performante ! 💪`,

    services: `💼 **Services Plantiers :**

**Développement Web**
• Applications SaaS & dashboards
• Sites vitrine performants
• Progressive Web Apps (PWA)

**E-commerce**
• Shopify, WooCommerce, solutions custom
• Paiements Stripe/PayPal
• Gestion stocks temps réel

**IA & Automatisation**
• Chatbots intelligents
• Génération de contenu
• Workflows automatisés

**Optimisation**
• Migration stack moderne
• Performance & SEO
• Tests & maintenance

💎 "Code that ages like fine wine" - Des solutions durables !`,

    prixTypique: `💰 **Projet Typique - Tarification :**

**Application Web Standard**
Budget : 8 000€ - 12 000€
Durée : 6-8 semaines

**Inclus :**
✅ Design UI/UX moderne
✅ Frontend React/Next.js responsive
✅ Backend Node.js + API
✅ Base de données PostgreSQL
✅ Authentification utilisateurs
✅ Dashboard admin
✅ Tests & optimisation
✅ Déploiement Vercel/AWS
✅ Formation & documentation

**Autres projets :**
• Landing page : 2 000€ - 3 000€
• Site vitrine (10 pages) : 3 000€ - 5 000€
• E-commerce : 7 000€ - 15 000€
• App complexe : 15 000€+

📧 Devis gratuit : plantiernoe50@gmail.com`,

    delaiTypique: `⏱️ **Délais de Livraison - Projet Typique :**

**Application Web Standard**
Durée : 6-8 semaines (1.5-2 mois)

**Détail du planning :**
• Semaine 1-2 : Analyse & design UI/UX
• Semaine 3-5 : Développement frontend
• Semaine 4-6 : Développement backend
• Semaine 7 : Tests & optimisation
• Semaine 8 : Déploiement & formation

**Autres délais :**
• Landing page : 1-2 semaines
• Site vitrine : 3-4 semaines
• E-commerce : 8-12 semaines
• App complexe : 3-6 mois

**Méthode Agile :**
✅ Livraisons progressives (sprints 2 semaines)
✅ Démos régulières
✅ Ajustements en cours de route

Mode rush disponible pour urgences ! ⚡`,

    projetsRealises: `🎯 **Projets Réalisés par Noé :**

**1. Plateforme SaaS Analytics**
• Dashboard temps réel avec graphiques interactifs
• 5000+ utilisateurs actifs
• Tech : Next.js, PostgreSQL, Redis
• Performance : <1s chargement

**2. E-commerce Mode (15k produits)**
• Recommandations IA personnalisées
• +40% conversion après optimisation
• Tech : Next.js, Shopify, Stripe
• Revenue : +500k€/an

**3. App Trading Crypto**
• Données temps réel (WebSocket)
• Interface ultra-rapide (<100ms)
• Tech : React, Node.js, MongoDB
• 2000+ traders actifs

**4. Chatbot Service Client IA**
• Réponses automatisées intelligentes
• -60% tickets support
• Tech : OpenAI API, Next.js
• Satisfaction : 4.8/5

**5. CMS Intranet Entreprise**
• Gestion documents & workflow
• 200+ employés
• Tech : Next.js, Prisma, PostgreSQL
• Gain productivité : +35%

Tous avec code propre, tests, et maintenus ! 🚀

Projet similaire en tête ? 📧 plantiernoe50@gmail.com`,

    contact: `📬 **Contacter Noé Plantier :**

**Email :** plantiernoe50@gmail.com
**LinkedIn :** linkedin.com/in/noe-plantier
**GitHub :** github.com/noeplantier

💬 **Pour votre projet :**
Envoyez un email avec :
• Description du projet
• Objectifs principaux
• Timeline souhaitée
• Budget estimé (optionnel)

⚡ Réponse sous 24h garantie !
🎁 Consultation gratuite de 30min`
  };

  const getSmartResponse = (question: string): string => {
    const q = question.toLowerCase();

    // Questions de salutation
    if (q.match(/^(bonjour|salut|hello|hi|hey|bonsoir)/)) {
      return `Bonjour ! 👋 Je suis l'assistant IA de Noé Plantier.

Je peux vous renseigner sur :
• Ses compétences techniques
• Les services Plantiers
• Les tarifs et délais
• Ses projets réalisés
• Comment le contacter

Posez-moi vos questions ! 😊`;
    }

    // Question sur prix typique
    if (q.match(/combien|prix|coût|tarif|budget|typique|coute|moyenne/)) {
      return portfolioKnowledge.prixTypique;
    }

    // Question sur délais/temps
    if (q.match(/temps|délai|durée|livraison|livrer|rapide|combien de temps/)) {
      return portfolioKnowledge.delaiTypique;
    }

    // Question sur projets réalisés
    if (q.match(/projet|réalisation|portfolio|exemple|référence|réalisé|fait|travaux/)) {
      return portfolioKnowledge.projetsRealises;
    }

    // Question sur compétences
    if (q.match(/compétence|skill|savoir|expertise|maîtrise|technologie|stack/)) {
      return portfolioKnowledge.competences;
    }

    // Question sur services
    if (q.match(/service|offre|proposer|faire|créer|développer/)) {
      return portfolioKnowledge.services;
    }

    // Question sur contact
    if (q.match(/contact|joindre|email|linkedin|github|appeler|discuter/)) {
      return portfolioKnowledge.contact;
    }

    // Réponse par défaut
    return `Merci pour votre question ! 😊

**Noé Plantier - Développeur Full Stack**

🚀 **Expertise**
Frontend : React, Next.js, TypeScript, Tailwind
Backend : Node.js, PostgreSQL, MongoDB
IA : OpenAI, Claude, chatbots

💼 **Services**
• Apps web sur mesure
• E-commerce performant
• Intégration IA

💰 **Tarif projet typique : 8-12k€**
⏱️ **Délai projet typique : 6-8 semaines**

📧 Contact : plantiernoe50@gmail.com

**Questions fréquentes :**
• "Quelles sont tes compétences ?"
• "Quels services proposes-tu ?"
• "Combien coûte un projet typique ?"
• "Quels projets as-tu réalisés ?"

N'hésitez pas ! 💡`;
  };

  const callRealAI = async (userQuestion: string): Promise<string> => {
    try {
      const context = `Tu es l'assistant IA de Noé Plantier, développeur Full Stack. Réponds de manière concise et professionnelle.

Compétences : React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, IA
Services : Apps web, e-commerce, chatbots, SaaS
Contact : plantiernoe50@gmail.com

Question : ${userQuestion}`;

      const response = await fetch(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inputs: context,
            parameters: {
              max_new_tokens: 300,
              temperature: 0.7,
              top_p: 0.9,
              return_full_text: false
            }
          })
        }
      );

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      if (Array.isArray(data) && data[0]?.generated_text) {
        return data[0].generated_text.trim();
      }
      throw new Error('Invalid response');
    } catch (error) {
      return '';
    }
  };

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
      // Essayer l'IA réelle d'abord
      const aiResponse = await callRealAI(userInput);
      
      // Si l'IA réelle échoue, utiliser les réponses intelligentes
      const finalResponse = aiResponse || getSmartResponse(userInput);
      
      // Délai réaliste
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: finalResponse,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      const fallbackResponse = getSmartResponse(userInput);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Effacer la conversation ?')) {
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
    "Quelles sont tes compétences ?",
    "Quels services proposes-tu ?",
    "Combien coûte un projet typique ?",
    "Combien de temps prends-tu pour livrer un projet ?",
    "Comment te contacter ?",
    "Quels projets as-tu réalisés ?"
  ];

  return (
    <section
      id="ask-ai"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 overflow-hidden"
      style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif" }}
    >
      <div className="w-full max-w-5xl flex flex-col items-center gap-6 relative z-10">

        <AnimatePresence>
          {revealTitle && (
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Ask AI 
              <BotIcon className="inline-block w-10 h-10 text-white ml-3 mb-1 animate-pulse" />
            </motion.h1>

          )}
        </AnimatePresence>

        <AnimatePresence>
          {revealSubtitle && (
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-lg text-center text-white/70 mb-6 max-w-2xl"
            >
             Get instant answers about Noé Plantier's skills, services, projects, and contact info.
            </motion.p>
          )}
        </AnimatePresence>

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

                <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white/90">Assistant IA Intelligent</h3>
                      <p className="text-sm text-white/60">Propulsé par IA avancée</p>
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
                          title="Exporter"
                        >
                          <Download className="w-5 h-5 text-white/70 group-hover:text-purple-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleClearChat}
                          className="p-2.5 hover:bg-white/10 rounded-lg transition-colors group"
                          title="Effacer"
                        >
                          <Trash2 className="w-5 h-5 text-white/70 group-hover:text-red-400" />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>

                <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-black/20">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-white/50">
                      <div className="text-center max-w-xl">
                        <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400/50" />
                        <h4 className="text-xl font-semibold text-white/70 mb-3">Commencez une conversation</h4>
                        <p className="text-sm mb-6">Posez vos questions sur Noé, ses compétences, projets et services.</p>

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
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                            : 'bg-white/10 text-white/90 border border-white/10'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-white/40">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </span>
                          {msg.role === 'assistant' && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleCopyMessage(msg.content, idx)}
                              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                              title="Copier"
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
                        placeholder="Posez votre question... (Maj+Entrée pour nouvelle ligne)"
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
                    Appuyez sur Entrée pour envoyer • Maj+Entrée pour nouvelle ligne
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6"
        >
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <h4 className="font-semibold text-white/90 mb-1">⚡ Instantané</h4>
            <p className="text-sm text-white/60">Réponses immédiates et précises</p>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <h4 className="font-semibold text-white/90 mb-1">🎯 IA Réelle</h4>
            <p className="text-sm text-white/60">Propulsé par Mistral AI gratuit</p>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <h4 className="font-semibold text-white/90 mb-1">💡 Expert</h4>
            <p className="text-sm text-white/60">Connaissance complète du portfolio</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}