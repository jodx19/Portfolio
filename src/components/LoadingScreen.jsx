/**
 * LoadingScreen — Terminal Boot Sequence
 *
 * A cyberpunk-style terminal that "boots up" by printing fake system messages,
 * then fades out to reveal the portfolio.
 *
 * Duration: ~2s before calling onComplete()
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "> Initializing system kernel...",         delay: 0    },
  { text: "> Loading cyberpunk_portfolio.exe",       delay: 200  },
  { text: "> Mounting 3D particle engine...",        delay: 450  },
  { text: "> Connecting to neural interface...",     delay: 700  },
  { text: "> Rendering motion system...",            delay: 900  },
  { text: "> Authenticating identity: M.Al-Safi",   delay: 1100 },
  { text: "> All systems GO. Launching...",          delay: 1350 },
];

const TOTAL_DURATION = 1900; // ms before calling onComplete

export default function LoadingScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers = BOOT_LINES.map((line) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text]);
      }, line.delay)
    );

    const finishTimer = setTimeout(() => {
      setDone(true);
      // Give exit animation time before unmounting
      setTimeout(onComplete, 600);
    }, TOTAL_DURATION);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#02061a" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.015) 2px, rgba(34,211,238,0.015) 4px)",
            }}
          />

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2" style={{ borderColor: "#22d3ee" }} />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2" style={{ borderColor: "#22d3ee" }} />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2" style={{ borderColor: "#22d3ee" }} />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2" style={{ borderColor: "#22d3ee" }} />

          {/* Terminal window */}
          <motion.div
            className="relative w-full max-w-xl px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Terminal header bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-t-xl"
              style={{ background: "rgba(34,211,238,0.08)", borderBottom: "1px solid rgba(34,211,238,0.2)" }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <span className="ml-3 text-xs font-mono" style={{ color: "rgba(34,211,238,0.6)" }}>
                portfolio_boot.sh
              </span>
            </div>

            {/* Terminal body */}
            <div
              className="px-6 py-6 rounded-b-xl space-y-2 min-h-[200px]"
              style={{ background: "rgba(2,6,26,0.95)", border: "1px solid rgba(34,211,238,0.15)", borderTop: "none" }}
            >
              <AnimatePresence>
                {visibleLines.map((line, i) => (
                  <motion.p
                    key={i}
                    className="text-sm font-mono"
                    style={{ color: i === visibleLines.length - 1 ? "#22d3ee" : "rgba(34,211,238,0.55)" }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {line}
                    {i === visibleLines.length - 1 && (
                      <span className="loading-cursor ml-1">▋</span>
                    )}
                  </motion.p>
                ))}
              </AnimatePresence>

              {/* Progress bar */}
              <motion.div
                className="mt-6 h-0.5 rounded-full overflow-hidden"
                style={{ background: "rgba(34,211,238,0.15)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #22d3ee, #2563eb)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: TOTAL_DURATION / 1000 - 0.1, ease: "linear" }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
