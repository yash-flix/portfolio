# yashrane.dev

Personal portfolio for Yash Rane. Next.js 16 (App Router), Tailwind v4, Framer Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
```

## Where things live

| What | File |
|---|---|
| Copy, projects, stats, archive, timeline, interests | `src/lib/data.ts` |
| Essays (Notes section) | `src/lib/notes.ts` |
| Colors, fonts, type scale | `src/app/globals.css` (`@theme` block) |
| Résumé PDF | `public/Yash_Rane_Resume.pdf` |
| Avatar | `public/avatar.png` |
| Site URL for metadata | `site.url` in `src/lib/data.ts` |

## Editing content

- **Add a project**: append to `projects` in `data.ts`. `pipeline` is the list of steps drawn on the right of the card. Leave `href` out and add `badge: "Under NDA"` for private work.
- **Add an essay**: append to `notes` in `notes.ts`. Paragraphs are plain strings; prefix with `## ` for a heading or `> ` for a pull quote. Set `status: "published"` to drop the draft tag.
- **Change the accent**: edit `--color-lime` in `globals.css`. Everything references the token.
- **Intro screen**: `src/components/Intro.tsx`. Shows once per browser session and respects reduced-motion.

## Deploy

Push to GitHub and import into Vercel. No environment variables are needed. Update `site.url` in `data.ts` once the domain is live so Open Graph links resolve.
