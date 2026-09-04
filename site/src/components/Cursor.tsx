"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.2 });
  const [mode, setMode] = useState<"dot" | "link" | "view">("dot");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const hit = t?.closest("[data-cursor]") as HTMLElement | null;
      if (hit) setMode((hit.dataset.cursor as "link" | "view") || "link");
      else if (t?.closest("a, button")) setMode("link");
      else setMode("dot");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === "dot" ? 10 : mode === "link" ? 44 : 84;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-paper"
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {mode === "view" && <span className="font-mono text-[10px] uppercase tracking-widest text-ink">open</span>}
      </motion.div>
    </motion.div>
  );
}
