import { useEffect, useRef } from "react";

const COLOR_MAP: Record<string, string[]> = {
  pink: [
    "rgba(244,114,182,0.6)",
    "rgba(251,191,36,0.4)",
    "rgba(255,200,220,0.5)",
  ],
  yellow: [
    "rgba(251,191,36,0.6)",
    "rgba(253,230,138,0.5)",
    "rgba(244,114,182,0.3)",
  ],
  purple: [
    "rgba(167,139,250,0.6)",
    "rgba(196,181,253,0.5)",
    "rgba(244,114,182,0.3)",
  ],
  blue: [
    "rgba(96,165,250,0.6)",
    "rgba(147,197,253,0.5)",
    "rgba(167,139,250,0.3)",
  ],
  red: [
    "rgba(248,113,113,0.6)",
    "rgba(251,191,36,0.4)",
    "rgba(244,114,182,0.3)",
  ],
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
}

interface FloatingParticlesProps {
  themeColor: string;
}

export function FloatingParticles({ themeColor }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const themeRef = useRef(themeColor);

  useEffect(() => {
    themeRef.current = themeColor;
  }, [themeColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const initParticles = () => {
      const colors = COLOR_MAP[themeRef.current] || COLOR_MAP.pink;
      particlesRef.current = Array.from({ length: 55 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.15,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
      }));
    };
    initParticles();

    const animate = (time: number) => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colors = COLOR_MAP[themeRef.current] || COLOR_MAP.pink;

      for (const p of particlesRef.current) {
        p.x += p.vx + Math.sin(time * 0.001 + p.phase) * 0.25;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
          p.color = colors[Math.floor(Math.random() * colors.length)];
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
