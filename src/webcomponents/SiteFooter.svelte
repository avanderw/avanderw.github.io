<svelte:options customElement="site-footer" />

<script lang="ts">
	import { onMount } from 'svelte';
	import SiteFooterCore from '$lib/components/SiteFooterCore.svelte';

	let isDarkMode = false;

	onMount(() => {
		// Read initial theme
		const saved = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		isDarkMode = saved === 'dark' || (!saved && prefersDark);

		// Stay in sync with changes made by site-header or any other toggle
		const observer = new MutationObserver(() => {
			isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
		return () => observer.disconnect();
	});
</script>

<div class="site-footer" class:dark={isDarkMode}>
	<div class="footer-inner">
		<SiteFooterCore />
	</div>
</div>

<style>
	:host {
		display: block;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.site-footer {
		--color-text: #333333;
		--color-link: #333333;
		--color-link-hover: #2d6a2d;
		--color-border: #dddddd;
		--color-bg: #ffffff;
		--icon-size: 1.5rem;

		font-family: et-book, Palatino, 'Palatino Linotype', 'Palatino LT STD', 'Book Antiqua',
			Georgia, serif;
		font-size: 14pt;
		background: var(--color-bg);
		color: var(--color-text);
		border-top: 1px solid var(--color-border);
		padding: 0.5rem 0;
	}

	.site-footer.dark {
		--color-text: #cccccc;
		--color-link: #cccccc;
		--color-link-hover: #68b368;
		--color-border: #444444;
		--color-bg: #1a1a1a;
	}

	.footer-inner {
		width: 60%;
		margin: 0 auto;
	}

	@media (orientation: portrait), (max-width: 768px) {
		.footer-inner {
			width: 90%;
		}
	}

	/* Targets SiteFooterCore's rendered output inside the shadow root */
	:global(nav ul) {
		list-style: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	:global(a) {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.3rem 0.4rem;
		color: var(--color-link);
		text-decoration: none;
		border-radius: 0.25rem;
		transition: color 0.15s ease;
	}

	:global(a:hover),
	:global(a:focus) {
		color: var(--color-link-hover);
		outline: none;
	}

	:global(svg) {
		width: var(--icon-size);
		height: var(--icon-size);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
</style>
