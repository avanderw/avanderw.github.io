<script lang="ts">
	import BlogTable from '$lib/components/BlogTable.svelte';
	import { onMount } from 'svelte';
	import { blogPosts } from '$lib/data/blog.js';
	import { setHeaderContent, setNavLinks } from '$lib/stores/layout';

	let searchTerm = '';
	let searchInput: HTMLInputElement;

	function clearSearch() {
		searchTerm = '';
		searchInput?.focus();
	}

	onMount(() => {
		setNavLinks([{ href: '/stream', text: 'Stream' }]);
		setHeaderContent({});
	});
</script>

<svelte:head>
	<title>Stream — Andrew van der Westhuizen</title>
	<meta name="description" content="Writing, thoughts, and explorations by Andrew van der Westhuizen." />
</svelte:head>

<main class="container">
	<hgroup>
		<h2>Stream</h2>
		<p>Writing, thoughts, and explorations.</p>
	</hgroup>

	<div class="search-row">
		<input
			bind:this={searchInput}
			type="search"
			name="search"
			placeholder="Search posts"
			aria-label="Search posts"
			bind:value={searchTerm}
		/>
		{#if searchTerm}
			<button class="search-clear" type="button" on:click={clearSearch} aria-label="Clear search">Clear</button>
		{/if}
	</div>

	<BlogTable {blogPosts} {searchTerm} />
</main>

<style>
	.search-row {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin: var(--space-4) 0 var(--space-6);
	}

	.search-row input[type='search'] {
		flex: 1;
		min-width: 0;
		padding: 0.55rem 0.85rem;
		font-size: 1rem;
		font-family: inherit;
		color: var(--color-text);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}

	.search-row input[type='search']:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-color: var(--color-accent);
	}

	.search-clear {
		padding: 0.5rem 0.85rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface);
		color: var(--color-text);
		font: inherit;
		font-size: 0.875rem;
		cursor: pointer;
	}
	.search-clear:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}
</style>
