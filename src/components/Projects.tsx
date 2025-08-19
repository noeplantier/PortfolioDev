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

  // Mock data for demonstration - replace with actual GitHub API call
  const mockRepositories: Repository[] = [
    {
      id: 1,
      name: 'WestApp - Social Media',
      description: 'A full-featured sport meeting website built with TypeScript, featuring user authentication, real-time chat, and event management.',
      html_url: 'https://github.com/noeplantier/WestApp',
      homepage: 'https://github.com/noeplantier/WestApp',
      stargazers_count: 124,
      forks_count: 32,
      language: 'TypeScript, JavaScript, Sass, Node.JS',
      updated_at: '2024-01-15T10:30:00Z',
      topics: ['sport', 'meeting', 'typescript', 'Node.JS']
    },
    {
      id: 2,
      name: 'Bellagancia - Nails Beauty Booking',
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
      id: 3,
      name: 'Mots de maitre - Community Management',
      description: 'Scalable microservices architecture with Node.js, Express, and React. Includes optimized UX design, rate limiting, and comprehensive testing.',
      html_url: 'https://github.com/noeplantier/Mots-de-ma-tre',
      homepage: 'https://motsdemaitre.com',
      stargazers_count: 156,
      forks_count: 45,
      language: 'Typescript, JavaScript, Node.JS, Express',
      updated_at: '2024-01-08T09:15:00Z',
      topics: ['nodejs', 'microservices', 'express',  'react']
    },
    {
      id: 4,
      name: 'Feelomi - Medical App',
      description: 'Brain new medical application. Built with Flutter and Firebase.',
      html_url: 'https://github.com/noeplantier/flutter-fitness-tracker',
      homepage: 'https://play.google.com/store/apps/details?id=com.fitness.tracker',
      stargazers_count: 203,
      forks_count: 67,
      language: 'Dart',
      updated_at: '2024-01-05T16:45:00Z',
      topics: ['flutter', 'medics', 'mobile', 'firebase', 'health']
    },
    {
      id: 5,
      name: 'Portfolio - Dev Website',
      description: 'Static portfolio built with React. Features UX desinged interface, theme customization, and SEO optimization.',
      html_url: 'https://github.com/noeplantier/PortfolioDev',
      homepage: 'https://noe.plantier.com',
      stargazers_count: 78,
      forks_count: 19,
      language: 'TypeScrip, JavaScript',
      updated_at: '2024-01-03T11:30:00Z',
      topics: ['react', 'portfolio', 'web developer', 'seo']
    },
    {
      id: 6,
      name: 'Autoriz.io - Transport Authorization SaaS',
    description: 'A SaaS platform for managing transport authorizations, built with PHP Symfony, React, Auth0 and Node.JS/Express. Features transport authors management and truck traffic control.',
      html_url: 'https://autoriz.io',
      homepage: 'https://autoriz.io',
      stargazers_count: 145,
      forks_count: 38,
      language: 'Typescript, PHP, Node.JS, Express',
      updated_at: '2023-12-28T13:20:00Z',
      topics: ['python', 'ai', 'chatbot', 'tensorflow', 'nlp']
    },
    {
      id: 7,
      name: 'TECUM - Jewelry WebSite',
    description: 'A SaaS platform for selling mode accessories and brain new jewelry, built with Next.JS, GraphQL Node.JS/Express.',
      html_url: 'https://github.com/noeplantier/TECUM',
      homepage: 'https://github.com/noeplantier/TECUM',
      stargazers_count: 145,
      forks_count: 38,
      language: 'Typescript, NextJS, Node.JS, GraphQL',
      updated_at: '2023-12-28T13:20:00Z',
      topics: ['jewelry', 'next', 'mode', 'graphql']

    }, 
    {
      id: 8,
      name: 'Clem\'s Coffee - Coffee App',
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
      id: 9,
      name: 'TrailerMate API - Truck Geolocation',
      description: 'Brain new coffee application. Built with Glide.',
      html_url: 'https://go.glideapps.com/app/1bDa4VcCb8Xq43lHkA8L/layout',
      homepage: 'https://go.glideapps.com/app/1bDa4VcCb8Xq43lHkA8L/layout',
      stargazers_count: 203,
      forks_count: 67,
      language: 'Node.JS, Express',
      updated_at: '2024-01-05T16:45:00Z',
      topics: ['trucks', 'geolocation', 'node', 'unhitched trailers']

    },

  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRepositories(mockRepositories);
      setLoading(false);
    }, 1000);
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: 'bg-blue-500',
      JavaScript: 'bg-yellow-500',
      Vue: 'bg-green-500',
      Dart: 'bg-cyan-500',
      Python: 'bg-blue-600',
      React: 'bg-cyan-400',
    };
    return colors[language] || 'bg-gray-500';
  };

  const getProjectIcon = (topics: string[]) => {
    if (topics.some(topic => ['react-native', 'flutter', 'mobile'].includes(topic))) {
      return <Smartphone className="w-6 h-6" />;
    }
    if (topics.some(topic => ['api', 'nodejs', 'microservices'].includes(topic))) {
      return <Code2 className="w-6 h-6" />;
    }
    return <Globe className="w-6 h-6" />;
  };

  const filteredRepositories = repositories.filter(repo => {
    if (filter === 'all') return true;
    if (filter === 'web') return repo.topics.some(topic => ['react', 'vue', 'nextjs', 'web'].includes(topic));
    if (filter === 'mobile') return repo.topics.some(topic => ['react-native', 'flutter', 'mobile'].includes(topic));
    if (filter === 'backend') return repo.topics.some(topic => ['nodejs', 'api', 'microservices', 'python'].includes(topic));
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
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200 to-purple-200 rounded-full opacity-20 transform translate-x-32 translate-y-32"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore my latest work showcasing innovative solutions across web and mobile development. 
            Each project represents a unique challenge solved with modern technologies and best practices.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { key: 'all', label: 'All Projects', icon: Globe },
            { key: 'web', label: 'Web Apps', icon: Globe },
            { key: 'mobile', label: 'Mobile Apps', icon: Smartphone },
            { key: 'backend', label: 'Backend', icon: Code2 }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <filterOption.icon className="w-4 h-4" />
              {filterOption.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRepositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {getProjectIcon(repo.topics)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                        {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(repo.updated_at)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {repo.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 ${getLanguageColor(repo.language)} text-white text-xs rounded-full font-medium`}>
                    {repo.language}
                  </span>
                  {repo.topics.slice(0, 2).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {repo.forks_count}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium flex-1 justify-center"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium flex-1 justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* GitHub CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/noeplantier"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;