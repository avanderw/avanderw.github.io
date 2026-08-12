# Pico CSS Usage Inventory (Goal 1, G1-01)

Source of truth for every Pico dependency before removal. Generated from repo audit.

## CDN payloads (removed in G1-07)
| Asset | Size (approx) |
|---|---|
| `https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css` | ~60 KB |
| `https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.colors.min.css` | ~10 KB |
| **Total removed** | **~70 KB + 2 HTTP requests** |

## `--pico-*` variables in use (counts across `src/`)
| Variable | Uses | Target token | Light value | Dark value |
|---|---|---|---|---|
| `--pico-muted-color` | 21 | `--color-muted` | `#6a6a6a` | `#9aa3a1` |
| `--pico-muted-border-color` | 17 | `--color-border` | `#e0e0e0` | `#3a4140` |
| `--pico-color` | 5 | `--color-text` | `#1e1e1e` | `#e6e8e7` |
| `--pico-background-color` | 5 | `--color-bg` | `#ffffff` | `#1b1f1f` |
| `--pico-primary` | 4 | `--color-accent` | `#2d8a6e` | `#5cbda0` |
| `--pico-primary-inverse` | 3 | `--color-accent-contrast` | `#ffffff` | `#0f1412` |
| `--pico-border-radius` | 3 | `--radius-sm` | `0.25rem` | `0.25rem` |
| `--pico-primary-background` | 2 | `--color-accent` | `#2d8a6e` | `#5cbda0` |
| `--pico-card-background-color` | 1 | `--color-surface` | `#ffffff` | `#232829` |

## Files using `--pico-*` (14)
src/lib/components/BlogTable.svelte, CareerTable.svelte, KitSubscribeTrigger.svelte,
LawsOfSoftware.svelte, MarkdownViewer.svelte, ProjectsTable.svelte, SiteFooterCore.svelte,
SocialTable.svelte, TabNavigation.svelte, src/routes/+page.svelte,
src/routes/blog/[slug]/+page.svelte, src/routes/blog/laws-of-software/conway/+page.svelte,
src/routes/books/+page.svelte, src/routes/web-components/+page.svelte

## Pico structural classes/attributes used
| Class / attribute | Uses | Replacement (G1-05/G1-06) |
|---|---|---|
| `class="container"` | 10 | `.container` in index.css |
| `<hgroup>` | 8 | `hgroup` in index.css |
| `role="button"` | 1 | `.container a[role=button]` (article CTA) |
| `data-tooltip` / `data-placement` | 16 files | CSS tooltip via `data-tooltip` attr (own implementation) |
| `data-theme` | +layout, WC headers | kept (theme switching, Goal 3) |
| `data-formkit-toggle` | KitSubscribeTrigger, SiteHeaderCore | KEEP — third-party Kit.com integration, not Pico |
| `class="grid"` (Pico grid) | 0 | not used |
| `summary-grid` / `laws-container` | 2 | own classes, keep |

## Non-Pico things to preserve (not to delete)
- `aria-*` attributes, `sr-only` class, lucide-svelte icons, `data-formkit-toggle` (Kit)
- `highlight.js` github-dark.css import (resolved separately in Goal 3)
- KaTeX / Mermaid markup
