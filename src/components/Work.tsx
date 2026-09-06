"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import {
  projects,
  type ArchEdge,
  type ArchKind,
  type ArchNode,
  type ArchSide,
  type Architecture,
  type Project,
} from "@/lib/data";
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
  const [open, setOpen] = useState(false);
  const panelId = `${useId()}-arch`;
  const subsystems = p.arch.groups?.length ?? 0;

  return (
    <article className="card group p-5 transition-colors duration-300 hover:border-paper/20 md:p-7">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs text-mute">{p.index}</span>
        <span className="text-xs text-paper/60">{p.kicker}</span>
        {p.badge && (
          <span className="rounded-full border border-lime/30 bg-lime/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-tight text-lime">
            {p.badge}
          </span>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <h3 className="display-md text-paper">{p.title}</h3>
          <p className="mt-2 font-serif text-xl leading-snug text-paper/80 md:text-2xl">{p.oneLiner}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/65">
            <Rich text={p.description} />
          </p>

          <ul className="mt-4 max-w-xl space-y-2">
            {p.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-paper/65">
                <span aria-hidden className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-lime/70" />
                <span>
                  <Rich text={b} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col md:col-span-5">
          <div className="grid grid-cols-3 gap-4 border-t border-line pt-4 md:border-t-0 md:pt-0">
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

          <div className="mt-auto pt-5">
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-paper/70 underline decoration-line underline-offset-2 transition-colors hover:text-paper hover:decoration-paper/50"
              >
                view on GitHub ↗
              </a>
            ) : (
              <span className="text-[11px] text-mute">source private</span>
            )}
          </div>
        </div>
      </div>

      {/* thumbnail of the real diagram, then the diagram itself on demand */}
      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="shrink-0 overflow-hidden rounded-lg border border-line bg-ink p-1.5 transition-colors hover:border-lime/40"
        >
          <span className="sr-only">{open ? "Hide" : "View"} the architecture diagram</span>
          <ArchDiagram a={p.arch} id={p.slug} title={`${p.title} architecture`} mini />
        </button>

        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-wide text-mute">system architecture</p>
          <p className="mt-1 text-[11px] text-paper/55">
            {p.arch.nodes.length} components
            {subsystems > 0 && ` · ${subsystems} subsystem${subsystems > 1 ? "s" : ""}`} · {p.arch.edges.length} flows
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex shrink-0 items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-paper/75 transition-colors hover:border-lime/40 hover:text-lime"
        >
          {open ? "Hide architecture" : "View architecture"}
          <motion.span
            aria-hidden
            className="text-[10px] leading-none"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            &#9662;
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="arch"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pt-5">
              <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[10px] text-mute">
                <Key className="border-lime/40 bg-lime/10">compute</Key>
                <Key className="border-dashed border-paper/25">state</Key>
                <Key className="border-line bg-ink-3">system edge</Key>
              </div>
              <div className="overflow-x-auto rounded-xl border border-line bg-ink p-3">
                <ArchDiagram a={p.arch} id={p.slug} title={`${p.title} — system architecture`} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function Key({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2.5 w-4 rounded-[3px] border ${className}`} />
      {children}
    </span>
  );
}

/* ── architecture diagram ────────────────────────────────────────────────── */

const NODE_H = 56;

const FILL: Record<ArchKind, string> = {
  io: "var(--color-ink-3)",
  core: "rgba(198, 255, 61, 0.09)",
  store: "var(--color-ink-2)",
};
const STROKE: Record<ArchKind, string> = {
  io: "rgba(255, 255, 255, 0.14)",
  core: "rgba(198, 255, 61, 0.42)",
  store: "rgba(242, 242, 240, 0.24)",
};
const TEXT: Record<ArchKind, string> = {
  io: "rgba(242, 242, 240, 0.82)",
  core: "var(--color-lime)",
  store: "rgba(242, 242, 240, 0.68)",
};

const EDGE = "rgba(242, 242, 240, 0.3)";
const EDGE_DASH = "rgba(198, 255, 61, 0.45)";

type Pt = [number, number];

function anchor(n: ArchNode, side: ArchSide): Pt {
  if (side === "l") return [n.x, n.y + NODE_H / 2];
  if (side === "r") return [n.x + n.w, n.y + NODE_H / 2];
  if (side === "t") return [n.x + n.w / 2, n.y];
  return [n.x + n.w / 2, n.y + NODE_H];
}

/** Which box edges an unrouted arrow should leave from and land on. */
function defaultSides(a: ArchNode, b: ArchNode): [ArchSide, ArchSide] {
  if (b.x >= a.x + a.w) return ["r", "l"];
  if (a.x >= b.x + b.w) return ["l", "r"];
  return b.y > a.y ? ["b", "t"] : ["t", "b"];
}

/** Orthogonal route: straight where the boxes line up, one dogleg where they don't. */
function route(a: ArchNode, b: ArchNode, e: ArchEdge): Pt[] {
  const [da, db] = defaultSides(a, b);
  const fromSide = e.fromSide ?? da;
  const p0 = anchor(a, fromSide);
  const p1 = anchor(b, e.toSide ?? db);
  if (e.via) return [p0, ...e.via, p1];

  if (fromSide === "l" || fromSide === "r") {
    if (Math.abs(p0[1] - p1[1]) < 2) return [p0, p1];
    const mx = (p0[0] + p1[0]) / 2;
    return [p0, [mx, p0[1]], [mx, p1[1]], p1];
  }
  if (Math.abs(p0[0] - p1[0]) < 2) return [p0, p1];
  const my = (p0[1] + p1[1]) / 2;
  return [p0, [p0[0], my], [p1[0], my], p1];
}

/** `mini` draws the same geometry with the type stripped out and the strokes
 *  fattened, so it still reads as this system's shape at thumbnail size. */
function ArchDiagram({
  a,
  id,
  title,
  mini = false,
}: {
  a: Architecture;
  id: string;
  title: string;
  mini?: boolean;
}) {
  const byId: Record<string, ArchNode> = Object.fromEntries(a.nodes.map((n) => [n.id, n]));
  const railY = a.h - 40;

  if (mini) {
    return (
      <svg viewBox={`0 0 ${a.w} ${a.h}`} className="block h-auto w-[178px]" role="img" aria-label={`${title} preview`}>
        {a.groups?.map((g) => (
          <rect
            key={g.label}
            x={g.x}
            y={g.y}
            width={g.w}
            height={g.h}
            rx="12"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="4"
            strokeDasharray="14 10"
          />
        ))}
        {a.edges.map((e, i) => {
          const from = byId[e.from];
          const to = byId[e.to];
          if (!from || !to) return null;
          const pts = route(from, to, e);
          return (
            <path
              key={`${e.from}-${e.to}-${i}`}
              d={pts.map(([x, y], j) => `${j === 0 ? "M" : "L"}${x},${y}`).join(" ")}
              fill="none"
              stroke={e.dashed ? EDGE_DASH : EDGE}
              strokeWidth="4"
              strokeDasharray={e.dashed ? "12 10" : undefined}
            />
          );
        })}
        {a.nodes.map((n) => {
          const kind = n.kind ?? "io";
          return (
            <rect
              key={n.id}
              x={n.x}
              y={n.y}
              width={n.w}
              height={NODE_H}
              rx="10"
              fill={FILL[kind]}
              stroke={STROKE[kind]}
              strokeWidth="5"
              strokeDasharray={kind === "store" ? "14 9" : undefined}
            />
          );
        })}
      </svg>
    );
  }

  return (
    <svg viewBox={`0 0 ${a.w} ${a.h}`} className="block h-auto w-full min-w-[820px]" role="img" aria-label={title}>
      <title>{title}</title>
      <defs>
        <marker id={`ah-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,1 L9,5 L0,9 z" fill={EDGE} />
        </marker>
        <marker id={`ahd-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,1 L9,5 L0,9 z" fill={EDGE_DASH} />
        </marker>
      </defs>

      {/* subsystem boundaries, drawn behind everything */}
      {a.groups?.map((g) => (
        <g key={g.label}>
          <rect x={g.x} y={g.y} width={g.w} height={g.h} rx="12" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.1)" strokeDasharray="5 4" />
          <text x={g.x + 12} y={g.y + 15} fontFamily="var(--font-geist-mono)" fontSize="9" letterSpacing="0.06em" fill="var(--color-mute)">
            {g.label.toUpperCase()}
          </text>
        </g>
      ))}

      {a.edges.map((e, i) => {
        const from = byId[e.from];
        const to = byId[e.to];
        if (!from || !to) return null;
        const pts = route(from, to, e);
        const d = pts.map(([x, y], j) => `${j === 0 ? "M" : "L"}${x},${y}`).join(" ");
        const head = e.dashed ? `ahd-${id}` : `ah-${id}`;
        const m = Math.floor(pts.length / 2);
        const at = e.labelAt ?? [(pts[m][0] + pts[m - 1][0]) / 2, (pts[m][1] + pts[m - 1][1]) / 2 - 6];

        return (
          <motion.g
            key={`${e.from}-${e.to}-${i}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ delay: 0.25 + i * 0.04, duration: 0.5 }}
          >
            <path
              d={d}
              fill="none"
              stroke={e.dashed ? EDGE_DASH : EDGE}
              strokeWidth="1.3"
              strokeDasharray={e.dashed ? "4 4" : undefined}
              markerEnd={`url(#${head})`}
              markerStart={e.bothWays ? `url(#${head})` : undefined}
            />
            {e.label && (
              <text
                x={at[0]}
                y={at[1]}
                textAnchor="middle"
                fontFamily="var(--font-geist-mono)"
                fontSize="9.5"
                fill={e.dashed ? "rgba(198,255,61,0.72)" : "var(--color-mute)"}
                stroke="var(--color-ink)"
                strokeWidth="4"
                paintOrder="stroke"
              >
                {e.label}
              </text>
            )}
          </motion.g>
        );
      })}

      {a.nodes.map((n, i) => {
        const kind = n.kind ?? "io";
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ delay: 0.06 + i * 0.035, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={NODE_H}
              rx="8"
              fill={FILL[kind]}
              stroke={STROKE[kind]}
              strokeWidth="1"
              strokeDasharray={kind === "store" ? "5 3" : undefined}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + (n.note ? 24 : 33)}
              textAnchor="middle"
              fontFamily="var(--font-geist)"
              fontSize="12.5"
              fontWeight="500"
              fill={TEXT[kind]}
            >
              {n.label}
            </text>
            {n.note && (
              <text x={n.x + n.w / 2} y={n.y + 39} textAnchor="middle" fontFamily="var(--font-geist-mono)" fontSize="9.5" fill="var(--color-mute)">
                {n.note}
              </text>
            )}
          </motion.g>
        );
      })}

      {a.rail && (
        <g>
          <rect x="0" y={railY} width={a.w} height="34" rx="8" fill="none" stroke="rgba(255,255,255,0.1)" strokeDasharray="5 4" />
          <text x="14" y={railY + 21} fontFamily="var(--font-geist-mono)" fontSize="9.5" fill="var(--color-mute)">
            <tspan letterSpacing="0.06em">CROSS-CUTTING · </tspan>
            <tspan fill="rgba(242,242,240,0.6)">{a.rail}</tspan>
          </text>
        </g>
      )}
    </svg>
  );
}

/* ── inline copy marks ───────────────────────────────────────────────────── */

/** Marks up body copy the way you'd annotate it by hand: `**phrase**` gets the
 *  sketch underline, `==number==` gets the highlighter swipe. Small-type
 *  counterparts to <Mark kind="underline"> and <Mark kind="marker">. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).map((part, i) => {
        if (part.startsWith("**")) {
          return (
            <strong key={i} className="hl">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("==")) {
          return (
            <strong key={i} className="hl-n">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}
