<script lang="ts">
	import { onMount } from 'svelte';
	import { setNavLinks, setHeaderContent } from '$lib/stores/layout';
	import SiteHeaderCore from '$lib/components/SiteHeaderCore.svelte';
	import SiteFooterCore from '$lib/components/SiteFooterCore.svelte';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';

	onMount(() => {
		setNavLinks([{ href: '/design-system', text: 'Design System' }]);
		setHeaderContent({
			title: 'Design System',
			description:
				'A living reference for the type, language, and reusable site components used across avanderw.co.za.'
		});
	});

	function hl(code: string, lang = 'html') {
		return hljs.highlight(code, { language: lang }).value;
	}

	const scriptTag = `<script src="https://avanderw.co.za/ui-components.js" defer><\/script>`;

	const headerBasic = `<site-header></site-header>`;

	const headerFull = `<site-header
  home="/"
  rss="/rss.xml"
  links='[{"href":"/docs","text":"Docs"},{"href":"/api","text":"API"}]'
></site-header>`;

	const footerBasic = `<site-footer></site-footer>`;

	const placeholder = `<style>
  site-header:not(:defined),
  site-footer:not(:defined) {
    display: block;
    min-height: 56px;
  }
</style>`;

	const cachebusting = `<script src="https://avanderw.co.za/ui-components.js?v=2" defer><\/script>`;
</script>

<svelte:head>
	<title>Design System · avanderw.co.za</title>
	<meta
		name="description"
		content="A living reference for typography, inline language, and reusable web components on avanderw.co.za."
	/>
</svelte:head>

<main class="container">
	<section id="type" aria-labelledby="type-heading">
		<h2 id="type-heading">Type</h2>
		<p class="section-intro">
			One serif voice carries reading and navigation; monospace is reserved for code and literal values.
			The hierarchy comes from semantic HTML first, then the browser-friendly scale beneath it.
		</p>

		<div class="type-specimens">
			<div class="type-specimen">
				<div class="display-sample">A page makes one clear claim</div>
				<div>
					<p class="type-name"><code>&lt;h1&gt;</code> Page title</p>
					<p>Use once per page for its subject. The site header supplies it on route pages.</p>
				</div>
			</div>
			<div class="type-specimen">
				<div class="section-sample">A meaningful division</div>
				<div>
					<p class="type-name"><code>&lt;h2&gt;</code> Section heading</p>
					<p>Use to divide a page into independently scannable subjects.</p>
				</div>
			</div>
			<div class="type-specimen">
				<div class="subsection-sample">A smaller group within that division</div>
				<div>
					<p class="type-name"><code>&lt;h3&gt;</code> Subsection heading</p>
					<p>Use for a group that belongs to the section immediately above it.</p>
				</div>
			</div>
			<div class="type-specimen">
				<p class="body-sample">Good prose makes room for a thought to land before it asks for the next one.</p>
				<div>
					<p class="type-name"><code>&lt;p&gt;</code> Reading text</p>
					<p>Use for paragraphs, introductions, and explanatory copy. Keep long-form text near 65 characters wide.</p>
				</div>
			</div>
			<div class="type-specimen">
				<p class="meta-sample">Published 03 September 2026 · 4 min read</p>
				<div>
					<p class="type-name">Muted metadata</p>
					<p>Use for dates, bylines, counts, and supporting facts that should not compete with the main copy.</p>
				</div>
			</div>
			<div class="type-specimen">
				<code class="code-sample">const intent = 'precise';</code>
				<div>
					<p class="type-name"><code>&lt;code&gt;</code> Literal text</p>
					<p>Use for code, commands, file names, and values that must be copied exactly.</p>
				</div>
			</div>
		</div>
	</section>

	<section id="inline-language" aria-labelledby="inline-heading">
		<h2 id="inline-heading">Inline language</h2>
		<p class="section-intro">
			Use semantic elements to show the reader what kind of information they are encountering, rather than styling words for decoration.
		</p>
		<blockquote>
			<p>
				A <a href="/principles">principle</a> can be <strong>important</strong>, a term can have
				<em>emphasis</em>, and <code>npm run check</code> remains literal. Use a quote when the
				words belong to someone else.
			</p>
		</blockquote>
	</section>

	<section id="web-components" aria-labelledby="components-heading">
		<h2 id="components-heading">Web components</h2>
		<p class="section-intro">
			Shared UI components published from this site and usable in any project via a single script tag.
		</p>
	</section>

	<h2>Installation</h2>
	<p>
		Drop one script tag into any HTML page. No npm, no build step required on the consuming side.
	</p>
	<pre><code class="hljs">{@html hl(scriptTag)}</code></pre>

	<p>
		The file is deployed alongside this site and served via Fastly CDN (~19 kB gzip). Both
		components are registered and ready as soon as the script loads.
	</p>

	<hr />

	<h2>&lt;site-header&gt;</h2>
	<p>
		A responsive site header with a current-location trail, clearly identifiable primary links,
		icon actions, and a light/dark theme toggle. Theme preference is persisted in
		<code>localStorage</code>.
	</p>

	<h3>Live demo</h3>
	<div class="demo-box">
		<SiteHeaderCore
			home="/"
			rss="/rss.xml"
			navLinks={[{ href: '/design-system', text: 'Design System' }]}
			isDarkMode={false}
		/>
	</div>

	<h3>Attributes</h3>
	<figure>
		<table>
			<thead>
				<tr>
					<th>Attribute</th>
					<th>Default</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>home</code></td>
					<td><code>"/"</code></td>
					<td>URL for the home icon link.</td>
				</tr>
				<tr>
					<td><code>rss</code></td>
					<td><em>empty</em></td>
					<td>RSS feed URL. Omit or leave empty to hide the icon.</td>
				</tr>
				<tr>
					<td><code>links</code></td>
					<td><code>"[]"</code></td>
					<td
						>JSON array of current-location trail links; the final label is the current
						page: <code>[{`{"href":"/page","text":"Label","tooltip":"Optional"}`}]</code
						>.</td
					>
				</tr>
			</tbody>
		</table>
	</figure>

	<h3>Usage</h3>
	<pre><code class="hljs">{@html hl(headerBasic)}</code></pre>
	<pre><code class="hljs">{@html hl(headerFull)}</code></pre>

	<hr />

	<h2>&lt;site-footer&gt;</h2>
	<p>
		Contact footer with a hardcoded phone and email, plus a link to this documentation page. No
		attributes required.
	</p>

	<h3>Live demo</h3>
	<div class="demo-box">
		<SiteFooterCore />
	</div>

	<h3>Usage</h3>
	<pre><code class="hljs">{@html hl(footerBasic)}</code></pre>

	<hr />

	<h2>Preventing layout shift</h2>
	<p>
		Because the components load via JavaScript, there is a brief window where the elements are
		undefined. Add this CSS to reserve space and prevent content jumping:
	</p>
	<pre><code class="hljs">{@html hl(placeholder)}</code></pre>

	<hr />

	<h2>Theme</h2>
	<p>
		The <code>&lt;site-header&gt;</code> toggle writes <code>data-theme="dark"</code> to
		<code>document.documentElement</code> and persists to <code>localStorage</code>. The
		<code>&lt;site-footer&gt;</code> observes that attribute via a
		<code>MutationObserver</code> and updates its own shadow DOM automatically — no extra wiring
		needed.
	</p>

	<hr />

	<h2>Keeping components up to date</h2>
	<p>
		Components are rebuilt and redeployed every time the main site is published. Sub-projects pick
		up changes automatically after the browser cache expires (GitHub Pages sets a 10-minute TTL).
		To force an immediate refresh, append a version query string:
	</p>
	<pre><code class="hljs">{@html hl(cachebusting)}</code></pre>
