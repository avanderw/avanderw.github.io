<script lang="ts">
	import type { BlogPost } from '$lib/types.js';

	export let post: BlogPost;
</script>

<div class="post-heading">
	<a href={post.url} class="title" title={post.title}>{post.title}</a>
	{#if post.labels?.length}
		<div class="labels" role="group" aria-label="Post labels">
			{#each post.labels as label}
				<span>{label}</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.post-heading {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 0;
		min-width: 100%;
		line-height: 1.35;
	}

	.title {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 600;
		font-size: 1.05rem;
		line-height: 1.35;
	}

	.labels {
		display: flex;
		gap: 0.3rem;
		max-width: 45%;
		min-width: 0;
		overflow-x: auto;
		scrollbar-width: none;
		color: var(--color-muted);
		font-size: 0.7rem;
		line-height: 1.35;
	}

	.labels span {
		flex-shrink: 0;
		padding: 0.05rem 0.35rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		white-space: nowrap;
	}

	@media (max-width: 768px) {
		.title {
			font-size: 1rem;
		}
	}
</style>