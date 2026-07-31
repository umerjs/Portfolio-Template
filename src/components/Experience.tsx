import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import DecryptedText from './reactbits/DecryptedText';
import { experience as jobs } from '../data/data';

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 relative scroll-mt-24">
      {/* Subtle side glow */}
      <div className="absolute left-0 top-1/4 w-72 h-72 rounded-full blur-[180px] pointer-events-none"
        style={{ background: 'hsl(var(--primary) / 0.06)' }} />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="N°04 / Career" heading="WHERE I'VE WORKED" />

        <div className="space-y-0">
          {jobs.map((job, i) => (
            <JobRow key={job.num} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JobRow({ job, index }: { job: typeof jobs[0]; index: number }) {
  return (
    <motion.div
      className="group relative border-b border-border/50 py-10 md:py-12 cursor-default"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hover highlight bg */}
      <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mx-4 px-4 rounded-lg" />

      <div className="flex flex-col md:flex-row md:items-start gap-4 relative">
        <motion.span
          className="font-mono text-primary text-3xl md:text-4xl font-bold w-16 flex-shrink-0 opacity-20 group-hover:opacity-100 transition-all duration-500"
          whileHover={{ scale: 1.1 }}
        >
          {job.num}
        </motion.span>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors duration-300 flex items-center gap-3">
              {job.title}
              <motion.span
                className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                initial={false}
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                <ArrowUpRight size={20} className="text-primary" />
              </motion.span>
            </h3>
            <span className="font-mono text-xs text-muted-foreground tracking-wider shrink-0">{job.period}</span>
          </div>
          <p className="font-mono text-sm text-muted-foreground mt-1.5">
            <DecryptedText
              text={job.company}
              animateOn="hover"
              speed={45}
              maxIterations={12}
              sequential
            />
          </p>
          <motion.p
            className="text-muted-foreground mt-4 leading-relaxed max-w-2xl"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: 'auto', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
          >
            {job.desc}
          </motion.p>
        </div>
      </div>

      {/* Animated bottom line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary via-secondary to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.8 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
}
