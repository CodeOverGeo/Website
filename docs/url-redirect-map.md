# georufino.com — Repository Audit, URL Inventory & 301 Redirect Map

> **Tracks:** Issue `#45` (`M1: Architecture & Design System`)  
> **Applies in:** Issue `#48` (route scaffolding) and Issue `#57` (wiring 301 redirects in `firebase.json` + sitemap/SEO launch)  
> **Note:** Do **not** apply the legacy 301 redirects in `firebase.json` until target routes (`/engineering`, `/writing`, etc.) are built and verified, or live traffic will be redirected to unbuilt routes.

---

## 1. Repository & Infrastructure Audit

| Layer | Current Implementation | Notes for Redesign |
|---|---|---|
| **Framework** | Angular 21 (`@angular/core` `^21.2.0`) | Standalone components, lazy-loaded routes in `src/app/app.routes.ts` |
| **Rendering** | `@angular/ssr` static prerendering (`outputMode: "static"`, `RenderMode.Prerender`) | Every Angular route is prerendered at build time into static HTML under `dist/personal-portfolio/browser` |
| **Styling** | Plain SCSS (`src/styles.scss` + component `.scss`) | No Tailwind installed; component style budget is `4kB` warn / `8kB` error in `angular.json` |
| **Package Manager** | `npm` (`npm@11.8.0`, Node `24` in CI) | `npm start`, `npm run build`, `npm test`, `npx tsc --noEmit` |
| **Hosting** | Firebase Hosting (`firebase.json`, project `georufino-edc02`) | `trailingSlash: false`; serves `dist/personal-portfolio/browser` |
| **CI/CD** | `.github/workflows/ci.yml` | Required status check on `main`: `test` (`npm test -- --watch=false`). Every PR auto-deploys a Firebase Hosting preview channel; pushes to `main` deploy live. |
| **SEO / Metadata** | `src/app/services/seo.service.ts` + `src/index.html` | `SeoService` updates per-route title, description, canonical, OG, and Twitter tags during prerendering. `src/index.html` still has legacy `Software Engineer` JSON-LD and `"terminal-themed portfolio card"` alt text (update in `#57`). |
| **Booking Widget** | Cal.com floating script hardcoded in `src/index.html` | Currently mounts a global `"Book a Session"` button (`calLink: "giovanni-rufino"`). Reconcile with the routed `/contact` intake in `#53` so it doesn't visually clash or bypass intent routing. |
| **Feature Flags** | `feature-flags.json` (`{"playbook": true}`) | `scripts/publish-playbook.mjs` validates hash freshness (`playbook-src/`) and copies `playbook.html` + PDF into `dist/personal-portfolio/browser` on `npm run build`. |
| **Web Manifest** | `public/site.webmanifest` | Currently named `"Giovanni Rufino | Portfolio IDE"` with `#0d1117` theme colors — update in `#48` / `#57` after locking `DESIGN.md` tokens. |

---

## 2. Complete Public URL & Asset Inventory

### 2.1 Legacy Portfolio Routes (Redirect via HTTP 301 at Launch)

| Current URL | Current Purpose | Indexed in `sitemap.xml`? | Target Destination | Redirect Type | Notes |
|---|---|---|---|---|---|
| `/` | Terminal boot sequence (`BootSequenceComponent`, auto-navigates to `/dashboard`) | Yes (`1.0`) | `/` (New Home) | Replaced in place | Retire terminal boot animation; serve executive-ready Home directly at `/` |
| `/dashboard` | Main portfolio overview (`DashboardComponent`) | Yes (`0.9`) | `/` | `301` | Primary legacy landing route |
| `/experience.cs` | Git-style career timeline (`ExperienceComponent`) | Yes (`0.8`) | `/engineering` | `301` | Work history moves to `/engineering` |
| `/projects.py` | Shipped projects list (`ProjectsComponent`) | Yes (`0.8`) | `/engineering` | `301` | Featured technical builds move to `/engineering` |
| `/about` | Bio, certifications, education, interests (`AboutComponent`) | Yes (`0.7`) | `/engineering` *(or `/`)* | `301` | **Decision to confirm before `#57`:** `/engineering` houses certifications/background; switch destination to `/` if preferred for executive bio visitors |
| `/about.json` | Angular redirect to `/about` | No | `/engineering` *(match `/about`)* | `301` | Point directly to final destination to avoid a 2-hop redirect chain |
| `/blog.md` | Single-page writing listing (`BlogComponent`, no nested post slugs) | Yes (`0.7`) | `/writing` | `301` | No child article slugs exist today |

### 2.2 Standalone Live Routes & Public Assets (PRESERVE UNTOUCHED)

Do **not** break, redirect away from, or overwrite any of the following live URLs:

