import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const EXPLOSION_COLORS = [
  "#f472b6",
  "#fbbf24",
  "#a78bfa",
  "#ff8c69",
  "#84cc16",
  "#fb923c",
  "#34d399",
  "#f9a8d4",
  "#fde68a",
  "#c4b5fd",
  "#ff6b6b",
  "#ffd166",
  "#06d6a0",
  "#118ab2",
  "#ef476f",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  isConfetti: boolean;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
}

interface ColorExplosionCanvasProps {
  onComplete: () => void;
}

export function ColorExplosionCanvas({
  onComplete,
}: ColorExplosionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 120 : 200;
    const confettiCount = isMobile ? 25 : 40;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const particles: Particle[] = [];

    // Burst particles
    for (let i = 0; i < particleCount; i++) {
      const angle =
        (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 14 + 4;
      const life = Math.random() * 80 + 60;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed * (0.5 + Math.random()),
        vy: Math.sin(angle) * speed * (0.5 + Math.random()) - Math.random() * 3,
        radius: Math.random() * 10 + 4,
        color:
          EXPLOSION_COLORS[Math.floor(Math.random() * EXPLOSION_COLORS.length)],
        alpha: 1,
        life,
        maxLife: life,
        isConfetti: false,
        rotation: 0,
        rotationSpeed: 0,
        width: 0,
        height: 0,
      });
    }

    // Confetti strips
    for (let i = 0; i < confettiCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      const life = Math.random() * 100 + 80;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        radius: 0,
        color:
          EXPLOSION_COLORS[Math.floor(Math.random() * EXPLOSION_COLORS.length)],
        alpha: 1,
        life,
        maxLife: life,
        isConfetti: true,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        width: Math.random() * 8 + 6,
        height: Math.random() * 3 + 2,
      });
    }

    let startTime: number | null = null;
    const DURATION = 2500;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let anyAlive = false;

      for (const p of particles) {
        if (p.life <= 0) continue;
        anyAlive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18; // gravity
        p.vx *= 0.98; // friction
        p.life--;
        p.alpha = p.life / p.maxLife;

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.isConfetti) {
          ctx.translate(p.x, p.y);
          p.rotation += p.rotationSpeed;
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        } else {
          // Powder puff effect
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius,
          );
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, `${p.color}00`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.restore();
      }

      if (anyAlive && elapsed < DURATION + 500) {
        requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}
