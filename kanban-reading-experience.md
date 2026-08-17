# Kanban — Reading Experience, Typography & Layout Review

**Scope:** a desktop-first, text-heavy personal site and blog.  This board prioritises sustained reading over decoration: clear hierarchy, a stable reading measure, generous whitespace, accessible contrast, and navigation that does not pull attention from the article.

**Status:** review completed against the current codebase on 12 August 2026. This is a *new* board: `kanban-pico-migration.md` has already delivered the token system, Pico removal, custom theme, responsive navigation, and the first readable-measure pass.

> **Legend:** `[ ]` To do · `[~]` In progress · `[x]` Done
>
> **Definition of done for every UI task:** keyboard check at desktop and mobile widths; `npm run check`; `npm run build`; manually inspect both light and dark themes.

---

## Executive assessment

### What is already strong

- **The foundation is sound.** The site now uses a custom reset and token system (`reset.css → tokens.css → index.css`), not an opaque CSS framework.
- **Typography starts from a good baseline.** Serif body stack; `14pt` / approximately `18.7px` desktop base; `1.5` base line-height; muted copy and code have separate tokens.
- **The prose measure is already guarded.** Global `p, li { max-width: 65ch; }` aligns with the 50–75 character reading range and is exactly the right principle for long-form content.
- **Colour and interaction fundamentals are good.** Light/dark themes use central tokens, body text is high contrast, the sea-green accent meets AA for normal link text, focus is visible, and reduced motion is respected.
- **Content tools are thoughtful.** The article summary, reading-time metadata, share action, generated table of contents, syntax highlighting, Mermaid, and KaTeX make long technical posts easier to scan.

### The main UX gap

The page shell is **72rem / 1152px wide**, while the actual prose is capped at **65ch**. This avoids excessively long individual paragraphs, but it also makes the article surface, summary and navigation span much wider than the text. On a desktop this creates an unfocused reading canvas: the reader’s eye starts in a broad page shell, then has to find a narrow left-aligned text column. The site needs an explicit **article layout**, not just a global paragraph cap.

---

## Research baseline (decisions for this board)

| Topic | Recommendation | Project decision |
|---|---|---|
| **Line length / measure** | 50–75 characters per line; about 66 is a commonly cited optimum. Longer measures make it hard to find the next line; shorter measures interrupt reading rhythm. | Keep body copy between **60–68ch**. Use **65ch** as the default article copy measure. |
| **Desktop article width** | A `ch` limit adapts to the actual typeface, unlike a fixed pixel width. With this site’s ~18.7px body size, 65ch will generally land around **650–750px**. | Give article prose its own `max-width: 65ch`; centre it or pair it deliberately with a TOC rail on wide screens. The 72rem shell remains appropriate for indexes/tables and future multi-column views. |
| **Body size** | For extended desktop reading, 16–18px+ is commonly recommended; users must retain browser zoom control. | Current **14pt (~18.7px)** is acceptable. Do not reduce it. Verify the actual loaded serif font and set a robust fallback. |
| **Line height** | At least 1.5 for body text; 1.55–1.7 is typically more comfortable for long serif prose. | Raise article prose only to **1.6–1.65** after visual comparison; retain tighter leading for headings and compact UI. |
| **Paragraph rhythm** | Space *between* paragraphs should be visibly greater than the leading within a paragraph; use a consistent scale, not random margins. | Use a defined `--space-prose` token (likely 1.1–1.35rem) and apply it only in article prose. |
| **Hierarchy** | Meaning must be clear without relying on italics, colour or font size alone. Heading sizes, spacing before/after, and weight must create landmarks. | Establish a responsive heading scale for markdown (`h1`–`h4`) and evaluate whether global italic `h2` supports or weakens scanning. |
| **Contrast and links** | Normal text should meet WCAG AA (4.5:1); links need more than colour alone wherever surrounding text can make them ambiguous. | Maintain existing text/accent tokens, verify all muted and dark-theme values, and add a non-colour link affordance in article copy. |

**Sources consulted**
- Baymard Institute, *Readability: The Optimal Line Length* — body-text measure of **50–75 characters**.
- UXPin, *Optimal Line Length for Readability* — 50–75 CPL; ~66 CPL as a practical target.
- Inclusive Web, *Accessible Typography & Font Guidelines* — at least **1.5×** line height and paragraph separation greater than within-paragraph leading.
- WCAG 2.x contrast and text-spacing guidance — preserve zoom/reflow, sufficient contrast, and user-readable spacing.

