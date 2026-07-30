import { motion } from 'framer-motion';

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowingBorder({ children, className = '' }: GlowingBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <div className="absolute -inset-[1px] rounded-xl overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)/0.3), hsl(var(--secondary)), hsl(var(--primary)))',
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
          animate={{ rotate: 360 }}
          transition={{ rotate: { duration: 4, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.3 } }}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)/0.3), hsl(var(--secondary)), hsl(var(--primary)))' }}
        />
      </div>
      <div className="relative bg-card rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
