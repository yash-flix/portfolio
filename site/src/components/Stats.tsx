import { stats } from "@/lib/data";
import { Counter, Reveal } from "./motion";

export default function Stats() {
  return (
    <section id="stats" className="px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <p className="eyebrow mb-10">Numbers I can defend</p>
      </Reveal>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="bg-ink p-6 md:p-7">
            <div className="display-md text-paper">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p className="mt-3 text-sm font-medium text-paper/90">{s.label}</p>
            <p className="mt-1 font-mono text-[11px] text-mute">{s.sub}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
