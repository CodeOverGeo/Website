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

## Deployment

Hosted on **Firebase Hosting**. Build output is `dist/personal-portfolio/browser`. All routes rewrite to `index.html` for SPA routing.

```bash
ng build
firebase deploy
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
