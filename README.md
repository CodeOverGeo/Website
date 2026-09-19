# georufino.com — Personal Portfolio

Personal portfolio website for **Giovanni Rufino**, Software Engineer based in the Raleigh-Durham-Chapel Hill area. Live at [georufino.com](https://georufino.com).

The UI is themed as an interactive VS Code / IDE environment — complete with a boot sequence, tab navigation, command palette, status bar, and spec panel showing Gherkin-style acceptance criteria per route.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components, signals) |
| Language | TypeScript 5.9 |
| Styling | SCSS |
| Reactive State | Angular Signals (`signal`, `PortfolioDataService`) |
| Rendering | Prerendered at build time (`@angular/build` + `@angular/ssr`, `outputMode: static`) |
| Hosting | Firebase Hosting |
| Package Manager | npm 11 |

## Pages & Routes

| Route | Title | Description |
|---|---|---|
| `/` | Boot Sequence | Animated terminal intro on first load |
| `/dashboard` | Dashboard | Hero profile, dossier stats, powers & abilities, testimonials |
| `/experience.cs` | Experience | Git-style commit timeline of work history |
| `/projects.py` | Projects | Featured project showcase with stack badges |
| `/about` | About | Bio, certifications, interests, raw JSON toggle |
| `/blog.md` | Blog | Blog posts |

All routes are lazy-loaded for performance.

## Shell Components

| Component | Purpose |
|---|---|
| `nav-tabs` | File-tab style navigation bar |
| `command-palette` | ⌘K quick-open launcher for navigation and actions |
| `spec-panel` | Gherkin spec viewer scoped to the current route |
| `status-bar` | VS Code-style status bar (branch, AI status, specs) |

## Project Structure

```
src/app/
├── components/
│   ├── shared/social-links/     # Social link icons
│   └── shell/                   # nav-tabs, command-palette, spec-panel, status-bar
├── directives/
│   └── visibility.directive.ts  # Intersection observer directive
├── models/
│   └── portfolio.models.ts      # TypeScript interfaces for all data
├── pages/                       # Lazy-loaded route components
│   ├── boot-sequence/
│   ├── dashboard/
│   ├── experience/
│   ├── projects/
│   ├── about/
│   └── blog/
├── services/
│   ├── portfolio-data.service.ts  # Single source of truth for all portfolio data
│   └── shell-ui.service.ts        # Shell/UI state (command palette open, active route)
└── utils/
    └── simulated-loading.util.ts  # Typewriter / simulated loading helper
```

## Portfolio Content

- **Experience** — Software Engineer at Relias (Oct 2024–Present), with prior roles in DevOps evangelism, feature flag enablement, and a full-stack bootcamp at Springboard
- **Projects** — Vypto.org (ZK architecture), Fluck iOS App (Swift/Firebase), Refinement AI Skill (MCP/Gherkin), Elimibug (React/Node), Rate the Charge (Flask)
- **Skills** — C#/.NET, TypeScript, Angular, Node.js, Python, Azure, Cosmos DB, SQL, CI/CD, Docker, Swift
- **Certifications** — AZ-900, AZ-204, AI-900 (Microsoft), IBM & Coursera certs

## Local Development

```bash
npm start          # ng serve → http://localhost:4200
npm run build      # Production build → dist/personal-portfolio/browser
npm test           # Run unit tests with Vitest
```

## SEO & Social Metadata

Every route is **prerendered at build time** into its own `index.html`, so crawlers and link
unfurlers (LinkedIn, X, Slack, iMessage) receive real markup instead of an empty `<app-root>`.
No server is required — the output is still plain static files.

| Piece | Where |
|---|---|
| Base description, Open Graph, Twitter card, canonical, JSON-LD `Person` | `src/index.html` |
| Per-route title + description | `data.description` on each route in `src/app/app.routes.ts` |
| Tag updates on navigation | `SeoService` (`src/app/services/seo.service.ts`) |
| Share card (1200×630) | `public/og-image.png` |
| Crawler directives | `public/robots.txt`, `public/sitemap.xml` |

`SeoService` runs during prerendering *and* on client-side navigation, so each route ships its
own description, canonical URL, and OG/Twitter tags either way. Update `SITE_URL` in that file
if the domain ever changes.

Because pages are prerendered, the simulated loading effect is skipped on the first render
(the content is already on screen) and plays on in-app navigations — see
`src/app/utils/simulated-loading.util.ts`.

## Deployment

Hosted on **Firebase Hosting**. Build output is `dist/personal-portfolio/browser`, which
contains the prerendered `index.html` per route plus `robots.txt`, `sitemap.xml`, and
`og-image.png`. Unknown paths still rewrite to `index.html` for SPA routing.

```bash
ng build
firebase deploy
```

### Caching

`firebase.json` sets `Cache-Control` per file type rather than relying on Firebase's
one-hour default. Because `outputHashing: "all"` puts a content hash in every JS and CSS
filename, those bundles are safe to cache forever; the prerendered HTML is not, since a
stale shell would reference chunk hashes that a later deploy has already replaced.

| Pattern | `Cache-Control` |
|---|---|
| `**` — prerendered HTML, `robots.txt`, `sitemap.xml`, `site.webmanifest` | `no-cache` |
| `**/*.@(js\|css)` — hashed bundles | `public, max-age=31536000, immutable` |
| Images and fonts (unhashed, copied from `public/`) | `public, max-age=604800` |
| `Giovanni_Rufino_Resume.pdf` | `public, max-age=3600` |

Two things about that block are easy to break:

- **The last matching entry wins.** The `**` catch-all is listed first so the narrower
  asset globs override it. Adding a broad rule below them would silently undo them.
- **Globs match the original request path, not the rewrite destination.** A rule on
  `/index.html` would never apply to `/` or to extensionless paths like `/dashboard`, which
  is why the HTML default is expressed as the catch-all instead.

`no-cache` means "revalidate", not "don't store" — Firebase serves an `ETag`, so a
returning visitor gets a 304 on the shell and hits cache for everything it references.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
