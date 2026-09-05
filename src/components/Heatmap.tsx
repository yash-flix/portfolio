import type { Contributions } from "@/lib/github";

const ALPHA = [0, 0.3, 0.55, 0.8, 1];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** GitHub-style contribution calendar: one column per week, one row per weekday, lime by intensity. */
export default function Heatmap({ contributions, cell = 11, gap = 3 }: { contributions: Contributions; cell?: number; gap?: number }) {
  const { days } = contributions;
  if (days.length === 0) return null;

  const first = new Date(days[0].date + "T00:00:00Z");
  const startSunday = new Date(first);
  startSunday.setUTCDate(first.getUTCDate() - first.getUTCDay());
  const step = cell + gap;
  const cols = Math.ceil((days.length + first.getUTCDay()) / 7);
  const labelH = 14;
  const w = cols * step - gap;
  const h = 7 * step - gap + labelH;

  // Month label at the first week where that month begins.
  const labels: { x: number; text: string }[] = [];
  let lastMonth = -1;
  days.forEach((d) => {
    const t = new Date(d.date + "T00:00:00Z");
    if (t.getUTCMonth() !== lastMonth && t.getUTCDate() <= 7) {
      lastMonth = t.getUTCMonth();
      const idx = Math.round((t.getTime() - startSunday.getTime()) / 86400000);
      const x = Math.floor(idx / 7) * step;
      if (x + 22 <= w) labels.push({ x, text: MONTHS[lastMonth] });
    }
  });

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="block h-auto w-full" role="img" aria-label="GitHub contributions over the last year">
      {labels.map((l) => (
        <text key={l.x} x={l.x} y={9} fontSize={9} fill="#8a8a85" fontFamily="var(--font-mono)">
          {l.text}
        </text>
      ))}
      {days.map((d) => {
        const t = new Date(d.date + "T00:00:00Z");
        const idx = Math.round((t.getTime() - startSunday.getTime()) / 86400000);
        return (
          <rect
            key={d.date}
            x={Math.floor(idx / 7) * step}
            y={labelH + (idx % 7) * step}
            width={cell}
            height={cell}
            rx={2}
            fill={d.level === 0 ? "rgba(242,242,240,0.07)" : "#c6ff3d"}
            fillOpacity={d.level === 0 ? 1 : ALPHA[d.level]}
          >
            <title>{d.date}</title>
          </rect>
        );
      })}
    </svg>
  );
}
