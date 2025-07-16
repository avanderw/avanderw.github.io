<script lang="ts">
	import type { SocialLink } from '$lib/types.js';
	
	export let socialLinks: SocialLink[];
	export let searchTerm: string = '';
	
	$: filteredSocialLinks = socialLinks.filter(link =>
		link.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
		link.description.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<section aria-labelledby="social-heading">
	<h2 id="social-heading" class="sr-only">Social Links</h2>
	
	<table>
		<thead class="sr-only">
			<tr>
				<th>Year</th>
				<th>Platform</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredSocialLinks as link}
				<tr>
					<td class="year">{link.year}</td>
					<td><a href={link.url}>{link.platform}</a></td>
					<td>{link.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	{#if searchTerm && filteredSocialLinks.length === 0}
		<p class="no-results">No social links found matching "{searchTerm}"</p>
	{/if}
</section>

<style>
	.year {
		color: var(--pico-muted-color);
		font-size: 2rem;
	}

	.no-results {
		text-align: center;
		color: var(--pico-muted-color);
		font-style: italic;
		margin: 2rem 0;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 768px) {
		.year {
			font-size: 1.5rem;
		}
	}
</style>
