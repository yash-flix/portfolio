import Link from "next/link";
import { notes } from "@/lib/notes";
import { Reveal } from "./motion";

export default function NotesPreview() {
  return (
    <section id="notes" className="scroll-mt-24 px-5 py-24 md:px-8">
      <Reveal className="mb-12 flex items-end justify-between border-b border-line pb-6">
        <div>
          <p className="eyebrow mb-4">Notes</p>
          <h2 className="display-lg">
            Writing is how I <span className="serif-accent text-lime">check</span> my thinking.
          </h2>
        </div>
        <Link href="/notes" className="hidden whitespace-nowrap font-mono text-sm text-paper/70 hover:text-lime md:block">
          All notes ↗
        </Link>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {notes.map((n, i) => (
          <Reveal key={n.slug} delay={i * 0.08} className="bg-ink">
            <Link href={`/notes/${n.slug}`} data-cursor="view" className="group flex h-full flex-col p-7 transition-colors hover:bg-ink-2">
              <div className="mb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-mute">
                <span>0{i + 1}</span>
                <span className="flex items-center gap-3">
                  {n.status === "draft" && <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-paper/60">draft</span>}
                  {n.readingTime}
                </span>
              </div>
              <h3 className="serif-accent text-3xl leading-[1.05] text-paper transition-colors group-hover:text-lime md:text-[2.1rem]">{n.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/60">{n.dek}</p>
              <p className="mt-auto pt-8 font-mono text-[11px] text-mute">{n.date}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
