<script lang="ts">
	import BlogTable from '$lib/components/BlogTable.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import { onMount } from 'svelte';
	import { blogPosts } from '$lib/data/blog.js';
	import { blogLabels, type BlogLabel } from '$lib/types.js';
	import { setHeaderContent, setNavLinks } from '$lib/stores/layout';

	let searchTerm = '';
	let selectedLabel: BlogLabel | '' = '';

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

	<div class="post-filters">
		<SearchBox bind:value={searchTerm} placeholder="Search posts" ariaLabel="Search posts" />
		<select class="label-filter" aria-label="Label" bind:value={selectedLabel}>
			<option value="">All labels</option>
			{#each blogLabels as label}
				<option value={label}>{label}</option>
			{/each}
		</select>
	</div>

	<BlogTable {blogPosts} {searchTerm} {selectedLabel} />
</main>

<style>
	.post-filters {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 12rem;
		gap: var(--space-3);
		margin: var(--space-4) 0 var(--space-6);
	}

	.post-filters :global(.search-row) {
		min-width: 0;
		margin: 0;
	}

	.post-filters :global(input[type='search']) {
		margin: 0;
		line-height: 1.5;
	}

	.post-filters :global(input[type='search']),
	.label-filter {
		box-sizing: border-box;
		height: 2.75rem;
	}

	.label-filter {
		width: 100%;
		margin: 0;
		padding: 0.55rem 2.5rem 0.55rem 0.85rem;
		font-family: inherit;
		font-size: 1rem;
		line-height: 1.5;
		color: var(--color-text);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}

	.label-filter:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-color: var(--color-accent);
	}

	@media (max-width: 600px) {
		.post-filters {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
