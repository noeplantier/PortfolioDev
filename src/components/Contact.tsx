import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Send, MessageCircle, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({name: '', email: '', subject: '', message: ''});

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'plantiernoe50@gmail.com',
      href: 'mailto:plantiernoe50@gmail.com',
      description: 'Send me an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+33 6 66 16 77 88',
      href: 'tel:+33666167788',
      description: 'Call me during business hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Nîmes, France',
      href: '#',
      description: 'Available for remote work'
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: '< 24 hours',
      href: '#',
      description: 'Quick response guaranteed'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/noeplantier',
      followers: '2.3k',
      color: 'hover:bg-gray-800'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/noeplantier',
      followers: '1.8k',
      color: 'hover:bg-blue-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      href: 'https://twitter.com/noeplantier',
      followers: '956',
      color: 'hover:bg-blue-400'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      href: 'https://instagram.com/noeplantier',
      followers: '1.2k',
      color: 'hover:bg-pink-500'
    }
  ];

  return (

      <section id="contact"
               className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <div
              className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <motion.div
                className="text-center mb-16"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                viewport={{once: true}}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Let's Work <span
                  className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Together</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Ready to bring your ideas to life? I'm here to help you create exceptional digital experiences.
                Let's discuss your project and make something amazing together.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <motion.div
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
                  initial={{opacity: 0, x: -20}}
                  whileInView={{opacity: 1, x: 0}}
                  transition={{duration: 0.6}}
                  viewport={{once: true}}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-white"/>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Send Message</h3>
                </div>

                {isSubmitted ? (
                    <motion.div
                        className="text-center py-8"
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.5}}
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8 text-white"/>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                      <p className="text-gray-300">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name *
                          </label>
                          <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                              placeholder="Your full name"/>
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address *
                          </label>
                          <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                              placeholder="your.email@example.com"/>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                          Subject *
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="What's this about?"/>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                            placeholder="Tell me about your project..."/>
                      </div>

                      <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                            <>
                              <div
                                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Sending...
                            </>
                        ) : (
                            <>
                              <Send className="w-5 h-5"/>
                              Send Message
                            </>
                        )}
                      </button>
                    </form>
                )}
              </motion.div>

              {/* Contact Information */}
              <motion.div
                  className="space-y-8"
                  initial={{opacity: 0, x: 20}}
                  whileInView={{opacity: 1, x: 0}}
                  transition={{duration: 0.6, delay: 0.2}}
                  viewport={{once: true}}
              >
                {/* Contact Info Cards */}
                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                      <motion.a
                          key={index}
                          href={info.href}
                          className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                          whileHover={{y: -2}}
                      >
                        <div
                            className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <info.icon className="w-6 h-6 text-white"/>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-lg">{info.title}</h4>
                          <p className="text-purple-300 font-medium">{info.value}</p>
                          <p className="text-gray-400 text-sm">{info.description}</p>
                        </div>
                      </motion.a>
                  ))}
                </div>

                {/* Social Media */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5"/>
                    Connect With Me
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 ${social.color} transition-all duration-300 group`}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                          <social.icon className="w-5 h-5 text-white"/>
                          <div>
                            <div className="text-white font-medium text-sm">{social.name}</div>
                            <div className="text-gray-400 text-xs">{social.followers} followers</div>
                          </div>
                        </motion.a>
                    ))}
                  </div>
                </div>

                {/* Quick Response Guarantee */}
                <div
                    className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                      <Clock className="w-5 h-5 text-white"/>
                    </div>
                    <h4 className="text-lg font-bold text-white">Quick Response Guarantee</h4>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    I understand that time is valuable. That's why I guarantee a response to all inquiries within 24
                    hours,
                    usually much sooner. Let's discuss your project and get started right away!
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
                className="text-center mt-16"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.4}}
                viewport={{once: true}}
            >
              <div
                  className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Whether you need a stunning website, a powerful mobile app, or a complete digital solution,
                  I'm here to bring your vision to life with cutting-edge technology and exceptional design.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                      onClick={() => document.querySelector('#contact form')?.scrollIntoView({behavior: 'smooth'})}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Start a Project
                  </button>
                  <a
                      href="mailto:plantiernoe50@gmail.com"
                      className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transform hover:scale-105 transition-all duration-200"
                  >
                    Quick Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

      </section>
  )

}

export default Contact;
