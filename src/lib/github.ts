import { site } from "./data";

export type ContributionDay = { date: string; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = { days: ContributionDay[]; total: number };

/**
 * GitHub's public contributions fragment, parsed into (date, level) cells.
 * Cached for an hour; on any failure returns an empty set so the nav still renders.
 */
export async function getContributions(): Promise<Contributions> {
  try {
    const res = await fetch(`https://github.com/users/${site.handle}/contributions`, {
      next: { revalidate: 3600 },
      headers: { "user-agent": "Mozilla/5.0 (portfolio heatmap)" },
    });
    if (!res.ok) return { days: [], total: 0 };
    const html = await res.text();

    const days: ContributionDay[] = [];
    const cell = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"/g;
    for (const m of html.matchAll(cell)) days.push({ date: m[1], level: Number(m[2]) as ContributionDay["level"] });
    days.sort((a, b) => (a.date < b.date ? -1 : 1));

    let total = 0;
    for (const m of html.matchAll(/(\d+) contributions? on /g)) total += Number(m[1]);

    return { days, total };
  } catch {
    return { days: [], total: 0 };
  }
}
