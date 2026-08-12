# Kanban — De-Pico, Mobile UX, & Colour Scheme Overhaul

**Short link:** `kanban-pico-migration.md` (repo root, alongside `AGENTS.md`)

A task board for three goals on `avanderw.co.za`. Tasks are grouped **by goal**, each with its own mini-board (To Do → Doing → Done). The three goals are ordered so they build on each other — **Goal 1 (drop Pico) first**, because Goals 2 and 3 modify the same CSS tokens and components. Work the goals left-to-right, and keep `npm run check` green after every task.

> **Legend**
> - `[ ]` To Do · `[~]` Doing · `[x]` Done
> - **Estimated** = focused solo-dev time
> - **⚠** = risk / pitfall to watch

---

## Goal 1 — Move off Pico CSS, keep the styling

Current state (audited): Pico **v2** loads from CDN in `src/app.html` (`pico.min.css` + `pico.colors.min.css` — 2 external requests, ~60KB). The site's *real* look lives in **14 files**: `src/pico-css-override.css` (green link overrides), `src/app.css` (serif stack, 60% width), and ~70 `var(--pico-*)` usages in components/routes. Goal: **replace the framework with hand-rolled design tokens** that keep the current look, then delete Pico.

### Goal 1 mini-board

| Board | Task |
|---|---|
| `[~]` | **G1-01** — Token inventory: build the source-of-truth spreadsheet |
| `[ ]` | **G1-02** — Reset & base layer |
| `[ ]` | **G1-03** — Type tokens (serif stack, sizes) |
| `[ ]` | **G1-04** — Colour & surface tokens (+ dark) |
| `[ ]` | **G1-05** — Component-class shim (Pico classes → own CSS) |
| `[ ]` | **G1-06** — Audit & sweep `data-*` attributes |
| `[ ]` | **G1-07** — Delete the CDN links |
| `[ ]` | **G1-08** — Visual regression & cleanup |

---

### G1-01 — Token inventory: build the source-of-truth spreadsheet
**Objective:** Know exactly which Pico features & variables are in use before writing any replacement CSS.

**Steps**
1. Create `scripts/pico-tokens.md` (or a spreadsheet of your choice: Google Sheets / Excel) with columns: `Token / Feature`, `Used where (file:line)`, `Current value (light)`, `Current value (dark)`, `Target token name`, `Notes`.
2. Populate it from the audit below. Run the audit queries against the repo (**this is a read-only pass, do not change anything yet**).

   ```bash
   # Every --pico-* variable in use, with counts
   grep -rno "var(--pico[^)]*)" src/ | sed 's/.*var(//;s/).*//' | sort | uniq -c | sort -rn
   # Files that use any Pico variable
   grep -rl "var(--pico" src/ | sort
   # Structural classes / attributes / elements Pico styles
   grep -rln 'data-tooltip\|data-placement\|data-theme\|class="container"\|role="button"\|<hgroup\|class="grid"' src/ --include="*.svelte"
   ```

3. Manually read `src/pico-css-override.css` and check which **classes** are relied on (`container`, `hgroup`, `article`, `button`, `table`, `grid`, `data-tooltip`, `data-theme`, `aria-current` styling, `role="button"` link-as-button, `[aria-current]` link colouring).
4. Note **Pico v2 defaults** for reference: font-size 16px, spacing scale multiples of 0.125rem (0.25/0.5/0.75/1/1.25/1.5rem margin), `border-radius: var(--pico-border-radius)` default 0.25rem → the site overrides html font-size to 14pt.
5. Also list the **Pico v2 CDN payloads**: `pico.min.css` (~60KB) + `pico.colors.min.css` (~10KB) — these are what you'll drop.

**Validate:** spreadsheet rows ✔ and every `var(--pico-*)` in the repo appears in at least one row.

**Estimate:** ~1h · **⚠** Do not skip — every later task reads this inventory.

---

### G1-02 — Reset & base layer
**Objective:** Foundation CSS with no framework — a light reset + sensible defaults so the site renders correctly the moment Pico is removed.

**Files**
- Create: `src/lib/styles/reset.css`
- Create: `src/lib/styles/index.css` (empty for now, imported last)

**Steps**
1. Write a minimal reset (e.g. the ~20-line Meyers/`box-sizing` reset) **or** copy the *measured* Pico boilerplate (typography margins, form/table resets) into `reset.css` — do not import a second framework.
2. In `reset.css`, set baseline touch behaviour: `html { -webkit-text-size-adjust: 100% }` and `@media (prefers-reduced-motion: reduce)` to disable smooth animations.
3. Create `src/lib/styles/index.css` and import it in `src/routes/+layout.svelte` **after** the override file.
4. Wrap in CSS-layer-aware imports if you adopt layers (see G1-05) — otherwise a plain import order is fine.

