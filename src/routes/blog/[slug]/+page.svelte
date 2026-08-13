<script lang="ts">
	import MarkdownViewer from '$lib/components/MarkdownViewer.svelte';
	import LawsOfSoftware from '$lib/components/LawsOfSoftware.svelte';
	import { setNavLinks, setHeaderContent } from '$lib/stores/layout';
	import { onMount } from 'svelte';
	import { blogPosts } from '$lib/data/blog';
	import type { BlogPost } from '$lib/types';
	import { ArrowLeft, ArrowRight, Share2 } from 'lucide-svelte';

	const monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	function formatDate(dateStr: string): string {
		const [y, m, d] = dateStr.split('-');
		const month = monthNames[parseInt(m, 10) - 1];
		const day = parseInt(d, 10);
		return `${month} ${day}, ${y}`;
	}

	export let data;

	let currentPost: BlogPost;
	let currentIndex = -1;
	let markdownPath = '';
	let shareLabel = 'Share';
	let resetShareLabelTimeout: ReturnType<typeof setTimeout> | null = null;

	$: {
		currentPost = data.post;
		currentIndex = blogPosts.findIndex((post) => post.slug === currentPost.slug);
		markdownPath = currentPost.markdownPath || '';

		setNavLinks([
			{ href: '/?tab=blog', text: 'Blog', tooltip: 'Back to blog index' }
		]);
	}

	$: prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
	$: nextPost = currentIndex >= 0 && currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
	$: hasSummary = Boolean(
		currentPost?.summary &&
		currentPost.summary.whatIsDiscussed &&
		!currentPost.summary.whatIsDiscussed.startsWith('TODO')
	);

	function setShareLabelTemporarily(label: string) {
		shareLabel = label;
		if (resetShareLabelTimeout) clearTimeout(resetShareLabelTimeout);
		resetShareLabelTimeout = setTimeout(() => {
			shareLabel = 'Share';
			resetShareLabelTimeout = null;
		}, 2500);
	}

	async function sharePost() {
		if (!currentPost || typeof window === 'undefined') return;

		const postUrl = window.location.href;
		const shareData = {
			title: currentPost.title,
			text: currentPost.description,
			url: postUrl
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
				setShareLabelTemporarily('Shared');
				return;
			}
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(postUrl);
				setShareLabelTemporarily('Link copied');
				return;
			}
			setShareLabelTemporarily('Unable to share');
		} catch {
			setShareLabelTemporarily('Share cancelled');
		}
	}

	onMount(() => {
		return () => {
			if (resetShareLabelTimeout) clearTimeout(resetShareLabelTimeout);
		};
	});
</script>

