# Quality gates: accessibility and visual review

Board C added repeatable checks for the site's reading experience. Run these after changes to layout, typography, navigation, colour tokens, article rendering, or theme behaviour.

## Prerequisites

```bash
npm install
npx playwright install chromium
```

Playwright and axe-core are project dev dependencies. The browser download is per machine and is not committed.

## Standard local review

1. Run the static/type gate.

   ```bash
   npm run check
   npm run build
   ```

2. Serve the production build in one terminal.

   ```bash
   npm run preview -- --port 4175
   ```

3. Run the accessibility and contrast audit in another terminal.

   ```bash
   npm run a11y -- http://localhost:4175
   ```

   The audit checks Home, Stream, a long markdown article, Laws of Software, Books, and Sandbox in light and dark themes. It runs axe-core with WCAG 2 A/AA and WCAG 2.1 AA tags, and verifies the custom token colour pairs against WCAG AA contrast thresholds. Critical or serious axe findings, or a failed token contrast pair, return a non-zero exit code.

4. Capture screenshots for visual comparison.

   ```bash
   npm run shots -- http://localhost:4175
   ```

   This writes screenshots to `shots/` (gitignored) for Home, Stream, a long article, Laws, Books, and Sandbox at 390px, 768px, 1280px, and 1440px, in light and dark themes.

## Review checklist

When comparing a new screenshot set with a known-good one, check:

- The article title, metadata, deck, summary, and first paragraph remain visible and correctly ordered above the fold.
- Prose has a stable reading measure; large screens show the TOC rail without compressing body copy.
- Small screens use the expandable TOC rather than the desktop rail.
- Tables scroll inside their own regions where needed; the page itself never gets horizontal scrolling.
- Header and mobile navigation remain legible, and controls do not overlap at narrow widths.
- Light and dark theme text, links, controls, code, Mermaid labels, and focus states retain legibility.

## Approving intentional visual changes

The `shots/` directory is deliberately ignored: screenshots are review artefacts, not a permanent binary source of truth. For a deliberate visual change:

1. Capture a fresh set with `npm run shots`.
2. Inspect the affected viewport/theme combinations.
3. Mention the accepted visual change in the commit or pull request description.
4. Re-run `npm run a11y` before merging.

## Typography delivery

The production font is self-hosted `et-book` in `static/fonts/` as WOFF2. `fonts.css` uses `font-display: swap`, so content remains visible immediately with the Palatino/Georgia fallback stack while the face loads. The font license is retained at `static/fonts/LICENSE-et-book.txt`.
