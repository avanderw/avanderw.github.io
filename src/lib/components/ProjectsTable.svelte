<script lang="ts">
	import type { Year } from '$lib/types.js';
	
	export let years: Year[];
	export let searchTerm: string = '';
	
	$: filteredYears = years.map(year => ({
		...year,
		projects: year.projects.filter(project => 
			project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description.toLowerCase().includes(searchTerm.toLowerCase())
		)
	})).filter(year => year.projects.length > 0);
</script>

<section aria-labelledby="projects-heading">
	<h2 id="projects-heading" class="sr-only">Projects</h2>
	
	<table>
		<thead class="sr-only">
			<tr>
				<th>Year</th>
				<th>Project</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredYears as year}
				{#each year.projects as project, i}
					<tr>
						{#if i === 0}
							<td rowspan={year.projects.length} class="year">{year.number}</td>
						{/if}
						<td><a href={project.url}>{project.name}</a></td>
						<td>{project.description}</td>
					</tr>
				{/each}
			{/each}
		</tbody>
	</table>

	{#if searchTerm && filteredYears.length === 0}
		<p class="no-results">No projects found matching "{searchTerm}"</p>
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
