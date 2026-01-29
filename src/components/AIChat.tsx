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

  const generateSmartResponse = (question: string): string => {
    const q = question.toLowerCase();

    // Détection de la langue et salutations
    if (q.match(/^(bonjour|salut|hello|hi|hey|bonsoir|coucou)/)) {
      return `Bonjour ! 👋 Je suis l'assistant IA du portfolio de Noé Plantier, développeur Full Stack.

Je peux vous aider à :
• Découvrir ses compétences techniques
• En savoir plus sur les services Plantiers
• Comprendre son approche de travail
• Le contacter pour vos projets

N'hésitez pas à me poser vos questions ! 😊`;
    }

    // Questions sur les compétences
    if (q.match(/compétence|skill|technologie|stack|maîtrise|expertise|savoir/)) {
      if (q.match(/frontend|react|next|typescript|tailwind|css|interface|ui|ux/)) {
        return `🎨 **Expertise Frontend de Noé :**

**Frameworks & Bibliothèques :**
• React 18+ (hooks, context, patterns avancés)
• Next.js 14/15 (App Router, Server Components, SSR/SSG)
• TypeScript (typage strict, génériques, patterns avancés)

**Styling & Animations :**
• Tailwind CSS (design system personnalisé)
• Framer Motion (animations fluides)
• CSS Modules, Styled Components

**State Management :**
• Redux Toolkit
• Zustand (lightweight state)
• React Query / TanStack Query

**Performance :**
• Code splitting & lazy loading
• Optimisation Core Web Vitals
• SEO technique avancé

Noé crée des interfaces modernes, performantes et accessibles ! 🚀`;
      }

      if (q.match(/backend|api|serveur|server|node|express|base|database|bdd/)) {
        return `⚙️ **Expertise Backend de Noé :**

**Serveurs & APIs :**
• Node.js & Express (APIs RESTful robustes)
• Next.js API Routes & Server Actions
• GraphQL & tRPC (APIs type-safe)

**Bases de données :**
• PostgreSQL (relationnel, optimisation de requêtes)
• MongoDB (NoSQL, agrégations complexes)
• Prisma ORM (type-safe database access)
• Supabase (BaaS complet)

**Authentication & Sécurité :**
• NextAuth.js (OAuth, JWT)
• Gestion de sessions sécurisées
• RBAC (Role-Based Access Control)

**Architecture :**
• Microservices
• Architecture serverless
• Clean Architecture & Design Patterns

Noé construit des backends scalables et maintenables ! 💪`;
      }

      return `🚀 **Stack Technique Complète de Noé :**

**Frontend :** React, Next.js, TypeScript, Tailwind CSS
**Backend :** Node.js, Express, PostgreSQL, MongoDB
**DevOps :** Vercel, AWS, Docker, GitHub Actions
**IA :** OpenAI, Anthropic, intégration de chatbots
**Testing :** Jest, React Testing Library, Cypress

Noé maîtrise toute la chaîne de développement moderne ! Que souhaitez-vous savoir en particulier ?`;
    }

    // Questions sur les services
    if (q.match(/service|offre|proposer|faire|réalise|projet|créer|développer/)) {
      return `💼 **Services Plantiers :**

**1. Développement Web Sur Mesure**
• Applications web modernes (SaaS, dashboards)
• Sites vitrine & corporate performants
• Progressive Web Apps (PWA)

**2. E-commerce**
• Boutiques en ligne (Shopify, WooCommerce, custom)
• Systèmes de paiement sécurisés (Stripe, PayPal)
• Gestion d'inventaire temps réel

**3. Solutions SaaS**
• Plateformes multi-tenants
• Authentification avancée
• Dashboards analytics

**4. Intégration IA**
• Chatbots intelligents
• Automatisation de workflows
• Systèmes de recommandation

**5. Optimisation & Refactoring**
• Migration vers stack moderne
• Amélioration des performances
• Mise en place de tests

💎 **Philosophie :** "Code that ages like fine wine" - Des solutions qui durent !

Besoin d'aide pour votre projet ? Contactez Noé ! 📧`;
    }

    // Questions sur l'IA
    if (q.match(/\b(ia|ai|intelligence artificielle|chatbot|gpt|claude|openai|llm)\b/)) {
      return `🤖 **Expertise IA de Noé :**

**Intégrations IA :**
• OpenAI (GPT-4, DALL-E)
• Anthropic Claude (conversation, analyse)
• Google Gemini
• APIs de vision par ordinateur

**Applications :**
• Chatbots intelligents (comme celui-ci !)
• Assistants virtuels personnalisés
• Génération de contenu
• Analyse de sentiments
• Recommandations personnalisées

**Compétences Techniques :**
• Prompt engineering avancé
• RAG (Retrieval-Augmented Generation)
• Fine-tuning de modèles
• Intégration d'agents autonomes

Noé peut transformer votre entreprise avec l'IA ! Quel cas d'usage vous intéresse ? 🚀`;
    }

    // Questions sur le contact
    if (q.match(/contact|joindre|email|mail|linkedin|github|téléphone|appel|parler|discuter/)) {
      return `📬 **Contacter Noé Plantier :**

**Email :** plantiernoe50@gmail.com
**LinkedIn :** linkedin.com/in/noe-plantier
**GitHub :** github.com/noeplantier

💬 **Pour discuter de votre projet :**
Envoyez un email avec :
• Une brève description de votre projet
• Vos objectifs
• Votre timeline (si applicable)
• Votre budget estimatif (optionnel)

Noé répond généralement sous 24h ! 🚀

N'hésitez pas à le contacter pour une consultation gratuite.`;
    }

    // Questions sur les prix
    if (q.match(/prix|tarif|coût|budget|combien|facturer|payer|coute/)) {
      return `💰 **Tarification Plantiers :**

Les tarifs varient selon :
• La complexité du projet
• Le délai de livraison
• Les technologies utilisées
• Les fonctionnalités requises

**Fourchettes indicatives :**
• Site vitrine : à partir de 2000€
• E-commerce : à partir de 5000€
• Application web complexe : sur devis
• Intégration IA : sur devis

**Approche :**
1. Consultation gratuite
2. Analyse détaillée des besoins
3. Proposition claire et transparente
4. Paiements échelonnés possibles

📧 Contactez Noé pour un devis personnalisé : plantiernoe50@gmail.com

Chaque projet est unique ! 🎯`;
    }

    // Questions sur les projets
    if (q.match(/projet|réalisation|portfolio|exemple|référence|travaux|expérience/)) {
      return `🎯 **Projets Réalisés par Noé :**

**Applications SaaS :**
• Plateformes de gestion multi-utilisateurs
• Dashboards analytics temps réel
• Outils de collaboration en équipe

**E-commerce :**
• Boutiques en ligne performantes (>10k produits)
• Systèmes de recommandation personnalisés
• Intégrations Stripe/PayPal avancées

**Finance & Trading :**
• Applications de trading en temps réel
• Dashboards financiers
• APIs de données de marché

**IA & Automation :**
• Chatbots intelligents (service client)
• Systèmes de génération de contenu
• Automatisation de workflows

**CMS Personnalisés :**
• Interfaces d'administration sur mesure
• Éditeurs de contenu avancés

Tous développés avec les technologies modernes : React, Next.js, TypeScript, Node.js !

Intéressé par un projet similaire ? 📧 plantiernoe50@gmail.com`;
    }

    // Questions sur la différence
    if (q.match(/différent|pourquoi|choisir|avantage|spécial|meilleur/)) {
      return `⭐ **Pourquoi Choisir Noé Plantier / Plantiers ?**

**1. Expertise Technique Complète**
✅ Full Stack moderne (React, Next.js, Node.js)
✅ Maîtrise de l'écosystème JavaScript/TypeScript
✅ Intégration IA de pointe

**2. Qualité du Code**
✅ Code propre, testé et documenté
✅ Architecture scalable et maintenable
✅ Best practices & design patterns

**3. Performance & Optimisation**
✅ Core Web Vitals optimisés
✅ SEO technique avancé
✅ Temps de chargement ultra-rapides

**4. Communication & Transparence**
✅ Disponibilité et réactivité
✅ Mises à jour régulières
✅ Conseils techniques objectifs

**5. Vision Long Terme**
✅ "Code that ages like fine wine"
✅ Solutions évolutives
✅ Support et maintenance

**6. Innovation**
✅ Veille technologique constante
✅ Adoption des meilleures pratiques
✅ Intégration des nouvelles technologies

Noé ne crée pas juste du code, il bâtit des solutions durables ! 🚀`;
    }

    // Questions sur le processus
    if (q.match(/processus|méthode|travail|comment|étape|déroulement|fonctionnement/)) {
      return `🔄 **Processus de Travail Plantiers :**

**1️⃣ Consultation Initiale (Gratuit)**
• Compréhension de vos besoins
• Analyse de faisabilité
• Première estimation

**2️⃣ Analyse & Planification**
• Cahier des charges détaillé
• Choix des technologies
• Architecture technique
• Proposition commerciale

**3️⃣ Design & Prototypage**
• Maquettes UI/UX
• Validation avec vous
• Ajustements si nécessaire

**4️⃣ Développement**
• Sprints de 2 semaines
• Mises à jour régulières
• Tests continus
• Code reviews

**5️⃣ Tests & QA**
• Tests fonctionnels
• Tests de performance
• Tests de sécurité
• Correction des bugs

**6️⃣ Déploiement**
• Mise en production progressive
• Formation si nécessaire
• Documentation complète

**7️⃣ Support & Maintenance**
• Suivi post-lancement
• Corrections rapides
• Évolutions futures

**Méthode Agile** pour flexibilité et transparence ! 🎯`;
    }

    // Questions sur Next.js
    if (q.match(/next\.?js|nextjs/)) {
      return `⚡ **Expertise Next.js de Noé :**

**Maîtrise Complète :**
• Next.js 14/15 (App Router, RSC)
• Server Components & Client Components
• Server Actions & Route Handlers
• SSR, SSG, ISR (stratégies de rendu)

**Optimisations :**
• Image optimization automatique
• Font optimization (next/font)
• Code splitting intelligent
• Caching stratégique

**Features Avancées :**
• Middleware pour auth & redirections
• API Routes sécurisées
• Internationalization (i18n)
• Layouts partagés

**Performance :**
• Lighthouse score 95+
• Core Web Vitals optimisés
• Temps de chargement <1s

Next.js est le framework préféré de Noé pour les applications React modernes ! 🚀

Besoin d'une app Next.js ? Contactez-le !`;
    }

    // Questions sur TypeScript
    if (q.match(/typescript|ts\b/)) {
      return `📘 **Expertise TypeScript de Noé :**

**Niveau Avancé :**
• Types complexes & génériques
• Utility types (Partial, Pick, Omit, etc.)
• Type guards & narrowing
• Conditional types

**Architecture Type-Safe :**
• End-to-end type safety (frontend ↔ backend)
• tRPC pour APIs type-safe
• Zod pour validation runtime
• Prisma pour database type safety

**Avantages :**
✅ Moins de bugs en production
✅ Meilleure maintenabilité
✅ Autocomplétion puissante
✅ Refactoring sûr

**Outils :**
• ESLint & Prettier (code quality)
• ts-node pour scripting
• Type testing avec @ts-expect-error

TypeScript n'a plus de secrets pour Noé ! 💪

Pourquoi utiliser TypeScript ? Il réduit les bugs de 15% selon Microsoft !`;
    }

    // Questions sur React
    if (q.match(/\breact\b/)) {
      return `⚛️ **Expertise React de Noé :**

**Maîtrise Complète :**
• React 18+ (Concurrent Features)
• Hooks (useState, useEffect, useContext, custom hooks)
• Context API & Composition
• Suspense & Error Boundaries

**Patterns Avancés :**
• Compound Components
• Render Props & HOCs
• Controlled vs Uncontrolled Components
• Custom Hooks réutilisables

**Performance :**
• React.memo & useMemo
• useCallback pour optimisation
• Code splitting avec lazy()
• Virtual scrolling pour grandes listes

**State Management :**
• Redux Toolkit (apps complexes)
• Zustand (state simple et performant)
• React Query (server state)

**Testing :**
• React Testing Library
• Jest pour unit tests
• Cypress pour E2E tests

Noé crée des applications React modernes, performantes et maintenables ! ⚡

Des questions sur un pattern React spécifique ?`;
    }

    // Questions sur le délai
    if (q.match(/délai|durée|combien de temps|rapide|livraison|temps/)) {
      return `⏱️ **Délais de Livraison Plantiers :**

**Estimation Typique :**
• Landing page : 1-2 semaines
• Site vitrine (5-10 pages) : 2-4 semaines
• E-commerce : 4-8 semaines
• Application SaaS simple : 6-12 semaines
• Application complexe : 3-6 mois

**Facteurs d'Impact :**
• Complexité fonctionnelle
• Design personnalisé
• Intégrations tierces
• Vos feedbacks et validations

**Approche Agile :**
• Livraisons progressives (sprints de 2 semaines)
• Vous voyez l'avancement régulièrement
• Possibilité d'ajuster en cours de route

**Mode Rush Possible :**
Pour les projets urgents, délais accélérés disponibles (supplément appliqué).

📧 Discutez de votre timeline avec Noé : plantiernoe50@gmail.com

Noé privilégie la qualité tout en respectant vos deadlines ! 🎯`;
    }

    // Questions techniques générales
    if (q.match(/technique|techno|outil|framework|librairie|library/)) {
      return `🛠️ **Stack Technique Moderne de Noé :**

**Frontend Framework :**
• React 18+ & Next.js 14/15
• TypeScript pour type-safety

**Styling :**
• Tailwind CSS (utility-first)
• Framer Motion (animations)
• shadcn/ui (composants)

**Backend :**
• Node.js & Express
• Next.js API Routes
• Prisma ORM

**Database :**
• PostgreSQL (relationnel)
• MongoDB (NoSQL)
• Supabase (BaaS)

**Auth :**
• NextAuth.js
• JWT & OAuth 2.0

**Deployment :**
• Vercel (optimal pour Next.js)
• AWS (solutions custom)
• Docker (containerization)

**Dev Tools :**
• Git & GitHub
• VS Code
• ESLint & Prettier
• Jest & Cypress

**IA :**
• OpenAI API
• Anthropic Claude
• Langchain

Stack moderne, performante et éprouvée ! 🚀`;
    }

    // Questions sur qui est Noé
    if (q.match(/qui|es-tu|toi|plantier|noé|noe|développeur|dev/)) {
      return `👨‍💻 **Noé Plantier - Développeur Full Stack**

**Profil :**
Développeur Full Stack passionné et fondateur de Plantiers, une agence de développement logiciel moderne basée sur l'excellence technique.

**Expertise :**
• 🎨 Frontend : React, Next.js, TypeScript, Tailwind
• ⚙️ Backend : Node.js, Express, PostgreSQL, MongoDB
• 🤖 IA : Intégration OpenAI, Claude, chatbots
• 🚀 DevOps : Vercel, AWS, Docker, CI/CD

**Philosophie :**
"Code that ages like fine wine" - Noé crée des solutions logicielles qui non seulement fonctionnent aujourd'hui, mais continuent à apporter de la valeur pendant des années.

**Valeurs :**
• Performance ultra-rapide
• Code maintenable et scalable
• Design moderne et intuitif
• Innovation constante

**Contact :**
📧 plantiernoe50@gmail.com
💼 linkedin.com/in/noe-plantier
💻 github.com/noeplantier

Prêt à transformer votre idée en réalité ! 🎯`;
    }

    // Questions sur e-commerce
    if (q.match(/e-commerce|ecommerce|boutique|vente|shop|magasin|shopify/)) {
      return `🛒 **Solutions E-commerce de Noé :**

**Plateformes :**
• Shopify (setup complet + personnalisation)
• WooCommerce (WordPress + optimisations)
• Solutions custom (Next.js + Stripe)

**Fonctionnalités :**
• Catalogue produits avec recherche avancée
• Panier & checkout optimisé
• Paiements sécurisés (Stripe, PayPal, etc.)
• Gestion des stocks en temps réel
• Comptes clients & historique
• Tableaux de bord admin

**Performance :**
• Temps de chargement <2s
• Optimisation mobile-first
• SEO pour visibilité Google
• Taux de conversion optimisé

**Intégrations :**
• Systèmes de livraison
• CRM & emailing
• Analytics & tracking
• Systèmes de recommandation IA

**Support :**
• Formation à la gestion
• Maintenance continue
• Évolutions fonctionnelles

Des boutiques qui convertent ! 💰

Projet e-commerce en vue ? 📧 plantiernoe50@gmail.com`;
    }

    // Questions sur formation/apprentissage
    if (q.match(/apprendre|formation|cours|tuto|enseigner|mentor/)) {
      return `📚 **Formation & Mentorat avec Noé :**

Bien que Noé se concentre principalement sur le développement, il peut :

**Partager son expertise via :**
• Conseils techniques sur vos projets
• Code reviews et recommandations
• Meilleures pratiques de développement
• Architecture et design patterns

**Ressources recommandées :**
• React : reactjs.org/docs
• Next.js : nextjs.org/learn
• TypeScript : typescriptlang.org/docs
• Tailwind : tailwindcss.com/docs

**Accompagnement projet :**
Si vous développez vous-même, Noé peut vous accompagner en tant que consultant technique pour vous guider sur les bonnes pratiques.

📧 Contactez-le pour discuter de vos besoins : plantiernoe50@gmail.com

L'expertise au service de votre apprentissage ! 🚀`;
    }

    // Questions sur performances
    if (q.match(/performance|rapide|vitesse|optimisation|lent|speed/)) {
      return `⚡ **Performance & Optimisation :**

**Approche de Noé :**
• Core Web Vitals optimisés (LCP, FID, CLS)
• Lighthouse score 90+
• Temps de chargement <1-2s

**Techniques d'optimisation :**

**Frontend :**
• Code splitting & lazy loading
• Image optimization (WebP, AVIF)
• Font optimization
• Minification & compression
• Caching stratégique

**Backend :**
• Requêtes SQL optimisées
• Indexation database
• Caching (Redis, Memcached)
• CDN pour assets statiques
• Compression Gzip/Brotli

**Next.js Specific :**
• SSG pour pages statiques
• ISR pour contenu dynamique
• Edge functions
• Route prefetching

**Résultats :**
✅ Meilleur SEO Google
✅ Taux de conversion amélioré
✅ Expérience utilisateur premium
✅ Coûts serveur réduits

La performance n'est pas une option, c'est un standard ! 🏆`;
    }

    // Questions sur SEO
    if (q.match(/seo|référencement|google|search|ranking/)) {
      return `🔍 **SEO & Référencement :**

**Expertise SEO de Noé :**

**SEO Technique :**
• Meta tags optimisés (title, description)
• Schema.org / structured data
• Sitemap XML automatique
• Robots.txt configuré
• URLs SEO-friendly

**Performance SEO :**
• Core Web Vitals optimisés
• Mobile-first indexing
• Temps de chargement <2s
• HTTPS par défaut

**Content SEO :**
• Structure HTML sémantique
• Hiérarchie de titres (H1-H6)
• Alt text pour images
• Content de qualité

**Next.js SEO :**
• Metadata API
• Server-side rendering
• Static generation
• Dynamic sitemaps

**Outils intégrés :**
• Google Analytics
• Google Search Console
• Tracking des conversions

**Résultats :**
✅ Meilleur ranking Google
✅ Plus de trafic organique
✅ Visibilité accrue

Noé construit des sites qui se classent ! 📈

Besoin d'optimiser votre SEO ? 📧 plantiernoe50@gmail.com`;
    }

    // Questions sur sécurité
    if (q.match(/sécurité|securité|sécurisé|hack|protection|secure/)) {
      return `🔒 **Sécurité & Protection :**

**Mesures de sécurité appliquées :**

**Authentication :**
• JWT tokens sécurisés
• OAuth 2.0 / OpenID Connect
• 2FA (Two-Factor Auth) disponible
• Sessions sécurisées

**Protection des données :**
• HTTPS obligatoire (SSL/TLS)
• Encryption des données sensibles
• Conformité RGPD
• Backups automatiques

**Backend Security :**
• Protection CSRF
• Rate limiting
• Input validation & sanitization
• SQL injection prevention
• XSS protection

**Infrastructure :**
• Firewalls configurés
• DDoS protection
• Monitoring & alertes
• Logs sécurisés

**Best Practices :**
• Principe du moindre privilège
• Séparation des environnements
• Code reviews sécurité
• Dépendances à jour

**Conformité :**
✅ RGPD compliant
✅ OWASP Top 10
✅ Security headers

Vos données et celles de vos utilisateurs en sécurité ! 🛡️`;
    }

    // Questions sur maintenance
    if (q.match(/maintenance|support|mise à jour|update|bug|correction/)) {
      return `🔧 **Maintenance & Support :**

**Services de Maintenance Plantiers :**

**Support Technique :**
• Corrections de bugs rapides
• Résolution d'incidents
• Support par email
• Temps de réponse <24h

**Mises à jour :**
• Updates de sécurité
• Nouvelles fonctionnalités
• Optimisations performances
• Compatibilité navigateurs

**Monitoring :**
• Surveillance 24/7
• Alertes automatiques
• Analytics & rapports
• Uptime monitoring

**Types de contrats :**

**Support Basic :**
• Corrections critiques
• Updates de sécurité
• Support email

**Support Premium :**
• Tout du Basic +
• Nouvelles features
• Support prioritaire
• Optimisations mensuelles

**Avantages :**
✅ Tranquillité d'esprit
✅ Site toujours à jour
✅ Performance optimale
✅ Sécurité maximale

Noé assure la pérennité de vos projets ! 🚀

Intéressé par un contrat de maintenance ? 📧 plantiernoe50@gmail.com`;
    }

    // Questions sur mobile/responsive
    if (q.match(/mobile|responsive|téléphone|tablette|smartphone/)) {
      return `📱 **Design Mobile & Responsive :**

**Approche Mobile-First de Noé :**

**Responsive Design :**
• Adaptation automatique (mobile, tablette, desktop)
• Breakpoints optimisés
• Grilles fluides
• Images adaptatives

**Performance Mobile :**
• Temps de chargement <2s
• Interactions tactiles optimisées
• Gestes natifs (swipe, pinch, etc.)
• Scroll fluide

**Technologies :**
• CSS Grid & Flexbox
• Tailwind responsive utilities
• Media queries avancées
• Touch events

**Progressive Web Apps (PWA) :**
• Installation sur écran d'accueil
• Mode offline
• Notifications push
• Expérience app native

**Tests :**
• Tests sur vrais devices
• Chrome DevTools
• Responsive simulators
• Lighthouse mobile audit

**Résultats :**
✅ 60% du trafic = mobile
✅ Meilleur UX mobile
✅ Taux de conversion optimal
✅ SEO mobile amélioré

Mobile-first n'est pas une option, c'est une nécessité ! 📲`;
    }

    // Question par défaut - Réponse générale intelligente
    return `Merci pour votre question ! 😊

Je suis l'assistant IA de Noé Plantier, développeur Full Stack et fondateur de Plantiers.

**Ce que je peux vous dire sur Noé :**

🚀 **Expertise Technique**
• Frontend : React, Next.js, TypeScript, Tailwind
• Backend : Node.js, Express, PostgreSQL, MongoDB
• IA : Intégration OpenAI, Claude, chatbots intelligents
• DevOps : Vercel, AWS, Docker, CI/CD

💼 **Services Plantiers**
• Applications web sur mesure (SaaS, dashboards)
• Sites e-commerce performants
• Intégration IA & automatisation
• Optimisation & refactoring

⭐ **Différenciateurs**
• Code de qualité professionnelle
• Performance optimale (Core Web Vitals)
• "Code that ages like fine wine"
• Support et maintenance long terme

📧 **Contact**
• Email : plantiernoe50@gmail.com
• LinkedIn : linkedin.com/in/noe-plantier
• GitHub : github.com/noeplantier

**Questions populaires :**
• "Quelles sont tes compétences frontend/backend ?"
• "Quels services proposes-tu ?"
• "Comment te contacter ?"
• "Combien coûte un projet ?"
• "Quels projets as-tu réalisés ?"

N'hésitez pas à être plus précis ! Je suis là pour vous aider. 💡`;
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
      // Système de réponse intelligent basé sur mots-clés
      const aiResponse = generateSmartResponse(userInput);
      
      // Simuler un délai réaliste pour l'IA
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('❌ Error:', error);
      
      const fallbackResponse = `Désolé, une erreur s'est produite. Mais je peux quand même vous aider ! 😊

**Noé Plantier - Développeur Full Stack**

📧 **Contact direct :** plantiernoe50@gmail.com
💼 **LinkedIn :** linkedin.com/in/noe-plantier

**Posez-moi des questions sur :**
• Ses compétences techniques
• Les services Plantiers
• Ses projets
• Comment le contacter

Je suis là pour vous renseigner ! 💡`;
      
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
    if (window.confirm('Êtes-vous sûr de vouloir effacer la conversation ?')) {
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
    "Quelles sont tes compétences frontend ?",
    "Parle-moi de tes services",
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
              Demandez à l'Intelligence Artificielle
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
              Obtenez des réponses instantanées sur mon expertise et mes services
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
                      <h3 className="text-lg font-bold text-white/90">Assistant IA Intelligent</h3>
                      <p className="text-sm text-white/60">Réponses instantanées et pertinentes</p>
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
                          title="Exporter la conversation"
                        >
                          <Download className="w-5 h-5 text-white/70 group-hover:text-purple-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleClearChat}
                          className="p-2.5 hover:bg-white/10 rounded-lg transition-colors group"
                          title="Effacer la conversation"
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
                        <h4 className="text-xl font-semibold text-white/70 mb-3">Commencez une conversation</h4>
                        <p className="text-sm mb-6">Posez-moi des questions sur Noé, ses compétences, ses projets ou comment il peut vous aider.</p>
                        
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
                              title="Copier le message"
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

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6"
        >
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <h4 className="font-semibold text-white/90 mb-1">⚡ Instantané</h4>
            <p className="text-sm text-white/60">Réponses immédiates et pertinentes</p>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <h4 className="font-semibold text-white/90 mb-1">🎯 Intelligent</h4>
            <p className="text-sm text-white/60">Comprend le contexte de vos questions</p>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <h4 className="font-semibold text-white/90 mb-1">💡 Complet</h4>
            <p className="text-sm text-white/60">Toutes les infos sur Noé Plantier</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}