---

# Board A — Must improve: article reading layout

| Board | Task |
|---|---|
| `[x]` | **R1** — Create an explicit article-shell/prose layout |
| `[x]` | **R2** — Make article typography independent of generic UI typography |
| `[x]` | **R3** — Rework the above-the-fold article sequence |
| `[x]` | **R4** — Improve article navigation hierarchy and reduce duplicate chrome |
| `[x]` | **R5** — Make the table of contents a desktop reading aid |
| `[x]` | **R6** — Test real reading layouts at desktop, laptop, tablet, and mobile widths |

## R1 — Create an explicit article-shell/prose layout

**Why:** `main.container` is 72rem, article cards fill the whole shell, and only `p`/`li` are capped at 65ch. Headings, TOC, code, summary, and card surfaces therefore occupy different measures. This makes the page feel wider than the reading column and leaves the reading start point visually ambiguous.

**Files:** `src/routes/blog/[slug]/+page.svelte`; `src/lib/components/MarkdownViewer.svelte`; `src/lib/styles/tokens.css`; `src/lib/styles/index.css`.

**Implementation outline**
1. Add semantic wrapper classes such as `.article-shell`, `.article-prose`, and `.article-wide` rather than relying on global `p, li` selectors.
2. Keep `.container { max-width: 72rem; }` for pages with tables/indexes.
3. Make article prose `max-width: 65ch`; set `margin-inline: auto` if no rail is shown.
4. Keep full-width elements intentional: code blocks, wide data tables, Mermaid diagrams, and TOC can use an `.article-wide` breakout constrained to the article shell, with horizontal overflow available where needed.
5. Remove generic card treatment from the long-form article if it competes with the reading surface: either use a borderless prose area or a restrained background/border that visually groups without boxing every page.

**Accept:** On a 1440px viewport, paragraph and heading left edges align; body copy remains 60–68ch; wide technical material remains readable and does not create document-level horizontal scrolling.

---

## R2 — Make article typography independent of generic UI typography

**Why:** `index.css` currently applies the same heading margins and `1.5` line height to every context: home page, tables, summaries, and long markdown. Long-form content needs its own rhythm.

**Files:** `src/lib/styles/tokens.css`; `src/lib/components/MarkdownViewer.svelte`.

**Implementation outline**
1. Add semantic type tokens: `--font-size-body`, `--line-height-prose`, `--measure-prose`, `--space-prose`, and a responsive heading scale (`clamp()` where appropriate).
2. Scope `.markdown-content` body copy to `line-height: 1.6` or `1.65` and set clear paragraph/list spacing. Preserve 1.5 for dense interface/table content.
3. Define heading spacing as a pair: generous margin before a new section and smaller margin after it; prevent a heading from being stranded at the bottom of a viewport where practical (`break-after: avoid` / `break-inside: avoid` as tested).
4. Set `text-wrap: pretty` for headings if browser support and visual testing are satisfactory; do not apply balancing to all body paragraphs.
5. Review the global italic `h2`: keep it only if it helps distinguish editorial subheads; otherwise use weight/size/spacing for hierarchy. Do not make this a blanket visual change without comparing an actual post.

**Accept:** A representative 5+ minute article has visibly stronger section landmarks and calm paragraph rhythm, with no cramped lists or oversized gaps.

---

## R3 — Rework the above-the-fold article sequence

**Why:** The current order is: large icon navigation → summary card → article card → collapsible TOC → title in markdown. The reader reaches article context/title later than necessary, while the controls receive the first visual emphasis.

**Files:** `src/routes/blog/[slug]/+page.svelte`; potentially `MarkdownViewer.svelte`.

**Implementation outline**
1. Render a dedicated article header before controls: title, date, read time, and one-sentence deck/description.
2. Place `Article Summary` after the header as an optional scannable block, not as the only initial editorial context.
3. Place TOC immediately after the header/summary for medium-length posts; hide it when posts are too short to benefit (define a heading-count threshold).
4. Move post-to-post controls to a visually quieter position or use textual “Previous article / Next article” links with titles. Keep Share available but subordinate.
5. Avoid duplicating a visible H1 in markdown and in the page header: either suppress the first markdown H1 after using it as metadata or make the markdown renderer responsible for the one canonical title.

