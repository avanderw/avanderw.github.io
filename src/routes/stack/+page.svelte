<script lang="ts">
	import CareerTable from '$lib/components/CareerTable.svelte';
	import { onMount } from 'svelte';
	import { careerEntries } from '$lib/data/career.js';
	import { setHeaderContent, setNavLinks } from '$lib/stores/layout';

	let searchTerm = '';

	onMount(() => {
		setNavLinks([{ href: '/stack', text: 'Stack' }]);
		setHeaderContent({});
	});
</script>

<svelte:head>
	<title>Stack — Andrew van der Westhuizen</title>
	<meta name="description" content="Career history and professional experience of Andrew van der Westhuizen." />
</svelte:head>

<main class="container">
	<hgroup>
		<h2>Stack</h2>
		<p>Career history and professional experience.</p>
	</hgroup>

	<input
		type="search"
		name="search"
		placeholder="Search career"
		aria-label="Search career"
		bind:value={searchTerm}
	/>

	<CareerTable {careerEntries} {searchTerm} />
</main>
