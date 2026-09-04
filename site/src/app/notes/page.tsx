import type { Metadata } from "next";
import Link from "next/link";
import { notes } from "@/lib/notes";
import Contact from "@/components/Contact";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Notes", description: "Essays on first principles, neuroscience, agents and being a polymath in progress." };

export default function NotesPage() {
  return (
    <>
      <section className="px-5 pb-16 pt-32 md:px-8 md:pt-44">
        <Reveal>
          <p className="eyebrow mb-4">Notes</p>
          <h1 className="display-lg max-w-[16ch]">
            Short essays, written to <span className="serif-accent text-lime">find out</span> what I think.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/70">
            On first principles, neuroscience, agents, and the case for range. Most of these are drafts. That is the point.
          </p>
        </Reveal>
        <ol className="mt-16 divide-y divide-line border-y border-line">
          {notes.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.06}>
              <li>
                <Link href={`/notes/${n.slug}`} data-cursor="view" className="group grid gap-3 py-8 md:grid-cols-12 md:gap-8">
                  <span className="font-mono text-xs text-mute md:col-span-2">{n.date}</span>
                  <div className="md:col-span-8">
                    <h2 className="serif-accent text-3xl leading-[1.05] text-paper transition-colors group-hover:text-lime md:text-5xl">{n.title}</h2>
                    <p className="mt-3 max-w-2xl text-base text-paper/60">{n.dek}</p>
                  </div>
                  <span className="font-mono text-xs text-mute md:col-span-2 md:text-right">
                    {n.status === "draft" ? "draft · " : ""}{n.readingTime}
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
      <Contact />
    </>
  );
}
