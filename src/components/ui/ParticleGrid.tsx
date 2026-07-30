import { useEffect, useRef } from 'react';

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    const cols = Math.floor(canvas.width / 60);
    const rows = Math.floor(canvas.height / 60);
    const particles: { bx: number; by: number; x: number; y: number }[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c + 0.5) * (canvas.width / cols);
        const y = (r + 0.5) * (canvas.height / rows);
        particles.push({ bx: x, by: y, x, y });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const dx = mouseX - p.bx;
        const dy = mouseY - p.by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 25;
          p.x = p.bx - (dx / dist) * force;
          p.y = p.by - (dy / dist) * force;
        } else {
          p.x += (p.bx - p.x) * 0.1;
          p.y += (p.by - p.y) * 0.1;
        }

        const alpha = dist < maxDist ? 0.3 + (1 - dist / maxDist) * 0.5 : 0.08;
        const size = dist < maxDist ? 1.5 + (1 - dist / maxDist) * 2 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91, 232, 255, ${alpha})`;
        ctx.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const mDist = Math.min(
              Math.sqrt((mouseX - particles[i].x) ** 2 + (mouseY - particles[i].y) ** 2),
              Math.sqrt((mouseX - particles[j].x) ** 2 + (mouseY - particles[j].y) ** 2)
            );
            if (mDist < 180) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(91, 232, 255, ${(1 - dist / 80) * 0.15})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
