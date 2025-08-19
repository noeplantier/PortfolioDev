import React from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';

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
