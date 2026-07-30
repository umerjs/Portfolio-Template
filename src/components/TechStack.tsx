import { motion } from 'framer-motion';
import { Monitor, Server, Database, Wrench, type LucideIcon } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Marquee from './ui/Marquee';
import TiltCard3D from './ui/TiltCard3D';
import { techStack as categories } from '../data/data';

const iconMap: Record<string, LucideIcon> = { Monitor, Server, Database, Wrench };

const allSkills = categories.flatMap(c => c.items);

export default function TechStack() {
  return (
    <section id="stack" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="N°02 / Skills & Tech"
          heading="TOOLS OF THE TRADE"
          description="Passionate developer with expertise in modern web technologies and design."
        />

        {/* Dual-direction marquees */}
        <div className="space-y-3 mb-16">
          <div className="border-y border-border/50 py-4">
            <Marquee items={allSkills.slice(0, 14)} className="font-mono text-sm text-muted-foreground/60 tracking-widest" speed={20} />
          </div>
          <div className="border-b border-border/50 py-4">
            <Marquee items={[...allSkills.slice(14), ...allSkills.slice(0, 6)]} className="font-mono text-sm text-primary/40 tracking-widest" speed={15} reverse />
          </div>
        </div>

        {/* 3D tilt category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard3D className="h-full" tiltAmount={12}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <h3 className="font-mono text-primary text-sm tracking-wider font-semibold">{cat.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {cat.items.map((item, j) => (
                      <motion.li
                        key={item}
                        className="text-sm text-muted-foreground flex items-center gap-2.5 group"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + j * 0.04 + 0.3 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all" />
                        <span className="group-hover:text-foreground transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard3D>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
