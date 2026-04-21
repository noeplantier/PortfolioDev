import { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Calendar, Code2, Smartphone, Globe, FolderGit2, ComputerIcon, Code, FileCode2 } from 'lucide-react';
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
      id: 9,
      name: 'CreatorPro Suite',
      description: 'A comprehensive suite of AI-powered tools for content creators, including video editing, script generation, and social media management.',
      html_url:'https://github.com/noeplantier/creator-studio-suite' ,
      homepage: 'https://creatorprosuite.netlify.app/',
      stargazers_count: 200,
      forks_count: 50,
      language: 'React',
      updated_at: '2026-05-10T12:00:00Z',
      topics: ['react', 'ai', 'content-creation', 'video-editing']

    },

    {
      id: 10,
      name: 'Crypto Compass',
      description: 'A real-time cryptocurrency tracking dashboard built with React and Node.js, featuring interactive charts, price alerts, and portfolio management tools.',
      html_url:'https://github.com/noeplantier/crypto-compass',
      homepage: 'https://cryptocompass.netlify.app/',
      stargazers_count: 180,
      forks_count: 40,
      language: 'React',
      updated_at: '2026-06-15T14:30:00Z',
      topics: ['react', 'crypto', 'dashboard', 'real-time']

    },
    {
id: 4,
name: 'Skin Metrics Lab',
description: 'Skin Metrics Lab AI-powered skin analysis platform built with Nuxt.js and TensorFlow.js, offering personalized skincare recommendations based on user-uploaded photos.',
html_url:'https://github.com/noeplantier/Skin-Metrics-Lab',
homepage: '',
stargazers_count: 156,
forks_count: 45,
language: 'Nuxt',
updated_at: '2024-01-08T09:15:00Z',
topics: ['nuxt', 'ai', 'skincare', 'health']
    },

    {
      id: 2,
      name: 'Ti Padel',
      description: 'Ti Padel booking platform with Node.js, Express, and React. Includes optimized UX design, rate limiting, and comprehensive testing.',
      html_url: 'https://github.com/noeplantier/Ti-Padel',
      homepage: 'https://ti-padel.com',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Next',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['nodejs', 'microservices', 'express', 'react']
    },
    {
      id: 0,
      name: 'Feelomi',
      description: 'Feelomi medical and mental health platform with Flutter. Includes optimized UX design, rate limiting, and comprehensive testing.',
      html_url:'https://github.com/noeplantier/FEELOMI',
      homepage: '',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Flutter',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['flutter', 'mobile', 'health', 'mental-health']
    },
    {
      id: 1,
      name: 'Clem’s Coffee Shop',
      description: 'Clem’s Coffee Shop booking platform with Glide. Includes optimized UX design, rate limiting, and comprehensive testing.', 
      html_url:'https://clems-coffee-shop.glide.page/',
      homepage: 'https://clems-coffee-shop.glide.page/',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Glide',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['glide', 'mobile', 'coffee', 'booking']
    },

    {
      id: 8,
      name: 'Universe App',
      description: 'A React Native Mobile Application for streaming movies and TV shows, featuring a sleek UI, personalized recommendations, and seamless navigation.',
      html_url:"https://github.com/noeplantier/universe-streaming-app" ,
      homepage: '',
      stargazers_count: 120,
      forks_count: 30,
      language: 'React Native',
      updated_at: '2026-04-21T18:00:00Z',
      topics: ['react-native', 'mobile', 'streaming', 'movies']

    },

    {
      id: 3,
      name: 'Plantiers',
      description: 'Plantiers pricing platform with Node.js, Express, and React. Includes optimized UX design, rate limiting, and comprehensive testing.',
      html_url: 'https://github.com/noeplantier/plantiers',
      homepage: 'https://plantiers.com',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Next',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['nodejs', 'microservices', 'express', 'react']
    },

    {
      id: 5,
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
      id: 6,
      name: 'Mots De Maître',
      description: 'Mots De Maître is a mobile app that provides users with daily motivational quotes and affirmations, designed to inspire and uplift their spirits.',
      html_url:'https://github.com/noeplantier/Mots-de-ma-tre',
      homepage: 'https://motsdemaitre.netlify.app/',
      stargazers_count: 75,
      forks_count: 18,
      language: 'Next',
      updated_at: '2024-02-15T10:00:00Z',
      topics: ['nextjs', 'nodejs', 'quotes', 'motivation']


    }
   
  ];

  useEffect(() => {
    setTimeout(() => {
      setRepositories(mockRepositories);
      setLoading(false);
    }, 1000);
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: 'from-gray-800 to-black',
      JavaScript: 'from-gray-800 to-black',
      Vue: 'from-gray-800 to-black',
      Dart: 'from-gray-800 to-black',
      Python: 'from-gray-800 to-black',
      React: 'from-gray-800 to-black',
      Next: 'from-gray-800 to-black',
    };
  };

  const getProjectIcon = (topics: string[]) => {
    if (topics.some(topic => ['react-native', 'flutter', 'mobile'].includes(topic))) {
      return <Smartphone className="w-5 h-5 text-white" />;
    }
    if (topics.some(topic => ['api', 'nodejs', 'microservices'].includes(topic))) {
      return <ComputerIcon className="w-5 h-5 text-white" />;
    }
    return <ComputerIcon className="w-5 h-5 text-white" />;
  };

  const filteredRepositories = repositories.filter(repo => {
    const name = repo.name.toLowerCase();
    if (filter === 'all') return true;
    if (filter === 'web') { 
      return repo.topics.some(topic => ['react', 'vue', 'next', 'javascript', 'typescript'].includes(topic));
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
           Main Projects <FolderGit2 className="inline-block w-10 h-10 text-white ml-1 mb-1" />
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Explore my latest work showcasing innovative solutions across web and mobile development.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { key: 'web', label: 'Web Apps', icon: ComputerIcon },
            { key: 'mobile', label: 'Mobile Apps', icon: Smartphone },
            { key: 'all', label: 'All Projects', icon: FileCode2 },

          ].map((filterOption) => (
            <motion.button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center gap-3 px-6 py-5 rounded-2xl font-semibold text-base transition-all duration-300 ${
                filter === filterOption.key
                  ? 'bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/20'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border-2 border-white/10 hover:border-white/20'
              }`}
            >
              <div className={`p-3 rounded-xl transition-all duration-300 ${
                filter === filterOption.key 
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                  : 'bg-white/10'
              }`}>
                <filterOption.icon className="w-6 h-6" />
              </div>
              <span className="text-center">{filterOption.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 animate-pulse">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredRepositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex flex-col gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 group-hover:border-purple-400/30 transition-all duration-300 h-full">
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-3 bg-gradient-to-br ${getLanguageColor(repo.language)} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {getProjectIcon(repo.topics)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                          {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-white/50 mt-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(repo.updated_at)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3 group-hover:text-white/90 transition-colors duration-300">
                    {repo.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1.5 bg-gradient-to-r ${getLanguageColor(repo.language)} text-white text-xs rounded-full font-medium shadow-md`}>
                      {repo.language}
                    </span>
                    {repo.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1.5 bg-white/10 text-white/70 text-xs rounded-full font-medium border border-white/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-yellow-400" />
                      <span className="font-medium">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GitFork className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-medium">{repo.forks_count}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto pt-2">
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors duration-200 text-xs font-medium flex-1 justify-center border border-white/20"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                    {repo.homepage && (
                      <motion.a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 text-xs font-medium flex-1 justify-center"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </motion.a>
                    )}
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 rounded-full`} />
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
          <motion.a
            href="https://github.com/noeplantier"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 text-white rounded-2xl font-semibold border-2 border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;