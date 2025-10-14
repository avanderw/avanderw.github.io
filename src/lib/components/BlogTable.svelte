<script lang="ts">
	import type { BlogPost } from '$lib/types.js';
	
	export let blogPosts: BlogPost[];
	export let searchTerm: string = '';
	
	interface BlogYear {
		number: number;
		posts: BlogPost[];
	}
	
	$: filteredBlogYears = (() => {
		// First filter the posts
		const filtered = blogPosts.filter(post =>
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.description.toLowerCase().includes(searchTerm.toLowerCase())
		);
		
		// Group by year
		const yearMap = new Map<number, BlogPost[]>();
		filtered.forEach(post => {
			if (!yearMap.has(post.year)) {
				yearMap.set(post.year, []);
			}
			yearMap.get(post.year)!.push(post);
		});
		
		// Convert to array and sort by year (descending)
		return Array.from(yearMap.entries())
			.map(([number, posts]) => ({ number, posts }))
			.sort((a, b) => b.number - a.number);
	})();
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
			{#each filteredBlogYears as year}
				{#each year.posts as post, i}
					<tr>
						{#if i === 0}
							<td rowspan={year.posts.length} class="year">{year.number}</td>
						{/if}
						<td><a href={post.url}>{post.title}</a></td>
						<td>{post.description}</td>
					</tr>
				{/each}
			{/each}
		</tbody>
	</table>

	{#if searchTerm && filteredBlogYears.length === 0}
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