**Accept:** Within the first viewport, a reader sees the post title, purpose, date/read time, and a clear route into the article; they do not need to parse icon controls to understand the page.

---

## R4 — Improve article navigation hierarchy and reduce duplicate chrome

**Why:** Both top and bottom navigation use five icon-heavy controls plus a counter. At desktop width it is usable, but visually dense for an editorial page and disconnected from the actual neighbouring titles.

**Files:** `src/routes/blog/[slug]/+page.svelte`.

**Implementation outline**
1. Replace “first/previous/next/last” icon cluster with the minimum useful controls: back to Stream, previous, next, share.
2. On desktop, use text labels and neighbouring article titles for previous/next; maintain accessible names and a compact fallback on mobile.
3. Keep only one full control set (bottom is usually most useful); at top retain a quiet back link/share if testing confirms it helps.
4. Ensure target size remains at least 44×44 CSS px on touch layouts; current small-screen 2rem controls do not meet that target.

**Accept:** Navigation supports keyboard and touch, communicates destination before activation, and no longer dominates the article’s visual hierarchy.

---

## R5 — Make the table of contents a desktop reading aid

**Why:** The redesigned TOC has a strong visual treatment and good nesting. It is currently inside a collapsed `<details>` element, so desktop readers must explicitly open it and it does not aid orientation while reading.

**Files:** `src/lib/components/MarkdownViewer.svelte`.

**Implementation outline**
1. Retain the current expandable TOC on narrow screens.
2. Prototype a wide-screen layout with a sticky TOC rail beside `.article-prose` once the article-shell grid exists. Use `position: sticky` with a sensible top offset and max-height/overflow behavior.
3. Add active-section indication with `IntersectionObserver`; respect `prefers-reduced-motion` and do not auto-scroll unexpectedly.
4. Keep it keyboard accessible and preserve the current anchor links. Ensure the TOC has a meaningful heading/label when rendered outside `<details>`.
5. Do not force a rail on short posts or when viewport width cannot retain 60ch of prose.

**Accept:** On a typical 1440px desktop article, section navigation remains available without shrinking the prose below its 60–68ch measure. Mobile retains a simple disclosure.

---

## R6 — Test real reading layouts at desktop, laptop, tablet, and mobile widths

**Why:** CSS values are only assumptions until they are checked with an actual representative article containing lists, code, tables, a Mermaid diagram, and multiple sections.

**Test matrix:** 320px, 390px, 768px, 1024px, 1280px, 1440px; light and dark themes; 200% browser zoom at desktop width.

**Checklist**
- No horizontal document scrolling; code/tables can scroll inside their own region.
- Prose remains 60–68ch from laptop through wide desktop; it becomes fluid with safe gutters on smaller viewports.
- Header/nav wraps without overlap; 44px touch targets on mobile.
- Heading hierarchy is clear; no collisions with sticky TOC/header.
- Text, muted text, links, focus ring, borders, and code theme retain adequate contrast in both themes.
- Browser zoom/reflow retains all content and action controls.

**Accept:** Capture before/after screenshots for a representative post and log any unresolved issues in this board.

---

# Board B — Important: index, navigation, spacing and content scanning

| Board | Task |
|---|---|
| `[x]` | **S1** — Separate list/table layouts from prose defaults |
| `[x]` | **S2** — Establish page-level vertical rhythm |
| `[x]` | **S3** — Improve stream scanning and search feedback |
| `[x]` | **S4** — Audit responsive header and mobile menu focus behaviour |
| `[x]` | **S5** — Consolidate component-local spacing and type values into tokens |

## S1 — Separate list/table layouts from prose defaults

**Why:** The global `p, li { max-width: 65ch; }` protects reading text but also affects all lists, including navigation or future structured content. Tables are allowed to span the 72rem shell while their descriptions cap separately, producing inconsistent column alignment at wide widths.

**Files:** `src/lib/styles/index.css`; `BlogTable.svelte`; home page; other route components.

**Implementation outline**
1. Replace global `p, li` width rule with `.prose p, .prose li` (or equivalent article-oriented scope).
2. Give index descriptions a separate token/measure, e.g. `--measure-list-copy`, and set table column widths intentionally.
3. On narrow screens, choose an explicit table pattern: horizontal scroll wrapper, stacked records, or selectively hidden low-priority columns. Do not rely on accidental table compression.
4. Check all routes (Stream, Books, Sandbox, Stack) after the scoping change.

