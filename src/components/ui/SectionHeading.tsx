import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import SplitText from './SplitText';

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
      <RippleHeading text={heading} />
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

export function RippleHeading({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [ripple, setRipple] = useState({ active: false });
  const filterId = useRef(`ripple-${Math.random().toString(36).slice(2, 8)}`).current;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    setRipple({ active: true });
  }, []);

  return (
    <>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id={filterId}>
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={ripple.active ? 14 : 0} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <motion.h2
        ref={ref}
        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] cursor-default ${className}`}
        style={{ filter: ripple.active ? `url(#${filterId})` : 'none', transition: 'filter 0.4s ease' }}
        onMouseEnter={handleMouseMove}
        onMouseLeave={() => setRipple({ active: false })}
      >
        <SplitText text={text} delay={0.1} />
      </motion.h2>
    </>
  );
}
