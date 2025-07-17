<script lang="ts">
	// This can be false if you're using a fallback (i.e. SPA mode)
	export const prerender = true;

	import '../pico-css-override.css';
	import { HomeIcon, Github, ChartNoAxesCombinedIcon } from 'lucide-svelte';
	import { navLinks, headerContent } from '$lib/stores/layout';
	import { onMount } from 'svelte';

	// Clear layout content when navigating (cleanup)
	onMount(() => {
		return () => {
			navLinks.set([]);
			headerContent.set(null);
		};
	});
</script>

<header class="container">
	<div style="display: flex; justify-content: space-between; align-items: center;">
		<nav aria-label="breadcrumb">
			<ul>
				<li>
					<a href="/"><HomeIcon /></a>
				</li>
				{#each $navLinks as link}
					<li>
						<a href={link.href} data-tooltip={link.tooltip} data-placement="bottom">
							{link.text}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<nav>
			<ul>
				<li>
					<a
						href="https://github.com/avanderw"
						data-tooltip="View source on GitHub"
						data-placement="bottom"><Github /></a
					>
				</li>
				<li>
					<a
						href="https://tracking.avanderw.co.za/avanderw.co.za"
						data-tooltip="View analytics"
						data-placement="bottom"><ChartNoAxesCombinedIcon /></a
					>
				</li>
			</ul>
		</nav>
	</div>
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
