# Contrast Audit — light & dark palettes (Goal 3, G3-01)

Computed with the WCAG 2.x relative-luminance formula. Norms:
- **Normal text:** ≥ 4.5:1 (AA) · **Large text** (≥18.66px bold / ≥24px): ≥ 3:1 (AA)
- **Non-text UI / borders:** ≥ 3:1 (best practice; decorative low-contrast borders are a common, tolerated design choice)

## Light mode (background `#ffffff`)

| Token | Value | Ratio | Verdict | Action |
|---|---|---|---|---|
| `--color-text` | `#1e1e1e` | 16.67 | ✅ PASS | keep |
| `--color-muted` | `#6a6a6a` | 5.41 | ✅ PASS | keep |
| `--color-border` | `#e0e0e0` | 1.32 | ⚠ decorative only | keep (note) |
| `--color-accent` | `#2d8a6e` | **4.22** | ⚠ large-only | **darken → `#2a7f66` (4.85)** |
| `--color-accent-hover` | `#23705a` → `#236b55` | 5.94 | ✅ PASS | darken slightly |
| `--color-accent-contrast` (on accent) | `#ffffff` on `#2a7f66` | 4.25 | ⚠ large-only (button text ~14px: border) | bump to ≥4.5 or rely on bold button text |
| `--color-surface` | `#ffffff` | — | ✅ | keep |

**Fixes applied:** light accent darkened `#2d8a6e → #2a7f66` (4.85:1, small-text AA). Hover `#23705a → #236b55` (5.94:1).

**Note:** `--color-border` at 1.3:1 is below the 3:1 non-text norm but is only decorative separators (section rules, dotted table rows). Deepening to hit 3:1 would look heavy; kept by design — log it as a known trade-off.

## Dark mode (background `#1b1f1f`)

| Token | Value | Ratio | Verdict |
|---|---|---|---|
| `--color-text` | `#e6e8e7` | 13.52 | ✅ PASS |
| `--color-muted` | `#9aa3a1` | 6.44 | ✅ PASS |
| `--color-border` | `#3a4140` | 1.59 | ⚠ decorative only |
| `--color-accent` | `#5cbda0` | 7.32 | ✅ PASS |
| `--color-accent-hover` | `#6fcbb0` | 8.59 | ✅ PASS |
| `--color-accent-contrast` (on accent) | `#0f1412` on `#5cbda0` | 8.18 | ✅ PASS |
| `--color-surface` | `#232829` | — | ✅ |

Dark side is fully AA-compliant — no changes needed.

## Reference — Pico's former defaults

| Color | Use | Ratio (on bg) | Verdict |
|---|---|---|---|
| Pico `green-400 #00a050` | light accent | 3.42 | ⚠ large-only (was the visible shortfall) |
| Pico `green-350 #31a46a` | dark accent | 5.27 | ✅ |

## Link underline (1.4.1 Use of Color)

Links now use color + underline (`text-underline-offset` + accent `text-decoration-color`), so the accent is never the *only* differentiator — helps color-blind users.

## Status

- [x] Ratings computed (G3-01)
- [x] Light accent darkened to pass small-text AA → applied in G3-02
- [ ] Final re-verify with tools once palette lands (G3-05)