</main>

<style>
	section {
		margin-top: var(--space-10);
	}

	.section-intro {
		max-width: var(--measure-prose);
		color: var(--color-muted);
	}

	.type-specimens {
		margin-top: var(--space-6);
		border-top: 1px solid var(--color-border);
	}

	.type-specimen {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(16rem, 0.85fr);
		gap: var(--space-6);
		align-items: center;
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--color-border);
	}

	.type-specimen p {
		margin: 0;
	}

	.type-specimen p + p {
		margin-top: var(--space-2);
		color: var(--color-muted);
		font-size: var(--font-size-sm);
	}

	.display-sample,
	.section-sample,
	.subsection-sample {
		font-family: var(--font-serif);
		font-weight: var(--font-heading-weight);
		line-height: 1.25;
	}

	.display-sample {
		font-size: 2rem;
	}

	.section-sample {
		font-size: var(--font-size-2xl);
		font-style: italic;
	}

	.subsection-sample {
		font-size: var(--font-size-xl);
	}

	.body-sample {
		max-width: 38ch;
		line-height: var(--line-height-prose);
	}

	.meta-sample {
		color: var(--color-muted);
		font-size: var(--font-size-sm);
	}

	.code-sample {
		justify-self: start;
	}

	.type-name {
		color: var(--color-text) !important;
		font-size: var(--font-size-md) !important;
	}

	.demo-box {
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		margin-bottom: 1rem;
	}

	pre {
		max-width: 100%;
		box-sizing: border-box;
		overflow-x: auto;
		margin-bottom: 1rem;
		border-radius: 0.375rem;
	}

	pre code.hljs {
		border-radius: 0.375rem;
		font-size: 0.85em;
	}

	table {
		width: 100%;
	}

	figure {
		max-width: 100%;
		overflow-x: auto;
	}

	td:first-child {
		white-space: nowrap;
	}

	@media (max-width: 640px) {
		.type-specimen {
			grid-template-columns: 1fr;
			gap: var(--space-3);
		}

		.display-sample {
			font-size: var(--font-size-2xl);
		}
	}
</style>
