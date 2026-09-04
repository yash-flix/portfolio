import { marqueeItems } from "@/lib/data";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee overflow-hidden border-y border-line py-4" aria-hidden>
      <div className="marquee-track gap-10 pr-10">
        {items.map((it, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.2em] text-paper/70">
            {it}
            <span className="text-lime">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
