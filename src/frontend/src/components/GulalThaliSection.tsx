import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ColorExplosionCanvas } from "./ColorExplosionCanvas";

interface GulalThaliSectionProps {
  onExplode: () => void;
}

const GULAL_DOTS = [
  { color: "#f472b6", x: "40%", y: "35%" },
  { color: "#fbbf24", x: "60%", y: "45%" },
  { color: "#a78bfa", x: "45%", y: "60%" },
  { color: "#f87171", x: "58%", y: "35%" },
  { color: "#34d399", x: "35%", y: "55%" },
];

export function GulalThaliSection({ onExplode }: GulalThaliSectionProps) {
  const [exploding, setExploding] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleClick = () => {
    if (exploding) return;
    setExploding(true);
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  const handleExplosionComplete = () => {
    setExploding(false);
    onExplode();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 sm:py-28 px-6">
      {/* Section eyebrow */}
      <motion.div
        className="text-center mb-14 sm:mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* FIX 1: Consistent eyebrow label */}
        <span className="label-eyebrow">Interactive Experience</span>
      </motion.div>

      {/* Thali container */}
      <motion.div
        className="flex flex-col items-center gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Thali button */}
        <motion.button
          data-ocid="gulal.canvas_target"
          onClick={handleClick}
          disabled={exploding}
          className="relative cursor-pointer border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
          style={{ willChange: "transform" }}
          animate={
            shaking
              ? {
                  x: [-10, 10, -7, 7, -4, 4, -1, 1, 0],
                  transition: { duration: 0.5 },
                }
              : {
                  y: [0, -12, 0],
                  transition: {
                    duration: 3.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }
          }
          whileHover={!exploding ? { scale: 1.07 } : {}}
          whileTap={!exploding ? { scale: 0.94 } : {}}
        >
          {/* FIX 2: Richer gold glow — layered, warmer */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ zIndex: -1 }}
            animate={{
              boxShadow: [
                "0 0 28px 8px rgba(212,175,55,0.45), 0 0 55px 18px rgba(212,175,55,0.15), 0 0 90px 35px rgba(244,114,182,0.07)",
                "0 0 45px 14px rgba(212,175,55,0.65), 0 0 80px 28px rgba(212,175,55,0.25), 0 0 120px 50px rgba(244,114,182,0.1)",
                "0 0 28px 8px rgba(212,175,55,0.45), 0 0 55px 18px rgba(212,175,55,0.15), 0 0 90px 35px rgba(244,114,182,0.07)",
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Thali circle */}
          <div
            className="relative overflow-hidden"
            style={{
              width: "210px",
              height: "210px",
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, #FF6B35 0deg, #F7C59F 60deg, #ff8fab 120deg, #c77dff 180deg, #ffd166 240deg, #06d6a0 300deg, #FF6B35 360deg)",
              border: "6px solid #d4af37",
              boxShadow:
                "inset 0 0 40px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.2), 0 6px 24px rgba(0,0,0,0.5)",
            }}
          >
            {/* Inner radial overlay for depth */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)",
              }}
            />

            {/* Gulal powder dots */}
            {GULAL_DOTS.map((dot) => (
              <div
                key={dot.color}
                className="absolute rounded-full"
                style={{
                  width: "20px",
                  height: "20px",
                  background: dot.color,
                  left: dot.x,
                  top: dot.y,
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 10px 4px ${dot.color}99`,
                  filter: "blur(1.5px)",
                }}
              />
            ))}

            {/* Center flower */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ fontSize: "42px" }}
            >
              🌸
            </div>
          </div>

          {/* Inner gold rim */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "8px",
              border: "1.5px solid rgba(212,175,55,0.35)",
              borderRadius: "50%",
            }}
          />
        </motion.button>

        {/* FIX 1+3: Breathing room around text, better font hierarchy */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <motion.p
            className="text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "rgba(254,243,226,0.75)",
              fontSize: "1.1rem",
              fontStyle: "italic",
              letterSpacing: "-0.01em",
              lineHeight: 1.5,
            }}
            animate={{ opacity: [0.55, 0.95, 0.55] }}
            transition={{
              duration: 2.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Mujhe rang lagao… 🎨
          </motion.p>

          <motion.p
            className="text-center"
            style={{
              color: "rgba(255,255,255,0.28)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Click the thali to celebrate
          </motion.p>
        </div>
      </motion.div>

      {/* Explosion canvas */}
      <AnimatePresence>
        {exploding && (
          <ColorExplosionCanvas onComplete={handleExplosionComplete} />
        )}
      </AnimatePresence>
    </section>
  );
}
