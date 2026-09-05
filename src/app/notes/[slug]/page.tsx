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
    <article className="wrap px-5 pb-24 pt-32 md:px-8 md:pt-44">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Link href="/notes" className="text-sm text-paper/60 transition-colors hover:text-paper">← All notes</Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] text-mute">
            <span>{note.date}</span>
            <span>·</span>
            <span>{note.readingTime}</span>
            {note.status === "draft" && (
              <>
                <span>·</span>
                <span className="rounded-full border border-line px-1.5 py-0.5 text-[10px] font-medium uppercase text-paper/70">draft</span>
              </>
            )}
          </div>
          <h1 className="display-xl mt-5 text-paper">{note.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-paper/65">{note.dek}</p>
        </Reveal>

        <Reveal delay={0.15} className="prose-note mt-12 border-t border-line pt-10 text-[1.02rem] leading-[1.75] text-paper/85">
          {note.body.map((b, i) => {
            if (b.startsWith("## ")) return <h2 key={i}>{b.slice(3)}</h2>;
            if (b.startsWith("> ")) return <blockquote key={i}>{b.slice(2)}</blockquote>;
            return <p key={i}>{b}</p>;
          })}
        </Reveal>

        <div className="mt-20 border-t border-line pt-8">
          <p className="kicker mb-2">next</p>
          <Link href={`/notes/${next.slug}`} className="font-serif text-2xl text-paper transition-colors hover:text-lime md:text-3xl">
            {next.title} →
          </Link>
        </div>
      </div>
    </article>
  );
}
