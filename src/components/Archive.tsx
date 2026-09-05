import { archive } from "@/lib/data";
import Mark from "./Mark";
import { Reveal } from "./motion";

export default function Archive() {
  return (
    <section id="archive" className="wrap scroll-mt-24 px-5 py-20 md:px-8">
      <Reveal className="mb-6 flex items-end justify-between">
        <div>
          <p className="kicker mb-3">archive</p>
          <h2 className="display-lg">
            46 repos. <Mark kind="marker">These</Mark> are worth opening.
          </h2>
        </div>
        <a href="https://github.com/yash-flix" target="_blank" rel="noreferrer" className="hidden whitespace-nowrap text-sm font-medium text-paper/70 underline decoration-line underline-offset-2 transition-colors hover:text-paper hover:decoration-paper/50 md:block">
          view all on GitHub
        </a>
      </Reveal>

      <ul className="card divide-y divide-line overflow-hidden">
        {archive.map((a, i) => (
          <Reveal key={a.name} delay={Math.min(i, 6) * 0.03}>
            <li>
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="group relative grid items-baseline gap-2 px-4 py-4 transition-colors hover:bg-ink-3 md:grid-cols-12 md:gap-6"
              >
                                <span className="font-mono text-xs text-mute md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] font-medium tracking-tight text-paper md:col-span-3">
                  {a.name}
                </span>
                <span className="text-sm leading-relaxed text-paper/60 md:col-span-5">{a.desc}</span>
                <span className="flex flex-wrap gap-2 md:col-span-2">
                  {a.tags.map((t) => (
                    <span key={t} className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-paper/60">{t}</span>
                  ))}
                </span>
                <span className="font-mono text-xs text-mute md:col-span-1 md:text-right">{a.year}</span>
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