<svelte:head>
	{#if currentPost}
		<title>{currentPost.title} - Andrew van der Westhuizen</title>
		<meta name="description" content={currentPost.description} />
	{/if}
</svelte:head>

{#snippet proseHeader()}
	{#if currentPost}
		<header class="article-header">
			<nav class="article-top" aria-label="Article utilities">
				<a class="back-link" href="/stream">&larr; Stream</a>
				<button
					class="icon-btn share-button"
					on:click={sharePost}
					aria-label="Share this post"
					title="Share this post"
				>
					<Share2 size={16} />
					<span>{shareLabel}</span>
				</button>
			</nav>
			<h1>{currentPost.title}</h1>
			<p class="post-meta">{formatDate(currentPost.date)} &middot; {currentPost.readingMinutes} min read</p>
			<p class="deck">{currentPost.description}</p>
		</header>

		{#if hasSummary}
			<section class="article-summary" aria-labelledby="article-summary-heading">
				<h2 id="article-summary-heading">Article Summary</h2>
				<div class="summary-grid">
					<div class="summary-item">
						<h3>What is discussed</h3>
						<p>{currentPost.summary.whatIsDiscussed}</p>
					</div>
					<div class="summary-item">
						<h3>Why it matters</h3>
						<p>{currentPost.summary.whyItMatters}</p>
					</div>
					<div class="summary-item">
						<h3>Key takeaway</h3>
						<p>{currentPost.summary.keyTakeaway}</p>
					</div>
				</div>
			</section>
		{/if}
	{/if}
{/snippet}

{#snippet proseFooter()}
	<nav class="article-pager" aria-label="Previous and next article">
		{#if prevPost}
			<a class="pager-link prev" href={prevPost.url}>
				<span class="pager-label"><ArrowLeft size={14} /> Previous</span>
				<span class="pager-title">{prevPost.title}</span>
			</a>
		{:else}
			<span class="pager-link pager-empty"></span>
		{/if}
		{#if nextPost}
			<a class="pager-link next" href={nextPost.url}>
				<span class="pager-label">Next <ArrowRight size={14} /></span>
				<span class="pager-title">{nextPost.title}</span>
			</a>
		{:else}
			<span class="pager-link pager-empty"></span>
		{/if}
	</nav>
{/snippet}

<main class="container">
	{#if !currentPost}
		<article class="not-found">
			<h2>Blog Post Not Found</h2>
			<p>The blog post you're looking for doesn't exist.</p>
			<a href="/?tab=blog" role="button">Back to Blog</a>
		</article>
	{:else if currentPost.markdownPath}
			<MarkdownViewer src={markdownPath} {proseHeader} {proseFooter} />
	{:else}
		<div class="article-inline">
			{@render proseHeader()}
			<div class="article-body">
				{#if currentPost.htmlComponent === 'LawsOfSoftware'}
					<LawsOfSoftware />
				{:else}
					<p>Content not available.</p>
				{/if}
			</div>
			{@render proseFooter()}
		</div>
	{/if}
</main>

<style>
	.article-inline {
		max-width: var(--measure-prose);
		margin-inline: auto;
		padding-bottom: var(--space-8);
	}

	.not-found {
		max-width: var(--measure-prose);
		margin-inline: auto;
	}

	.article-header {
		display: block;
		padding-top: var(--space-2);
	}

	.article-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		margin-bottom: 2.5rem;
	}

	.back-link {
		color: var(--color-muted);
		text-decoration: none;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}
	.back-link:hover {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	.share-button.icon-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.75rem;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
	}
	.share-button span {
		font-size: 0.85rem;
		font-weight: 600;
	}
	.share-button:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.article-header h1 {
		margin: 0 0 0.9rem;
		font-size: clamp(1.9rem, 4vw, 2.7rem);
		line-height: 1.12;
		font-weight: 400;
		text-wrap: balance;
	}

	.post-meta {
		color: var(--color-muted);
		font-size: 0.9rem;
		margin: 0 0 1.25rem;
	}

	.deck {
		color: var(--color-muted);
		font-size: 1.05rem;
		line-height: var(--line-height-base);
		margin: 0 0 2rem;
		max-width: var(--measure-prose);
	}

	.article-summary {
		margin: 0 0 2.5rem;
		padding: 1.25rem;
		border: 1px solid var(--color-border);
		border-left: 3px solid var(--color-accent);
		border-radius: var(--radius-sm);
		background: var(--color-surface);
	}
	.article-summary h2 {
		margin: 0 0 1rem;
		font-size: 1.1rem;
	}

	.summary-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}
	.summary-item h3 {
		margin: 0 0 0.4rem;
		font-size: 0.95rem;
	}
	.summary-item p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.92rem;
	}

	.article-pager {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}
	.pager-link {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 0.9rem 1rem;
		border-radius: var(--radius-sm);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		text-decoration: none;
		color: var(--color-text);
		transition: border-color var(--transition-fast), background var(--transition-fast);
	}
	.pager-link:hover {
		border-color: var(--color-accent);
	}
	.pager-link.next {
		text-align: right;
	}
	.pager-empty {
		visibility: hidden;
	}
	.pager-label {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-muted);
		font-weight: 600;
	}
	.pager-title {
		font-size: 1rem;
		line-height: 1.3;
	}

	@media (max-width: 576px) {
		.article-top {
			margin-bottom: 1.75rem;
		}
		.summary-grid {
			grid-template-columns: 1fr;
		}
		.article-pager {
			grid-template-columns: 1fr;
		}
		.pager-link.next {
			text-align: left;
		}
	}
</style>