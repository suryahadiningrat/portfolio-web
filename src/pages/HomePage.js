import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Clients from '../components/sections/Clients';
import Contact from '../components/sections/Contact';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Clients />
      <Contact />
    </div>
  );
};

export default HomePage;
