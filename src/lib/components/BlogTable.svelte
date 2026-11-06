<script lang="ts">
	import type { BlogLabel, BlogPost } from '$lib/types.js';
	import BlogPostTitle from './BlogPostTitle.svelte';

	export let blogPosts: BlogPost[];
	export let searchTerm: string = '';
	export let selectedLabel: BlogLabel | '' = '';

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

	$: filteredPosts = blogPosts.filter(post =>
		(!selectedLabel || post.labels?.includes(selectedLabel)) &&
		(post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		post.description.toLowerCase().includes(searchTerm.toLowerCase()))
	);
</script>

<section aria-labelledby="blog-heading">
	<h2 id="blog-heading" class="sr-only">Blog Posts</h2>

	<div class="table-scroll">
		<table>
			<thead class="sr-only">
				<tr>
					<th>Date</th>
					<th>Title and description</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredPosts as post}
					<tr>
						<td class="date">
							{formatDate(post.date)}
							<div class="read-time">{post.readingMinutes} min read</div>
						</td>
						<td class="post-content">
							<BlogPostTitle {post} />
							<div class="desc">{post.description}</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if searchTerm || selectedLabel}
		<p class="results-count" aria-live="polite">
			{filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
			{#if filteredPosts.length > 0}
				· <a href="/stream">Clear</a>
			{/if}
		</p>
	{/if}

	{#if (searchTerm || selectedLabel) && filteredPosts.length === 0}
		<p class="no-results">No blog posts found{#if searchTerm} matching "{searchTerm}"{/if}{#if selectedLabel} with label "{selectedLabel}"{/if}.</p>
	{/if}
</section>

<style>
	.post-content {
		min-width: 0;
	}

	.date {
		width: 1%;
		color: var(--color-muted);
		white-space: nowrap;
		vertical-align: top;
		padding-right: 1rem;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.read-time {
		font-size: 0.8rem;
		margin-top: var(--space-meta);
		white-space: nowrap;
	}

	.desc {
		color: var(--color-muted);
		font-size: 0.9rem;
		margin-top: 0.3rem;
		line-height: 1.5;
		max-width: var(--measure-list-copy);
	}

	.results-count {
		color: var(--color-muted);
		font-size: 0.875rem;
		margin: var(--space-4) 0 0;
	}

	.no-results {
		text-align: center;
		color: var(--color-muted);
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
		.date {
			font-size: 0.85rem;
		}
	}
</style>