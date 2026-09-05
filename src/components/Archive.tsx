import { archive, site } from "@/lib/data";
import { getContributions } from "@/lib/github";
import Heatmap from "./Heatmap";
import { Reveal } from "./motion";

export default async function Archive() {
  const contributions = await getContributions();
  return (
    <section id="archive" className="wrap scroll-mt-24 px-5 py-20 md:px-8">
      <Reveal className="mb-3 flex items-end justify-between">
        <div>
          <p className="kicker mb-3">archive</p>
          <p className="text-sm text-paper/65">
            {contributions.total > 0 ? (
              <>
                <span className="font-medium text-paper">{contributions.total.toLocaleString("en-IN")} contributions</span> in the last year
                across 46 public repos.
              </>
            ) : (
              "46 public repos, most of them shipped in the open."
            )}
          </p>
        </div>
        <a href={`https://github.com/${site.handle}`} target="_blank" rel="noreferrer" className="hidden whitespace-nowrap text-sm font-medium text-paper/70 underline decoration-line underline-offset-2 transition-colors hover:text-paper hover:decoration-paper/50 md:block">
          view all on GitHub
        </a>
      </Reveal>

      {contributions.days.length > 0 && (
        <Reveal className="card mb-3 overflow-x-auto p-4 md:p-5">
          <div className="min-w-[640px]">
            <Heatmap contributions={contributions} />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-mute">
            <span>github.com/{site.handle}</span>
            <span className="flex items-center gap-1.5">
              less
              {[0, 1, 2, 3, 4].map((l) => (
                <span
                  key={l}
                  className="inline-block size-2.5 rounded-[2px]"
                  style={{ background: l === 0 ? "rgba(242,242,240,0.07)" : "#c6ff3d", opacity: l === 0 ? 1 : [0, 0.3, 0.55, 0.8, 1][l] }}
                />
              ))}
              more
            </span>
          </div>
        </Reveal>
      )}

      <ul className="card scroll-list max-h-[26rem] divide-y divide-line overflow-y-auto">
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
