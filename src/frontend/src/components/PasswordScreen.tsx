import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

const PARTICLE_COLORS = [
  "rgba(244, 114, 182, 0.55)",
  "rgba(251, 191, 36, 0.5)",
  "rgba(167, 139, 250, 0.55)",
  "rgba(96, 165, 250, 0.5)",
  "rgba(248, 184, 130, 0.5)",
];

interface PasswordScreenProps {
  onUnlock: () => void;
}

export function PasswordScreen({ onUnlock }: PasswordScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [visible, setVisible] = useState(true);

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

    particlesRef.current = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
      radius: Math.random() * 4 + 2,
      color:
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particlesRef.current) {
        p.x += p.vx + Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.3;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
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
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleUnlock = () => {
    if (password.trim().toLowerCase() === "himanshi") {
      setUnlocking(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(onUnlock, 600);
      }, 300);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleUnlock();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, #130010 0%, #08000a 45%, #000000 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        >
          {/* Background canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
          />

          {/* Soft background glow behind card */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "600px",
              height: "400px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, rgba(244,114,182,0.08) 45%, transparent 70%)",
              filter: "blur(40px)",
              zIndex: 1,
            }}
          />

          {/* Glassmorphism card */}
          <motion.div
            className="relative z-10 w-full"
            style={{ maxWidth: "400px", margin: "0 1.25rem" }}
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
          >
            <motion.div
              animate={error ? { x: [-10, 10, -7, 7, -4, 4, 0] } : {}}
              transition={{ duration: 0.45 }}
            >
              {/* FIX 2: Richer glass card */}
              <div className="glass-card-strong rounded-3xl overflow-hidden">
                {/* Top shimmer strip — signature detail */}
                <div
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(244,114,182,0.6) 30%, rgba(167,139,250,0.8) 60%, rgba(251,191,36,0.4) 85%, transparent 100%)",
                  }}
                />

                <div className="p-8 sm:p-10">
                  {/* Icon */}
                  <div className="text-center mb-7">
                    <span className="text-5xl">🎨</span>
                  </div>

                  {/* FIX 1: Typography — display heading with tight tracking */}
                  <h1
                    className="text-center text-white text-[1.35rem] sm:text-[1.6rem] font-semibold mb-3"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      color: "#fef3e2",
                    }}
                  >
                    This Holi surprise is only for Himanshi
                  </h1>

                  {/* Subtitle — Poppins light, generous line-height */}
                  <p
                    className="text-center mb-9 text-sm font-light"
                    style={{
                      color: "rgba(254,243,226,0.45)",
                      fontFamily: "'Poppins', sans-serif",
                      lineHeight: 1.65,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Enter the secret word to unlock your surprise
                  </p>

                  {/* Input */}
                  <div className="relative mb-4">
                    <input
                      data-ocid="password.input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter password…"
                      className="w-full px-5 py-3.5 rounded-xl text-white placeholder-white/25 text-sm outline-none"
                      style={{
                        background: "rgba(255,248,240,0.07)",
                        border: error
                          ? "1px solid rgba(248,113,113,0.7)"
                          : "1px solid rgba(255,255,255,0.14)",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.03em",
                        transition:
                          "border-color 0.2s ease, box-shadow 0.2s ease",
                        boxShadow: error
                          ? "0 0 0 3px rgba(248,113,113,0.15)"
                          : "none",
                      }}
                    />
                  </div>

                  {/* Error state */}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        data-ocid="password.error_state"
                        className="text-center text-xs mb-3 font-medium"
                        style={{
                          color: "#fc8181",
                          fontFamily: "'Poppins', sans-serif",
                          letterSpacing: "0.01em",
                        }}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        Incorrect password. Try again.
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Unlock button */}
                  <motion.button
                    data-ocid="password.primary_button"
                    onClick={handleUnlock}
                    disabled={unlocking}
                    className="w-full py-3.5 rounded-xl font-medium text-white text-sm relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #ec4899 0%, #a855f7 55%, #8b5cf6 100%)",
                      fontFamily: "'Poppins', sans-serif",
                      letterSpacing: "0.04em",
                      willChange: "transform",
                      boxShadow:
                        "0 4px 20px rgba(168,85,247,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                    }}
                    whileHover={{
                      scale: 1.025,
                      boxShadow:
                        "0 8px 32px rgba(168,85,247,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                    whileTap={{ scale: 0.975 }}
                  >
                    {unlocking ? "Unlocking…" : "🔓 Unlock My Surprise"}
                  </motion.button>

                  {/* Hint */}
                  <p
                    className="text-center text-xs mt-5"
                    style={{
                      color: "rgba(255,255,255,0.2)",
                      fontFamily: "'Poppins', sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Hint: it's your name ✨
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
