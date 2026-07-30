import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleGrid from './components/ui/ParticleGrid';
import CustomCursor from './components/ui/CustomCursor';
import SEO from './components/SEO';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <SEO />
      <CustomCursor />
      <ParticleGrid />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TechStack />
        <Projects />
        <About />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