**Accept:** Article rules do not unintentionally constrain navigation/lists; index screens scan cleanly at 320px and 1440px.

---

## S2 — Establish page-level vertical rhythm

**Why:** The token scale exists, but many component styles use one-off `1rem`, `1.25rem`, `1.5rem`, `2rem`, `2.5rem`, and `3rem` values. The result can feel inconsistent even when each component is individually reasonable.

**Files:** route/component styles; `tokens.css`.

**Implementation outline**
1. Define a small semantic spacing vocabulary: page top/bottom, section gap, prose paragraph gap, component inset, compact metadata gap.
2. Map one-off values to tokens where they express the same relationship.
3. Add rules for adjacent sections and headings rather than repeatedly setting margins in each component.
4. Keep intentional exceptions documented (TOC, code blocks, wide diagrams).

**Accept:** The home page, Stream listing, and a post share a recognisable spacing cadence. CSS inspection finds fewer unexplained raw spacing values.

---

## S3 — Improve stream scanning and search feedback

**Why:** The Stream/table format is information-dense and sensible. Date, read time, title, and description are visually close in size, however, and search has no results state only after typing.

**Files:** `src/lib/components/BlogTable.svelte`; `src/routes/stream/+page.svelte`; home page listing.

**Implementation outline**
1. Establish hierarchy: title strongest, description secondary, date/read time tertiary but legible (do not go below 0.875rem for important metadata at desktop).
2. Increase vertical separation between records enough to scan without turning the list into cards.
3. Add result count/search clear affordance and a visible focus state for the search field.
4. Verify tables remain semantic, headers are available to assistive technology, and sort/order is obvious.

**Accept:** A reader can find a post by title/date/topic quickly; metadata remains readable at 200% zoom and on mobile.

---

## S4 — Audit responsive header and mobile menu focus behaviour

**Why:** The component offers a well-considered mobile sheet and Escape close action. It sets `aria-modal="true"`, but does not visibly trap focus, restore focus to the hamburger after close, or prevent focus from reaching the page behind the sheet.

**Files:** `src/lib/components/SiteHeaderCore.svelte`.

**Implementation outline**
1. Move focus into the sheet when it opens; trap it while open; restore focus to the trigger when it closes.
2. Prevent background content from being tabbable (use `inert` where suitable, with a compatible fallback).
3. Close the sheet on in-sheet navigation and verify Escape/backdrop behaviours.
4. Test with keyboard only and a screen reader if available.

**Accept:** A keyboard user cannot tab behind the open modal and returns to the menu button on close.

---

## S5 — Consolidate component-local spacing and type values into tokens

**Why:** Base values are tokenised, but several components still use hard-coded typography/spacing and direct font stacks (`MarkdownViewer`, post controls, tables). This will make a typographic refresh expensive and risks drift.

**Files:** `tokens.css`; `MarkdownViewer.svelte`; blog page; BlogTable; home page; SiteHeaderCore.

**Implementation outline**
1. Inventory raw `rem`, font-size, line-height, and colour values in `.svelte` style blocks.
2. Replace repeated values with the semantic tokens introduced in R2/S2.
3. Keep direct values only when they are component-specific and documented (e.g. TOC number gutter).
4. Add no new colour literals outside tokens; replace the TOC error red with a semantic status token.

**Accept:** Global typography/spacing adjustment requires touching tokens first, not hunting across components.

---

# Board C — Quality gates and accessibility hardening

| Board | Task |
|---|---|
| `[x]` | **Q1** — Run automated accessibility and contrast checks |
| `[x]` | **Q2** — Verify typography loading and fallback quality |
| `[x]` | **Q3** — Add visual-regression review for core pages |
| `[x]` | **Q4** — Resolve code-quality drift discovered in the review |

## Q1 — Run automated accessibility and contrast checks

**Scope:** home, Stream, a long post with TOC/code/diagram, Books, Sandbox; light and dark modes.

**Implementation outline**
1. Add an automated axe/Lighthouse route check (Playwright is a good fit in this Svelte/Vite project) or document a repeatable manual tool workflow.
2. Validate colour pairs including muted text (`#6a6a6a` / `#9aa3a1`), accent links, text on accent, borders, code theme, TOC header, disabled controls and focus indicators.
3. Fix heading-order, landmark, form-label, button-name, and target-size issues found by the audit.
4. Treat contrast/keyboard failures as blockers for R1–R5/S3–S4 completion.

