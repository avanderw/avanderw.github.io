<script>
	import { laws } from '$lib/data/laws';
	import { ScaleIcon } from 'lucide-svelte';
</script>

<div class="laws-container">
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
</div>

<footer class="laws-footer">
	<p>Inspired by <a href="https://www.laws-of-software.com/">laws-of-software.com</a> @ 2025</p>
</footer>

<style>
	h2 {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.laws-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.laws-footer {
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid var(--pico-muted-border-color);
	}

	/* Responsive adjustments */
	@media (max-width: 1280px) {
		.laws-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.laws-container {
			grid-template-columns: 1fr;
		}
	}
</style>
