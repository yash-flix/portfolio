"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/lib/data";
import { Reveal } from "./motion";

export default function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section id="path" className="px-5 py-24 md:px-8">
      <Reveal className="mb-12">
        <p className="eyebrow mb-4">Path</p>
        <h2 className="display-lg">
          Where the <span className="serif-accent text-lime">action</span> has been.
        </h2>
      </Reveal>

      <ol ref={ref} className="relative ml-2 border-l border-line pl-8 md:ml-6 md:pl-14">
        <motion.span className="absolute -left-px top-0 h-full w-px origin-top bg-lime" style={{ scaleY }} />
        {timeline.map((t, i) => (
          <Reveal key={t.year + t.title} delay={i * 0.04}>
            <li className="relative grid gap-2 pb-12 md:grid-cols-12 md:gap-8">
              <span className="absolute -left-[2.6rem] top-1.5 h-2 w-2 rounded-full bg-paper md:-left-[4.1rem]" />
              <span className="font-mono text-sm text-lime md:col-span-2">{t.year}</span>
              <div className="md:col-span-10">
                <p className="text-xl font-semibold tracking-tight text-paper md:text-2xl">{t.title}</p>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-paper/60">{t.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
