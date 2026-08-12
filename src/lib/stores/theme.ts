import { writable } from 'svelte/store';

/**
 * Single source of truth for theme state (Goal 3, G3-04 + Goal 2, G2-06).
 * Replaces the duplicated logic that lived in +layout.svelte and the
 * web-component SiteHeader.
 *
 * State:
 *  - Resolves saved `theme` (localStorage) → OS `prefers-color-scheme`.
 *  - Writes `data-theme="light|dark"` on <html>; CSS `color-scheme` + the
 *    token `light-dark()` values react to it (see tokens.css).
 *  - Syncs across tabs/windows via the `storage` event.
 *
 * Framework-agnostic (no `$app/environment`) so it is importable from
 * both the SvelteKit app and the standalone web-components build.
 */

type Theme = 'light' | 'dark';

export const isDark = writable<boolean>(false);

// Current value mirror so toggleTheme can flip without an extra subscription
let currentIsDark = false;
isDark.subscribe((v) => {
	currentIsDark = v;
});

function apply(theme: Theme) {
	isDark.set(theme === 'dark');
	document.documentElement.setAttribute('data-theme', theme);
}

function effectiveTheme(saved: string | null): Theme {
	if (saved === 'dark' || saved === 'light') return saved;
	if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	return 'light';
}

export function initializeTheme(): void {
	if (typeof window === 'undefined') return;
	const saved = localStorage.getItem('theme');
	apply(effectiveTheme(saved));
	// Sync when another tab toggles the theme (G3-04: cross-tab)
	window.addEventListener('storage', (e: StorageEvent) => {
		if (e.key === 'theme') {
			apply(effectiveTheme(e.newValue ?? localStorage.getItem('theme')));
		}
	});
}

export function toggleTheme(): Theme {
	const next: Theme = currentIsDark ? 'light' : 'dark';
	apply(next);
	localStorage.setItem('theme', next);
	return next;
}