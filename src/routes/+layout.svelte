<script lang="ts">
	import '$lib/styles/reset.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/tokens.css';
	import '$lib/styles/index.css';
	import SiteHeaderCore from '$lib/components/SiteHeaderCore.svelte';
	import SiteFooterCore from '$lib/components/SiteFooterCore.svelte';
	import { navLinks, headerContent } from '$lib/stores/layout';
	import { isDark, initializeTheme, toggleTheme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

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
		isDarkMode={$isDark}
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