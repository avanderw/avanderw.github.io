<script lang="ts">
	import type { Year } from '$lib/types.js';
	
	export let years: Year[];
	export let searchTerm: string = '';
	
	$: filteredYears = years
		.map((year) => ({
			...year,
			projects: year.projects.filter(
				(project) =>
					project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					project.description.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}))
		.filter((year) => year.projects.length > 0);

	$: filteredProjectCount = filteredYears.reduce((count, year) => count + year.projects.length, 0);
</script>

<section aria-labelledby="projects-heading">
	<h2 id="projects-heading" class="sr-only">Projects</h2>

	<div class="table-scroll">
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
							<td>
								<a href={project.url} class="title">{project.name}</a>
								<div class="desc">{project.description}</div>
							</td>
						</tr>
					{/each}
				{/each}
			</tbody>
		</table>
	</div>

	{#if searchTerm}
		<p class="results-count" aria-live="polite">
			{filteredProjectCount} {filteredProjectCount === 1 ? 'project' : 'projects'} found
			{#if filteredYears.length > 0}
				· <button type="button" class="clear-search" on:click={() => (searchTerm = '')}>Clear</button>
			{/if}
		</p>
	{/if}

	{#if searchTerm && filteredYears.length === 0}
		<p class="no-results">No projects found matching "{searchTerm}"</p>
	{/if}
</section>

<style>
	.year {
		width: 10rem;
		padding-right: 1rem;
		color: var(--color-muted);
		font-size: 1.5rem;
		font-weight: 400;
		vertical-align: top;
		white-space: nowrap;
	}

	.title {
		font-weight: 600;
		font-size: 1.05rem;
		line-height: 1.35;
	}

	.desc {
		max-width: var(--measure-list-copy);
		margin-top: 0.3rem;
		color: var(--color-muted);
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.results-count {
		margin: var(--space-4) 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.clear-search {
		padding: 0;
		border: 0;
		color: var(--color-accent);
		font-size: inherit;
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.no-results {
		margin: 2rem 0;
		color: var(--color-muted);
		font-style: italic;
		text-align: center;
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
			width: 7rem;
			font-size: 1.25rem;
		}
	}
</style>