**Accept:** No critical/serious axe findings on core routes; each custom colour pair has a documented contrast result.

---

## Q2 — Verify typography loading and fallback quality

**Why:** `et-book` leads the font stack but the repository review did not establish whether it is actually loaded/self-hosted. If it is absent, readers see Palatino/Georgia; that may be acceptable but should be intentional and tested.

**Files:** `src/app.html`; `static/`; font-related CSS.

**Implementation outline**
1. Confirm whether `et-book` is available on production and how it is delivered.
2. If self-hosting, use WOFF2, `font-display: swap`, and preload only the required faces.
3. If it is not deliberately served, remove it from the leading stack or document the fallback choice.
4. Compare line breaks/measure in the intended font and the primary fallback; adjust `--measure-prose` only if necessary.

**Accept:** No invisible-text flash; the typography chosen in design is what a production reader actually receives.

---

## Q3 — Add visual-regression review for core pages

**Why:** This site is CSS-led and layout changes can regress the reading experience without failing `svelte-check` or production build.

**Implementation outline**
1. Choose screenshot tooling that works in CI (Playwright recommended).
2. Capture home, Stream, a representative long post, and mobile header/menu at the test matrix’s key breakpoints.
3. Run comparison in light and dark themes.
4. Document a small approved-change workflow so visual diffs are reviewed rather than ignored.

**Accept:** Layout changes to reading width, headings, TOC, navigation, or theme produce a reviewable visual artifact in CI/local development.

---

## Q4 — Resolve code-quality drift discovered in the review

**Why:** The blog page has uneven indentation in its import/helper block and repeats navigation markup. It is not currently a functional defect (`npm run check` passes), but it increases risk during the layout work.

**Files:** `src/routes/blog/[slug]/+page.svelte` and any extracted component.

**Implementation outline**
1. Reformat the file with the project’s formatter configuration without mixing it with a major visual change.
2. Extract repeated post-navigation markup into a small typed component if R4 retains shared top/bottom behaviour.
3. Keep the component API semantic (previous/next labels and destinations) rather than passing only icon callbacks.
4. Keep `npm run check` and build clean after refactor.

**Accept:** Article layout code is legible, duplicated navigation is eliminated or deliberately documented, and no unrelated formatting churn enters R1–R5 commits.

---

## Suggested delivery order

1. **R1 → R2 → R3**: establish the actual reading canvas and editorial hierarchy first.
2. **R6 + Q1**: test the new foundation before adding sticky or interactive behaviour.
3. **R4 → R5**: make navigation and TOC serve the new layout.
4. **S1 → S3 → S5**: bring index pages and CSS architecture into alignment.
5. **S4 → Q2 → Q3 → Q4**: harden interaction, assets, regression coverage, and maintainability.

## Explicit non-goals

- Do not add decorative gradients, card-heavy design, animations, or large imagery merely to make the site feel more “modern.” They would dilute the editorial goal.
- Do not reduce body type to fit more on screen. Long-form comfort is the priority.
- Do not replace the existing custom theme/token work; improve it incrementally.
- Do not make one layout serve everything: wide structured indexes and narrow prose can coexist under the same 72rem shell.

---

## Baseline evidence from this review

| Area | Current implementation | Assessment |
|---|---|---|
| Shell | `.container { max-width: 72rem; padding-inline: 1rem; }` | Good for indexes; too broad as the only article surface. |
| Prose | `p, li { max-width: 65ch; }` | Correct measure value, but needs article-specific scoping/layout. |
| Base type | Serif stack, 14pt, line height 1.5 | Strong starting point; add a more relaxed *prose-only* rhythm. |
| Heading system | 400 weight, h2 italic, shared `margin: 2rem 0 1rem` | Needs an editorial hierarchy/rhythm review. |
| Article UI | Nav → summary → article card → TOC → markdown H1 | Context/title appears too late; controls lead the page. |
| TOC | Rich numbered nested design within `<details>` | Good visual component; promote it to a contextual desktop aid after shell work. |
| Theme | Tokenised light/dark with AA sea-green accent | Strong; run complete component contrast audit before declaring done. |
| Mobile nav | Responsive sheet, Escape close, 40px header controls | Good start; modal focus management and 44px touch target need attention. |
| Code/layout maintainability | Tokens exist; components retain raw values | Consolidation will reduce styling drift. |

**Created:** 12 August 2026
