<script lang="ts">
	import type { CareerEntry } from '$lib/types.js';
	
	export let careerEntries: CareerEntry[];
	export let searchTerm: string = '';
	
	$: filteredCareerEntries = careerEntries.filter(entry =>
		entry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
		entry.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase())) ||
		entry.location.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<section aria-labelledby="career-heading">
	<h2 id="career-heading" class="sr-only">Career History</h2>
	
	<table>
		<thead class="sr-only">
			<tr>
				<th>Period</th>
				<th>Role</th>
				<th>Company</th>
				<th>Location</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredCareerEntries as entry}
				<tr>
					<td class="year">{entry.period}</td>
					<td>
						{#each entry.roles as role, i}
							{role}{#if i < entry.roles.length - 1}<br />{/if}
						{/each}
					</td>
					<td>
						<a href={entry.companyUrl} title={entry.company === 'eSight' ? 'Site no longer exists' : ''}>
							{entry.company}
						</a>
					</td>
					<td>{entry.location}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	{#if searchTerm && filteredCareerEntries.length === 0}
		<p class="no-results">No career entries found matching "{searchTerm}"</p>
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
