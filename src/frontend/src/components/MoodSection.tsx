import { motion } from "motion/react";

interface MoodOrb {
  color: string;
  label: string;
  meaning: string;
  hex: string;
  glowHex: string;
  id: string;
}

const MOODS: MoodOrb[] = [
  {
    color: "pink",
    label: "Pink",
    meaning: "Soft & caring",
    hex: "#f472b6",
    glowHex: "rgba(244,114,182,0.5)",
    id: "mood.item.1",
  },
  {
    color: "yellow",
    label: "Yellow",
    meaning: "Happy & energetic",
    hex: "#fbbf24",
    glowHex: "rgba(251,191,36,0.5)",
    id: "mood.item.2",
  },
  {
    color: "purple",
    label: "Purple",
    meaning: "Creative & calm",
    hex: "#a78bfa",
    glowHex: "rgba(167,139,250,0.5)",
    id: "mood.item.3",
  },
  {
    color: "blue",
    label: "Blue",
    meaning: "Chill & thoughtful",
    hex: "#60a5fa",
    glowHex: "rgba(96,165,250,0.5)",
    id: "mood.item.4",
  },
  {
    color: "red",
    label: "Red",
    meaning: "Confident & bold",
    hex: "#f87171",
    glowHex: "rgba(248,113,113,0.5)",
    id: "mood.item.5",
  },
];

interface MoodSectionProps {
  onSelectMood: (color: string) => void;
  currentMood: string;
}

export function MoodSection({ onSelectMood, currentMood }: MoodSectionProps) {
  const handleOrbClick = (mood: MoodOrb) => {
    onSelectMood(mood.color);
    setTimeout(() => {
      const storySection = document.getElementById("story");
      if (storySection) {
        storySection.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 sm:py-28 px-6">
      {/* Section header */}
      <motion.div
        className="text-center mb-14 sm:mb-16 max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* FIX 1: Eyebrow label with proper tracking */}
        <div className="label-eyebrow mb-5 inline-block">Your Holi Mood</div>

        {/* FIX 1: Heading — tighter tracking, larger on desktop */}
        <h2
          className="text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] font-semibold"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#fef3e2",
            letterSpacing: "-0.025em",
            lineHeight: 1.18,
          }}
        >
          Himanshi… aaj tum kis rang jaisi feel kar rahi ho?
        </h2>
      </motion.div>

      {/* FIX 3: Orbs — more generous gap, better tap targets */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 sm:gap-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        {MOODS.map((mood, i) => (
          <motion.button
            key={mood.color}
            data-ocid={mood.id}
            onClick={() => handleOrbClick(mood)}
            className="flex flex-col items-center gap-3.5 cursor-pointer bg-transparent border-0 outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-2xl p-3"
            initial={{ opacity: 0, y: 28, scale: 0.82 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.1 * i,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.94 }}
            style={{ willChange: "transform" }}
          >
            {/* Orb */}
            <motion.div
              className="relative rounded-full flex items-center justify-center"
              style={{
                width: "76px",
                height: "76px",
                /* FIX 2: Richer orb background — more saturated radial */
                background: `radial-gradient(circle at 33% 30%, ${mood.hex}ff 0%, ${mood.hex}cc 50%, ${mood.hex}88 100%)`,
                boxShadow:
                  currentMood === mood.color
                    ? `0 0 32px 10px ${mood.glowHex}, 0 0 0 2px rgba(255,255,255,0.25), 0 0 70px 20px ${mood.glowHex}`
                    : `0 0 16px 4px ${mood.glowHex}, 0 2px 8px rgba(0,0,0,0.4)`,
                transition: "box-shadow 0.5s ease",
              }}
              animate={
                currentMood === mood.color
                  ? {
                      boxShadow: [
                        `0 0 20px 6px ${mood.glowHex}, 0 0 0 2px rgba(255,255,255,0.2)`,
                        `0 0 40px 14px ${mood.glowHex}, 0 0 0 2px rgba(255,255,255,0.3), 0 0 80px 25px ${mood.glowHex}`,
                        `0 0 20px 6px ${mood.glowHex}, 0 0 0 2px rgba(255,255,255,0.2)`,
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 2.2,
                repeat:
                  currentMood === mood.color ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
            >
              {/* Specular highlight */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "10px",
                  left: "14px",
                  width: "18px",
                  height: "12px",
                  background: "rgba(255,255,255,0.55)",
                  filter: "blur(4px)",
                  transform: "rotate(-20deg)",
                }}
              />
              {currentMood === mood.color && (
                <motion.div
                  className="text-white font-semibold text-base"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 450, damping: 18 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>

            {/* Label — FIX 1: tighter type hierarchy */}
            <div className="text-center">
              <p
                className="text-sm font-medium"
                style={{
                  color: currentMood === mood.color ? mood.hex : "#fef3e2",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.01em",
                  transition: "color 0.35s ease",
                  lineHeight: 1.4,
                }}
              >
                {mood.label}
              </p>
              <p
                className="text-[0.7rem] mt-0.5 font-light italic"
                style={{
                  color: "rgba(254,243,226,0.4)",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.01em",
                  lineHeight: 1.5,
                }}
              >
                {mood.meaning}
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.p
        className="mt-16 sm:mt-20 label-eyebrow"
        style={{ color: "rgba(255,255,255,0.2)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9 }}
      >
        ↓ Scroll to your story
      </motion.p>
    </section>
  );
}
