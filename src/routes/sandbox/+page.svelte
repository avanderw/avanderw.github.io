<script lang="ts">
	import ProjectsTable from '$lib/components/ProjectsTable.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import { onMount } from 'svelte';
	import { years } from '$lib/data/projects.js';
	import { setHeaderContent, setNavLinks } from '$lib/stores/layout';

	let searchTerm = '';

	onMount(() => {
		setNavLinks([{ href: '/sandbox', text: 'Sandbox' }]);
		setHeaderContent({});
	});
</script>

<svelte:head>
	<title>Sandbox — Andrew van der Westhuizen</title>
	<meta name="description" content="A collection of personal projects, experiments, and interactive tools built by Andrew van der Westhuizen." />
</svelte:head>

<main class="container">
	<hgroup>
		<h2>Sandbox</h2>
		<p>Projects, experiments, and interactive tools.</p>
	</hgroup>

	<SearchBox bind:value={searchTerm} placeholder="Search projects" ariaLabel="Search projects" />

	<ProjectsTable {years} {searchTerm} />
</main>
