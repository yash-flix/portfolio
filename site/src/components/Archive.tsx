import { archive } from "@/lib/data";
import { Reveal } from "./motion";

export default function Archive() {
  return (
    <section id="archive" className="scroll-mt-24 px-5 py-24 md:px-8">
      <Reveal className="mb-10 flex items-end justify-between border-b border-line pb-6">
        <div>
          <p className="eyebrow mb-4">Archive</p>
          <h2 className="display-lg">
            46 repos. <span className="serif-accent text-lime">These</span> are worth opening.
          </h2>
        </div>
        <a href="https://github.com/yash-flix" target="_blank" rel="noreferrer" className="hidden whitespace-nowrap font-mono text-sm text-paper/70 hover:text-lime md:block">
          github.com/yash-flix ↗
        </a>
      </Reveal>

      <ul className="divide-y divide-line border-b border-line">
        {archive.map((a, i) => (
          <Reveal key={a.name} delay={Math.min(i, 6) * 0.03}>
            <li>
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                className="group relative grid items-baseline gap-2 py-5 pl-5 transition-colors hover:bg-ink-2 md:grid-cols-12 md:gap-6"
              >
                <span className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-lime transition-transform duration-300 group-hover:scale-y-100" />
                <span className="font-mono text-xs text-mute md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xl font-semibold tracking-tight text-paper transition-transform duration-300 group-hover:translate-x-1 md:col-span-3">
                  {a.name}
                </span>
                <span className="text-sm leading-relaxed text-paper/60 md:col-span-5">{a.desc}</span>
                <span className="flex flex-wrap gap-2 md:col-span-2">
                  {a.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase tracking-wider text-paper/50">{t}</span>
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
