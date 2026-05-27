<script lang="ts">
	import { onMount } from 'svelte';
	import { setNavLinks, setHeaderContent } from '$lib/stores/layout';
	import SiteHeaderCore from '$lib/components/SiteHeaderCore.svelte';
	import SiteFooterCore from '$lib/components/SiteFooterCore.svelte';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';

	onMount(() => {
		setNavLinks([{ href: '/web-components', text: 'Web Components' }]);
		setHeaderContent({
			title: 'Web Components',
			description:
				'Shared UI components published from this site and usable in any project via a single script tag.'
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
	<title>Web Components · avanderw.co.za</title>
	<meta
		name="description"
		content="Usage and examples for the site-header and site-footer web components published by avanderw.co.za."
	/>
</svelte:head>

<main class="container">
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
		A responsive site header with breadcrumb navigation, icon links, and a light/dark theme toggle.
		Theme preference is persisted in <code>localStorage</code>.
	</p>

	<h3>Live demo</h3>
	<div class="demo-box">
		<SiteHeaderCore
			home="/"
			github="https://github.com/avanderw"
			rss="/rss.xml"
			navLinks={[{ href: '/web-components', text: 'Web Components' }]}
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
						>JSON array of breadcrumb nav links: <code
							>[{`{"href":"/page","text":"Label","tooltip":"Optional"}`}]</code
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
	.demo-box {
		border: 1px solid var(--pico-muted-border-color, #ddd);
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		margin-bottom: 1rem;
	}

	pre {
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

	td:first-child {
		white-space: nowrap;
	}
</style>
