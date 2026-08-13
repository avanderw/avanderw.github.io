/**
 * Board C Q1 — Automated accessibility & contrast audit.
 *
 * Usage (dev server or preview running on :5173 by default):
 *   node scripts/a11y-audit.mjs [baseUrl] [port]
 *   e.g. node scripts/a11y-audit.mjs http://localhost:5173
 *
 * Runs axe-core against the core routes in both light and dark themes,
 * then computes WCAG contrast ratios for the site's design-token pairs.
 * Exits non-zero if any critical/serious axe violations are found or a
 * required contrast pair fails AA.
 */
import { chromium } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const baseUrl = process.argv[2] || 'http://localhost:5173';

const ROUTES = [
	{ path: '/', name: 'home' },
	{ path: '/stream', name: 'stream' },
	{ path: '/blog/files-are-all-you-need', name: 'long-post' },
	{ path: '/blog/laws-of-software', name: 'laws-of-software' },
	{ path: '/books', name: 'books' },
	{ path: '/sandbox', name: 'sandbox' }
];

const THEMES = ['light', 'dark'];

// Token pairs that must meet WCAG AA (4.5:1 for normal text, 3:1 for large).
const CONTRAST_PAIRS = [
	{ name: 'text on bg', fg: '#1e1e1e', bg: '#ffffff', light: true, min: 4.5 },
	{ name: 'muted on bg (light)', fg: '#6a6a6a', bg: '#ffffff', light: true, min: 4.5 },
	{ name: 'accent link on bg (light)', fg: '#2a7f66', bg: '#ffffff', light: true, min: 4.5 },
	{ name: 'accent contrast on accent (light)', fg: '#ffffff', bg: '#2a7f66', light: true, min: 4.5 },
	{ name: 'text on bg (dark)', fg: '#e6e8e7', bg: '#1b1f1f', light: false, min: 4.5 },
	{ name: 'muted on bg (dark)', fg: '#9aa3a1', bg: '#1b1f1f', light: false, min: 4.5 },
	{ name: 'accent link on bg (dark)', fg: '#5cbda0', bg: '#1b1f1f', light: false, min: 4.5 },
	{ name: 'accent contrast on accent (dark)', fg: '#0f1412', bg: '#5cbda0', light: false, min: 4.5 }
];

// Pre-computed (avoid runtime dependency on color libs): WCAG relative luminance.
function luminance(hex) {
	const c = hex.replace('#', '');
	const rgb = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255);
	const lin = rgb.map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
	return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrast(hexA, hexB) {
	const la = luminance(hexA);
	const lb = luminance(hexB);
	const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
	return (hi + 0.05) / (lo + 0.05);
}

function runContrastChecks() {
	const results = [];
	for (const pair of CONTRAST_PAIRS) {
		const ratio = contrast(pair.fg, pair.bg);
		const pass = ratio >= pair.min;
		results.push({ ...pair, ratio: ratio.toFixed(2), pass });
	}
	return results;
}

async function runAxe(page, routeName, theme) {
	await page.evaluate(`axe = undefined`);
	await page.addScriptTag({ path: require.resolve('axe-core') });
	const results = await page.evaluate(async () => {
		return await axe.run(document, {
			runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] }
		});
	});

	const violations = results.violations.map((v) => ({
		id: v.id,
		impact: v.impact,
		description: v.description,
		nodes: v.nodes.length
	}));

	const serious = violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
	return { routeName, theme, violations, serious, total: violations.length };
}

async function main() {
	const browser = await chromium.launch();
	const results = [];

	for (const route of ROUTES) {
		for (const theme of THEMES) {
			const page = await browser.newPage({ colorScheme: theme });
			const url = `${baseUrl}${route.path}`;
			try {
				await page.goto(url, { waitUntil: 'networkidle' });
				await page.waitForTimeout(600); // let markdown/mermaid settle
				const audit = await runAxe(page, route.name, theme);
				results.push(audit);
			} catch (err) {
				console.error(`[FAIL] ${route.name} (${theme}): ${err.message}`);
				results.push({ routeName: route.name, theme, error: err.message });
			} finally {
				await page.close();
			}
		}
	}
	await browser.close();

	// --- Report axe results ---
	let exitCode = 0;
	console.log('\n=== AXE RESULTS (wcag2a/aa, wcag21aa) ===');
	for (const r of results) {
		if (r.error) {
			console.log(`✗ ${r.routeName} [${r.theme}] ERROR ${r.error}`);
			exitCode = 1;
			continue;
		}
		console.log(`\n${r.routeName} [${r.theme}] — ${r.total} violation(s), ${r.serious.length} serious/critical`);
		for (const v of r.violations) {
			console.log(`  [${v.impact}] ${v.id}: ${v.description} (${v.nodes} node(s))`);
		}
		if (r.serious.length > 0) exitCode = 1;
	}

	// --- Report contrast checks ---
	console.log('\n=== CONTRAST CHECKS (WCAG AA) ===');
	const contrastResults = runContrastChecks();
	for (const c of contrastResults) {
		const mark = c.pass ? '✓' : '✗';
		console.log(`${mark} ${c.name}: ${c.ratio} (min ${c.min})`);
		if (!c.pass) exitCode = 1;
	}

	console.log(exitCode === 0 ? '\nALL CHECKS PASSED' : '\nCHECKS FAILED');
	process.exit(exitCode);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
