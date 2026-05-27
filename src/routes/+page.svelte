<script lang="ts">
	import { onMount } from 'svelte';
	import { years } from '$lib/data/projects.js';
	import { blogPosts } from '$lib/data/blog.js';
	import { careerEntries } from '$lib/data/career.js';
	import { setHeaderContent, setNavLinks } from '$lib/stores/layout';

	const recentPosts = blogPosts.slice(0, 5);
	const highlightedProjects = years.flatMap((y) => y.projects).filter((p) => p.highlighted);
	const totalPosts = blogPosts.length;
	const totalProjects = years.flatMap((y) => y.projects).length;

	onMount(() => {
		setNavLinks([]);
		setHeaderContent({});
	});
</script>

<svelte:head>
	<title>Andrew van der Westhuizen</title>
	<meta
		name="description"
		content="Discover a diverse collection of projects, tools, and code crafted by Andrew van der Westhuizen on his personal website. Explore a wide range of topics, from software development and design to innovative solutions, all in one place. Dive into Andrew van der Westhuizen's creative work and expertise today."
	/>
</svelte:head>

<main class="container">
	<hgroup>
		<h2>Andrew van der Westhuizen</h2>
		<p>Leading with the why. Getting things done!</p>
	</hgroup>

	<p>
		Welcome to my digital space! I share my tech passions and projects here. Let's connect and
		explore together.
	</p>

	<section class="landing-section" aria-labelledby="stream-heading">
		<hgroup>
			<h3 id="stream-heading">Stream</h3>
			<p>Thinking out loud — long-form writing on software, strategy, and the craft of building things.</p>
		</hgroup>
		<table>
			<thead class="sr-only">
				<tr>
					<th>Title</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{#each recentPosts as post}
					<tr>
						<td><a href={post.url}>{post.title}</a></td>
						<td>{post.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<p class="section-footer">Showing {recentPosts.length} of {totalPosts} — <a href="/stream">View all posts →</a></p>
	</section>

	<section class="landing-section" aria-labelledby="sandbox-heading">
		<hgroup>
			<h3 id="sandbox-heading">Sandbox</h3>
			<p>Experiments, tools, and interactive ideas — things built to learn, explore, or just have fun with.</p>
		</hgroup>
		<table>
			<thead class="sr-only">
				<tr>
					<th>Project</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{#each highlightedProjects as project}
					<tr>
						<td><a href={project.url}>{project.name}</a></td>
						<td>{project.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<p class="section-footer">Showing {highlightedProjects.length} of {totalProjects} — <a href="/sandbox">View all projects →</a></p>
	</section>

	<section class="landing-section" aria-labelledby="stack-heading">
		<hgroup>
			<h3 id="stack-heading">Stack</h3>
			<p>A career built across consulting, academia, banking and telecoms — driven by a passion for software and people.</p>
		</hgroup>
		<table>
			<thead class="sr-only">
				<tr>
					<th>Period</th>
					<th>Role</th>
					<th>Company</th>
				</tr>
			</thead>
			<tbody>
				{#each careerEntries as entry}
					<tr>
						<td class="period">{entry.period}</td>
						<td>
							{#each entry.roles as role, i}
								{role}{#if i < entry.roles.length - 1}<br />{/if}
							{/each}
						</td>
						<td><a href={entry.companyUrl}>{entry.company}</a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

</main>

<style>
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

	.landing-section {
		border-top: 1px solid var(--pico-muted-border-color);
		padding-top: 1.5rem;
		margin-top: 1.5rem;
	}

	.landing-section :global(tbody tr) {
		border-bottom: 1px dotted var(--pico-muted-border-color);
	}

	.landing-section :global(tbody tr:last-child),
	.landing-section :global(tbody tr:last-child td) {
		border-bottom: none !important;
	}

	.section-footer {
		color: var(--pico-muted-color);
		font-size: 0.875rem;
		text-align: right;
	}

	.period {
		color: var(--pico-muted-color);
		white-space: nowrap;
	}
</style>
