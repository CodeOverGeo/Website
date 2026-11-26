# DESIGN.md — georufino.com Design System

> **Status:** Locked (Issue `#47` — finalized 2026-11-26 via Interactive Design Decision Studio; reference prototype at `docs/prototypes/index.html`).

## 1. Brand & Visual Direction
- **Layout Archetype:** **Keynote Stage** — commanding dark auditorium presence with a centered outcome-driven hero, inline spotlight media card, horizontal proof bar, elevated bento cards, and organizer-ready `/speaking` dossier.
- **Tone:** Executive-ready, plain-language authority, approachable teacher-builder, crisp architectural precision.
- **Evolution:** Retires the hobbyist developer terminal (`#0d1117` + neon green CLI boot sequence). Keeps subtle builder craft via `Fira Code` metadata pills while connecting directly to the live `/ai` starter playbook through `Atkinson Hyperlegible` body copy.

---

## 2. Color Tokens (`Midnight Slate` + `Electric Cobalt`)

Declare `color-scheme: dark` on `:root`. Never invent ad-hoc hex values outside these tokens.

```scss
:root {
  color-scheme: dark;

  /* Surfaces */
  --bg-primary: #0B0F17;          /* Midnight Slate page canvas */
  --bg-surface: #131926;          /* Primary card & proof-bar surface */
  --bg-elevated: #1B2334;         /* Elevated callouts, popovers & media frames */
  --header-bg: rgb(11 15 23 / 0.92);

  /* Text */
  --text-primary: #F1F5F9;        /* ~17.1:1 on --bg-primary (WCAG AAA) */
  --text-muted: #94A3B8;          /* ~7.1:1 on --bg-primary, ~6.0:1 on --bg-surface (WCAG AA) */

  /* Brand Accent (Electric Cobalt) */
  --accent-primary: #60A5FA;      /* ~7.5:1 on --bg-primary (WCAG AA) */
  --accent-hover: #7DB6FC;        /* Hover state for solid primary CTAs */
  --accent-ink: #0B0F17;          /* ~8.2:1 dark ink on solid --accent-primary buttons (WCAG AAA) */
  --accent-soft: rgb(96 165 250 / 0.14);   /* Subtle pill & active-nav tint */
  --accent-border: rgb(96 165 250 / 0.34); /* Kicker & card hover border */
  --spotlight-glow: rgb(96 165 250 / 0.11);/* Top-of-page radial stage glow */

  /* Borders */
  --border-subtle: #243046;
}
```

### Contrast & Accessibility Rules
- **Minimum Contrast:** WCAG AA (`4.5:1` regular text, `3:1` large text, focus rings, and non-text UI indicators).
- **Primary Solid Buttons:** Always pair `background: var(--accent-primary)` with dark ink `color: var(--accent-ink)` (`#0B0F17` or `#111210`) — never white text on `#60A5FA`.
- **State Indicators:** Never indicate active navigation (`[aria-current="page"]`), selected tabs (`[aria-selected="true"]`), or copy confirmation by color alone — pair with an underline/border or icon swap.
- **Browser UI:** Set `accent-color: var(--accent-primary)`, `::selection { background: var(--accent-primary); color: var(--accent-ink); }`, and `scrollbar-color: var(--border-subtle) var(--bg-primary)` (keep `scrollbar-width: auto`).

---

## 3. Typography

Load via Google Fonts (`display=swap`) in `src/index.html`:
- **Display / Headings (`--font-display`):** `'Space Grotesk', system-ui, -apple-system, sans-serif` (weights `500`, `600`, `700`)
  - **Headline Accent Rule:** Keep accented words in headings **upright** (`font-style: normal; color: var(--accent-primary)` — **no italics** in display headings).
- **Body (`--font-body`):** `'Atkinson Hyperlegible', system-ui, -apple-system, sans-serif` (weights `400`, `700`, italic `400` — shared with `/ai` playbook)
- **Metadata / Mono (`--font-mono`):** `'Fira Code', ui-monospace, 'SFMono-Regular', Menlo, monospace` (weights `400`, `500` — used strictly for eyebrow kickers, tech-stack chips, word-count badges, and `/engineering` metadata)

