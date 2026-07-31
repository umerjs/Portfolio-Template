import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SplitText from '../reactbits/SplitText';

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  description?: string;
  className?: string;
}

export default function SectionHeading({ eyebrow, heading, description, className = '' }: SectionHeadingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={`mb-16 ${className}`}>
      <motion.p
        className="font-mono text-sm text-primary mb-4 tracking-widest uppercase"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {eyebrow}
      </motion.p>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] font-display text-aurora">
        <SplitText text={heading} tag="span" textAlign="left" duration={0.8} delay={30} />
      </h2>
      {description && (
        <motion.p
          className="mt-6 text-muted-foreground max-w-xl text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
