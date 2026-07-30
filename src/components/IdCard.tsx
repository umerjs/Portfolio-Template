import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { personalInfo, idCardChips as chips } from '../data/data';

export default function IdCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Physics-driven rotation values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Spring physics for realistic swinging
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 12, mass: 1.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 60, damping: 12, mass: 1.5 });

  // Subtle shadow shift based on rotation
  const shadowX = useTransform(springRotateY, [-30, 30], [-15, 15]);
  const shadowY = useTransform(springRotateX, [-30, 30], [15, -5]);

  // Idle sway animation
  useEffect(() => {
    if (isDragging) return;
    let frame: number;
    let t = 0;
    const sway = () => {
      t += 0.015;
      rotateY.set(Math.sin(t) * 3 + Math.cos(t * 0.7) * 1.5);
      rotateX.set(Math.cos(t * 0.8) * 1.5);
      frame = requestAnimationFrame(sway);
    };
    frame = requestAnimationFrame(sway);
    return () => cancelAnimationFrame(frame);
  }, [isDragging, rotateX, rotateY]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    rotateY.set(deltaX * 20);
    rotateX.set(-deltaY * 12);
    setIsDragging(true);
  }, [rotateY, rotateX]);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Stable barcode widths
  const barcodeWidths = useMemo(
    () => Array.from({ length: 30 }, () => ({ w: Math.random() > 0.5 ? 2 : 1, h: 16 + Math.random() * 12 })),
    []
  );

  return (
    <div
      ref={containerRef}
      className="relative w-72 cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
    >
      {/* Lanyard rope */}
      <LanyardRope rotateY={springRotateY} />

      {/* Swinging card */}
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformOrigin: 'top center',
          filter: useTransform(
            [shadowX, shadowY],
            ([sx, sy]) => `drop-shadow(${sx}px ${sy}px 25px rgba(91,232,255,0.15))`
          ),
        }}
      >
        {/* Clip at top */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-5 rounded-b-lg bg-gradient-to-b from-muted-foreground/40 to-muted-foreground/20 border border-border/50 border-t-0 relative">
            <div className="absolute inset-x-3 top-1 h-[3px] rounded-full bg-foreground/10" />
          </div>
        </div>

        {/* Card body */}
        <div className="rounded-xl border border-border bg-card/90 backdrop-blur-md overflow-hidden shadow-2xl mt-0.5 relative">
          {/* Holographic sheen overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.07]"
            style={{
              background: useTransform(
                springRotateY,
                [-20, 0, 20],
                [
                  'linear-gradient(105deg, transparent 30%, hsl(var(--primary)) 45%, hsl(var(--secondary)) 55%, transparent 70%)',
                  'linear-gradient(105deg, transparent 40%, hsl(var(--primary)) 50%, hsl(var(--secondary)) 60%, transparent 70%)',
                  'linear-gradient(105deg, transparent 50%, hsl(var(--primary)) 55%, hsl(var(--secondary)) 65%, transparent 80%)',
                ]
              ),
            }}
          />

          {/* Header */}
          <div className="bg-primary/10 border-b border-border/50 px-4 py-2.5 text-center relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
            <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase font-semibold">
              All-Areas Access
            </p>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
          </div>

          {/* Photo + Info */}
          <div className="p-5 flex flex-col items-center gap-2.5 relative">
            <div className="relative">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className="w-[88px] h-[88px] rounded-lg border-2 border-primary/20 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-card flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-200" />
              </div>
            </div>

            <p className="font-mono text-[9px] text-muted-foreground/60 tracking-[0.2em]">{personalInfo.idBadgeNumber}</p>

            <div className="text-center">
              <h3 className="font-bold text-lg tracking-tight leading-tight">{personalInfo.name.toUpperCase()}</h3>
              <p className="font-mono text-[11px] text-primary mt-0.5 tracking-wider">{personalInfo.role.toUpperCase()}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 mt-1">
              {chips.map(c => (
                <span key={c} className="px-2.5 py-1 rounded-md bg-primary/10 text-[10px] font-mono text-primary border border-primary/20">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Barcode footer */}
          <div className="border-t border-border/50 px-4 py-3 bg-muted/30">
            <div className="flex items-end justify-center gap-[2px] h-7">
              {barcodeWidths.map((b, i) => (
                <div key={i} className="bg-foreground/15 rounded-[0.5px]" style={{ width: b.w, height: b.h }} />
              ))}
            </div>
            <p className="text-center font-mono text-[8px] text-muted-foreground/40 mt-1.5 tracking-[0.15em]">
              {personalInfo.idBadgeCode}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Lanyard rope drawn as an SVG catenary curve that responds to card rotation
function LanyardRope({ rotateY }: { rotateY: ReturnType<typeof useSpring> }) {
  const offsetX = useTransform(rotateY, [-20, 20], [-15, 15]);

  return (
    <div className="flex justify-center h-16 relative">
      {/* Anchor point (pin) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-muted-foreground/30 border border-border/50 z-10" />
      <motion.svg
        viewBox="0 0 100 60"
        className="w-24 h-16 absolute top-1"
        style={{ x: useTransform(offsetX, v => v * 0.3) }}
      >
        <motion.path
          d={useTransform(offsetX, (ox) => {
            const cp1x = 50 + ox * 0.8;
            const cp1y = 35;
            return `M 50 0 Q ${cp1x} ${cp1y} 50 58`;
          })}
          fill="none"
          stroke="hsl(var(--muted-foreground) / 0.3)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Second thinner highlight rope */}
        <motion.path
          d={useTransform(offsetX, (ox) => {
            const cp1x = 50 + ox * 0.8;
            return `M 50 0 Q ${cp1x} 35 50 58`;
          })}
          fill="none"
          stroke="hsl(var(--primary) / 0.1)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
