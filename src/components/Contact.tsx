import Image from "next/image";
import { site, socials } from "@/lib/data";
import Clock from "./Clock";
import { Magnetic, Reveal } from "./motion";

export default function Contact() {
  return (
    <footer id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line px-5 pb-10 pt-24 md:px-8 md:pt-32">
      <div className="glow left-1/2 top-0 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 opacity-70" />

      <Reveal className="relative">
        <div className="mb-8 flex items-center gap-4">
          <Image src="/avatar.png" alt="Yash Rane" width={48} height={48} className="h-12 w-12 rounded-full border border-line grayscale" />
          <div>
            <p className="eyebrow">Get in touch</p>
            <p className="text-sm text-paper/70">Internships, collaborations, or a good argument about agents.</p>
          </div>
        </div>
        <h2 className="display-xl max-w-[12ch]">
          Let’s build something that <span className="serif-accent text-lime">actually</span> ships.
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="relative mt-12">
        <Magnetic strength={0.2}>
          <a
            href={`mailto:${site.email}`}
            data-cursor="link"
            className="inline-block break-all text-[clamp(1.2rem,3.6vw,3rem)] font-semibold tracking-tight text-paper underline decoration-line decoration-1 underline-offset-[10px] transition-colors hover:text-lime hover:decoration-lime"
          >
            {site.email}
          </a>
        </Magnetic>
      </Reveal>

      <Reveal delay={0.25} className="relative mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex flex-col gap-6 bg-ink p-6 transition-colors hover:bg-ink-2"
          >
            <span className="eyebrow group-hover:!text-lime">{s.label}</span>
            <span className="flex items-center justify-between font-mono text-sm text-paper/85">
              {s.handle}
              <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </span>
          </a>
        ))}
      </Reveal>

      <div className="relative mt-20 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-widest text-mute md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name} · {site.location}</p>
        <Clock />
        <p>
          <a href="/Yash_Rane_Resume.pdf" target="_blank" rel="noreferrer" className="hover:text-lime">Résumé</a>
          <span className="mx-3">·</span>
          <span className="serif-accent normal-case tracking-normal text-paper/80 text-sm">{site.motto}</span>
        </p>
      </div>
    </footer>
  );
}
