import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export default function SplitText({ text, className = '', delay = 0, staggerDelay = 0.03, once = true }: SplitTextProps) {
  const chars = text.split('');

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
          variants={{
            hidden: { opacity: 0, y: 60, rotateX: -90, filter: 'blur(8px)' },
            visible: {
              opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
              transition: {
                duration: 0.5,
                delay: delay + i * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
