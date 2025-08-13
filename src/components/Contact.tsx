import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Send, MessageCircle, Calendar, ExternalLink, CheckCircle, Clock } from 'lucide-react';
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
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'noe.plantier@example.com',
      href: 'mailto:noe.plantier@example.com',
      description: 'Send me an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+33 6 12 34 56 78',
      href: 'tel:+33612345678',
      description: 'Call me for urgent matters'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Paris, France',
      href: 'https://maps.google.com/?q=Paris,France',
      description: 'Available for local meetings'
    },
    {
      icon: Calendar,
      title: 'Availability',
      value: 'Mon - Fri, 9AM - 6PM',
      href: '#',
      description: 'CET timezone'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/noeplantier',
      color: 'hover:bg-gray-800',
      followers: '2.5K'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/noeplantier',
      color: 'hover:bg-blue-600',
      followers: '1.8K'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      href: 'https://twitter.com/noeplantier',
      color: 'hover:bg-blue-400',
      followers: '950'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      href: 'https://instagram.com/noeplantier',
      color: 'hover:bg-pink-500',
      followers: '1.2K'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
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
            Get In <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Send Message</h3>
              </div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Project discussion, collaboration, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                    placeholder="Tell me about your project, timeline, and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : '_self'}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                    <info.icon className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                      {info.title}
                    </h4>
                    <p className="text-gray-600 font-medium">{info.value}</p>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </div>
                  {info.href.startsWith('http') && (
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors duration-300" />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group ${social.color}`}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-all duration-300">
                      <social.icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                        {social.name}
                      </h4>
                      <p className="text-sm text-gray-500 group-hover:text-gray-200 transition-colors duration-300">
                        {social.followers} followers
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6" />
                <h3 className="text-xl font-bold">Quick Response Guarantee</h3>
              </div>
              <p className="text-purple-100 leading-relaxed">
                I typically respond to all inquiries within 24 hours. For urgent matters, 
                feel free to call me directly or connect with me on LinkedIn.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Whether you need a web application, mobile app, or full-stack solution, 
              I'm here to help bring your vision to life with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:noe.plantier@example.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Mail className="w-4 h-4" />
                Email Me
              </a>
              <a
                href="https://linkedin.com/in/noeplantier"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-600 hover:text-white transform hover:scale-105 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;