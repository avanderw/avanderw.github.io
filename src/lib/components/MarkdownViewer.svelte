<script lang="ts">
	import { browser } from '$app/environment';
	import showdown from 'showdown';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
		import type { Snippet } from 'svelte';
		import hljs from 'highlight.js';
	import mermaid from 'mermaid';
	import katex from 'katex';
	import 'katex/dist/katex.min.css';
	import 'highlight.js/styles/github.css'; /* light baseline; dark overridden in hljs-theme.css */
	import '$lib/styles/hljs-theme.css';

	export let src = '';
	export let options = { tables: true };
	export let showToc = true;
	export let rail = true;
		export let proseHeader: Snippet | undefined = undefined;
		export let proseFooter: Snippet | undefined = undefined;

	let htmlContent = '';
	let loading = false;
	let error: string | null = null;
	let tocItems: { level: number; text: string; id: string }[] = [];
	let tocOpen = false;
	let mermaidInitialized = false;
	let mermaidTheme: 'dark' | 'default' = 'default';
	let themeObserver: MutationObserver | null = null;
	let mounted = false;
	let fetchController: AbortController | null = null;
	let activeRequestId = 0;
	let railObserver: IntersectionObserver | null = null;
	let activeSectionId = '';

	interface TocNode {
		text: string;
		id: string;
		children: TocNode[];
	}

	let tocTree: TocNode[] = [];

	function escapeHtml(value: string): string {
		return value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	/* Disclosure (expandable) TOC — numbered sections + nested subheadings. */
	function buildTocHtml(nodes: TocNode[]): string {
		if (nodes.length === 0) return '';
		let html = '<div class="toc-sections">';
		nodes.forEach((node, index) => {
			html += `<section class="toc-section"><div class="toc-section-number">${String(index + 1).padStart(2, '0')}</div>`;
			html += `<div class="toc-section-body"><a class="toc-section-heading" href="#${node.id}">${escapeHtml(node.text)}</a>`;
			if (node.children.length > 0) {
				html += '<ul class="toc-subheadings">';
				for (const child of node.children) {
					html += `<li><a href="#${child.id}">${escapeHtml(child.text)}</a></li>`;
				}
				html += '</ul>';
			}
			html += '</div></section>';
		});
		html += '</div>';
		return html;
	}

	/* Sticky rail TOC — compact site-map of sections. */
	function buildRailToc(nodes: TocNode[]): string {
		if (nodes.length === 0) return '';
		let html = '<ol class="rail-list">';
		nodes.forEach((node) => {
			html += `<li class="rail-item"><a href="#${node.id}">${escapeHtml(node.text)}</a>`;
			if (node.children.length > 0) {
				html += '<ul class="rail-subs">';
				for (const child of node.children) {
					html += `<li><a href="#${child.id}">${escapeHtml(child.text)}</a></li>`;
				}
				html += '</ul>';
			}
			html += '</li>';
		});
		html += '</ol>';
		return html;
	}

	function buildTocTree(items: { level: number; text: string; id: string }[]): TocNode[] {
		if (items.length === 0) return [];
		const root: TocNode[] = [];
		const stack: { node: TocNode; level: number }[] = [];

		for (const item of items) {
			const node: TocNode = { text: item.text, id: item.id, children: [] };

			while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
				stack.pop();
			}

			if (stack.length === 0) {
				root.push(node);
			} else {
				stack[stack.length - 1].node.children.push(node);
			}

			stack.push({ node, level: item.level });
		}

		return root;
	}

	const converter = new showdown.Converter({
		...options,
		ghCompatibleHeaderId: true,
		customizedHeaderId: true
	});

	$: if (browser && mounted && src) {
		void loadMarkdown(src);
	}

	$: if (browser && mounted && !src) {
		htmlContent = '';
		error = null;
		tocItems = [];
		tocTree = [];
	}

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/<[^>]*>/g, '')
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim();
	}

	function extractAndInjectHeadings(html: string): { html: string; headings: { level: number; text: string; id: string }[] } {
		const headings: { level: number; text: string; id: string }[] = [];
		const headingRegex = /<h([1-6])([^>]*)>(.*?)<\/h\1>/gi;

		const updatedHtml = html.replace(headingRegex, (_match, level, attrs, content) => {
			const plainText = content.replace(/<[^>]*>/g, '');
			const id = slugify(plainText);
			headings.push({ level: parseInt(level), text: plainText, id });
			const existingId = attrs.match(/id="[^"]*"/);
			if (existingId) {
				attrs = attrs.replace(/id="[^"]*"/, `id="${id}"`);
			} else {
				attrs += ` id="${id}"`;
			}
			return `<h${level}${attrs}>${content}</h${level}>`;
		});

		return { html: updatedHtml, headings };
	}

	function removeFirstHeading(html: string, id: string): string {
		const re = new RegExp(`<h1[^>]*id="${id}"[^>]*>[\\s\\S]*?<\\/h1>`);
		return html.replace(re, '');
	}

	async function loadMarkdown(filePath: string) {
		if (!filePath) return;

		fetchController?.abort();
		const requestId = ++activeRequestId;
		const controller = new AbortController();
		fetchController = controller;

		loading = true;
		error = null;

		try {
			const response = await fetch(filePath, { signal: controller.signal });
			if (!response.ok) {
				throw new Error(`Failed to load ${filePath}: ${response.status}`);
			}
			const markdown = await response.text();
			if (requestId !== activeRequestId) {
				return;
			}
			const mathProcessed = preprocessMath(markdown);
			const rawHtml = converter.makeHtml(mathProcessed);
			const mathRestored = restoreMath(rawHtml);
			const result = extractAndInjectHeadings(mathRestored);

			// A leading H1 is the article title — rendered by the page header.
			// Drop it from the content and TOC so the title is not duplicated.
			let html = result.html;
			let headings = result.headings;
			if (headings.length > 0 && headings[0].level === 1) {
				html = removeFirstHeading(html, headings[0].id);
				headings = headings.slice(1);
			}

			htmlContent = html;
			tocItems = headings;
			tocTree = buildTocTree(headings);
		} catch (err) {
			if (controller.signal.aborted || requestId !== activeRequestId) {
				return;
			}
			error = err instanceof Error ? err.message : String(err);
			htmlContent = '';
			tocItems = [];
			tocTree = [];
		} finally {
			if (requestId === activeRequestId) {
				loading = false;
				if (fetchController === controller) {
					fetchController = null;
				}
			}
		}
	}

	/** Extract math from raw markdown, render with KaTeX, and insert safe
	 *  placeholders so Showdown cannot mangle the output. Call restoreMath()
	 *  on the final HTML to swap placeholders back. */
	let mathStore: Map<string, string> = new Map();

	function preprocessMath(md: string): string {
		mathStore = new Map();
		let idx = 0;

		// Block math: $$...$$
		md = md.replace(/\$\$([\s\S]*?)\$\$/g, (_match, tex) => {
			const key = `KATEXBLK${idx++}XETAK`;
			try {
				mathStore.set(key, katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false }));
			} catch {
				mathStore.set(key, _match);
			}
			return key;
		});

		// Inline math: $...$  (single line, not greedy, avoid $$)
		md = md.replace(/(?<!\$)\$([^\$\n]+?)\$(?!\$)/g, (_match, tex) => {
			const key = `KATEXINL${idx++}XETAK`;
			try {
				mathStore.set(key, katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false }));
			} catch {
				mathStore.set(key, _match);
			}
			return key;
		});

		return md;
	}

	function restoreMath(html: string): string {
		for (const [key, rendered] of mathStore) {
			html = html.replace(key, rendered);
		}
		return html;
	}

	function renderMermaidBlocks() {
		const mermaidCodeBlocks = document.querySelectorAll('.markdown-content pre code.language-mermaid');

		mermaidCodeBlocks.forEach((block) => {
			const pre = block.parentElement;
			if (!pre) {
				return;
			}

			const mermaidSource = block.textContent ?? '';
			const container = document.createElement('div');
			container.className = 'mermaid';
			container.setAttribute('data-mermaid-source', mermaidSource);
			container.textContent = mermaidSource;

			pre.replaceWith(container);
		});

		if (!mermaidInitialized) {
			mermaid.initialize({
				startOnLoad: false,
				securityLevel: 'loose',
				theme: mermaidTheme,
				themeVariables: mermaidTheme === 'dark' ? { edgeLabelBackground: '#232829', edgeLabelColor: '#e6e8e7' } : {}
			});
			mermaidInitialized = true;
		}

		mermaid.run({ querySelector: '.markdown-content .mermaid' });
	}

	function getPreferredMermaidTheme(): 'dark' | 'default' {
		if (typeof document === 'undefined') {
			return 'default';
		}

		const htmlTheme = document.documentElement.getAttribute('data-theme');
		if (htmlTheme === 'dark') {
			return 'dark';
		}

		if (htmlTheme === 'light') {
			return 'default';
		}

		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default';
	}

	function rerenderMermaidForTheme() {
		const nextTheme = getPreferredMermaidTheme();
		if (nextTheme === mermaidTheme) {
			return;
		}

		mermaidTheme = nextTheme;
		mermaid.initialize({
			startOnLoad: false,
			securityLevel: 'loose',
			theme: mermaidTheme,
			themeVariables: mermaidTheme === 'dark' ? { edgeLabelBackground: '#232829', edgeLabelColor: '#e6e8e7' } : {}
		});
		mermaidInitialized = true;

		document.querySelectorAll('.markdown-content .mermaid').forEach((diagram) => {
			const source = diagram.getAttribute('data-mermaid-source');
			if (!source) {
				return;
			}

			diagram.removeAttribute('data-processed');
			diagram.innerHTML = '';
			diagram.textContent = source;
		});

		mermaid.run({ querySelector: '.markdown-content .mermaid' });
	}

	function setupRailObserver() {
		if (!rail || typeof IntersectionObserver === 'undefined') return;

		const content = document.getElementById('markdown-content');
		if (!content) return;

		const headingEls = content.querySelectorAll('h2[id], h3[id]');
		if (headingEls.length === 0) return;

		railObserver?.disconnect();
		railObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSectionId = entry.target.id;
						break;
					}
				}
				highlightRail();
			},
			{ rootMargin: '-8% 0px -78% 0px', threshold: 0 }
		);

		headingEls.forEach((h) => railObserver!.observe(h));
	}

	function highlightRail() {
		if (!activeSectionId) return;

		const links = document.querySelectorAll('.toc-rail a[href^="#"]');
		links.forEach((link) => {
			const id = link.getAttribute('href')?.slice(1);
			const isActive = id === activeSectionId;
			link.classList.toggle('is-active', isActive);
			if (isActive) {
				link.setAttribute('aria-current', 'true');
			} else {
				link.removeAttribute('aria-current');
			}
		});
	}

	onMount(() => {
		mounted = true;
		if (src) {
			void loadMarkdown(src);
		}
		mermaidTheme = getPreferredMermaidTheme();

		themeObserver = new MutationObserver(() => {
			rerenderMermaidForTheme();
		});

		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});
	});

	onDestroy(() => {
		fetchController?.abort();
		fetchController = null;
		themeObserver?.disconnect();
		themeObserver = null;
		railObserver?.disconnect();
		railObserver = null;
	});

	afterUpdate(() => {
		renderMermaidBlocks();
		document.querySelectorAll('.markdown-content pre code:not(.language-mermaid)').forEach((block) => {
			hljs.highlightElement(block as HTMLElement);
		});
		setupRailObserver();
	});
