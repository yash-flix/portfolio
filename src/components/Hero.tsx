"use client";

import Link from "next/link";
import { Reveal } from "./motion";
import { useIntroDelay } from "./Intro";
import Mark from "./Mark";

export default function Hero() {
  const d = useIntroDelay();

  return (
    <section className="wrap px-5 pb-16 pt-32 md:px-8 md:pt-44">
      <Reveal delay={d}>
        <p className="eyebrow mb-6">Yash Rane — AI engineer · business ops · Mumbai</p>

        <h1 className="display-xl max-w-[16ch] text-paper">
          I build AI agents that <Mark kind="underline" tail=".">actually ship</Mark>
        </h1>
      </Reveal>

      <Reveal delay={d + 0.15}>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-paper/70 md:text-[1.05rem]">
          Fourth-year B.Tech AI &amp; Data Science student in Mumbai. I build RAG pipelines, multi-agent systems and the
          full-stack products around them, from first principles, and put them in front of real users on AWS. Right now:
          agents that have warmed <span className="font-medium text-paper">250+ real-estate leads</span>.
        </p>
      </Reveal>

      <Reveal delay={d + 0.3} className="mt-7 flex flex-wrap items-center gap-3">
        <Link
          href="/#work"
          className="group inline-flex h-10 items-center gap-2 rounded-lg bg-lime px-4 text-sm font-medium text-ink transition-colors hover:bg-[#d4ff66]"
        >
          See the work
          <ArrowSwap />
        </Link>
        <Link
          href="/notes"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-ink-2 px-4 text-sm font-medium text-paper transition-colors hover:border-paper/25 hover:bg-ink-3"
        >
          Read the notes
        </Link>
        <a
          href="/Yash_Rane_Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="ml-1 text-sm font-medium text-paper/70 underline decoration-line underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/50"
        >
          Résumé ↗
        </a>
      </Reveal>

      <Reveal delay={d + 0.45} className="mt-16 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
        <Meta k="Currently" v="AI Engineer & Business Operations, Internovo Ventures" />
        <Meta k="Studying" v="B.Tech AI & Data Science, VCET · class of 2027" />
        <Meta k="Motto" v="Life rewards action." accent />
      </Reveal>
    </section>
  );
}

/** Chevron that swaps to an arrow on hover, like a real button should. */
export function ArrowSwap({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex size-3.5 shrink-0 items-center justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="absolute size-3.5 transition-[opacity,transform] duration-500 ease-[var(--ease-smooth)] group-hover:translate-x-0.5 group-hover:scale-95 group-hover:opacity-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
      </svg>
      <svg viewBox="0 0 24 24" className="absolute size-3.5 -translate-x-0.5 scale-95 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-smooth)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
      </svg>
    </span>
  );
}

function Meta({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div>
      <p className="eyebrow mb-1.5">{k}</p>
      <p className={accent ? "serif-accent text-lg text-lime" : "text-sm text-paper/85"}>{v}</p>
    </div>
  );
}
