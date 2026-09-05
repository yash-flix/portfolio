import Image from "next/image";
import { site, socials } from "@/lib/data";
import Clock from "./Clock";
import Mark from "./Mark";
import { Reveal } from "./motion";

export default function Contact() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-line">
      <div className="wrap px-5 pb-10 pt-20 md:px-8 md:pt-28">
        <Reveal className="mx-auto max-w-xl text-center">
          <Image src="/avatar.png" alt="Yash Rane" width={56} height={56} className="mx-auto mb-6 h-14 w-14 rounded-full border border-line" />
          <h2 className="display-lg">
            Ready when <Mark kind="circle" tail=".">you are</Mark>
          </h2>
          <p className="mt-5 text-base text-paper/65">
            Internships, collaborations, or a good argument about agents. Email is fastest.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-flex h-10 items-center rounded-lg bg-lime px-4 text-sm font-medium text-ink transition-colors hover:bg-[#d4ff66]"
          >
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="card group flex flex-col gap-4 p-4 transition-colors hover:border-paper/20"
            >
              <span className="text-[11px] text-mute">{s.label}</span>
              <span className="flex items-center justify-between truncate text-sm text-paper/85">
                <span className="truncate">{s.handle}</span>
                <span className="ml-2 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper">↗</span>
              </span>
            </a>
          ))}
        </Reveal>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-xs text-mute md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name} · {site.location}</p>
          <Clock />
          <p className="flex items-center gap-3">
            <a href="/Yash_Rane_Resume.pdf" target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">Résumé</a>
            <span>·</span>
            <span className="serif-accent text-sm text-paper/70">{site.motto}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
