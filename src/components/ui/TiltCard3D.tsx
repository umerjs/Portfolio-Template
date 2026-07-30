import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  borderGlow?: boolean;
  tiltAmount?: number;
}

export default function TiltCard3D({ children, className = '', glareColor, borderGlow = true, tiltAmount = 15 }: TiltCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltAmount, -tiltAmount]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltAmount, tiltAmount]), { stiffness: 200, damping: 20 });

  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const gc = glareColor || 'hsl(var(--primary))';

  return (
    <div style={{ perspective: 1000 }} className="relative">
      <motion.div
        ref={ref}
        className={`relative overflow-hidden rounded-xl border border-border bg-card ${className}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glare overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, ${gc}22 0%, transparent 60%)`
            ),
          }}
        />
        {/* Animated gradient border glow */}
        {borderGlow && (
          <div className="absolute inset-0 -z-10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm"
            style={{ background: `linear-gradient(135deg, ${gc}40, transparent, ${gc}20)`, margin: -1 }} />
        )}
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
