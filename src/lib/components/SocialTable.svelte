<script lang="ts">
	import type { SocialLink } from '$lib/types.js';
	
	export let socialLinks: SocialLink[];
	export let searchTerm: string = '';
	
	// Group social links by year, similar to how projects are grouped
	$: filteredSocialLinks = socialLinks.filter(link =>
		link.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
		link.description.toLowerCase().includes(searchTerm.toLowerCase())
	);
	
	// Group by year and sort by year descending
	$: groupedByYear = filteredSocialLinks.reduce((acc, link) => {
		const year = link.year;
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(link);
		return acc;
	}, {} as Record<number, SocialLink[]>);
	
	$: yearGroups = Object.entries(groupedByYear)
		.map(([year, links]) => ({ year: Number(year), links }))
		.sort((a, b) => b.year - a.year);
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
			{#each yearGroups as yearGroup}
				{#each yearGroup.links as link, i}
					<tr>
						{#if i === 0}
							<td rowspan={yearGroup.links.length} class="year">{yearGroup.year}</td>
						{/if}
						<td><a href={link.url}>{link.platform}</a></td>
						<td>{link.description}</td>
					</tr>
				{/each}
			{/each}
		</tbody>
	</table>

	{#if searchTerm && yearGroups.length === 0}
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
