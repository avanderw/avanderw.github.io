<script lang="ts">
	import type { BlogPost } from '$lib/types.js';
	
	export let blogPosts: BlogPost[];
	export let searchTerm: string = '';

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
		post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		post.description.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<section aria-labelledby="blog-heading">
	<h2 id="blog-heading" class="sr-only">Blog Posts</h2>
	
	<table>
		<thead class="sr-only">
			<tr>
				<th>Date</th>
				<th>Title</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredPosts as post}
				<tr>
					<td class="date">{formatDate(post.date)}</td>
					<td>
						<a href={post.url} class="title">{post.title}</a>
						<div class="desc">{post.description}</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	{#if searchTerm && filteredPosts.length === 0}
		<p class="no-results">No blog posts found matching "{searchTerm}"</p>
	{/if}
</section>

<style>
	.date {
		color: var(--pico-muted-color);
		white-space: nowrap;
		vertical-align: top;
		padding-right: 1rem;
		font-size: 0.9rem;
	}

	.title {
		font-weight: 600;
	}

	.desc {
		color: var(--pico-muted-color);
		font-size: 0.875rem;
		margin-top: 0.15rem;
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
		.date {
			font-size: 0.8rem;
		}
	}
</style>