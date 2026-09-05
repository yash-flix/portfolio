"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Clock from "./Clock";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#mind", label: "Mind" },
  { href: "/notes", label: "Notes" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/notes" ? pathname.startsWith("/notes") : false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="wrap relative flex items-center justify-between px-5 py-3.5 md:px-8">
        <Link href="/" className="text-[15px] font-medium tracking-tighter text-paper">
          Yash Rane
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-line bg-ink-2/90 p-1 pl-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.4)] md:flex"
          onPointerLeave={() => setHovered(null)}
        >
          <Link href="/" className="group/avatar mr-1 flex items-center gap-2 pr-1" aria-label="Home">
            <span className="relative flex size-6 items-center justify-center">
              <Image src="/avatar.png" alt="" width={24} height={24} className="size-6 rounded-full border border-line object-cover" />
              <span className="absolute -bottom-px -right-px size-2 rounded-full border-2 border-ink-2 bg-lime" />
            </span>
          </Link>
          {links.map((l) => {
            const on = hovered === l.href || (hovered === null && isActive(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                onPointerEnter={() => setHovered(l.href)}
                onFocus={() => setHovered(l.href)}
                className="relative rounded-full px-3 py-1 text-[13px] text-paper/70 transition-colors hover:text-paper"
              >
                <AnimatePresence>
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-paper/[0.08]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Clock className="hidden text-[11px] text-paper/60 sm:inline" />
          <a
            href="https://github.com/yash-flix"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-8 items-center overflow-hidden rounded-lg border border-line bg-ink-2 transition-colors hover:border-paper/25 hover:bg-ink-3"
          >
            <span className="flex items-center gap-1.5 px-2.5 text-xs font-medium text-paper/85">
              <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              GitHub
            </span>
            <span className="h-4 w-px bg-line" />
            <span className="flex min-w-9 items-center justify-center px-2 font-mono text-xs text-paper/55 tabular-nums">46</span>
          </a>
          <a
            href="https://www.linkedin.com/messaging/compose/?to=yash-rane1308"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-8 items-center rounded-lg bg-lime px-3 text-xs font-medium text-ink transition-colors hover:bg-[#d4ff66] sm:inline-flex"
          >
            Open to ship
          </a>
        </div>
      </div>
    </header>
  );
}

