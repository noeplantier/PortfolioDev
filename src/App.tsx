import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ParticleBackground from './components/ParticleBackground';
import Contact from './components/Contact';

function App() {
    return (
        <div className="relative">
            <ParticleBackground />
            <Hero />
            <Skills />
            <Projects />
            <Contact />
        </div>
    );
}

export default App;
