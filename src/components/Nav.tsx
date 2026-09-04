"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Clock from "./Clock";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#mind", label: "Mind" },
  { href: "/notes", label: "Notes" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div className="h-px origin-left bg-lime" style={{ scaleX: progress }} />
      <div
        className={`flex items-center justify-between px-5 py-4 transition-colors duration-500 md:px-8 ${
          scrolled ? "bg-ink/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2 font-mono text-sm tracking-tight">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          <span className="text-paper">yash</span>
          <span className="text-mute transition-colors group-hover:text-lime">.rane</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="eyebrow !text-paper/70 transition-colors hover:!text-lime">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Clock className="hidden text-xs text-paper/80 sm:inline" />
          <a
            href="mailto:yash.tushar13@gmail.com"
            className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-paper transition-colors hover:border-lime hover:text-lime"
          >
            Open to work
          </a>
        </div>
      </div>
    </header>
  );
}
