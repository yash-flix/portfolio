"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { mind, principles } from "@/lib/data";
import Mark from "./Mark";
import { Reveal } from "./motion";

const C = 320;
const HUB_R = 132;
const LEAF_R = 118;
const SPREAD = 26;

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

export default function Mind() {
  const [active, setActive] = useState<string>(mind[0].id);
  const [item, setItem] = useState<{ group: string; label: string; blurb: string } | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover) return;
    const id = setInterval(() => {
      setActive((cur) => {
        const i = mind.findIndex((g) => g.id === cur);
        return mind[(i + 1) % mind.length].id;
      });
      setItem(null);
    }, 2600);
    return () => clearInterval(id);
  }, [hover]);

  const layout = useMemo(
    () =>
      mind.map((g) => {
        const hub = polar(C, C, HUB_R, g.angle);
        const n = g.items.length;
        const leaves = g.items.map((it, k) => {
          const ang = g.angle + (k - (n - 1) / 2) * SPREAD;
          return { ...it, ...polar(hub.x, hub.y, LEAF_R, ang), ang };
        });
        return { ...g, hub, leaves };
      }),
    [],
  );

  const activeGroup = mind.find((g) => g.id === active)!;

  return (
    <section id="mind" className="wrap scroll-mt-24 px-5 py-20 md:px-8 md:py-24">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="kicker mb-3">mind</p>
            <h2 className="display-lg">
              A polymath <Mark kind="underline" tail=".">in progress</Mark>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/65">
              Engineer by training, reader by habit, athlete by necessity. I am curious about how brains work,
              how people decide, and how to build machines that do both a little better. The graph on the right
              is the honest map.
            </p>
          </Reveal>

          <ol className="mt-10 divide-y divide-line border-y border-line">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.05}>
                <li className="group grid gap-2 py-4 md:grid-cols-12">
                  <span className="font-mono text-xs text-lime md:col-span-2">{p.n}</span>
                  <div className="md:col-span-10">
                    <p className="text-[15px] font-medium tracking-tight text-paper">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-paper/60 transition-colors group-hover:text-paper/80">
                      {p.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div
            className="card relative p-4 md:p-6"
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => {
              setHover(false);
              setItem(null);
            }}
          >
            <div className="absolute left-5 top-5 flex gap-2 md:left-8 md:top-8">
              {mind.map((g) => (
                <button
                  key={g.id}
                  onPointerEnter={() => setActive(g.id)}
                  onClick={() => setActive(g.id)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                    active === g.id ? "border-lime bg-lime text-ink" : "border-line text-paper/70 hover:border-paper/40"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            <svg viewBox={`0 0 ${C * 2} ${C * 2}`} className="mx-auto mt-10 block w-full max-w-[640px]" role="img" aria-label="A graph of Yash's interests">
              <defs>
                <clipPath id="avatar-clip">
                  <circle cx={C} cy={C} r={46} />
                </clipPath>
                <filter id="lime-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* orbit rings */}
              <circle cx={C} cy={C} r={HUB_R} fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 6" />
              <circle cx={C} cy={C} r={HUB_R + LEAF_R} fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 8" />

              {layout.map((g) => {
                const on = g.id === active;
                return (
                  <g key={g.id} onPointerEnter={() => setActive(g.id)}>
                    <motion.line
                      x1={C} y1={C} x2={g.hub.x} y2={g.hub.y}
                      stroke={on ? "#c6ff3d" : "rgba(255,255,255,0.14)"}
                      strokeWidth={on ? 1.5 : 1}
                      animate={{ opacity: on ? 1 : 0.6 }}
                    />
                    {g.leaves.map((l) => (
                      <motion.line
                        key={l.label}
                        x1={g.hub.x} y1={g.hub.y} x2={l.x} y2={l.y}
                        stroke={on ? "#c6ff3d" : "rgba(255,255,255,0.12)"}
                        strokeWidth={1}
                        animate={{ opacity: on ? 0.9 : 0.5 }}
                      />
                    ))}
                    {/* hub */}
                    <motion.circle
                      cx={g.hub.x} cy={g.hub.y} r={on ? 7 : 5}
                      fill={on ? "#c6ff3d" : "#f2f2f0"}
                      filter={on ? "url(#lime-glow)" : undefined}
                      animate={{ scale: on ? [1, 1.25, 1] : 1 }}
                      transition={{ duration: 1.6, repeat: on ? Infinity : 0 }}
                      style={{ transformOrigin: `${g.hub.x}px ${g.hub.y}px` }}
                    />
                    <text
                      x={g.hub.x} y={g.hub.y - 14}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize={12}
                      fill={on ? "#c6ff3d" : "#f2f2f0"}
                      style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
                    >
                      {g.label.toUpperCase()}
                    </text>
                    {/* leaves */}
                    {g.leaves.map((l) => {
                      const right = Math.cos((l.ang * Math.PI) / 180) >= 0;
                      const isItem = item?.label === l.label;
                      return (
                        <g
                          key={l.label}
                          className="cursor-pointer"
                          onPointerEnter={() => {
                            setActive(g.id);
                            setItem({ group: g.label, label: l.label, blurb: l.blurb });
                          }}
                        >
                          <circle cx={l.x} cy={l.y} r={14} fill="transparent" />
                          <motion.circle
                            cx={l.x} cy={l.y}
                            r={isItem ? 5 : 3.5}
                            fill={on ? (isItem ? "#c6ff3d" : "#f2f2f0") : "rgba(242,242,240,0.55)"}
                          />
                          <text
                            x={l.x + (right ? 10 : -10)} y={l.y + 4}
                            textAnchor={right ? "start" : "end"}
                            fontSize={11.5}
                            fill={on ? (isItem ? "#c6ff3d" : "rgba(242,242,240,0.9)") : "rgba(242,242,240,0.45)"}
                            className="font-display"
                          >
                            {l.label}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}

              {/* center avatar */}
              <circle cx={C} cy={C} r={50} fill="#070707" stroke="#c6ff3d" strokeWidth={1.5} />
              <foreignObject x={C - 46} y={C - 46} width={92} height={92} clipPath="url(#avatar-clip)">
                <Image src="/avatar.png" alt="Yash Rane" width={92} height={92} className="h-full w-full rounded-full object-cover grayscale contrast-125" />
              </foreignObject>
            </svg>

            <div className="mt-4 min-h-[76px] rounded-xl border border-line bg-ink p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item ? item.label : active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="mb-1 text-[11px] text-mute">{item ? `${item.group} · ${item.label}` : activeGroup.label}</p>
                  <p className="text-sm leading-relaxed text-paper/85">
                    {item ? item.blurb : `${activeGroup.items.map((i) => i.label).join(" · ")}. Hover a node.`}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
