import { motion } from 'framer-motion';
import { Github, Linkedin, MessageCircle, Mail, ArrowUpRight, MapPin } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import SplitText from './ui/SplitText';
import SpotlightCard from './ui/SpotlightCard';
import { personalInfo, socialLinks, navLinks, footerAbout } from '../data/data';

const navigate = navLinks.map(l => ({ label: l.label, href: `#${l.id}` }));

const socials = [
  { label: 'GitHub', href: socialLinks.github, icon: Github },
  { label: 'LinkedIn', href: socialLinks.linkedin, icon: Linkedin },
  { label: 'WhatsApp', href: socialLinks.whatsapp, icon: MessageCircle },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/50 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: 'hsl(var(--primary) / 0.05)' }} />

      {/* Big CTA */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-24 text-center relative">
        <MagneticButton strength={0.15}>
          <a href={`mailto:${personalInfo.email}`} className="inline-block group">
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter group-hover:text-primary transition-colors duration-500">
              <SplitText text="LET'S TALK" staggerDelay={0.05} />
            </h2>
            <motion.div
              className="flex items-center justify-center gap-2 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-sm text-muted-foreground tracking-wider">{personalInfo.email}</p>
              <ArrowUpRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </a>
        </MagneticButton>
      </div>

      {/* Links grid */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-14">
        <SpotlightCard className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h4 className="font-mono text-xs text-primary tracking-wider mb-5">ABOUT</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{footerAbout}</p>
          </div>

          <div>
            <h4 className="font-mono text-xs text-primary tracking-wider mb-5">NAVIGATE</h4>
            <ul className="space-y-3">
              {navigate.map(n => (
                <li key={n.label}>
                  <button onClick={() => scrollTo(n.href.slice(1))} className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all" />
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-primary tracking-wider mb-5">CONNECT</h4>
            <ul className="space-y-3">
              {socials.map(s => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2.5 group">
                    <s.icon size={14} className="group-hover:text-primary transition-colors" /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-primary tracking-wider mb-5">REACH OUT</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${personalInfo.email}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2.5 group">
                  <Mail size={14} className="group-hover:text-primary transition-colors" /> {personalInfo.email}
                </a>
              </li>
              <li className="text-sm text-muted-foreground flex items-center gap-2.5">
                <MapPin size={14} className="text-primary" /> {personalInfo.locationFull}
              </li>
            </ul>
          </div>
        </SpotlightCard>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] text-muted-foreground/60">© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p className="font-mono text-[11px] text-muted-foreground/60">Built with React, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
