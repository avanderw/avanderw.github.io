<script>
	import { laws } from '$lib/data/laws';
	import { ScaleIcon } from 'lucide-svelte';
	import { setNavLinks, setHeaderContent } from '$lib/stores/layout';
	import { onMount } from 'svelte';

	onMount(() => {
		// Clear navigation links for this page
		setNavLinks([]);
		
		// Set header content for this page
		setHeaderContent({
			title: 'Laws of Software Engineering',
			description: 'Collection of laws, principles, and aphorisms that are widely recognized in the software engineering community.'
		});
	});
</script>

<main class="container">
	{#each laws as law}
		<article>
			<h2>
				<ScaleIcon />
				{#if law.detailUrl}
					<a href={law.detailUrl} data-tooltip="View the report">{law.title}</a>
				{:else}
					{law.title}
				{/if}
			</h2>
			<blockquote>
				{law.quote}
				<footer>
					<cite>
						-- <a
							href={law.sourceUrl}
							data-tooltip="Visit the origin material"
							data-placement="bottom">{law.author}{law.year ? `, ${law.year}` : ''}</a
						>
					</cite>
				</footer>
			</blockquote>
		</article>
	{/each}
</main>
<footer class="container">
	<p>Inspired by <a href="https://www.laws-of-software.com/">laws-of-software.com</a> @ 2025</p>
</footer>

<style>
	h2 {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	main {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	/* Responsive adjustments */
	@media (max-width: 1280px) {
		main {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		main {
			grid-template-columns: 1fr;
		}
	}
</style>
