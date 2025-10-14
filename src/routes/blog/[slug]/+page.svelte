<script lang="ts">
	import MarkdownViewer from '$lib/components/MarkdownViewer.svelte';
	import LawsOfSoftware from '$lib/components/LawsOfSoftware.svelte';
	import { setNavLinks, setHeaderContent } from '$lib/stores/layout';
	import { onMount } from 'svelte';
	import { blogPosts } from '$lib/data/blog';
	import type { BlogPost } from '$lib/types';
	import { 
		ChevronFirst, 
		ChevronLast, 
		ChevronLeft, 
		ChevronRight,
		Phone,
		PhoneCallIcon,
		AtSignIcon
	} from 'lucide-svelte';

	export let data;

	let currentPost: BlogPost;
	let currentIndex: number = -1;
	let markdownPath: string = '';

	$: {
		// Get the post from the loaded data
		currentPost = data.post;
		currentIndex = blogPosts.findIndex(post => post.slug === currentPost.slug);
		markdownPath = currentPost.markdownPath || '';
		
		// Set navigation links for this page
		setNavLinks([
			{ href: '/?tab=blog', text: 'Blog', tooltip: 'Back to blog index' }
		]);
	}

	// Navigation functions
	function goToFirst() {
		if (blogPosts.length > 0) {
			window.location.href = `/blog/${blogPosts[0].slug}`;
		}
	}

	function goToPrev() {
		if (currentIndex > 0) {
			window.location.href = `/blog/${blogPosts[currentIndex - 1].slug}`;
		}
	}

	function goToNext() {
		if (currentIndex < blogPosts.length - 1) {
			window.location.href = `/blog/${blogPosts[currentIndex + 1].slug}`;
		}
	}

	function goToLast() {
		if (blogPosts.length > 0) {
			window.location.href = `/blog/${blogPosts[blogPosts.length - 1].slug}`;
		}
	}

	onMount(() => {
		// Cleanup is handled by layout
	});
</script>

<svelte:head>
	{#if currentPost}
		<title>{currentPost.title} - Andrew van der Westhuizen</title>
		<meta name="description" content={currentPost.description} />
	{/if}
</svelte:head>

<main class="container">
	{#if !currentPost}
		<article>
			<h2>Blog Post Not Found</h2>
			<p>The blog post you're looking for doesn't exist.</p>
			<a href="/?tab=blog" role="button">Back to Blog</a>
		</article>
	{:else}
		<!-- Navigation Controls -->
		<nav class="blog-navigation" aria-label="Blog post navigation">
			<button
				on:click={goToFirst}
				disabled={currentIndex === 0}
				data-tooltip="First post"
				data-placement="bottom"
				aria-label="Go to first post"
			>
				<ChevronFirst />
			</button>
			<button
				on:click={goToPrev}
				disabled={currentIndex === 0}
				data-tooltip="Previous post"
				data-placement="bottom"
				aria-label="Go to previous post"
			>
				<ChevronLeft />
			</button>
			<span class="post-counter" aria-live="polite">
				Post {currentIndex + 1} of {blogPosts.length}
			</span>
			<button
				on:click={goToNext}
				disabled={currentIndex === blogPosts.length - 1}
				data-tooltip="Next post"
				data-placement="bottom"
				aria-label="Go to next post"
			>
				<ChevronRight />
			</button>
			<button
				on:click={goToLast}
				disabled={currentIndex === blogPosts.length - 1}
				data-tooltip="Last post"
				data-placement="bottom"
				aria-label="Go to last post"
			>
				<ChevronLast />
			</button>
		</nav>

		<!-- Content: Either Markdown or HTML Component -->
		<article>
			{#if currentPost.htmlComponent === 'LawsOfSoftware'}
				<LawsOfSoftware />
			{:else if currentPost.markdownPath}
				<MarkdownViewer src={markdownPath} />
			{:else}
				<p>Content not available.</p>
			{/if}
		</article>

		<!-- Bottom Navigation -->
		<nav class="blog-navigation bottom" aria-label="Blog post navigation">
			<button
				on:click={goToFirst}
				disabled={currentIndex === 0}
				data-tooltip="First post"
				data-placement="top"
				aria-label="Go to first post"
			>
				<ChevronFirst />
			</button>
			<button
				on:click={goToPrev}
				disabled={currentIndex === 0}
				data-tooltip="Previous post"
				data-placement="top"
				aria-label="Go to previous post"
			>
				<ChevronLeft />
			</button>
			<span class="post-counter" aria-live="polite">
				Post {currentIndex + 1} of {blogPosts.length}
			</span>
			<button
				on:click={goToNext}
				disabled={currentIndex === blogPosts.length - 1}
				data-tooltip="Next post"
				data-placement="top"
				aria-label="Go to next post"
			>
				<ChevronRight />
			</button>
			<button
				on:click={goToLast}
				disabled={currentIndex === blogPosts.length - 1}
				data-tooltip="Last post"
				data-placement="top"
				aria-label="Go to last post"
			>
				<ChevronLast />
			</button>
		</nav>
	{/if}
</main>

<footer class="container">
	<nav>
		<ul>
			<li><strong>Let's Connect</strong></li>
		</ul>
		<ul>
			<li>
				<a
					aria-label="Chat on WhatsApp"
					href="https://wa.me/27763347342"
					title="Please don't just say hello in chat"
				>
					<Phone /> WhatsApp
				</a>
			</li>
			<li>
				<a href="tel:+27763347342" title="I prefer WhatsApp">
					<PhoneCallIcon /> +27&nbsp;(0)76&nbsp;334&nbsp;7342
				</a>
			</li>
			<li>
				<a href="mailto:avanderw@gmail.com" title="Will respond within 48 hours">
					<AtSignIcon /> avanderw@gmail.com
				</a>
			</li>
		</ul>
	</nav>
</footer>

<style>
	.blog-navigation {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		margin: 2rem 0;
		padding: 1rem 0;
		border-top: 1px solid var(--pico-muted-border-color);
		border-bottom: 1px solid var(--pico-muted-border-color);
	}

	.blog-navigation.bottom {
		margin-top: 3rem;
		border-top: 1px solid var(--pico-muted-border-color);
		border-bottom: none;
	}

	.blog-navigation button {
		padding: 0.5rem;
		margin: 0;
		border: 1px solid var(--pico-muted-border-color);
		background: var(--pico-background-color);
		color: var(--pico-color);
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--pico-border-radius);
	}

	.blog-navigation button:hover:not(:disabled) {
		background: var(--pico-primary-background);
		border-color: var(--pico-primary);
		color: var(--pico-primary-inverse);
	}

	.blog-navigation button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.post-counter {
		padding: 0 1rem;
		font-size: 0.875rem;
		color: var(--pico-muted-color);
		white-space: nowrap;
	}

	article {
		margin: 2rem 0;
	}

	@media (max-width: 576px) {
		.blog-navigation {
			gap: 0.25rem;
		}

		.blog-navigation button {
			min-width: 2rem;
			height: 2rem;
			padding: 0.25rem;
		}

		.post-counter {
			padding: 0 0.5rem;
			font-size: 0.75rem;
		}
	}
</style>