| Public URL | Backing Source / Rule | Purpose | Critical Dependency |
|---|---|---|---|
| `/ai` | `firebase.json` rewrite → `/playbook.html` (published by `scripts/publish-playbook.mjs` when `feature-flags.json` `playbook: true`) | *"AI Without the Hype"* starter playbook landing page | Linked from talks, footer, and `sitemap.xml` |
| `/ai/` | `firebase.json` `301` → `/ai` | Trailing-slash canonicalization | Keep existing redirect |
| `/ai-without-the-hype-starter-playbook.pdf` | Copied from `playbook-src/` at build time (`Cache-Control: max-age=3600`) | Downloadable starter playbook PDF | Linked directly from `/ai` |
| `/terms` | Angular prerendered route (`TermsComponent`) | Terms & Conditions for *"AI Without the Hype"* ebook | Linked from footer & ebook checkout (`playbook@georufino.com` / `grufino@georufino.com`) |
| `/privacy` | Angular prerendered route (`PrivacyComponent`) | Privacy Policy for `georufino.com`, mentoring, and ebook sales | Linked from footer & checkout |
| `/extrapair/privacy` | `firebase.json` rewrite → `/extrapair/privacy.html` (`public/extrapair/privacy.html`) | Privacy Policy for ExtraPair iOS/iPadOS app | **App Store compliance URL** (`id6826965116`) — never break |
| `/extrapair/privacy/` | `firebase.json` `301` → `/extrapair/privacy` | Trailing-slash canonicalization | Keep existing redirect |
| `/Giovanni_Rufino_Resume.pdf` | Static asset in `public/` (`Cache-Control: max-age=3600`) | Downloadable engineering resume PDF | External backlinks & `/engineering` CTA |
| `/robots.txt` & `/sitemap.xml` | Static files in `public/` | Crawler rules & XML sitemap | Update `sitemap.xml` in `#57` with new canonical routes (keep `/ai`, `/terms`, `/privacy`, `/extrapair/privacy`) |
| `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`, `/icon-192.png`, `/icon-512.png`, `/og-image.png`, `/site.webmanifest` | Static files in `public/` | Brand icons, PWA manifest, and OpenGraph card | Refresh visual assets & manifest branding in `#57` |

---

## 3. Target Redesign Sitemap

| Route | Type | Purpose |
|---|---|---|
| `/` | Angular prerendered | Executive-ready Home (AI Consulting + AI Keynotes hero, credibility, service/keynote preview, link to `/engineering`) |
| `/consulting` | Angular prerendered | AI Consulting service tiers, process, outcomes, proof, booking CTA |
| `/speaking` | Angular prerendered | AI Keynotes & Organizer Speaker Kit (3–4 topics, 50/150/300-word bios, headshots, 60–90s reel, booking CTA) |
| `/engineering` | Angular prerendered | Engineering & Technical Background (production AI systems, architecture, experience, certifications, projects, resume PDF) |
| `/writing` | Angular prerendered | Articles & AI Explainers |
| `/contact` | Angular prerendered | 3-track routed intake (AI Consulting / Book a Keynote / Engineering & Recruiting) |
| `/llms.txt` | Static file (`public/llms.txt`) | Concise plain-text summary for AI search engines (add in `#57`) |
| `/ai`, `/terms`, `/privacy`, `/extrapair/privacy` | Preserved live routes | Unchanged standalone & legal pages |

---

## 4. Target `firebase.json` 301 Redirect Configuration (Apply in `#57`)

Firebase Hosting evaluates `redirects` **before** `rewrites` and static files, guaranteeing genuine HTTP `301 Moved Permanently` responses at the CDN edge without executing client-side JS.

```json
"redirects": [
  { "source": "/dashboard", "destination": "/", "type": 301 },
  { "source": "/dashboard/", "destination": "/", "type": 301 },
  { "source": "/experience.cs", "destination": "/engineering", "type": 301 },
  { "source": "/experience.cs/", "destination": "/engineering", "type": 301 },
  { "source": "/projects.py", "destination": "/engineering", "type": 301 },
  { "source": "/projects.py/", "destination": "/engineering", "type": 301 },
  { "source": "/about", "destination": "/engineering", "type": 301 },
  { "source": "/about/", "destination": "/engineering", "type": 301 },
  { "source": "/about.json", "destination": "/engineering", "type": 301 },
  { "source": "/about.json/", "destination": "/engineering", "type": 301 },
  { "source": "/blog.md", "destination": "/writing", "type": 301 },
  { "source": "/blog.md/", "destination": "/writing", "type": 301 },
  { "source": "/ai/", "destination": "/ai", "type": 301 },
  { "source": "/extrapair/privacy/", "destination": "/extrapair/privacy", "type": 301 }
]
```

### Implementation Guardrails for `#48` & `#57`
1. **Prevent redirect loop on Angular wildcard route:** `src/app/app.routes.ts` currently ends with `{ path: '**', redirectTo: 'dashboard' }`. Update this during `#48` to either render a clean 404 component or redirect to `''` (`/`) so unknown URLs never bounce into the `/dashboard` 301.
2. **Keep `rewrites` order intact:** `/ai` → `/playbook.html` and `/extrapair/privacy` → `/extrapair/privacy.html` must remain **above** the `"**" → "/index.html"` SPA fallback in `firebase.json`.
3. **Preserve `ng build && node scripts/publish-playbook.mjs`:** Do not remove the post-build playbook step from `package.json`, and keep `npm test -- --watch=false` green for the required `main` branch protection check.
4. **Verify live 301 headers post-deploy:** Run `curl -I https://georufino.com/<legacy-path>` for every legacy route in `#58` to verify `HTTP/2 301` and single-hop `location` headers.
