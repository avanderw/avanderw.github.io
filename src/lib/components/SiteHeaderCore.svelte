<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { HomeIcon, Sun, Moon, Rss } from 'lucide-svelte';

	export interface NavLink {
		href: string;
		text: string;
		tooltip?: string;
	}

	export let home: string = '/';
	export let rss: string = '';
	export let navLinks: NavLink[] = [];
	export let isDarkMode: boolean = false;

	const dispatch = createEventDispatcher<{ themeToggle: void }>();

	$: tooltipText = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

	function handleThemeToggle(event: MouseEvent) {
		event.preventDefault();
		dispatch('themeToggle');
		// Dismiss Pico CSS data-tooltip by removing focus
		const btn = event.currentTarget as HTMLElement;
		btn.blur();
		btn.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
	}
</script>

<div class="header-row">
	<nav aria-label="breadcrumb">
		<ul>
			<li>
				<a href={home} data-tooltip="Home" data-placement="bottom" title="Home">
					<HomeIcon />
				</a>
			</li>
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						data-tooltip={link.tooltip ?? link.text}
						data-placement="bottom"
						title={link.tooltip ?? link.text}
					>
						{link.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<nav aria-label="Site actions">
		<ul>
			<li>
				<a
					href="#"
					on:click={handleThemeToggle}
					data-tooltip={tooltipText}
					data-placement="bottom"
					title={tooltipText}
					aria-label={tooltipText}
				>
					{#if isDarkMode}
						<Sun />
					{:else}
						<Moon />
					{/if}
				</a>
			</li>
			{#if rss}
				<li>
					<a href={rss} data-tooltip="RSS Feed" data-placement="bottom" title="RSS Feed">
						<Rss />
					</a>
				</li>
			{/if}
		</ul>
	</nav>
</div>

<style>
	.header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}


</style>
