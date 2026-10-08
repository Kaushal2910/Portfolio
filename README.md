# portfolio_muse — Editorial Engineer rebuild

Fresh Next.js app (see `REDESIGN_PLAN.md` for the full plan + research).

## Run it

```bash
cd portfolio_muse
npm install
cp .env.example .env.local   # optional: GITHUB_TOKEN, WEB3FORMS_KEY
npm run dev                  # → http://localhost:3000
```

Copy your assets from the old portfolio before running:
`public/profile.jpg`, `public/certificates/*`, `public/resume.pdf`.

## What's inside

- `/` — split hero (masked reveal, IST clock, copy-email), tool marquee,
  paper About + timeline, top-3 projects, ranked top-3 certs, GitHub strip, contact form
- `/projects` — full GitHub-live index (hourly ISR), search + language filter + sort
- `/certificates` — all certs in `rank` order (rank 1 = most valuable)
- `/api/github` — free cached GitHub proxy · `/api/contact` — free form pipeline
- `data/curated-projects.json` — CRUD layer: `featuredRank`, `hide`, `blurb`, `demoUrl`
- `npm run sync:projects` / `npm run sync:certs` — free automation scripts

## Profile photo guide

- Best: transparent-background PNG (export from your editor, or one-click remove at
  remove.bg / Adobe Express / Photoshop Subject Select → mask).
- Also fine: any dark-background JPG — the hero's edge mask dissolves it into the page.
- White-background JPG? Don't ship it raw (grey box). Remove the bg first, then upload
  via `/admin-muse` (accepts PNG/JPG/JPEG, preserves the real extension).
- Crop tip: face in the upper third — the hero uses `object-[50%_22%]`; tweak that value
  per photo in `src/components/Hero.tsx`.

## Free-service setup (5 min)

1. **Projects:** nothing needed. Optional `GITHUB_TOKEN` (fine-grained PAT, zero scopes)
   raises rate limit 60 → 5000/hr.
2. **Contact → email:** free key from https://web3forms.com → `WEB3FORMS_KEY`.
3. **Contact → spreadsheet:** Apps Script (Extensions → Apps Script) deployed as web app:
   ```js
   function doPost(e){SpreadsheetApp.getActiveSheet().appendRow([new Date(),e.parameter.name,e.parameter.email,e.parameter.message]);return ContentService.createTextOutput("ok");}
   ```
   Paste the web-app URL as `SHEET_WEBHOOK_URL`. Without either, messages still land in `data/messages.json`.
