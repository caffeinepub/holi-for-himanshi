import { motion } from "motion/react";

interface FinalMessageSectionProps {
  onSurpriseClick: () => void;
}

export function FinalMessageSection({
  onSurpriseClick,
}: FinalMessageSectionProps) {
  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center py-20 sm:py-28 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* FIX 2: Richer background — warm radial bloom */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(244,114,182,0.12) 0%, rgba(167,139,250,0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* FIX 3: More breathing room — larger top emoji spacing */}
      <motion.div
        className="flex gap-5 mb-12 sm:mb-14"
        style={{ fontSize: "1.8rem" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        {(["🎨", "💛", "🌸", "✨", "🎉"] as const).map((emoji, i) => (
          <motion.span
            key={emoji}
            animate={{ y: [0, -9, 0] }}
            transition={{
              duration: 2.2 + i * 0.25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.18,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      {/* Main message card */}
      <motion.div
        className="relative text-center w-full max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* FIX 2: Richer glass with warm tint and top shimmer strip */}
        <div className="glass-card rounded-3xl overflow-hidden">
          {/* Rainbow shimmer strip — signature detail */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #fbbf24 20%, #f472b6 50%, #a78bfa 80%, transparent 100%)",
              opacity: 0.7,
            }}
          />

          {/* FIX 3: Generous internal padding */}
          <div className="p-10 sm:p-14">
            {/* Gold divider */}
            <div
              className="w-20 h-px mx-auto mb-10 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #d4af37cc, transparent)",
              }}
            />

            {/* FIX 1: Larger display heading — clear hierarchy */}
            <h2
              className="text-[1.9rem] sm:text-[2.4rem] md:text-[2.8rem] font-semibold mb-8 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                background:
                  "linear-gradient(135deg, #fbbf24 0%, #f472b6 55%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Happy Holi Himanshi 🎨💛
            </h2>

            {/* FIX 1: Body text — Poppins light with generous line-height */}
            <div className="space-y-2.5">
              {[
                "Hamesha aise hi smile karti rehna,",
                "Aur tumhari life success aur happiness",
                "ke rangon se bhari rahe 🌸",
              ].map((line) => (
                <p
                  key={line}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "rgba(254,243,226,0.85)",
                    fontWeight: 300,
                    fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
                    lineHeight: 1.75,
                    letterSpacing: "0.008em",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Gold divider */}
            <div
              className="w-20 h-px mx-auto mt-10 mb-10 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #d4af37cc, transparent)",
              }}
            />

            {/* Surprise link */}
            <motion.button
              data-ocid="surprise.open_modal_button"
              onClick={onSurpriseClick}
              className="bg-transparent border-0 cursor-pointer text-sm underline underline-offset-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
              style={{
                color: "rgba(254,243,226,0.4)",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.02em",
                fontWeight: 400,
              }}
              whileHover={{
                color: "#f472b6",
                textShadow: "0 0 14px rgba(244,114,182,0.55)",
                scale: 1.04,
              }}
              whileTap={{ scale: 0.97 }}
            >
              ✨ Ek aur surprise?
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="mt-16 sm:mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9 }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.18)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.02em",
          }}
        >
          Created by Kabir
        </p>
      </motion.footer>
    </motion.section>
  );
}
