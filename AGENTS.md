# AGENTS.md — avanderw.co.za

Personal website and blog deployed to GitHub Pages at `avanderw.github.io`.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | **SvelteKit 2** (Svelte 5) |
| Language | **TypeScript** (strict mode) |
| Build | **Vite 8** |
| Adapter | `@sveltejs/adapter-static` (SSG) |
| Styling | Pico CSS (overridden), CSS |
| Markdown | Showdown (render) |
| Diagrams | Mermaid |
| Syntax Highlight | highlight.js |
| Math | KaTeX |
| Icons | Lucide Svelte |

No database. No backend. Fully static site.

## Project Structure

```
src/
  routes/          # SvelteKit file-based routing
  lib/
    components/    # Reusable Svelte components
    data/          # Typed data files (blog, books, projects, career, social, laws)
    stores/        # Svelte stores
    index.ts       # Barrel re-exports
  webcomponents/   # Standalone WC (SiteHeader, SiteFooter) — separate Vite build
  app.html         # Root HTML shell
  app.css          # Global styles
  pico-css-override.css
static/            # Static assets (images, etc.)
build/             # SSG output (deployed)
scripts/           # Utility scripts
```

## Commands

```bash
npm run dev           # Dev server (hot reload)
npm run build         # Production build (vite build + web components)
npm run check         # Type-check via svelte-check
npm run preview       # Preview production build
```

Run `npm run check` before committing. Types are strict.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) — triggers on push to `master`/`main` or manual `workflow_dispatch`. Builds with Node 22, deploys to GitHub Pages via `actions/deploy-pages`.

## Content Model

Blog posts support two formats:
- **Markdown** — `markdownPath` points to a `.md` file in `static/`
- **HTML components** — `htmlComponent` names a Svelte component rendered directly (e.g. Laws of Software)