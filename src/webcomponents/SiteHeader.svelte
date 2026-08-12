<svelte:options
	customElement="site-header"
/>

<script lang="ts">
	import { onMount } from 'svelte';
	import SiteHeaderCore from '$lib/components/SiteHeaderCore.svelte';
	import { isDark, initializeTheme, toggleTheme } from '$lib/stores/theme';

	interface NavLink {
		href: string;
		text: string;
		tooltip?: string;
	}

	export let home: string = '/';
	export let rss: string = '';
	export let subscribe: string = '';
	export let subscribeToggleId: string = '8695011e49';
	export let subscribeLabel: string = 'Subscribe';
	export let subscribeTooltip: string = 'Subscribe';
	export let links: string = '[]';

	$: navLinks = (() => {
		try {
			return JSON.parse(links) as NavLink[];
		} catch {
			return [];
		}
	})();

	onMount(() => {
		initializeTheme();
	});
</script>

<div class="site-header" class:dark={$isDark}>
	<div class="header-inner">
		<SiteHeaderCore
			{home}
			{rss}
			{subscribe}
			{subscribeToggleId}
			{subscribeLabel}
			{subscribeTooltip}
			navLinks={navLinks}
			isDarkMode={$isDark}
			on:themeToggle={toggleTheme}
		/>
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

	/* ---- Theme variables ---- */
	.site-header {
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
		border-bottom: 1px solid var(--color-border);
		padding: 0.5rem 0;
	}

	.site-header.dark {
		--color-text: #cccccc;
		--color-link: #cccccc;
		--color-link-hover: #68b368;
		--color-border: #444444;
		--color-bg: #1a1a1a;
	}

	/* ---- Layout ---- */
	.header-inner {
		width: 60%;
		margin: 0 auto;
	}

	@media (orientation: portrait), (max-width: 768px) {
		.header-inner {
			width: 90%;
		}
	}

	/* ---- Nav lists (targets SiteHeaderCore's rendered output) ---- */
	:global(nav ul) {
		list-style: none;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	/* ---- Links ---- */
	:global(a) {
		display: inline-flex;
		align-items: center;
		padding: 0.4rem 0.5rem;
		color: var(--color-link);
		text-decoration: none;
		border-radius: 0.25rem;
		transition: color 0.15s ease;
		background: none;
		border: none;
		cursor: pointer;
		font: inherit;
	}

	:global(a:hover),
	:global(a:focus) {
		color: var(--color-link-hover);
		outline: none;
	}

	/* Breadcrumb separator */
	:global(nav[aria-label="breadcrumb"] li + li::before) {
		content: '/';
		color: var(--color-border);
		margin-right: 0.25rem;
	}

	/* ---- Icons ---- */
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
