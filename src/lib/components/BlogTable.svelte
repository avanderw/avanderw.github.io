<script lang="ts">
	import type { BlogPost } from '$lib/types.js';
	
	export let blogPosts: BlogPost[];
	export let searchTerm: string = '';
	
	$: filteredBlogPosts = blogPosts.filter(post =>
		post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		post.description.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<section aria-labelledby="blog-heading">
	<h2 id="blog-heading" class="sr-only">Blog Posts</h2>
	
	<table>
		<thead class="sr-only">
			<tr>
				<th>Year</th>
				<th>Title</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredBlogPosts as post}
				<tr>
					<td class="year">{post.year}</td>
					<td><a href={post.url}>{post.title}</a></td>
					<td>{post.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	{#if searchTerm && filteredBlogPosts.length === 0}
		<p class="no-results">No blog posts found matching "{searchTerm}"</p>
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
