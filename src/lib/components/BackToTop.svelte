<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowUp } from 'lucide-svelte';

	export let showAfter = 600; /* px of scroll before appearing */

	let visible = false;

	function onScroll() {
		visible = window.scrollY > showAfter;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

{#if visible}
	<button
		class="back-to-top"
		on:click={scrollToTop}
		aria-label="Back to top"
		title="Back to top"
	>
		<ArrowUp size={18} />
	</button>
{/if}

<style>
	.back-to-top {
		position: fixed;
		right: 1.25rem;
		bottom: 1.25rem;
		z-index: 40;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		box-shadow: var(--shadow-md);
		cursor: pointer;
		transition: border-color var(--transition-fast), color var(--transition-fast);
	}

	.back-to-top:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	@media (prefers-reduced-motion: reduce) {
		.back-to-top {
			transition: none;
		}
	}
</style>