import Link from "next/link";
import { notes } from "@/lib/notes";
import Mark from "./Mark";
import { Reveal } from "./motion";

export default function NotesPreview() {
  return (
    <section id="notes" className="wrap scroll-mt-24 px-5 py-20 md:px-8">
      <Reveal className="mb-8 flex items-end justify-between">
        <div>
          <p className="kicker mb-3">notes</p>
          <h2 className="display-lg">
            Writing is how I <Mark kind="marker" tail=".">check my thinking</Mark>
          </h2>
        </div>
        <Link href="/notes" className="hidden whitespace-nowrap text-sm font-medium text-paper/70 underline decoration-line underline-offset-2 transition-colors hover:text-paper hover:decoration-paper/50 md:block">
          view all notes
        </Link>
      </Reveal>

      <div className="grid gap-3 md:grid-cols-3">
        {notes.map((n, i) => (
          <Reveal key={n.slug} delay={i * 0.08} className="card transition-colors hover:border-paper/20">
            <Link href={`/notes/${n.slug}`} className="group flex h-full flex-col p-5">
              <div className="mb-8 flex items-center justify-between text-[11px] text-mute">
                <span>0{i + 1}</span>
                <span className="flex items-center gap-3">
                  {n.status === "draft" && <span className="rounded-full border border-line px-1.5 py-0.5 text-[10px] font-medium uppercase text-paper/60">draft</span>}
                  {n.readingTime}
                </span>
              </div>
              <h3 className="font-serif text-2xl leading-[1.1] text-paper md:text-[1.7rem]">{n.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/60">{n.dek}</p>
              <p className="mt-auto border-t border-line pt-3 text-[11px] text-mute">{n.date}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
