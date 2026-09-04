import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNote, notes } from "@/lib/notes";
import { Reveal } from "@/components/motion";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  return { title: note.title, description: note.dek };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const idx = notes.findIndex((n) => n.slug === slug);
  const next = notes[(idx + 1) % notes.length];

  return (
    <article className="px-5 pb-24 pt-32 md:px-8 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link href="/notes" className="eyebrow hover:!text-lime">← All notes</Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-mute">
            <span>{note.date}</span>
            <span>·</span>
            <span>{note.readingTime}</span>
            {note.status === "draft" && (
              <>
                <span>·</span>
                <span className="rounded-full border border-line px-2 py-0.5 text-paper/70">draft</span>
              </>
            )}
          </div>
          <h1 className="serif-accent mt-6 text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-paper">{note.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-paper/65">{note.dek}</p>
        </Reveal>

        <Reveal delay={0.15} className="prose-note mt-14 border-t border-line pt-12 text-[1.08rem] leading-[1.75] text-paper/85">
          {note.body.map((b, i) => {
            if (b.startsWith("## ")) return <h2 key={i}>{b.slice(3)}</h2>;
            if (b.startsWith("> ")) return <blockquote key={i}>{b.slice(2)}</blockquote>;
            return <p key={i}>{b}</p>;
          })}
        </Reveal>

        <div className="mt-20 border-t border-line pt-8">
          <p className="eyebrow mb-3">Next</p>
          <Link href={`/notes/${next.slug}`} className="serif-accent text-3xl text-paper transition-colors hover:text-lime md:text-4xl">
            {next.title} →
          </Link>
        </div>
      </div>
    </article>
  );
}
