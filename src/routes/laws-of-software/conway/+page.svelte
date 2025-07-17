<script>
	import MarkdownViewer from '$lib/components/MarkdownViewer.svelte';
	import { setNavLinks, setHeaderContent } from '$lib/stores/layout';
	import { onMount } from 'svelte';

	onMount(() => {
		// Set navigation links for this page
		setNavLinks([{ href: '/laws-of-software', text: 'Laws' }]);

		// Set header content for this page
		setHeaderContent({});
	});
</script>

<main class="container">
	<MarkdownViewer src="conway/report.md" />
</main>
