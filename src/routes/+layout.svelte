<script lang="ts">
	import '../pico-css-override.css';
	import SiteHeaderCore from '$lib/components/SiteHeaderCore.svelte';
	import SiteFooterCore from '$lib/components/SiteFooterCore.svelte';
	import { navLinks, headerContent } from '$lib/stores/layout';
	import { onMount } from 'svelte';

	let isDarkMode = false;

	function toggleTheme() {
		isDarkMode = !isDarkMode;
		document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
	}

	function initializeTheme() {
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
		document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
	}

	onMount(() => {
		initializeTheme();
		return () => {
			navLinks.set([]);
			headerContent.set(null);
		};
	});
</script>

<header class="container">
	<SiteHeaderCore
		home="/"
		github="https://github.com/avanderw"
		rss="/rss.xml"
		analytics="https://tracking.avanderw.co.za/avanderw.co.za"
		navLinks={$navLinks}
		{isDarkMode}
		on:themeToggle={toggleTheme}
	/>
	{#if $headerContent}
		{#if $headerContent.title}
			<h1>{$headerContent.title}</h1>
		{/if}
		{#if $headerContent.description}
			<p>{$headerContent.description}</p>
		{/if}
		{#if $headerContent.component}
			<svelte:component this={$headerContent.component} />
		{/if}
	{/if}
</header>

<slot />

<footer class="container">
	<SiteFooterCore />
</footer>
