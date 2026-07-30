import { motion } from 'framer-motion';
import { Minus } from 'lucide-react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
}

export default function Marquee({ items, speed = 30, className = '', pauseOnHover = true, reverse = false }: MarqueeProps) {
  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 whitespace-nowrap group/item">
      <span className="hover:text-primary hover:text-shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-300 relative">
        {item}
        <span className="absolute -bottom-1 left-0 w-0 group-hover/item:w-full h-px bg-primary transition-all duration-300" />
      </span>
      <Minus size={8} className="text-primary/20 rotate-90" />
    </span>
  ));

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className={`flex gap-6 w-max ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: items.length * (60 / speed), repeat: Infinity, ease: 'linear' }}
      >
        <div className="flex gap-6">{content}</div>
        <div className="flex gap-6">{content}</div>
      </motion.div>
    </div>
  );
}
