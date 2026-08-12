<script lang="ts">
	import '$lib/styles/reset.css';
	import '$lib/styles/tokens.css';
	import '$lib/styles/index.css';
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

<svelte:head>
	<script async data-uid="8695011e49" src="https://andrew-van-der-westhuizen.kit.com/8695011e49/index.js"></script>
</svelte:head>

<header class="container">
	<SiteHeaderCore
		home="/"
		rss="/rss.xml"
		subscribe="https://andrew-van-der-westhuizen.kit.com/8695011e49"
		subscribeToggleId="8695011e49"
		subscribeLabel="Subscribe"
		subscribeTooltip="Subscribe"
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
