<script lang="ts">
	import '../pico-css-override.css';
	import { HomeIcon, Github, ChartNoAxesCombinedIcon, Sun, Moon } from 'lucide-svelte';
	import { navLinks, headerContent } from '$lib/stores/layout';
	import { onMount } from 'svelte';
	
	// Theme management
	let isDarkMode = false;
	let themeButton;
	
	// Reactive tooltip text using Svelte 4 reactive statements
	$: tooltipText = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

	function toggleTheme() {
		isDarkMode = !isDarkMode;
		const html = document.documentElement;
		
		if (isDarkMode) {
			html.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		} else {
			html.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
	}

	function handleThemeToggle(event) {
		event.preventDefault();
		toggleTheme();
		
		// Force tooltip to hide by triggering mouse leave
		const target = event.target.closest('a');
		target.blur();
		
		// Dispatch mouseleave event to force tooltip hide
		target.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
	}

	function initializeTheme() {
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
		
		const html = document.documentElement;
		html.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
	}

	// Clear layout content when navigating (cleanup)
	onMount(() => {
		initializeTheme();
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
						bind:this={themeButton}
						href="#"
						on:click={handleThemeToggle}
						data-tooltip={tooltipText}
						data-placement="bottom"
					>
						{#if isDarkMode}
							<Sun />
						{:else}
							<Moon />
						{/if}
					</a>
				</li>
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
