import Hero from './components/Hero';
import Carrousel from './components/Carrousel';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ParticleBackground from './components/ParticleBackground';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <div className="relative">
            <ParticleBackground />
            <Hero />
            <Carrousel />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
            <ScrollToTop />
        </div>
    );
}

export default App;
