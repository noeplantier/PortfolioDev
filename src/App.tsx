import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ParticleBackground from './components/ParticleBackground';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChat from './components/AIChat';

function App() {
    const scaleX = useSpring(useScroll().scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="relative overflow-hidden min-h-screen bg-[#070709] text-white">
            {/* Barre de progression en haut */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 origin-left z-50 shadow-lg shadow-purple-500/50"
                style={{ scaleX }}
            />
            
          

   {/* Subtle grid */}
   <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.025] bg-[#070709"

          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />            
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <Hero />
                </motion.div>
             

<motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <Projects />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <Skills />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <AIChat />
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <Contact />
                </motion.div>

                <Footer />
                <ScrollToTop />
            </div>
        </div>
    );
}

export default App;