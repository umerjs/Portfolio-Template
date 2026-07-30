import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from './ui/SplitText';
import MagneticButton from './ui/MagneticButton';
import Marquee from './ui/Marquee';
import IdCard from './IdCard';
import { useRef } from 'react';
import { personalInfo, socialLinks, heroMarquee } from '../data/data';

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      {/* Cinematic aurora */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-[800px] h-[800px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)' }}
          animate={{ x: [0, 80, -40, 0], y: [0, -60, 30, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(circle, hsl(var(--secondary) / 0.12), transparent 70%)' }}
          animate={{ x: [0, -60, 40, 0], y: [0, 40, -60, 0], scale: [1, 0.8, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <motion.div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10" style={{ y: heroY, opacity: heroOpacity }}>
        <MetaRow />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mt-8">
          <div className="flex-1 max-w-3xl">
            <motion.p
              className="font-mono text-sm text-muted-foreground mb-6 tracking-widest"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {personalInfo.name} —
            </motion.p>

            <h1 className="relative">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-bold tracking-tighter leading-[0.85]">
                <SplitText text={personalInfo.roleLine1} delay={0.3} staggerDelay={0.04} />
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-bold tracking-tighter leading-[0.85] text-gradient mt-2">
                <SplitText text={personalInfo.roleLine2} delay={0.7} staggerDelay={0.04} />
              </span>
              {/* Glowing underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mt-4"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left', boxShadow: '0 0 20px hsl(var(--primary) / 0.5)' }}
              />
            </h1>

            <motion.p
              className="mt-10 text-muted-foreground text-lg max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {personalInfo.tagline} Based in <strong className="text-foreground">{personalInfo.location}</strong>, working with clients worldwide.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <MagneticButton>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-lg font-mono text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(91,232,255,0.4)]">
                  <span className="relative z-10">Let's Collaborate →</span>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href={personalInfo.resumeUrl} target={personalInfo.resumeUrl !== '#' ? '_blank' : undefined} rel="noopener noreferrer" className="group relative inline-flex items-center gap-2 px-7 py-3.5 border border-border rounded-lg font-mono text-sm overflow-hidden hover:border-primary/50 transition-all duration-300">
                  <span className="relative z-10">↓ Resume</span>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          <div className="hidden lg:block">
            <IdCard />
          </div>
        </div>

        {/* Marquee */}
        <motion.div
          className="mt-20 border-y border-border/50 py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <Marquee items={heroMarquee.primary} className="font-mono text-lg font-semibold text-muted-foreground/30 tracking-[0.2em]" />
          <div className="mt-3">
            <Marquee items={heroMarquee.secondary} className="font-mono text-sm text-primary/20 tracking-[0.2em]" reverse />
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="flex flex-col items-center mt-12 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-5 h-8 border border-border/50 rounded-full flex justify-center pt-1.5">
              <motion.div
                className="w-1 h-1.5 bg-primary rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MetaRow() {
  return (
    <motion.div
      className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground tracking-wider sm:justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      {personalInfo.availableForWork && (
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          Available for work
        </div>
      )}
      <span>{personalInfo.locationFull} — {personalInfo.timezone}</span>
      <span>N°01 / Index</span>
    </motion.div>
  );
}