**Validate:** `npm run check` passes; dev server renders with an empty-ish look (expected — tokens come next).

**Estimate:** ~20min · **⚠** Keep `src/pico-css-override.css` importing for now; it is your safety net until G1-07.

---

### G1-03 — Type tokens (serif stack, sizes)
**Objective:** Move all typography to your own tokens, preserving the et-book/Tufte look (your confirmed direction).

**Files**
- Create: `src/lib/styles/tokens.css`
- Modify: `src/lib/styles/index.css`, `src/app.css` (replace hard-coded font rules with `var(--font-*)`)

**Steps**
1. In `tokens.css` define at minimum:
   ```css
   :root {
     --font-serif: et-book, Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif;
     --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
     --font-body-size: 14pt;            /* keep the site's current size */
     --font-heading-weight: 400;        /* h1–h4 currently 400 */
     --font-heading-style: normal;      /* h2 italic is a deliberate quirk — keep */
     --line-height-base: 1.5;
     --space-1 … --space-8: scale;      /* copy the Pico spacing values from G1-01 */
     --radius-sm / --radius-md: 0.25rem;/* Pico's border-radius */
   }
   ```
2. Update `app.css`: replace the hard-coded `font-family` / `font-size` / `h1–h4` rules with these tokens.
3. **Note for later (Goal 3):** `font-size: 14pt` hard-off in `app.css` — check readability at small viewport widths; medium-scale CSS clamp at mobile is a Goal-2 candidate.

**Validate:** `npm run check`; visually compare font rendering at `/` before vs after (set as same size, weight).

**Estimate:** ~30min · **⚠** `et-book` is self-hosted? If it ships from a font service, list the `<link>` in the G1-01 inventory (Pico CDN removal must not break the font).

---

### G1-04 — Colour & surface tokens (+ dark)
**Objective:** Replace every `var(--pico-*)` colour with your own tokens, keeping light & dark looks; swap Pico's default slate for your confirmed **sea-green accent**.

**Files**
- Modify: `src/lib/styles/tokens.css`
- Modify: components listed by the G1-01 inventory (~14 files use `--pico-*`)

**Steps**
1. **Map Pico → your tokens** (the table from G1-01):
   - `--pico-background-color` → `--color-bg`
   - `--pico-color` → `--color-text`
   - `--pico-muted-color` → `--color-muted`
   - `--pico-muted-border-color` → `--color-border`
   - `--pico-primary` / `--pico-primary-background` / `--pico-primary-inverse` / `--pico-card-background-color` / `--pico-border-radius` → `--color-accent` / `--color-accent-contrast` / `--color-surface` / `--radius-*`
2. **New light palette** (sea-green accent, your direction):
   - Background: `#ffffff`
   - Text: `#1e1e1e` (or `#212121`)
   - Muted text: `#6a6a6a`
   - Border: `#e0e0e0`
   - Accent: `#2d8a6e` (sea green w/ enough contrast — see Goal 3 for contrast verification)
   - Accent hover (darker for light mode): `#23705a`
   - Link colour: reuse accent; link-visited: slightly muted
3. **New dark palette**:
   - Background: `#1b1f1f` (slightly green-tinted near-black, matches accent family)
   - Surface: `#232829`
   - Text: `#e6e8e7`
   - Muted text: `#9aa3a1`
   - Border: `#3a4140`
   - Accent: `#5cbda0` (lighter sea-green for dark backgrounds)
   - **⚠ Contrast targets:** dark-mode text ≥ `#b8b8b8`-ish body on bg, accent ≥ 4.5:1 on bg (WCAG AA); verify in Goal 3.
4. **Replacement:** `src/lib/components/` (BlogTable, CareerTable, KitSubscribeTrigger, LawsOfSoftware, MarkdownViewer, ProjectsTable, SiteFooterCore, SocialTable, TabNavigation) + `src/routes/+page.svelte`, `blog/[slug]/+page.svelte`, `blog/laws-of-software/conway/+page.svelte`, `books/+page.svelte`, `web-components/+page.svelte`. Replace each `var(--pico-*)` with the mapped token.
5. **Keep dark variants working:** the current dark look comes from Pico's `[data-theme="dark"]` block; your tokens must redefine on `[data-theme="dark"]` (see Goal 3 step 2 for the modern approach).
6. `KitSubscribeTrigger.svelte` uses `--pico-primary`/`--pico-primary-inverse` — verify the pill button contrast in both modes.

**Validate:** `npm run check`; visually compare light + dark across the main pages (`/`, `/stream`, `/sandbox`…).

**Estimate:** ~2–3h · **⚠** Not just a find/replace: `--pico-primary` is an automatically-derived colour in Pico; your accent needs explicit light/dark variants.

