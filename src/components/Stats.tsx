import { stats } from "@/lib/data";
import { Counter, Reveal } from "./motion";

const icons = [
  <path key="a" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-3v3l2 2" />,
  <path key="b" d="M4 20 10 8l4 8 6-12" />,
  <path key="c" d="M4 18 20 6M4 6h16v12" />,
  <path key="d" d="M4 6h16M4 12h16M4 18h10" />,
  <path key="e" d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />,
  <path key="f" d="M4 5h16v14H4zM4 10h16" />,
];

export default function Stats() {
  return (
    <section id="stats" className="wrap px-5 pb-12 pt-4 md:px-8">
      <Reveal>
        <p className="kicker mb-5">numbers I can defend</p>
      </Reveal>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05} className="card flex flex-col p-4">
            <div className="mb-6 flex items-start justify-between gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-line text-paper/60">
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {icons[i % icons.length]}
                </svg>
              </span>
              <span className="text-[11px] text-mute">{s.sub}</span>
            </div>
            <div className="mt-auto border-t border-line pt-3">
              <p className="font-serif text-3xl leading-none text-paper tabular-nums">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-xs text-paper/60">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
