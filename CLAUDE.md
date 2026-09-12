# CLAUDE.md — akaash-portfolio

> **Read `~/Desktop/Projects/brain2/PROFILE.md` first**, then `brain2/MEMORY.md`, then
> `brain2/20_Career/positioning.md` — the canonical positioning doc, including its
> "Scope of claims" table. Do not write copy that exceeds it.
>
> **File what matters back to `brain2`.** Code lives here; the reasoning lives in the vault.
> Decisions, corrections, verified facts, and discovered constraints go to the right area
> (`20_Career/`, `40_Finance/`, `50_People/`, `60_Projects/`, `70_Content/`, `90_Meta/`), with a
> one-line pointer in `brain2/MEMORY.md`. Unsorted thoughts go to `brain2/00_Inbox/`. Anything not
> written down is lost when the chat closes. See the full rule in `~/Desktop/Projects/CLAUDE.md`.

Akaash's public site at **akaash.app**. Next.js 16 App Router + MUI, auto-deployed to Vercel.
**This repo is public.** Nothing personal, financial, or confidential belongs here.

## Where the copy lives

| File | Holds |
|---|---|
| `src/config/site.ts` | site title, description, keywords |
| `src/data/projects.ts` | project cards |
| `src/data/experience.ts` | roles and highlights |
| `src/components/Hero.tsx`, `About.tsx` | headline and about copy |

## Rules

- **Never fabricate** experience, metrics, titles, or dates. Use `[FILL]` and ask.
- **No long dashes** in visible copy. Commas, parentheses, or a colon. En dashes in date ranges are fine.
- Bullets: one idea each, outcome in the first eight words, 20–30 words.
- **Never commit** `PROMPT-*.md` working files — they're gitignored and live in
  `brain2/60_Projects/prompts/`.
- Verify `npm run build` and `npm run lint` pass before finishing.

Working prompts for this repo: `~/Desktop/Projects/brain2/60_Projects/prompts/`
