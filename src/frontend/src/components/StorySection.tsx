import { motion } from "motion/react";

const STORY_BLOCKS = [
  {
    text: "Himanshi, tumhari smile full sunshine jaisi hai ☀️",
    accentHex: "#fbbf24",
    glowRgba: "rgba(251,191,36,0.12)",
  },
  {
    text: "Kabhi tum pink jaisi soft… kabhi purple jaisi creative ✨",
    accentHex: "#f472b6",
    glowRgba: "rgba(244,114,182,0.12)",
  },
  {
    text: "Holi ka maza tab hi aata hai jab sabke life mein colors ho 🎨",
    accentHex: "#a78bfa",
    glowRgba: "rgba(167,139,250,0.12)",
  },
];

interface StorySectionProps {
  themeColor: string;
}

export function StorySection({ themeColor: _themeColor }: StorySectionProps) {
  return (
    <section id="story" className="relative py-20 sm:py-28 px-6">
      {/* Section eyebrow */}
      <motion.div
        className="text-center mb-14 sm:mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* FIX 1: Eyebrow with consistent label style */}
        <span className="label-eyebrow">Your Story</span>
      </motion.div>

      {/* FIX 3: Wider max-width, larger gap between blocks */}
      <div className="max-w-2xl mx-auto flex flex-col gap-10 sm:gap-12">
        {STORY_BLOCKS.map((block, i) => (
          <motion.div
            key={block.text.slice(0, 20)}
            className="relative"
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.85,
              delay: i * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* FIX 2: Per-block warm glow — unique color per card instead of theme */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: block.glowRgba,
                filter: "blur(32px)",
                transform: "scale(0.9)",
              }}
            />

            {/* Powder accent glows — moved further out for depth */}
            <div
              className="absolute -top-6 -right-4 w-20 h-20 rounded-full pointer-events-none"
              style={{
                background: block.accentHex,
                opacity: 0.12,
                filter: "blur(24px)",
              }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-14 h-14 rounded-full pointer-events-none"
              style={{
                background: block.accentHex,
                opacity: 0.1,
                filter: "blur(20px)",
              }}
            />

            {/* FIX 2: Richer glass card — warm tint, visible top highlight */}
            <div className="glass-card relative rounded-2xl overflow-hidden">
              {/* Accent-colored top shimmer strip */}
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${block.accentHex}99, transparent)`,
                }}
              />

              <div className="p-7 sm:p-10">
                {/* Left accent line */}
                <div
                  className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${block.accentHex}cc, transparent)`,
                  }}
                />

                {/* FIX 1: Larger heading-level type for story text */}
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#fef3e2",
                    fontSize: "clamp(1.15rem, 3vw, 1.55rem)",
                    lineHeight: 1.45,
                    letterSpacing: "-0.015em",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  {block.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