</script>

{#if loading}
	<div class="layout">
		<div class="blog-main">
			{#if proseHeader}{@render proseHeader()}{/if}
			<div class="loading">Loading markdown...</div>
		</div>
	</div>
{:else if error}
	<div class="layout">
		<div class="blog-main">
			{#if proseHeader}{@render proseHeader()}{/if}
			<div class="error">Error: {error}</div>
		</div>
	</div>
{:else if htmlContent}
	<div class="layout" class:with-toc={rail && tocTree.length > 1}>
		{#if rail && tocTree.length > 1}
			<aside class="toc-rail" aria-label="Table of contents">
				<nav class="toc-rail-nav">{@html buildRailToc(tocTree)}</nav>
			</aside>
		{/if}

		<div class="blog-main">
			{#if proseHeader}{@render proseHeader()}{/if}

			{#if showToc && tocTree.length > 1}
				<details class="toc" bind:open={tocOpen}>
					<summary>Table of Contents</summary>
					<div class="toc-content">{@html buildTocHtml(tocTree)}</div>
				</details>
			{/if}

			<div class="markdown-content" id="markdown-content">
				{@html htmlContent}
			</div>

			{#if proseFooter}{@render proseFooter()}{/if}
		</div>
	</div>
{/if}

<style>
	.loading,
	.error {
		padding: var(--space-4);
		text-align: center;
	}

	.error {
		color: var(--color-error, #dc2626);
	}

	/* ---- Article layout shell (Board A: R1/R5) ---- */
	/* Default single column; the sticky TOC rail joins on wide screens. */
	.layout {
		display: block;
		width: 100%;
	}

	.layout .blog-main {
		min-width: 0;
		margin-inline: auto;
		max-width: var(--measure-prose);
		padding: var(--space-2) 0 var(--space-8);
	}

	/* Wide: two-column with a sticky rail. Main keeps the prose measure. */
	.layout.with-toc {
		display: grid;
		grid-template-columns: 15rem minmax(0, 1fr);
		column-gap: clamp(2rem, 4vw, 3.5rem);
		align-items: start;
	}

	.layout.with-toc > .toc-rail {
		position: sticky;
		top: var(--space-6);
	}

	/* On narrow screens hide the rail and use the disclosure instead. */
	@media (max-width: 1080px) {
		.layout.with-toc {
			grid-template-columns: 1fr;
		}

		.layout.with-toc > .toc-rail {
			display: none;
		}
	}

	/* Hide the disclosure whenever the rail is shown (avoid duplication). */
	.layout.with-toc .toc {
		display: none;
	}

	/* ---- Sticky rail TOC ---- */
	.toc-rail {
		font-size: 0.875rem;
		max-height: calc(100vh - 3rem);
		overflow-y: auto;
		scrollbar-width: thin;
	}

	.toc-rail :global(.rail-list) {
		list-style: none;
		margin: 0;
		padding: 0;
		border-left: 1px solid var(--color-border);
		padding-left: 0.9rem;
		display: grid;
		gap: var(--space-2);
	}

	.toc-rail :global(.rail-item) {
		margin: 0;
		padding: 0;
	}

	.toc-rail :global(.rail-item > a) {
		display: block;
		color: var(--color-text);
		text-decoration: none;
		font-weight: 600;
		line-height: 1.3;
	}
	.toc-rail :global(.rail-item > a:hover),
	.toc-rail :global(.rail-item > a.is-active) {
		color: var(--color-accent);
	}

	.toc-rail :global(.rail-subs) {
		list-style: none;
		margin: 0.35rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.2rem;
	}
	.toc-rail :global(.rail-subs a) {
		color: var(--color-muted);
		text-decoration: none;
		font-size: 0.8rem;
		line-height: 1.35;
	}
	.toc-rail :global(.rail-subs a:hover),
	.toc-rail :global(.rail-subs a.is-active) {
		color: var(--color-accent);
	}

	/* ---- Disclosure (mobile / fallback) TOC ---- */
	.toc {
		margin-bottom: 2.5rem;
		border: 1px solid var(--color-border);
		border-radius: 0;
		overflow: hidden;
		background: var(--color-bg);
		box-shadow: 0 0.35rem 1.25rem color-mix(in srgb, var(--color-text) 8%, transparent);
	}

	.toc summary {
		padding: var(--space-3) var(--space-6);
		cursor: pointer;
		background: var(--color-text);
		color: var(--color-bg);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		user-select: none;
	}

	.toc summary::marker {
		color: var(--color-bg);
	}

	.toc-content {
		padding: var(--space-6) var(--space-8) var(--space-8);
		text-align: left;
	}

	:global(.toc-sections) {
		border-left: 1px solid var(--color-muted);
	}

	:global(.toc-section) {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		gap: 0.85rem;
		padding: 1.15rem 0 0.15rem 0.85rem;
	}

	:global(.toc-section-number) {
		padding-top: 0.1rem;
		color: var(--color-muted);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.85rem;
		font-variant-numeric: tabular-nums;
	}

	:global(.toc-section-heading),
	:global(.toc-subheadings a) {
		color: var(--color-text);
		text-decoration: none;
	}

	:global(.toc-section-heading:hover),
	:global(.toc-subheadings a:hover) {
		color: var(--color-accent);
	}

	:global(.toc-section-heading) {
		display: block;
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.3;
	}

	:global(.toc-subheadings) {
		display: grid;
		gap: 0.2rem;
		margin: 0.45rem 0 0;
		padding: 0;
		list-style: none;
	}

	:global(.toc-subheadings li) {
		margin: 0;
		padding: 0;
		line-height: 1.35;
	}

	:global(.toc-subheadings a) {
		color: var(--color-muted);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.74rem;
	}

	@media (max-width: 600px) {
		.toc-content {
			padding: var(--space-6) var(--space-4) var(--space-6);
		}

		:global(.toc-section) {
			grid-template-columns: 2rem minmax(0, 1fr);
			gap: 0.65rem;
			padding-left: 0.65rem;
		}
	}
</style>