# portfolio_muse — Redesign Plan (Editorial Engineer)

> Goal: kill the "AI slop" look (centered everything, identical glass cards, black+amber
> everywhere, generic fade-up) and rebuild as a crafted, opinionated, human portfolio.

## 1. What I learned from real portfolios

Researched Awwwards portfolio winners + standout dev portfolios
(Brittany Chiang, Josh Comeau, Lee Robinson, Bruno Simon, plus
sitebuilderreport 2026 roundup and Josh Comeau's "Building an Effective Dev Portfolio").

Patterns that keep showing up:

1. **One accent, used sparingly.** Brittany Chiang: deep navy + one mint green for
   *only* interactive elements. AI slop uses 3–4 gradients at once.
2. **Work history before project dump.** Recruiters read employment timeline first,
   personal projects second. Our old homepage buried experience below generic cards.
3. **Sticky side rail + scroll tracking.** A 30-line IntersectionObserver nav signals
   more UX craft than any orbital 3D background.
4. **Brevity + voice.** About = 3 short paragraphs (who / what-now / one human detail),
   first person, real numbers ("8+ client sites", "23 certs"). No "passionate ninja".
5. **Featured 3 → dedicated index.** Homepage shows 2–4 best projects with
   *case-study depth* (problem → solution → outcome), full archive lives on
   `/projects` with search/filter. Same for certs → `/certificates`.
6. **Texture over glow.** Grain, dotted/blueprint grids, ruled paper, stamps and
   ticket edges read as "designed". Glassmorphism + purple glow reads as "generated".
7. **Contact is a conversion block, not a footer afterthought.** mailto + copy-email
   button + response-time promise + live local time. Forms convert better than icons.

## 2. Why the old UI reads as AI slop (and the fix)

| Slop tell | Fix in portfolio_muse |
|---|---|
| Everything centered, same max-w-3xl column | Split hero (type left, portrait+terminal right), alternating dark/paper sections, asymmetric ranked grids |
| Identical glass cards for projects, certs, skills | 3 distinct card languages: editorial project rows (big index numbers), ranked cert tickets (perforation + seal), minimal skill table |
| Amber used for borders, text, badges, buttons at once | Single accent `#FF4D00` (safety orange) reserved for *actions + rank #1 only*; everything else ink/paper |
| `01. 02. 03.` mono headers on every section | Real section headers: mono kicker + serif-italic display + rule line + count (`Selected work — 03/11`) |
| Generic `fadeUp` on everything | Choreographed motion: masked line reveals, staggered index rows, marquee, magnetic CTA, scroll progress, hover slide-underlines |
| Heavy 3D backgrounds (orbital spheres) behind thin content | One subtle dotted field in hero only; performance + readability first |
| Centered avatar + 3 identical CTA buttons | Portrait in arch frame with stamp, status dot, IST clock; one primary CTA, one ghost |
| Footer = icons row | Footer = colophon (type, stack, "set in…"), sitemap, back-to-top, build time |

## 3. Design system (Editorial Engineer)

- **Palette:** warm black `#0D0D0C`, paper `#EDEAE2`, ink `#16130E`,
  muted `#6B675E`, line `rgba(22,19,14,.14)` on paper / `rgba(237,234,226,.12)` on dark,
  accent safety-orange `#FF4D00`, gold `#C9A227` for rank-1 seal only.
- **Type:** `Space Grotesk` (display), `Instrument Serif italic` (accent words),
  `Inter` (body), `JetBrains Mono` (kickers/labels), `Caveat` (one handwritten note max).
- **Texture:** SVG grain overlay (`body::after`, 3% opacity), blueprint dot grid in hero,
  ruled lines on paper sections, dashed ticket perforation on cert cards.
- **Shape language:** 2px radii on tickets, 18px on cards, arch (`rounded-t-full`) on
  portrait, pill only for status/filters. Never mix 6 radii on one screen.
- **Motion (framer-motion, all `whileInView once` + reduced-motion respected):**
  hero masked-line reveal → marquee tools strip → section header rule-draw →
  staggered rows (0.06s) → magnetic primary buttons → cert ticket lift + seal spin →
  scroll progress bar → footer colophon fade. No floating orbs.

## 4. Information architecture

```
/              Hero (split) → strip → About (paper) → Experience → Featured ×3
               → Ranked certs ×3 → GitHub strip → Contact → Footer
/projects      Full archive: GitHub-live + curated merge, search, language filter,
               sort (updated/stars), case-study modal (README excerpt, lang bars,
               stars/forks/pushed-at). Only place where ALL projects live.
/certificates  Ranked: rank field controls order (1 = most valuable).
               Homepage top-3 = rank 1–3. Rank 1 gets gold seal + spans 2 cols on
               desktop so the most valuable cert sits top-right in the visual flow.
/api/github    Free proxy: caches GitHub REST, hides token, powers ISR.
/api/contact   Free form handler: Web3Forms (email) + Sheet webhook + file fallback.
/admin2910     (reused later) CRUD on curated-projects.json + messages.json. No DB.
```

### Cert ranking (you asked: most valuable on top-right)
`src/data/certificates.ts` gains a `rank` field. Order = rank asc, not file order.
Current rank 1–3: Oracle Certified Architect Associate → Salesforce Agentforce
Specialist → Snowflake Platform Training. Homepage grid on desktop:
rank-1 card spans 2 rows on the LEFT, rank-2 sits TOP-RIGHT (the eye lands there
second in Z-pattern), rank-3 bottom-right. So yes — most valuable cluster occupies
top row, second-most-valuable top-right. Full page keeps rank order with `#1` seal.

### Projects (you asked: only top 3 on home + separate page)
Homepage renders `featuredRank 1–3` from curated overrides only. Everything else —
including brand-new GitHub repos — appears automatically on `/projects` with zero
manual work. Each project row shows: index (`01`), title, one-line outcome,
tech pills, stars · pushed-at, Code/Live links, and an expander with README +
language bars so a viewer "understands it properly" without opening GitHub.

## 5. Automation — free, fully automatic, still CRUD-able

### Projects: GitHub API + ISR + curated overrides (hybrid, $0)
- `src/lib/github.ts` fetches
  `GET /users/{GITHUB_USERNAME}/repos?per_page=100&sort=updated` with
  `next: { revalidate: 3600 }` (hourly ISR — new pushes appear without redeploy).
- No token needed (60 req/hr unauthenticated is plenty behind hourly cache);
  optional `GITHUB_TOKEN` (free fine-grained PAT, zero scopes) lifts to 5000/hr.
- Response merges with `data/curated-projects.json` keyed by repo lowercase name:
  `{ hide, featuredRank, title, blurb, demoUrl, image, tech }`.
  GitHub is the source of truth for stars/language/pushed-at; curated file is the
  source of truth for *presentation* (order, copy, thumbnails). CRUD = edit that one
  small JSON (via admin UI later) — you never hand-sync stars or new repos again.
- `GET /api/github` is a thin proxy so the client never sees the token and the
  hourly cache is shared by `/` and `/projects`.
- Forks excluded by default (`hide` overrides per repo), `Portfolio` repo itself
  hidden by default.

### Certs: folder-convention + sync script ($0, semi-auto — issuers have no API)
Certs can't come from an API (no Oracle/Salesforce API). Instead:
1. Drop `name.jpg` + `name.pdf` into `public/certificates/`.
2. Run `npm run sync:certs` → scans the folder, preserves existing
   rank/category/issuer/year from `data/certificates.meta.json`, appends new files
   with `rank: 99` (bottom) so you just bump the rank to promote.
3. Admin UI edits meta (title/category/rank) — CRUD without touching code.
This turns "manual feed" into: drop 2 files → set rank → done.

### Contact: form → email + spreadsheet, $0, no backend
- Form fields: name, email/contact, message. `POST /api/contact`.
- Server: validates → forwards to **Web3Forms** (`WEB3FORMS_KEY`, free unlimited,
  delivers straight to your inbox) → optionally POSTs same row to
  `SHEET_WEBHOOK_URL` (10-line Apps Script that appends to Google Sheets) →
  always appends to `data/messages.json` as fallback so nothing is ever lost.
- No Resend/Supabase/Formspree paid tier. Pure free APIs + file fallback.
- Added ideas: honeypot field + 30s rate-limit per IP (spam), success state shows
  "usually replies within a day", `mailto:` fallback link if JS off.

## 6. My added ideas (beyond your brief)
1. **Live IST clock + availability stamp** in hero ("Pune, India — 14:32 IST —
   open to DevOps roles"). Updates every second, proves the site is alive.
2. **Uses / Now strip** — one line of real tooling (Neovim? Jenkins? homelab?)
   + "currently learning" line. Cheapest humanity signal there is.
3. **Colophon footer** — "Set in Space Grotesk & Instrument Serif · Built with
   Next.js · Deployed on ___ · Last built {date}". Crafted sites sign their work.
4. **Reading-time case expanders** on `/projects` (Problem / What I built /
   What I'd do differently) seeded from README. Recruiters skim; give them bones.
5. **Rank seals on certs** (`#1` gold) + issuer + year meta. Turns 23 PDFs into a
   hierarchy instead of a pile.
6. **Print stylesheet** for resume: `@media print` hides nav/decor so the page
   doubles as a one-page resume. Free feature, big "effort" signal.

## 7. Build order
1. Tokens + fonts + grain + layout + navbar + footer (this scaffold)
2. Hero split + marquee + contact block + API routes (this scaffold)
3. Featured + /projects with GitHub live (this scaffold, data-backed)
4. Certs ranked + /certificates (reuses your existing 23-cert data file)
5. Admin CRUD + sync scripts polish
6. `npm install && npm run dev` → screenshot → tweak spacing (spacing = craft)
