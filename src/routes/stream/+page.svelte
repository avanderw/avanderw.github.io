<script lang="ts">
	import BlogTable from '$lib/components/BlogTable.svelte';
	import { onMount } from 'svelte';
	import { blogPosts } from '$lib/data/blog.js';
	import { setHeaderContent, setNavLinks } from '$lib/stores/layout';

	let searchTerm = '';

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

	<input
		type="search"
		name="search"
		placeholder="Search posts"
		aria-label="Search posts"
		bind:value={searchTerm}
	/>

	<BlogTable {blogPosts} {searchTerm} />
</main>
