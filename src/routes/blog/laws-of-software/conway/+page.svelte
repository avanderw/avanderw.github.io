<script>
	import MarkdownViewer from '$lib/components/MarkdownViewer.svelte';
	import { setNavLinks, setHeaderContent } from '$lib/stores/layout';
	import { onMount } from 'svelte';

	onMount(() => {
		// Set navigation links for this page
		setNavLinks([
			{ href: '/?tab=blog', text: 'Blog', tooltip: 'Back to blog index' },
			{ href: '/blog/laws-of-software', text: 'Laws', tooltip: 'Laws of Software Engineering' }
		]);

		// Set header content for this page
		setHeaderContent({});
	});
</script>

<main class="container">
	<MarkdownViewer src="/laws-of-software/conway.md" />
</main>