### Type Scale & Fluid Sizing Rules
- Use `rem` (never `px`) for `font-size`, unitless `line-height`, and combine `rem + vw` inside `clamp()` with `max <= 2.5 * min` so browser zoom scales cleanly to 200%:
  - **Hero `h1`:** `clamp(2.25rem, 1.4rem + 3.4vw, 4rem)`, `line-height: 1.05`, `letter-spacing: -0.025em`, `font-weight: 700`, `text-wrap: balance`
  - **Section `h2`:** `clamp(1.7rem, 1.25rem + 1.8vw, 2.5rem)`, `line-height: 1.12`, `letter-spacing: -0.02em`, `font-weight: 600`, `text-wrap: balance`
  - **Card `h3`:** `1.35rem`, `line-height: 1.2`, `font-weight: 600`
  - **Hero Lead:** `clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)`, `line-height: 1.6`, `color: var(--text-muted)`
  - **Body Copy:** `1.0625rem` (`17px` at default root), `line-height: 1.6`, `text-wrap: pretty`, prose width capped at `64ch` (`max-inline-size: 64ch`)
  - **Mono Kickers & Chips:** `0.75rem`–`0.8125rem`, `font-weight: 500`
- Never set fixed `height` / `block-size` on text-containing elements (buttons, pills, cards, tabs, navbar); use `min-block-size` (`2.75rem`–`2.875rem` for interactive touch targets) and padding.

---

## 4. Shape, Spacing & Responsive Breakpoints

- **Geometry (`Stage Pill`):**
  - `--radius-btn: 999px` (buttons, eyebrow kickers, stack chips, mobile menu trigger)
  - `--radius-card: 1rem` (`16px` for bento cards, bio panels, spotlight frames, mobile menu popover)
- **Layout Container:**
  - Max width: `75rem` (`1200px`) centered with `padding-inline: clamp(1.125rem, 3vw, 2.25rem)`
  - Section vertical rhythm: `padding-block: clamp(3rem, 6vw, 4.75rem)` separated by `1px solid var(--border-subtle)`
  - Sticky header offset: `scroll-padding-block-start: 5.5rem` on `html` so anchor jumps never hide headings or buttons behind the sticky header
- **QA Breakpoints:** Mobile `390px`, Tablet `768px`, Desktop `1440px`
- **Zero Horizontal Overflow:** Mandatory across all routes and viewports (`document.documentElement.scrollWidth <= window.innerWidth`). Hide secondary logo subtitle text (`keynotes · workshops`) below `36rem` so the brand + mobile `Menu` trigger always fit comfortably inside `390px`.

---

## 5. Core Reusable Components (Scaffold in `#48`)

1. **Global Header & Responsive Navigation:**
   - Single semantic `<nav aria-label="Primary">` inside sticky `<header>` (`background: var(--header-bg); backdrop-filter: blur(12px)`).
   - Collapses automatically into a top-layer `popover="auto"` menu when inline items exceed available width; highlights active route via `[aria-current="page"]` underline/border + primary pill CTA (`Book a Talk` → `/contact`).
2. **Stage Hero & Spotlight Frame:**
   - Centered auditorium hero (pill mono kicker, upright `Space Grotesk` headline with Cobalt accent phrase, lead copy, primary + secondary pill CTAs) + optional 2-column elevated spotlight card (`--bg-surface` / `--bg-elevated`).
3. **Horizontal Proof Bar:**
   - Full-bleed `--bg-surface` band bordered top/bottom by `--border-subtle` highlighting 3 concise credentials.
4. **Offer / Keynote Bento Cards:**
   - `--bg-surface` cards with `1px solid var(--border-subtle)`, `--radius-card: 1rem`, hover border `var(--accent-border)`, and subtle top-bordered deliverable/takeaway footer.
5. **Speaker Kit Bio Tabs & Copy Button (`/speaking`):**
   - Accessible 50 / 150 / 300-word tablist (`[aria-selected="true"]` 3px Cobalt underline, `hidden="until-found"` panels with styling on inner `.bio-panel-card` wrapper and `pointer-events: none` on `[hidden]` panels) + one-click clipboard copy with `opacity`-toggled `role="status"` confirmation.
6. **Routed Contact Intake (`/contact`):**
   - 3-track intent selector (Workshops & Walkthroughs / Book a Keynote / Engineering & Recruiting) reconciled cleanly with or replacing the legacy global Cal.com floating button in `src/index.html`.
7. **Site Footer:**
   - Concise navigation, Raleigh-Durham NC location line, social links, `/ai` playbook, `/engineering`, `/terms`, `/privacy`, and `/llms.txt`.
