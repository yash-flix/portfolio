"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { Reveal } from "./motion";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 px-5 pb-24 pt-10 md:px-8">
      <Reveal className="mb-10 flex items-end justify-between border-b border-line pb-6 md:mb-16">
        <div>
          <p className="eyebrow mb-4">Selected work</p>
          <h2 className="display-lg">
            Systems that <span className="serif-accent text-lime">left</span> the notebook.
          </h2>
        </div>
        <p className="hidden font-mono text-sm text-mute md:block">01 — 0{projects.length}</p>
      </Reveal>

      <div className="relative">
        {projects.map((p, i) => (
          <Card key={p.slug} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}

function Card({ p, i }: { p: Project; i: number }) {
  const inner = (
    <div className="grid gap-10 p-6 md:grid-cols-12 md:p-10 lg:p-14">
      <div className="md:col-span-7">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-sm text-lime">{p.index}</span>
          <span className="eyebrow">{p.kicker}</span>
          {p.badge && (
            <span className="rounded-full border border-lime/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-lime">
              {p.badge}
            </span>
          )}
        </div>
        <h3 className="display-md text-paper">{p.title}</h3>
        <p className="serif-accent mt-3 text-2xl text-paper/80 md:text-3xl">{p.oneLiner}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/70 md:text-lg">{p.description}</p>

        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
          {p.metrics.map((m) => (
            <div key={m.label}>
              <p className="text-2xl font-bold tracking-tight text-paper md:text-3xl">{m.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-mute">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-paper/80">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="md:col-span-5">
        <Pipeline steps={p.pipeline} />
        <div className="mt-6 flex items-center justify-between">
          <p className="eyebrow">Pipeline</p>
          {p.href ? (
            <span className="font-mono text-xs text-paper/80 underline-offset-4 group-hover:text-lime group-hover:underline">
              GitHub ↗
            </span>
          ) : (
            <span className="font-mono text-xs text-mute">source private</span>
          )}
        </div>
      </div>
    </div>
  );

  const cls =
    "group sticky mb-8 block overflow-hidden rounded-3xl border border-line transition-colors duration-500 hover:border-paper/25 md:mb-12";
  const style = { top: `calc(5.5rem + ${i * 14}px)`, background: p.tone };

  return p.href ? (
    <a href={p.href} target="_blank" rel="noreferrer" data-cursor="view" className={cls} style={style}>
      {inner}
    </a>
  ) : (
    <article className={cls} style={style}>
      {inner}
    </article>
  );
}

function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol className="relative rounded-2xl border border-line bg-ink/60 p-5 font-mono text-sm">
      {steps.map((s, i) => (
        <motion.li
          key={s}
          className="relative flex items-center gap-4 py-2.5"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            {i < steps.length - 1 && <span className="absolute top-5 h-[calc(100%+0.25rem)] w-px bg-line" />}
            <span className={`h-2 w-2 rounded-full ${i === steps.length - 1 ? "bg-lime" : "bg-paper/50"}`} />
          </span>
          <span className={i === steps.length - 1 ? "text-lime" : "text-paper/80"}>{s}</span>
          <span className="ml-auto text-[10px] text-mute">{String(i + 1).padStart(2, "0")}</span>
        </motion.li>
      ))}
    </ol>
  );
}