---

### G1-05 — Component-class shim (Pico classes → own CSS)
**Objective:** Keep Pico-provided **classes** you rely on (`container`, `hgroup`, `article`, `grid`, `button`) working without Pico.

**Files**
- Modify: `src/lib/styles/index.css`

**Steps**
1. Implement, with your own tokens:
   - `.container` — max-width + centered gutters (Pico: max-width 1000px for ≥992px, 840px below).
   - `hgroup` — heading + subtitle pairing with proper spacing.
   - `article` — light border / shadow panel look with your `--color-surface`.
   - `button`, `role="button"` — base button styles (padding, border-radius, hover/focus states) using your accent tokens.
   - `table` — Pico-style table (borders, row striping? check inventory), `thead`, `tbody tr` hover.
   - `nav ul` — flex list styling that `SiteHeaderCore` / `TabNavigation` expect.
2. If you adopt **CSS layers**, put this in `index.css` — order: reset → tokens → base → components. (Layers let you keep specificity low & make later maintenance easier.)
3. **Do not** recreate Pico's entire stylesheet — only the classes your G1-01 inventory says are used.

**Validate:** `npm run check`; visual check that tables, cards, buttons, container widths match current Pico look.

**Estimate:** ~1–2h · **⚠** Tables are border-heavy in Pico; the dotted separators in `+page.svelte` rely on `--pico-muted-border-color` — make sure your table styles preserve them.

---

### G1-06 — Audit & sweep `data-*` attributes
**Objective:** Remove Pico-specific markup attributes the code no longer needs.

**Files**
- Modify: components using `data-tooltip`, `data-placement` (SiteHeaderCore, SiteFooterCore, TabNavigation, blog nav buttons, etc.)

