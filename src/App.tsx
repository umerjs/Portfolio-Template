import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/reactbits/Particles';
import CustomCursor from './components/ui/CustomCursor';
import SEO from './components/SEO';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <SEO />
      <CustomCursor />
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Particles
          className="w-full h-full"
          particleCount={80}
          particleSpread={14}
          speed={0.08}
          particleColors={["#5be8ff", "#a78bfa", "#22d3ee"]}
          alphaParticles
          particleBaseSize={110}
          sizeRandomness={1}
          moveParticlesOnHover
          particleHoverFactor={0.6}
          cameraDistance={20}
        />
      </div>
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
