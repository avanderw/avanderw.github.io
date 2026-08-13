<script lang="ts">
	import { onMount } from 'svelte';
	import { years } from '$lib/data/projects.js';
	import { blogPosts } from '$lib/data/blog.js';
	import { careerEntries } from '$lib/data/career.js';
	import { setHeaderContent, setNavLinks } from '$lib/stores/layout';

	const monthNames = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
	];

	function formatDate(dateStr: string): string {
		const [y, m, d] = dateStr.split('-');
		const month = monthNames[parseInt(m, 10) - 1];
		const day = parseInt(d, 10);
		return `${month} ${day}, ${y}`;
	}

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
			<h2 id="stream-heading">Stream</h2>
			<p>Thinking out loud — long-form writing on software, strategy, and the craft of building things.</p>
		</hgroup>
		<table>
			<thead class="sr-only">
				<tr>
					<th>Date</th>
					<th>Title</th>
				</tr>
			</thead>
			<tbody>
				{#each recentPosts as post}
					<tr>
						<td class="date">{formatDate(post.date)}
						<div class="read-time">{post.readingMinutes} min read</div>
						</td>
						<td>
							<a href={post.url} class="title">{post.title}</a>
							<div class="desc">{post.description}</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<p class="section-footer">Showing {recentPosts.length} of {totalPosts} — <a href="/stream">View all posts →</a></p>
	</section>

	<section class="landing-section" aria-labelledby="sandbox-heading">
		<hgroup>
			<h2 id="sandbox-heading">Sandbox</h2>
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
						<td>
							<a href={project.url} class="title">{project.name}</a>
							<div class="desc">{project.description}</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<p class="section-footer">Showing {highlightedProjects.length} of {totalProjects} — <a href="/sandbox">View all projects →</a></p>
	</section>

	<section class="landing-section" aria-labelledby="stack-heading">
		<hgroup>
			<h2 id="stack-heading">Stack</h2>
			<p>A career built across consulting, academia, banking and telecoms — driven by a passion for software and people.</p>
		</hgroup>
		<ol class="career-timeline" aria-label="Career journey">
			{#each careerEntries as entry}
				<li class="timeline-entry">
					<div class="timeline-year" aria-label={`Started in ${entry.year}`}>{entry.year}</div>
					<div class="timeline-dot" aria-hidden="true"></div>
					<div class="timeline-content">
						<div class="timeline-meta">{entry.duration} · {entry.period}</div>
						<div class="timeline-title">
							<span class="timeline-role">{entry.roles[0]}</span>
							<span class="timeline-at">at</span>
							<a href={entry.companyUrl} class="timeline-company">{entry.company}</a>
						</div>
						<div class="timeline-categories">
							{#each entry.categories as category}
								<span>{category}</span>
							{/each}
						</div>
					</div>
				</li>
			{/each}
		</ol>
		<p class="section-footer"><a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">View Resume (PDF)</a></p>
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

	.date {
		color: var(--color-muted);
		white-space: nowrap;
		vertical-align: top;
		padding-right: 1rem;
		font-size: 0.9rem;
	}

	.read-time {
		font-size: 0.75rem;
		margin-top: 0.15rem;
		white-space: nowrap;
	}

	.title {
		font-weight: 600;
		font-size: 1.05rem;
		line-height: 1.35;
	}

	.desc {
		color: var(--color-muted);
		font-size: 0.9rem;
		margin-top: 0.3rem;
		line-height: 1.5;
		max-width: var(--measure-list-copy);
	}

	.landing-section {
		border-top: 1px solid var(--color-border);
		padding-top: 1.5rem;
		margin-top: 1.5rem;
	}

	.landing-section :global(tbody tr) {
		border-bottom: 1px dotted var(--color-border);
	}

	.landing-section :global(tbody tr:last-child),
	.landing-section :global(tbody tr:last-child td) {
		border-bottom: none !important;
	}

	.section-footer {
		color: var(--color-muted);
		font-size: 0.875rem;
		text-align: right;
	}

	.career-timeline {
		position: relative;
		list-style: none;
		margin: 2rem 0 0;
		padding: 0;
	}

	.career-timeline::before {
		content: '';
		position: absolute;
		top: 0.8rem;
		bottom: 0.8rem;
		left: 7.5rem;
		border-left: 1px dotted var(--color-border);
	}

	.timeline-entry {
		display: grid;
		grid-template-columns: 6.5rem 2rem minmax(0, 1fr);
		position: relative;
		min-height: 6rem;
	}

	.timeline-year {
		color: var(--color-muted);
		font-size: 1.25rem;
		padding-top: 0.1rem;
		text-align: right;
	}

	.timeline-dot {
		z-index: 1;
		width: 0.7rem;
		height: 0.7rem;
		margin: 0.45rem auto 0;
		border: 2px solid var(--color-accent);
		border-radius: 50%;
		background: var(--color-bg);
	}

	.timeline-content {
		padding: 0 0 1.75rem 1rem;
	}

	.timeline-meta,
	.timeline-categories {
		color: var(--color-muted);
		font-size: 0.8rem;
	}

	.timeline-title {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.4rem;
		margin-top: 0.2rem;
	}

	.timeline-role,
	.timeline-company {
		font-weight: 600;
		font-size: 1.05rem;
		line-height: 1.35;
	}

	.timeline-at {
		color: var(--color-muted);
		font-size: 0.85rem;
	}

	.timeline-categories {
		display: flex;
		gap: 0.4rem;
		margin-top: 0.4rem;
	}

	.timeline-categories span {
		padding: 0.1rem 0.4rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
	}

	@media (max-width: 600px) {
		.career-timeline::before {
			left: 3.5rem;
		}

		.timeline-entry {
			grid-template-columns: 2.5rem 2rem minmax(0, 1fr);
		}

		.timeline-year {
			font-size: 0.95rem;
			text-align: left;
		}
	}
</style>
