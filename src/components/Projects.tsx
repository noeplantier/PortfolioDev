import { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Calendar, Code2, Smartphone, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

const Projects = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const mockRepositories: Repository[] = [
    {
      id: 1,
      name: 'Mots de maitre',
      description: 'Scalable microservices architecture with Node.js, Express, and React. Includes optimized UX design, rate limiting, and comprehensive testing.',
      html_url: 'https://github.com/noeplantier/Mots-de-ma-tre',
      homepage: 'https://motsdemaitre.com',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Next',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['nodejs', 'microservices', 'express', 'react']
    },
    {
      id: 3,
      name: 'StudioCall',
      description: 'AI-assisted voice-over and voicemail recording studio for the web — record takes, manage scripts, and share previews with clients in one click.',
      html_url: 'https://github.com/hugoisidore/studiocall-front',
      homepage: 'https://www.studiocall.fr/',
      stargazers_count: 89,
      forks_count: 21,
      language: 'Embedded JavaScript',
      updated_at: '2024-01-10T14:20:00Z',
      topics: ['JavaScript', 'Voicemail', 'AI']
    },
    {
      id: 4,
      name: 'Portfolio',
      description: 'Static portfolio built with React. Features UX designed interface, theme customization, and SEO optimization.',
      html_url: 'https://github.com/noeplantier/PortfolioDev',
      homepage: 'https://noeplantier.com',
      stargazers_count: 78,
      forks_count: 19,
      language: 'TypeScript, JavaScript',
      updated_at: '2024-01-03T11:30:00Z',
      topics: ['react', 'portfolio', 'web developer', 'seo']
    },
    {
      id: 5,
      name: 'Feelomi',
      description: 'Brain new medical application. Built with Flutter and Firebase.',
      html_url: 'https://github.com/noeplantier/FEELOMI',
      homepage: 'https://github.com/noeplantier/FEELOMI',
      stargazers_count: 203,
      forks_count: 67,
      language: 'Dart',
      updated_at: '2024-01-05T16:45:00Z',
      topics: ['flutter', 'medics', 'mobile', 'firebase', 'health']
    },
    {
      id: 6,
      name: 'WestApp',
      description: 'A full-featured sport meeting website built with TypeScript, featuring user authentication, real-time chat, and event management.',
      html_url: 'https://github.com/noeplantier/WestApp',
      homepage: 'https://github.com/noeplantier/WestApp',
      stargazers_count: 124,
      forks_count: 32,
      language: 'React',
      updated_at: '2024-01-15T10:30:00Z',
      topics: ['sport', 'meeting', 'typescript', 'Node.JS']
    },
    {
      id: 7,
      name: 'TECUM',
      description: 'A SaaS platform for selling mode accessories and brain new jewelry, built with Next.JS, GraphQL Node.JS/Express.',
      html_url: 'https://github.com/noeplantier/TECUM',
      homepage: 'https://github.com/noeplantier/TECUM',
      stargazers_count: 145,
      forks_count: 38,
      language: 'TypeScript, NextJS, Node.JS, GraphQL',
      updated_at: '2023-12-28T13:20:00Z',
      topics: ['jewelry', 'next', 'mode', 'graphql']
    },
    {
      id: 8,
      name: "Clem's Coffee Shop",
      description: 'Brain new coffee application. Built with Glide.',
      html_url: 'https://go.glideapps.com/app/1bDa4VcCb8Xq43lHkA8L/layout',
      homepage: 'https://go.glideapps.com/app/1bDa4VcCb8Xq43lHkA8L/layout',
      stargazers_count: 203,
      forks_count: 67,
      language: 'Dart',
      updated_at: '2024-01-05T16:45:00Z',
      topics: ['glide', 'coffee', 'mobile', 'chill']
    },
    {
      id: 10,
      name: 'Bellagancia',
      description: 'Modern nail art site built with Next.JS, featuring real-time nails beauty booking, responsive design, and dark mode support.',
      html_url: 'https://github.com/noeplantier/Bellangancia',
      homepage: 'https://github.com/noeplantier/Bellangancia',
      stargazers_count: 89,
      forks_count: 21,
      language: 'Next',
      updated_at: '2024-01-10T14:20:00Z',
      topics: ['next', 'beauty', 'responsive', 'charts', 'responsive']
    },
    {
      id: 11,
      name: 'Ti Padel',
      description: 'Local padel community app — book courts, find partners, and track match stats with a clean, mobile-first experience.',
      html_url: 'https://github.com/noeplantier/Bellangancia',
      homepage: 'https://github.com/noeplantier/Bellangancia',
      stargazers_count: 89,
      forks_count: 21,
      language: 'Next',
      updated_at: '2024-01-10T14:20:00Z',
      topics: ['next', 'beauty', 'responsive', 'charts', 'responsive']
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setRepositories(mockRepositories);
      setLoading(false);
    }, 1000);
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: 'bg-[#8b5cf6]/80',
      JavaScript: 'bg-[#f59e0b]/80',
      Vue: 'bg-[#10b981]/80',
      Dart: 'bg-[#06b6d4]/80',
      Python: 'bg-[#3b82f6]/80',
      React: 'bg-[#06b6d4]/80',
      Next: 'bg-black/80',
    };
    return colors[language] || 'bg-gray-500/80';
  };

  const getProjectIcon = (topics: string[]) => {
    if (topics.some(topic => ['react-native', 'flutter', 'mobile'].includes(topic))) {
      return <Smartphone className="w-5 h-5 text-purple-300" />;
    }
    if (topics.some(topic => ['api', 'nodejs', 'microservices'].includes(topic))) {
      return <Code2 className="w-5 h-5 text-purple-300" />;
    }
    return <Globe className="w-5 h-5 text-purple-300" />;
  };

  const filteredRepositories = repositories.filter(repo => {
    const name = repo.name.toLowerCase();
    if (filter === 'all') return true;
    if (filter === 'web') {
      return name !== 'feelomi' && name !== "clem's coffee shop";
    }
    if (filter === 'mobile') {
      return repo.topics.some(topic => ['react-native', 'flutter', 'mobile'].includes(topic));
    }
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="projects" className="py-20 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          My Projects
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Explore my latest work showcasing innovative solutions across web and mobile development.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { key: 'all', label: 'All Projects', icon: Globe },
            { key: 'web', label: 'Web Apps', icon: Globe },
            { key: 'mobile', label: 'Mobile Apps', icon: Smartphone },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                filter === filterOption.key
                  ? 'bg-white/10 text-white/90 border border-white/20'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
              }`}
            >
              <filterOption.icon className="w-4 h-4" />
              {filterOption.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 animate-pulse">
                <div className="h-4 bg-white/20 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-white/20 rounded w-full mb-2"></div>
                <div className="h-3 bg-white/20 rounded w-5/6 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-12 bg-white/20 rounded-full"></div>
                  <div className="h-6 w-12 bg-white/20 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                {/* Project Header */}
                <div className="w-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/10 rounded-lg group-hover:scale-105 transition-transform duration-200 border border-white/20">
                        {getProjectIcon(repo.topics)}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-white font-semibold group-hover:text-white transition-colors duration-200">
                          {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-purple-300 font-medium mt-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(repo.updated_at)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white text-sm mb-4 leading-relaxed line-clamp-3">
                    {repo.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2.5 py-1 ${getLanguageColor(repo.language)} text-white text-xs rounded-full font-medium`}>
                      {repo.language}
                    </span>
                    {repo.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 bg-white/10 text-white/70 text-xs rounded-full font-medium border border-white/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors duration-200 text-xs font-medium flex-1 justify-center border border-white/20"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 text-xs font-medium flex-1 justify-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/noeplantier"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 text-white/80 rounded-full font-medium hover:bg-white/20 transform hover:scale-[1.02] transition-all duration-200 border border-white/20"
          >
            <Github className="w-4 h-4" />
            View All Projects on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