**Steps**
1. Inventory every `data-tooltip` / `data-placement` usage (grep from G1-01).
2. **Replace tooltips** — options:
   - Native `title` attribute (zero-JS, but slow to appear, no styling).
   - Small hand-rolled CSS tooltip (uses `data-title` + `::after` on hover) — recommended, keeps the current hover interaction.
   - Skip tooltips entirely on mobile (they're hover-only anyway) — confirm with your design.
3. Remove `data-theme` handling from markup **after** Goal 3's modern theming is in (Goal 3 step 2 converts theme to `color-scheme` + `light-dark()`).
4. Keep `aria-*` attributes — those aren't Pico, they're accessibility.

**Validate:** `npm run check`; hover a few links/buttons on desktop to confirm tooltips still show.

**Estimate:** ~45min · **⚠** Don't delete `data-formkit-toggle` (Kit.com email-subscribe trigger) — that's a third-party integration, not Pico.

---

### G1-07 — Delete the CDN links
**Objective:** Remove Pico from the page entirely.

**Files**
- Modify: `src/app.html`

**Steps**
1. Remove both `<link rel="stylesheet" ... @picocss/pico@2 ...>` lines (pico.min.css + pico.colors.min.css).
2. Keep the RSS `<link>` and the Plausible script (`tracking.avanderw.co.za`) — those stay.
3. Remove `src/pico-css-override.css` and its import in `+layout.svelte` **only after** their overrides are folded into your tokens (G1-04) and base styles (G1-05).

**Validate:** dev server shows the site fully styled with no console 404s; `npm run build` succeeds; final bundle no longer references pico.

**Estimate:** ~15min · **⚠** This is the point of no visual-return — do it last and eyeball every route.

---

### G1-08 — Visual regression & cleanup
**Objective:** Prove the look survived without Pico.

**Steps**
1. Screenshot before/after (or use Playwright/Screenshot) for: `/`, `/stream`, `/sandbox`, `/books`, one blog post, `/web-components` — both **light & dark**.
2. Walk the Pico inventory list (G1-01) and tick off each item as resolved.
3. Remove dead CSS (`--pico-*` vars should be gone from the repo: `grep -r "pico-" src/` → only your own `pico-tokens.md` and `pico-css-override.css` removal).
4. Run `npm run check` and `npm run build` clean.

**Validate:** zero `--pico-*` refs in `src/`; visual diff ~none.

**Estimate:** ~1h · **⚠** Mobile screenshot too (iPhone-width) — the header will look cramped until Goal 2.

---

## Goal 2 — Improve the mobile experience

Current state (audited): the header is **one flex row** with THREE navs (breadcrumb + Stream/Sandbox/Books + theme/RSS/Subscribe) — genuinely long on mobile. Other mobile issues: no hamburger/sheet menu, sub-44px touch targets in blog nav & header (`padding: 0.25–0.5rem`, icons ~24px), header/footers `data-tooltip` are hover-only, tables and blog-post nav wrap awkwardly under ~576px, `container` width may squeeze content, and the `theme` init runs in `onMount` → possible FOUC. The web components (`site-header`, `site-footer`) share the same header issue.

### Goal 2 mini-board

| Board | Task |
|---|---|
| `[ ]` | **G2-01** — Mobile audit: capture the current pain points |
| `[ ]` | **G2-02** — Responsive header redesign (essentials bar + hamburger sheet, 768px) |
| `[ ]` | **G2-03** — Touch targets ≥ 24×24 (WCAG 2.2 AA) |
| `[ ]` | **G2-04** — Responsive tables |
| `[ ]` | **G2-05** — Horizontal overflow & fluid type sweep |
| `[ ]` | **G2-06** — Fix FOUC (theme init flash) |
| `[ ]` | **G2-07** — Same redesign for the two web components |
| `[ ]` | **G2-08** — Device-lab testing |

---

### G2-01 — Mobile audit: capture the current pain points
**Objective:** Evidence-based list of mobile problems before redesigning, using the agreed **single breakpoint: 768px** (replacing Pico's 576px default and the current `@media (orientation: portrait)` rule in `app.css`).

**Steps**
1. Open in devtools device mode at **360×640** and **375×812** widths. Capture screenshots of `/`, `/stream`, `/books`, one blog post.
2. Checklist: header wrapping/wrapping, icon+label crowding, readable font sizes, tables that overflow, blog-nav crowding (the `@media (max-width: 576px)` block in blog `[slug]`), footer contact links fitting, focus rings visible.
3. Test both light & dark and both orientations (portrait + landscape) — the current `app.css` uses `@media (orientation: portrait)` for 90% width, which can fight Pico's `container` width.
4. Record findings in `scripts/pico-tokens.md` (or a `MOBILE_AUDIT.md`).
5. **Locked decisions (owner input) — treat as fixed acceptance criteria:**
   - Breakpoint = **single 768px**; desktop layout applies above it.
   - Mobile header **trims to essentials** (home, theme toggle, subscribe pill + hamburger); the rest lives in the sheet.
   - **Keep lucide-svelte** — no inline-SVG rewrite.
   - Touch-target bar = **WCAG 2.2 AA (24×24px minimum)**.
   - The `site-header` / `site-footer` web components get the **same redesign**.
   Write these into every relevant mini-board so no task re-litigates them.

**Validate:** a written list with screenshots of each issue.

**Estimate:** ~45min

---

### G2-02 — Responsive header redesign (hamburger / compact nav)
### G2-02 — Responsive header redesign (hamburger / compact nav, trimmed to essentials)
**Objective:** Replace the 3-nav header with a mobile-friendly pattern at the **768px breakpoint**: the top bar keeps only the essentials (home, theme toggle, subscribe pill) + a hamburger opening a sheet with the rest. **Desktop (>768px) keeps the current nav row.**

**Files**
- Modify: `src/lib/components/SiteHeaderCore.svelte`

**Steps**
1. **Desktop (>768px):** keep logo/home, breadcrumb (page context), theme toggle; Stream/Sandbox/Books in one compact nav — no breadcrumb duplication.
2. **Mobile (≤768px):** the top bar shows **only the essentials** — home icon, theme toggle, subscribe pill (Kit trigger), and a hamburger (lucide `Menu` icon, ≥24px target). The hamburger opens a **slide-in sheet** (or full-screen) containing: Stream / Sandbox / Books / RSS + a close `X` (lucide `X` icon). Close on selection, `Escape`, or backdrop tap.
3. **Keep lucide-svelte as the icon source (decided)** — import `Menu` and `X` alongside the existing icons; no hand-rolled SVGs.
4. Implement with a Svelte `toggled` state; ensure the sheet is hidden from a11y (`aria-expanded` / `aria-hidden`) & keyboard-focusable (focus trap or sensible focus move on open/close).
4. Consider a **sticky** header (`position: sticky; top: 0`) — standard on mobile, reduces vertical reach.
5. Keep `SiteHeaderCore` as the source of truth — the web-component wrappers must not duplicate layout logic (see G2-07).

**Validate:** at 360px the header shows ≤1 row; sheet opens/closes correctly; no horizontal scroll.

**Estimate:** ~2–3h · **⚠** Svelte 5 event handling: the current component uses `createEventDispatcher`; keep the theme toggle dispatch contract working, or convert to idiomatic Svelte 5 callback props.

---

### G2-03 — Touch targets ≥ 44×44 / WCAG 2.2
### G2-03 — Touch targets ≥ 24×24 (WCAG 2.2 AA)
**Objective:** Make all tappable elements usable on touch; meet **WCAG 2.2 Target Size (Minimum) 24×24px AA** (decided bar). 44px is a bonus, not the gate: bump important controls to 44px only where it costs little.

**Files**
- Modify: header, footer, blog-nav buttons, tab links, subscribe pill (KitSubscribeTrigger), any other clickables

**Steps**
1. Audit with devtools: measure tap areas of every interactive element (header icons, breadcrumb links, blog prev/next buttons `min-width: 2.5rem; height: 2.5rem`, tab links `padding: 0.45rem 0.9rem`, subscribe pill, footer icons).
2. Bump any target < 24px: increase padding/min sizes; where visual size stays small, enlarge the **tap area** via padding or an `::after` overlay (keeps the visual design).
3. Watch spacing: WCAG 2.2 also penalizes adjacent targets whose effective size (including spacing) is < 24px (2.5.8). Header icons currently `gap: 0.25rem` — increase to ≥ 8px or ensure ≥ 24px effective tap.
4. Keep focus-visible rings on keyboard focus (don't remove for touch).
5. Re-measure on the 375px profile after header redesign (G2-02) — targets moved into the sheet.

**Validate:** every interactive element ≥ 44px (or ≥ 24px + spacing); tap through a full flow on touch emulation.

**Estimate:** ~1–2h · **⚠** The sheet menu must not shrink its own targets back below 44px.

---

### G2-04 — Responsive tables
**Objective:** Make the data tables (Stream, Sandbox, Career on `/`; `/books`, `/stream`, `/sandbox` pages) usable on phones instead of horizontal-scroll blobs.

**Files**
- Modify: `src/lib/components/BlogTable.svelte`, `CareerTable.svelte`, `ProjectsTable.svelte`, `SocialTable.svelte` + the hard-coded tables in `src/routes/+page.svelte`, `/books`, `/stream`, `/sandbox`

**Steps**
1. **Option A — card conversion (recommended):** at `<576px`, switch `table` → stacked cards (dates/roles as labels, description as full-width line). Reuse the `--space` tokens; keep the dotted separators.
2. **Option B — scroll container:** wrap in `overflow-x: auto` (minimal change, keeps table semantics).
3. **Semantics:** `table` is fine for a11y when responsive; if you switch to cards, preserve a logical reading order and keep the `sr-only` `thead` if you keep a table. `BlogTable`/`CareerTable`/`ProjectsTable` use Pico vars — tokens come from Goal 1.
4. Set `table { display: block; overflow-x: auto }` fallback for any table you don't convert.

**Validate:** no horizontal scroll on `/` at 360px; cards read logically in order.

**Estimate:** ~1–2h · **⚠** Don't break the `sr-only` thead used by screen readers.

---

### G2-05 — Horizontal overflow & fluid type sweep
**Objective:** Kill every `overflow-x` scroll and make type scale on small screens.

**Files**
- Modify: `src/app.css`, `+page.svelte`, blog `[slug]`, markdown styles (`MarkdownViewer.svelte`, `LawsOfSoftware.svelte`)

**Steps**
1. `html, body { overflow-x: hidden; max-width: 100% }` as a safety net (but investigate causes, don't mask them).
2. Replace hard-coded `14pt`/`16px` type with **fluid clamp**: `--font-body-size: clamp(1rem, 4vw, 1.4rem)` (adjust to taste) so tiny screens don't feel oversized. Revisit the `@media (orientation: portrait)` rule in `app.css` — it sets body width 90% which fights `.container`.
3. Check markdown content: long code blocks, wide mermaid diagrams (overflow), large KaTeX — set `pre { overflow-x: auto }`, `img/video { max-width: 100% }`, `table` (markdown) wrapping.
4. Blog summary grid already collapses to 1 col at 576px (good) — extend similar treatment to any 3-col grid on other pages.
5. Touch target pass on any newly-emerged controls.

**Validate:** at 320px & 360px, no page scrolls horizontally; text is readable without zooming.

**Estimate:** ~1h

---

### G2-06 — Fix FOUC (theme init flash)
**Objective:** Theme applies before paint; no flash of light/dark on load or refresh.

**Files**
- Modify: `src/routes/+layout.svelte`, `src/webcomponents/SiteHeader.svelte` (theme includes)

**Steps**
1. Extract theme logic into a shared module: `src/lib/stores/theme.ts` (single source of truth for `isDark`, `toggle`, init) — currently it's **duplicated** in `+layout.svelte` and `SiteHeader.svelte`.
2. In `app.html`, add an **inline `<script>` in `<head>`** (before CSS/JS) that sets `data-theme` from `localStorage` or `prefers-color-scheme`, `color-scheme`, and `--background` early. ~10 lines, no FOUC.
3. Keep the `toggleTheme()` in the shared store syncing `document.documentElement.dataset.theme` + `localStorage` — the inline script must **not** conflict on hydration (it only sets, doesn't overwrite a user's saved choice).
4. Add `(prefers-reduced-motion: reduce)` guard to any theme-transition CSS.

**Validate:** reload with dark preference / saved dark → dark paints immediately, no white flash; toggle persists across navigation.

**Estimate:** ~45min · **⚠** If you adopt Goal 3's `light-dark()` approach later, the inline script's job shrinks to setting the `color-scheme` — keep the module split so the later change is small.

---

### G2-07 — Apply the same fixes to the two web components
### G2-07 — Same redesign for the two web components
**Objective:** `site-header` and `site-footer` (the web-components build, used on other pages/sites) get the **same redesign** (decided): essentials bar + hamburger sheet at 768px, 24px AA targets, shared tokens.

**Files**
- Modify: `src/webcomponents/SiteHeader.svelte`, `src/webcomponents/SiteFooter.svelte`, `vite.webcomponents.config.ts` (build config)

**Steps**
1. `SiteHeader.svelte` currently has its **own** self-contained styles (hard-coded colors, its own 60%/90% width, its own theme toggle). Extract the shared pieces (nav, sheet, touch sizing) into a shared component/partial consumed by both the SvelteKit layout and the WC wrapper (feel free to refactor `SiteHeaderCore` to take a `mobile` prop).
2. The WC must keep its **shadow-DOM self-containment** — it can't rely on the site's `index.css` tokens. Copy the token set (or an `@import` of tokens.css into the WC build) so it looks right standalone.
3. Give the WC the same hamburger/sheet + 24px AA targets + FOUC-safe theme init (it already has `class:dark` logic).
4. Rebuild: `npm run build:wc` and verify `static/`/dist output has no broken links; update the `web-components` docs page if it documents the header.

**Validate:** the standalone `web-components` page renders the WC header correctly at mobile width, with sheet working.

**Estimate:** ~1–2h · **⚠** Don't forget: WC styles are per-component; the reset inside SiteFooter may already be missing tokens that Goal 1 removes — re-check after G1.

---

### G2-08 — Device-lab testing
**Objective:** Verify on real(ish) devices.

**Steps**
1. Devtools emulation: 320×568, 375×667/812, 768×1024, 1024×768, plus both orientations.
2. If available: real iPhone + Android phone; test `prefers-color-scheme` with OS light/dark.
3. Test keyboard nav (Tab through sheet), screen reader (NVDA/VoiceOver) on the sheet toggle.
4. Verify: no horizontal scroll, header ≤ 1 row, tables readable, touch targets ≥ 24px (AA), theme no-FOUC.

**Validate:** checklist all-green.

**Estimate:** ~1h

---

## Goal 3 — Improve the colour schemes (dark & light)

Current state (audited): themes toggle via `data-theme="dark|light"` on `<html>` — set in `+layout.svelte` **and** duplicated in `SiteHeader.svelte`. Colours are Pico's default palette + a green link override in `pico-css-override.css`. The web components define yet another independent 4-colour hard-coded scheme. **Confirmed direction: preserve the serif/Tufte identity; sea-green as the light-mode accent.** Opportunity: adopt modern CSS theming (`color-scheme` + `light-dark()`) so each colour is declared once, kill the duplicated theme logic, and add accessibility contrast fixes (incl. highlight.js, which currently forces `github-dark.css` even in light mode).

### Goal 3 mini-board

| Board | Task |
|---|---|
| `[ ]` | **G3-01** — Contrast audit of current light/dark palettes |
| `[ ]` | **G3-02** — Rebuild tokens with `color-scheme` + `light-dark()` |
| `[ ]` | **G3-03** — Fix highlight.js / KaTeX / Mermaid theming |
| `[ ]` | **G3-04** — Theme toggle UX polish |
| `[ ]` | **G3-05** — Verify & tune (contrast, both modes, browser fallbacks) |

---

### G3-01 — Contrast audit of current light/dark palettes
**Objective:** Measure today's contrast so the new palette is provably better.

**Files**
- Create: `scripts/contrast-audit.md` (log)

**Steps**
1. Record current values from G1-01 inventory: light background `#fff`? text, muted text, accent, borders; dark equivalents (Pico slate + green `--pico-color-green-350`).
2. Compute WCAG contrast ratios (tools: WebAIM Contrast Checker, `@fontsource/x` style calculators, or Chrome devtools computed styles + a contrast snippet):
   - body text vs background (target ≥ 4.5:1)
   - muted text vs background (≥ 4.5:1 for small text)
   - **link/accent vs background** (green-400 `#00a050`-ish on white is known to be borderline ~3:1 — the big offender)
   - accent vs background in **dark** mode (green-350 on dark slate)
   - accent vs background on hover states; `--pico-primary-inverse` (text on accent buttons)
3. Note any failure against WCAG AA. The sea-green accent will likely need darkening in light mode (`#2d8a6e` ≥ 4.5:1 on white is roughly the threshold; verify) and lightening in dark mode.

**Validate:** table of before ratios with pass/fail flags.

**Estimate:** ~30min

---

### G3-02 — Rebuild tokens with `color-scheme` + `light-dark()`
**Objective:** Declare each colour **once** per theme using the modern `light-dark()` function; set the theme with a single `color-scheme` property. (Pico's `data-theme` blocks disappear.)

**Files**
- Modify: `src/lib/styles/tokens.css` (from Goal 1), the theme init/toggle module (G2-06), `src/webcomponents/SiteHeader.svelte`

**Steps**
1. **`color-scheme` on root:**
   ```css
   :root { color-scheme: light dark; }          /* follow OS by default */
   :root[data-theme="light"] { color-scheme: light; }  /* user override */
   :root[data-theme="dark"]  { color-scheme: dark; }
   ```
2. **Tokens via `light-dark()` (one definition each):**
   ```css
   :root {
     --color-bg:     light-dark(#ffffff, #1b1f1f);
     --color-surface: light-dark(#ffffff, #232829);
     --color-text:   light-dark(#1e1e1e, #e6e8e7);
     --color-muted:  light-dark(#6a6a6a, #9aa3a1);
     --color-border: light-dark(#e0e0e0, #3a4140);
     --color-accent: light-dark(#2d8a6e, #5cbda0);          /* sea green */
     --color-accent-hover: light-dark(#23705a, #6fcbb0);
     --color-accent-contrast: light-dark(#ffffff, #0f1412); /* text on accent buttons */
   }
   ```
   Now the `[data-theme="dark"] { … }` blocks in G1-04 become unnecessary — `light-dark()` resolves by the root `color-scheme`. (This is supported in all modern browsers as of 2024–2026; fall back to the `[data-theme]` block if you must support legacy — optional.)
3. Update every component that referenced `--pico-*` to use these tokens (they already did post-G1-04, now the variables auto-switch).
4. **Migrate the web components:** the WC's own hard-coded palettes (`--color-text`, `--color-border` etc. in SiteHeader) become `light-dark()`-based too, so it stops drifting from the main site. Keep the `class:dark` as the override (`color-scheme: dark`), or reuse `[data-theme]`.
5. **Mermaid:** `MarkdownViewer.svelte` currently sets `mermaidTheme: 'dark' | 'default'` — wire it to the active scheme (it already has a `themeObserver` — extend it to set `startOnLoad` theme based on `data-theme` or `color-scheme`).

**Validate:** toggle light/dark — every colour flips correctly; no `[data-theme]` colour blocks remain; `npm run check` passes.

**Estimate:** ~2h · **⚠** `light-dark()` requires the element to inherit `color-scheme` — confirm nothing sets `color-scheme` locally (e.g. `prefers-color-scheme` media in `pico-css-override.css` is deleted; note the web components set `color-scheme` inside shadow DOM — verify it propagates, or set it per-component).

---

### G3-03 — Fix highlight.js / KaTeX / Mermaid theming
**Objective:** Code blocks & math follow the site theme (fixes today's always-dark highlight.js and inherits the new palette).

**Files**
- Modify: `src/lib/components/MarkdownViewer.svelte`

**Steps**
1. highlight.js: currently `import 'highlight.js/styles/github-dark.css'` unconditionally → **dark code blocks even in light mode**. Replace with a **combined theme** (`highlight.js/styles/github.css` + `github-dark.css`, guarded by `@media (prefers-color-scheme: dark)` or `:root[data-theme]`) — or import both and scope by `[data-theme]`. Pick light-compatible token colors that match the palette.
2. KaTeX: `katex.min.css` is theme-agnostic; ensure formula text color uses `currentColor` (it inherits from `.katex` — fine once body color follows the theme).
3. Mermaid: only render diagrams in the active mode; the `themeObserver` should re-render on toggle or at least set the initial theme from `data-theme`/`color-scheme` (this ties into G3-02 step 5).
4. Contrast-check code text (github themes have good defaults; verify against your `--color-bg`).

**Validate:** a markdown post with code + a mermaid diagram + KaTeX renders correctly in both modes, no hard-dark blocks in light mode.

**Estimate:** ~1h · **⚠** `github-dark.css` import is a hard `<link>`-like import; keep the dark variant for dark mode, don't just delete it.

---

### G3-04 — Theme toggle UX polish
**Objective:** Smooth, obvious, correctly-persisted theme switching.

**Files**
- Modify: theme store (`src/lib/stores/theme.ts`), `SiteHeaderCore.svelte`, `SiteFooterCore.svelte` (if it has a toggle), `+layout.svelte`

**Steps**
1. Keep `localStorage` + `prefers-color-scheme` fallback (already working) **but** handle the case of a user who toggles to `light` (explicit choice) — persist that, don't re-evaluate `prefers-color-scheme` on every load (the current `initializeTheme` re-runs `prefersDark` when saved is missing — good; just ensure saved `light` isn't overridden by system dark).
2. **Sync across tabs:** listen to `storage` events so toggling in one tab updates others (small addition to the shared store).
3. **No flash on toggle:** avoid `transition: background/color` flashing when switching — guard transitions behind `@media (prefers-reduced-motion: no-preference)` or a `no-transition` class on toggle. (Pico/demo sites often forget this; your `MarkdownViewer` already watches theme via `MutationObserver`.)
4. Consider exposing the toggle in the footer too (currently only header); keep both in sync via the store.
5. Add `aria-label` / `aria-pressed` to the toggle button (currently uses `title` + icon).

**Validate:** tab-sync works, toggle persists, no flash on load or toggle, `aria` states correct.

**Estimate:** ~1h

---

### G3-05 — Verify & tune (contrast, both modes, browser fallbacks)
**Objective:** Ship a palette that passes AA and degrades gracefully.

**Steps**
1. Re-run the contrast audit (G3-01) with the new palette; fix any failures (especially accent/link contrast in light mode — darken `#2d8a6e` if needed).
2. Visual pass: `/` + blog post + `web-components` page in both modes at desktop & mobile.
3. **Browser fallbacks:** `light-dark()` unsupported → for non-modern browsers, provide the `@media (prefers-color-scheme: dark)` / `[data-theme="dark"]` override blocks as a progressive enhancement (or accept modern-only — document the decision; Pico v3 is also moving to `light-dark()` so this is the ecosystem direction).
4. Lighthouse accessibility + performance (removing CDN CSS drops requests; check Contrast = AA, no-CLS).
5. Note colour-blind safety: sea-green accent — add an underline to links in addition to colour (Tufte-style sites often do; also helps WCAG 1.4.1 Use of Color).

**Validate:** AA on all text; both modes pass visual review; Lighthouse a11y ≥ 95.

**Estimate:** ~1h

---

## Suggested execution order

1. **Goal 1** first (foundation): G1-01 → G1-02 → G1-03 → G1-04 → G1-05 → G1-06 → G1-07 → G1-08.
2. **Goal 3** next (theme work depends on Goal 1's tokens): G3-01 → G3-02 → G3-03 → G3-04 → G3-05.
3. **Goal 2** last (mobile changes rest on the new tokens + theme): G2-01 → G2-02 → G2-03 → G2-04 → G2-05 → G2-06 → G2-07 → G2-08.

Why: Goal 1 replaces the CSS foundation; Goal 3 reworks the same tokens (do it while the token file is fresh); Goal 2's responsive header & tables touch the same components — cleanest last. You can reorder if you'd rather fix mobile first; just don't run G1-07 (delete CDN) before G1-01..G1-06 are done.

## Key risks & mitigations

- **Visual drift:** keep `pico-css-override.css` + CDN until G1-07, screenshot before every step (G1-08).
- **Table styling loss** (Pico handles lots of table chrome): G1-05 + G2-04 explicitly re-create it.
- **highlight.js hard-dark import:** isolated, but easy to miss when testing — covered by G3-03.
- **FOUC + duplicated theme logic in WCs:** G2-06/G3-02 centralize it; the WCs can't share the app's styles, so they get their own token copy.
- **Light-dark browser support:** modern-only (all evergreen 2024+); fallback blocks if needed (G3-05).

## Confirmed decisions (owner input)

| # | Decision | Answer |
|---|---|---|
| 1 | Breakpoint | **Single 768px** — mobile layout at ≤768px; replaces Pico's 576px default and the `orientation: portrait` width rule in `app.css` |
| 2 | Mobile header content | **Trim to essentials** — home, theme toggle, subscribe pill stay visible; Stream/Sandbox/Books/RSS move into the hamburger sheet |
| 3 | Icons | **Keep lucide-svelte** — add `Menu`/`X` for hamburger & sheet; no inline-SVG rewrite |
| 4 | Touch-target bar | **WCAG 2.2 AA minimum (24×24px)** plus the 2.5.8 spacing rule; 44px only as a bonus |
| 5 | Web components | **Same redesign** — `site-header`/`site-footer` get the identical compact header, sheet, and tokens |

These are already folded into the tasks above — treat them as fixed acceptance criteria, not open questions.
