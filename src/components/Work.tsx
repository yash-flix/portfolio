"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import Mark from "./Mark";
import { Reveal } from "./motion";

export default function Work() {
  return (
    <section id="work" className="wrap scroll-mt-24 px-5 pb-24 pt-16 md:px-8 md:pt-24">
      <Reveal className="mb-8 max-w-2xl">
        <p className="kicker mb-3">selected work</p>
        <h2 className="display-lg">
          Systems that <Mark kind="marker" tail=".">left the notebook</Mark>
        </h2>
        <p className="mt-4 max-w-xl text-base text-paper/65">
          Agents, retrieval and the product around them. Each one was used by someone other than me.
        </p>
      </Reveal>

      <div className="flex flex-col gap-3">
        {projects.map((p) => (
          <Card key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}

function Card({ p }: { p: Project }) {
  const inner = (
    <div className="grid gap-8 p-5 md:grid-cols-12 md:p-7">
      <div className="md:col-span-7">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-mute">{p.index}</span>
          <span className="text-xs text-paper/60">{p.kicker}</span>
          {p.badge && (
            <span className="rounded-full border border-lime/30 bg-lime/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-tight text-lime">
              {p.badge}
            </span>
          )}
        </div>
        <h3 className="display-md text-paper">{p.title}</h3>
        <p className="mt-2 font-serif text-xl leading-snug text-paper/80 md:text-2xl">{p.oneLiner}</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/65">{p.description}</p>

        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-4">
          {p.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-serif text-2xl leading-none text-paper tabular-nums">{m.value}</p>
              <p className="mt-1.5 text-[11px] text-mute">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="rounded-md border border-line bg-ink px-2 py-0.5 font-mono text-[11px] text-paper/70">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:col-span-5">
        <Pipeline steps={p.pipeline} />
        <div className="mt-3 flex items-center justify-between px-1">
          <p className="text-[11px] text-mute">pipeline</p>
          {p.href ? (
            <span className="text-xs font-medium text-paper/70 underline decoration-line underline-offset-2 transition-colors group-hover:text-paper group-hover:decoration-paper/50">
              view on GitHub
            </span>
          ) : (
            <span className="text-[11px] text-mute">source private</span>
          )}
        </div>
      </div>
    </div>
  );

  const cls = "card group block transition-colors duration-300 hover:border-paper/20";

  return p.href ? (
    <a href={p.href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <article className={cls}>{inner}</article>
  );
}

function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol className="relative rounded-xl border border-line bg-ink p-4 font-mono text-[13px]">
      {steps.map((s, i) => (
        <motion.li
          key={s}
          className="relative flex items-center gap-3 py-2"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
            {i < steps.length - 1 && <span className="absolute top-4 h-[calc(100%+0.25rem)] w-px bg-line" />}
            <span className={`h-1.5 w-1.5 rounded-full ${i === steps.length - 1 ? "bg-lime" : "bg-paper/40"}`} />
          </span>
          <span className={i === steps.length - 1 ? "text-lime" : "text-paper/75"}>{s}</span>
          <span className="ml-auto text-[10px] text-mute">{String(i + 1).padStart(2, "0")}</span>
        </motion.li>
      ))}
    </ol>
  );
}
