import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SurpriseModal({ isOpen, onClose }: SurpriseModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          />

          {/* Modal card */}
          <motion.div
            data-ocid="surprise.dialog"
            className="relative w-full max-w-sm z-10"
            initial={{ scale: 0.82, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.86, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            {/* FIX 2: Richer glass with animated glow + warm tint */}
            <motion.div
              className="rounded-3xl overflow-hidden relative"
              style={{
                backdropFilter: "blur(44px)",
                WebkitBackdropFilter: "blur(44px)",
                background:
                  "linear-gradient(160deg, rgba(255,248,240,0.1) 0%, rgba(255,255,255,0.06) 60%, rgba(200,180,255,0.05) 100%)",
                border: "1px solid rgba(255,255,255,0.16)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.14), 0 32px 64px rgba(0,0,0,0.6)",
              }}
              animate={{
                boxShadow: [
                  "inset 0 1px 0 rgba(255,255,255,0.14), 0 32px 64px rgba(0,0,0,0.6), 0 0 28px 6px rgba(244,114,182,0.3)",
                  "inset 0 1px 0 rgba(255,255,255,0.14), 0 32px 64px rgba(0,0,0,0.6), 0 0 28px 6px rgba(167,139,250,0.35)",
                  "inset 0 1px 0 rgba(255,255,255,0.14), 0 32px 64px rgba(0,0,0,0.6), 0 0 28px 6px rgba(251,191,36,0.28)",
                  "inset 0 1px 0 rgba(255,255,255,0.14), 0 32px 64px rgba(0,0,0,0.6), 0 0 28px 6px rgba(244,114,182,0.3)",
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {/* FIX 1: Rainbow top shimmer strip */}
              <div
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #f472b6cc, #a78bfacc, #fbbf24aa, transparent)",
                }}
              />

              {/* Background blooms */}
              <div
                className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(244,114,182,0.2) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-24 h-24 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Close button */}
              <motion.button
                data-ocid="surprise.close_button"
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border-0 cursor-pointer z-10"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                }}
                whileHover={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.88 }}
                aria-label="Close"
              >
                <X size={14} />
              </motion.button>

              <div className="p-8 sm:p-10">
                {/* Emoji */}
                <motion.div
                  className="text-center mb-6"
                  style={{ fontSize: "2.4rem" }}
                  animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
                >
                  🎉
                </motion.div>

                {/* FIX 1: Typography hierarchy — display name, then body, then CTA */}
                <div className="text-center relative z-10">
                  <motion.p
                    className="font-semibold mb-3"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "#fef3e2",
                      fontSize: "1.25rem",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.3,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 }}
                  >
                    Himanshi 😄
                  </motion.p>

                  <motion.p
                    className="mb-5"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: "rgba(254,243,226,0.72)",
                      fontWeight: 300,
                      fontSize: "0.9rem",
                      lineHeight: 1.72,
                      letterSpacing: "0.008em",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38 }}
                  >
                    Always stay happy, positive aur full of colors!
                  </motion.p>

                  <motion.p
                    className="font-medium"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.95rem",
                      letterSpacing: "0.01em",
                      background: "linear-gradient(135deg, #fbbf24, #f472b6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.54 }}
                  >
                    Happy Holi once again 🎉
                  </motion.p>
                </div>

                {/* Divider + close */}
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.72 }}
                >
                  <div
                    className="w-12 h-px mx-auto mb-5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={onClose}
                    className="hover:text-white/60 transition-colors duration-200"
                    style={{
                      color: "rgba(255,255,255,0.28)",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
