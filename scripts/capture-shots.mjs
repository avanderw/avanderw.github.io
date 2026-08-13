/**
 * Board C Q3 — Visual-regression screenshot capture.
 *
 * Usage (dev server or preview running on :5173 by default):
 *   node scripts/capture-shots.mjs [baseUrl] [outDir]
 *   e.g. node scripts/capture-shots.mjs http://localhost:5173 shots
 *
 * Captures core pages at the responsive test matrix in both themes into
 * <outDir>/ (default `shots/`). Screenshots are the reviewable artifact:
 * compare them across commits to catch layout regressions that
 * `svelte-check` / the build cannot see.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseUrl = process.argv[2] || 'http://localhost:5173';
const outDir = process.argv[3] || path.join(__dirname, '..', 'shots');

const VIEWPORTS = [
	{ name: 'mobile-390', width: 390, height: 844 },
	{ name: 'tablet-768', width: 768, height: 1024 },
	{ name: 'desktop-1280', width: 1280, height: 800 },
	{ name: 'wide-1440', width: 1440, height: 900 }
];

const ROUTES = [
	{ path: '/', name: 'home' },
	{ path: '/stream', name: 'stream' },
	{ path: '/blog/files-are-all-you-need', name: 'long-post' },
	{ path: '/blog/laws-of-software', name: 'laws' },
	{ path: '/books', name: 'books' },
	{ path: '/sandbox', name: 'sandbox' }
];

const THEMES = ['light', 'dark'];

async function main() {
	mkdirSync(outDir, { recursive: true });
	const browser = await chromium.launch();
	const shots = [];

	for (const route of ROUTES) {
		for (const theme of THEMES) {
			for (const vp of VIEWPORTS) {
				const page = await browser.newPage({
					colorScheme: theme,
					viewport: { width: vp.width, height: vp.height }
				});
				const url = `${baseUrl}${route.path}`;
				try {
					await page.goto(url, { waitUntil: 'networkidle' });
					await page.waitForTimeout(700); // let markdown/mermaid settle
					const file = `${route.name}__${theme}__${vp.name}.png`;
					await page.screenshot({ path: path.join(outDir, file), fullPage: false });
					shots.push(file);
				} catch (err) {
					console.error(`[FAIL] ${file} ${err.message}`);
				} finally {
					await page.close();
				}
			}
		}
	}
	await browser.close();

	console.log(`Captured ${shots.length} screenshots into ${outDir}:`);
	for (const s of shots) console.log(`  - ${s}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
