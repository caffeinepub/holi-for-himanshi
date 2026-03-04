import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FinalMessageSection } from "./components/FinalMessageSection";
import { FloatingParticles } from "./components/FloatingParticles";
import { GulalThaliSection } from "./components/GulalThaliSection";
import { IntroSection } from "./components/IntroSection";
import { MoodSection } from "./components/MoodSection";
import { PasswordScreen } from "./components/PasswordScreen";
import { StorySection } from "./components/StorySection";
import { SurpriseModal } from "./components/SurpriseModal";
import { useActor } from "./hooks/useActor";

type Stage = "locked" | "intro" | "main";
type ThemeColor = "pink" | "yellow" | "purple" | "blue" | "red";

const GRADIENTS: Record<ThemeColor, string> = {
  pink: "linear-gradient(135deg, #1a0010 0%, #0d0005 40%, #110008 70%, #000000 100%)",
  yellow:
    "linear-gradient(135deg, #1a1000 0%, #0d0800 40%, #110d00 70%, #000000 100%)",
  purple:
    "linear-gradient(135deg, #0f001a 0%, #08000d 40%, #0a0011 70%, #000000 100%)",
  blue: "linear-gradient(135deg, #00101a 0%, #00080d 40%, #000a11 70%, #000000 100%)",
  red: "linear-gradient(135deg, #1a0000 0%, #0d0000 40%, #110000 70%, #000000 100%)",
};

export default function App() {
  const [stage, setStage] = useState<Stage>("locked");
  const [themeColor, setThemeColor] = useState<ThemeColor>("pink");
  const [explosionDone, setExplosionDone] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const { actor } = useActor();

  // Increment visit count on unlock
  const handleUnlock = () => {
    // Fire and forget
    if (actor) {
      actor.incrementVisitCount().catch(() => {});
    }
    setStage("intro");
  };

  // When actor becomes available after unlock has happened
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run only when actor changes
  useEffect(() => {
    if (stage !== "locked" && actor) {
      actor.incrementVisitCount().catch(() => {});
    }
  }, [actor]);

  const handleIntroComplete = () => {
    setStage("main");
  };

  const handleMoodSelect = (color: string) => {
    setThemeColor(color as ThemeColor);
  };

  const handleExplode = () => {
    setExplosionDone(true);
  };

  const currentGradient = GRADIENTS[themeColor];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* ============ LOCKED STAGE ============ */}
      <AnimatePresence mode="wait">
        {stage === "locked" && (
          <PasswordScreen key="password" onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {/* ============ INTRO STAGE ============ */}
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <IntroSection key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* ============ MAIN STAGE ============ */}
      <AnimatePresence>
        {stage === "main" && (
          <motion.div
            key="main"
            className="relative min-h-screen"
            style={{
              background: currentGradient,
              transition: "background 0.8s ease",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating particles overlay */}
            <FloatingParticles themeColor={themeColor} />

            {/* Ambient color pulse at top */}
            <div
              className="fixed top-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, ${
                  themeColor === "pink"
                    ? "rgba(244,114,182,0.08)"
                    : themeColor === "yellow"
                      ? "rgba(251,191,36,0.08)"
                      : themeColor === "purple"
                        ? "rgba(167,139,250,0.08)"
                        : themeColor === "blue"
                          ? "rgba(96,165,250,0.08)"
                          : "rgba(248,113,113,0.08)"
                }, transparent)`,
                zIndex: 1,
                transition: "background 0.8s ease",
              }}
            />

            {/* Main scrollable content */}
            <div className="relative" style={{ zIndex: 2 }}>
              {/* Mood selection section */}
              <MoodSection
                onSelectMood={handleMoodSelect}
                currentMood={themeColor}
              />

              {/* Story section */}
              <StorySection themeColor={themeColor} />

              {/* Gulal thali section */}
              <GulalThaliSection onExplode={handleExplode} />

              {/* Final message — revealed after explosion */}
              <AnimatePresence>
                {explosionDone && (
                  <FinalMessageSection
                    key="final"
                    onSurpriseClick={() => setSurpriseOpen(true)}
                  />
                )}
              </AnimatePresence>

              {/* If no explosion yet, gentle prompt */}
              {!explosionDone && (
                <div
                  className="text-center py-16 text-xs"
                  style={{
                    color: "rgba(255,255,255,0.15)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  ↑ Click the thali to reveal the final message ↑
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Surprise modal — always on top */}
      <SurpriseModal
        isOpen={surpriseOpen}
        onClose={() => setSurpriseOpen(false)}
      />
    </div>
  );
}
