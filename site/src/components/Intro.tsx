"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const INTRO_MS = 1700;

export default function Intro() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("intro-seen")) return;
    } catch {}
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {}
    }, INTRO_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            className="serif-accent px-6 text-center text-[clamp(2rem,7vw,5.5rem)] leading-none"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Life rewards <span className="text-lime">action.</span>
          </motion.p>
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-lime"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: INTRO_MS / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Seconds the page content should wait before animating in, on a first visit. */
export function useIntroDelay() {
  const [delay] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      if (sessionStorage.getItem("intro-seen")) return 0;
    } catch {}
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
    return INTRO_MS / 1000 + 0.3;
  });
  return delay;
}
