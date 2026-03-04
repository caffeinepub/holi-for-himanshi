import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INTRO_TEXT =
  "Himanshi… Holi sirf rangon ka festival nahi hota… kabhi kabhi ye bas smile share karne ka reason hota hai.";

interface IntroSectionProps {
  onComplete: () => void;
}

export function IntroSection({ onComplete }: IntroSectionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const typeNext = () => {
      if (indexRef.current < INTRO_TEXT.length) {
        indexRef.current++;
        setDisplayedText(INTRO_TEXT.slice(0, indexRef.current));
        timerRef.current = setTimeout(typeNext, 52);
      } else {
        setIsDone(true);
        timerRef.current = setTimeout(() => {
          onComplete();
        }, 1600);
      }
    };

    timerRef.current = setTimeout(typeNext, 900);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center px-6 sm:px-10"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #130010 0%, #08000a 45%, #000000 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* FIX 2: Richer ambient glows, more color depth */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          left: "10%",
          width: "40vw",
          height: "40vw",
          maxWidth: "420px",
          maxHeight: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "15%",
          right: "10%",
          width: "35vw",
          height: "35vw",
          maxWidth: "360px",
          maxHeight: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244,114,182,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "30%",
          left: "30%",
          width: "25vw",
          height: "25vw",
          maxWidth: "260px",
          maxHeight: "260px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.35 }}
      >
        {/* FIX 3: More breathing room above text */}
        <motion.div
          className="mb-10 flex justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {(
            ["intro-1-🌸", "intro-2-🎨", "intro-3-✨", "intro-4-🌸"] as const
          ).map((id) => (
            <span
              key={id}
              className="text-xl sm:text-2xl"
              style={{ opacity: 0.6 }}
            >
              {id.split("-").at(-1)}
            </span>
          ))}
        </motion.div>

        {/* FIX 1: Larger, more cinematic typewriter text with better tracking */}
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#fef3e2",
            fontSize: "clamp(1.2rem, 4vw, 2.1rem)",
            lineHeight: 1.55,
            letterSpacing: "-0.015em",
            textShadow:
              "0 2px 30px rgba(167,139,250,0.25), 0 1px 0 rgba(0,0,0,0.5)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          {displayedText}
          {!isDone && (
            <span
              className="animate-cursor-blink"
              style={{
                color: "#f472b6",
                marginLeft: "2px",
                fontStyle: "normal",
                fontWeight: 300,
              }}
            >
              |
            </span>
          )}
        </p>
      </motion.div>
    </motion.div>
  );
}
