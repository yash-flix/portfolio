"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Magnetic, Reveal, Scramble, Words } from "./motion";
import { useIntroDelay } from "./Intro";

export default function Hero() {
  const d = useIntroDelay();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-10 pt-28 md:px-8 md:pt-36">
      <div className="glow -left-40 top-10 h-[60vh] w-[60vh]" />
      <div className="glow right-[-20vh] bottom-[-10vh] h-[50vh] w-[50vh] opacity-60" />

      <motion.div style={{ y, opacity }} className="relative">
        <p className="eyebrow mb-8 md:mb-12">
          <Scramble text="Yash Rane — AI engineer · business ops · Mumbai" delay={d * 1000} />
        </p>

        <h1 className="display-xl max-w-[14ch] text-paper">
          <Words delay={d} words={[{ text: "I" }, { text: "build" }, { text: "AI" }, { text: "agents" }]} />
          <br />
          <Words
            delay={d + 0.25}
            words={[{ text: "that" }, { text: "actually", accent: true }, { text: "ship." }]}
          />
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <Reveal delay={d + 0.6} className="md:col-span-6 lg:col-span-5">
            <p className="max-w-xl text-lg leading-relaxed text-paper/75 md:text-xl">
              Fourth-year B.Tech AI &amp; Data Science student in Mumbai. I build RAG pipelines, multi-agent systems
              and the full-stack products around them, from first principles, and put them in front of real
              users on AWS. Right now: agents that have warmed 250+ real-estate leads.
            </p>
          </Reveal>

          <Reveal delay={d + 0.75} className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7">
            <Magnetic>
              <Link
                href="/#work"
                data-cursor="link"
                className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-medium text-ink transition-transform hover:scale-[1.03]"
              >
                See the work <span aria-hidden>↓</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/notes"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-paper transition-colors hover:border-paper"
              >
                Read the notes
              </Link>
            </Magnetic>
            <a
              href="/Yash_Rane_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="eyebrow !text-paper/60 underline-offset-4 hover:!text-lime hover:underline"
            >
              Résumé ↗
            </a>
          </Reveal>
        </div>
      </motion.div>

      <Reveal delay={d + 1} className="relative mt-16 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
        <Meta k="Currently" v="AI Engineer & Business Operations, Internovo Ventures" />
        <Meta k="Studying" v="B.Tech AI & Data Science, VCET · class of 2027" />
        <Meta k="Motto" v="Life rewards action." accent />
      </Reveal>
    </section>
  );
}

function Meta({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div>
      <p className="eyebrow mb-2">{k}</p>
      <p className={`text-sm md:text-base ${accent ? "serif-accent text-lime text-lg md:text-xl" : "text-paper/85"}`}>{v}</p>
    </div>
  );
}
