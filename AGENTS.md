# AGENTS.md — georufino.com Shared Agent Instructions

This repository powers **georufino.com**, positioned primarily for **AI Consulting** and **AI Keynotes**, with a dedicated `/engineering` section showcasing production engineering depth for technical credibility and potential employers.

## Tech Stack & Commands
- **Framework:** Angular 21 (`@angular/core` ^21.2.0) with `@angular/ssr` static prerendering (`outputMode: "static"`, `RenderMode.Prerender`)
- **Styling:** SCSS (`src/styles.scss` + component `.scss`)
- **Package Manager:** `npm` (`npm@11.8.0`)
- **Hosting:** Firebase Hosting (`firebase.json`, serving `dist/personal-portfolio/browser`)
- **Dev Server:** `npm start` (`ng serve`)
- **Build:** `npm run build` (`ng build && node scripts/publish-playbook.mjs`)
- **Tests:** `npm test` (`ng test` via Vitest)
- **Typecheck:** `npx tsc --noEmit`

## Source of Truth Files
- `DESIGN.md` — Visual identity, typography, color tokens, spacing, and responsive breakpoints. Never invent ad-hoc styles outside these tokens.
- `IDEAS.md` — Parking lot for non-essential ideas.
- **GitHub Issues (`gh issue`)** — Single source of truth for all build tasks, bugs, and QA work.
- **Notion (`georufino.com Redesign Hub` via Notion MCP)** — Single source of truth for finalized copy, speaker bios, and media assets. (Local backup: `docs/notion-redesign-hub.md`.)

## Task Tracking & Cross-Agent Handoff Rules
- Start every session by running `gh issue list --label "ready"` and confirming with the user which issue to work on.
- Respect tool routing labels:
  - `tool:antigravity` — Visual prototypes, scaffolding, design tokens, and Chrome Browser Use responsive QA.
  - `tool:claude-code` — Copy integration, interactive flows, routed forms, SEO/schema, and terminal build-test loops.
- Ask before creating new GitHub issues; log loose ideas in `IDEAS.md` or Notion instead.
- Never close GitHub issues directly via CLI. Reference `Fixes #<number>` in pull requests so merging closes the issue automatically.
- Before ending a session or handing off between Antigravity and Claude Code, leave a brief comment on the active issue (`gh issue comment <number>`) summarizing:
  1. What changed
  2. What was verified (commands run / screenshots checked)
  3. Exact next step

## Quality Bar & URL Preservation
- Maintain 95+ Lighthouse targets across Performance, Accessibility, Best Practices, and SEO.
- Verify responsive layouts at `1440px` (desktop) and `390px` (mobile) with zero horizontal overflow.
- Preserve all legacy portfolio URLs via 301 redirects in `firebase.json` (`/dashboard`, `/experience.cs`, `/projects.py`, `/about`, `/about.json`, `/blog.md`).
- **Do not break standalone live routes or public assets:** `/ai`, `/ai-without-the-hype-starter-playbook.pdf`, `/terms`, `/privacy`, `/extrapair/privacy`, and `/Giovanni_Rufino_Resume.pdf`.
