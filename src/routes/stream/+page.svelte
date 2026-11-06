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

	<SearchBox bind:value={searchTerm} placeholder="Search posts" ariaLabel="Search posts" />

	<label class="label-filter">
		Label
		<select bind:value={selectedLabel}>
			<option value="">All labels</option>
			{#each blogLabels as label}
				<option value={label}>{label}</option>
			{/each}
		</select>
	</label>

	<BlogTable {blogPosts} {searchTerm} {selectedLabel} />
</main>

<style>
	.label-filter {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: var(--space-4);
		font-size: 0.9rem;
	}

	.label-filter select {
		width: auto;
		margin: 0;
		font: inherit;
	}
</style>
