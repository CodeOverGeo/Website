# DESIGN.md — georufino.com Design System

> **Status:** Draft — Update with locked visual tokens after Phase 3 visual explorations in Antigravity.

## Brand Direction
- **Tone:** Executive-ready, editorial clarity, calm authority, modern technical precision.
- **Evolution:** Retire the developer terminal hero (`user@portfolio:~$ dotnet run`). Retain subtle technical craft cues (clean grids, crisp monospace metadata accents where appropriate) without making the site look like a hobbyist CLI portfolio.

## Typography
- **Display / Headings:** [TBD in Phase 3 — e.g., high-craft editorial sans or geometric grotesque]
- **Body:** [TBD in Phase 3 — high legibility, 16px–18px base, 1.6 line-height]
- **Accent / Metadata:** [TBD in Phase 3 — subtle monospace for labels/tags/engineering section]

## Color Tokens
- `--bg-primary`: [TBD]
- `--bg-surface`: [TBD]
- `--text-primary`: [TBD]
- `--text-muted`: [TBD]
- `--accent-primary`: [TBD]
- `--border-subtle`: [TBD]
- **Contrast Requirement:** Minimum WCAG AA (`4.5:1` body text, `3:1` large text & UI controls).

## Layout & Breakpoints
- **Max Content Width:** `1200px` (prose reading width `65ch`–`72ch`)
- **QA Breakpoints:** Mobile `390px`, Tablet `768px`, Desktop `1440px`
- **Zero Horizontal Overflow:** Enforced across all routes and viewports.

## Core Reusable Components
- Global Navigation (sticky, minimal top-level links + primary CTA button, accessible mobile drawer)
- Section Container & Eyebrow Header
- Consulting Offer / Service Card
- Keynote Topic Card & Speaker Kit Asset Block
- Routed Contact Form (Consulting / Keynote / Engineering tabs)
- Footer (concise navigation, social links, `/llms.txt` and `/engineering` links)
