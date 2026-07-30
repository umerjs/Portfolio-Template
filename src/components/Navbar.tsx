import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import { useTextScramble } from './ui/TextScramble';
import { navLinks as links, personalInfo } from '../data/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/60 backdrop-blur-2xl border-b border-primary/10 shadow-[0_4px_30px_rgba(91,232,255,0.05)]' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <MagneticButton strength={0.2}>
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 group">
              <motion.div
                className="w-3 h-3 bg-primary rounded-sm"
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <span className="font-mono font-semibold text-sm tracking-wider">{personalInfo.brand}</span>
            </button>
          </MagneticButton>

          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <NavLink key={l.id} link={l} scrollTo={scrollTo} />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                className="hidden md:inline-flex items-center gap-1 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-mono text-xs hover:shadow-[0_0_30px_rgba(91,232,255,0.3)] transition-all duration-300">
                Let's Talk →
              </a>
            </MagneticButton>
            <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className="font-mono text-3xl tracking-wider text-left py-3 border-b border-border/50 flex items-center gap-4 group"
                >
                  <span className="text-primary text-sm">{l.num}</span>
                  <span className="group-hover:text-primary transition-colors">{l.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ link, scrollTo }: { link: typeof links[0]; scrollTo: (id: string) => void }) {
  const { display, triggerScramble } = useTextScramble(link.label, 40);
  return (
    <MagneticButton strength={0.15}>
      <button
        onClick={() => scrollTo(link.id)}
        onMouseEnter={triggerScramble}
        className="font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors relative group"
      >
        <span className="text-primary">{link.num}</span>{' '}{display}
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
      </button>
    </MagneticButton>
  );
}
