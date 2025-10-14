<script>
	import MarkdownViewer from '$lib/components/MarkdownViewer.svelte';
	import { setNavLinks, setHeaderContent } from '$lib/stores/layout';
	import { onMount } from 'svelte';
	import { getLawsWithDetails, getLawDetailIndex } from '$lib/data/laws';
	import { 
		ChevronFirst, 
		ChevronLast, 
		ChevronLeft, 
		ChevronRight
	} from 'lucide-svelte';

	const currentUrl = '/blog/laws-of-software/conway';
	const lawsWithDetails = getLawsWithDetails();
	const currentIndex = getLawDetailIndex(currentUrl);

	// Navigation functions
	function goToFirst() {
		if (lawsWithDetails.length > 0 && lawsWithDetails[0].detailUrl) {
			window.location.href = lawsWithDetails[0].detailUrl;
		}
	}

	function goToPrev() {
		if (currentIndex > 0 && lawsWithDetails[currentIndex - 1].detailUrl) {
			window.location.href = lawsWithDetails[currentIndex - 1].detailUrl;
		}
	}

	function goToNext() {
		if (currentIndex < lawsWithDetails.length - 1 && lawsWithDetails[currentIndex + 1].detailUrl) {
			window.location.href = lawsWithDetails[currentIndex + 1].detailUrl;
		}
	}

	function goToLast() {
		const lastLaw = lawsWithDetails[lawsWithDetails.length - 1];
		if (lawsWithDetails.length > 0 && lastLaw.detailUrl) {
			window.location.href = lastLaw.detailUrl;
		}
	}

	onMount(() => {
		// Set navigation links for this page
		setNavLinks([
			{ href: '/?tab=blog', text: 'Blog', tooltip: 'Back to blog index' },
			{ href: '/blog/laws-of-software', text: 'Laws', tooltip: 'Laws of Software Engineering' }
		]);

		// Set header content for this page
		setHeaderContent({});
	});
</script>

<svelte:head>
	<title>Conway's Law - Andrew van der Westhuizen</title>
	<meta name="description" content="Conway's Law: Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure." />
</svelte:head>

<main class="container">
	<!-- Navigation Controls -->
	<nav class="law-navigation" aria-label="Law detail navigation">
		<button
			on:click={goToFirst}
			disabled={currentIndex === 0}
			data-tooltip="First law"
			data-placement="bottom"
			aria-label="Go to first law"
		>
			<ChevronFirst />
		</button>
		<button
			on:click={goToPrev}
			disabled={currentIndex === 0}
			data-tooltip="Previous law"
			data-placement="bottom"
			aria-label="Go to previous law"
		>
			<ChevronLeft />
		</button>
		<span class="law-counter" aria-live="polite">
			Law {currentIndex + 1} of {lawsWithDetails.length}
		</span>
		<button
			on:click={goToNext}
			disabled={currentIndex === lawsWithDetails.length - 1}
			data-tooltip="Next law"
			data-placement="bottom"
			aria-label="Go to next law"
		>
			<ChevronRight />
		</button>
		<button
			on:click={goToLast}
			disabled={currentIndex === lawsWithDetails.length - 1}
			data-tooltip="Last law"
			data-placement="bottom"
			aria-label="Go to last law"
		>
			<ChevronLast />
		</button>
	</nav>

	<MarkdownViewer src="/laws-of-software/conway.md" />

	<!-- Bottom Navigation -->
	<nav class="law-navigation bottom" aria-label="Law detail navigation">
		<button
			on:click={goToFirst}
			disabled={currentIndex === 0}
			data-tooltip="First law"
			data-placement="top"
			aria-label="Go to first law"
		>
			<ChevronFirst />
		</button>
		<button
			on:click={goToPrev}
			disabled={currentIndex === 0}
			data-tooltip="Previous law"
			data-placement="top"
			aria-label="Go to previous law"
		>
			<ChevronLeft />
		</button>
		<span class="law-counter" aria-live="polite">
			Law {currentIndex + 1} of {lawsWithDetails.length}
		</span>
		<button
			on:click={goToNext}
			disabled={currentIndex === lawsWithDetails.length - 1}
			data-tooltip="Next law"
			data-placement="top"
			aria-label="Go to next law"
		>
			<ChevronRight />
		</button>
		<button
			on:click={goToLast}
			disabled={currentIndex === lawsWithDetails.length - 1}
			data-tooltip="Last law"
			data-placement="top"
			aria-label="Go to last law"
		>
			<ChevronLast />
		</button>
	</nav>
</main>

<style>
	.law-navigation {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		margin: 2rem 0;
		padding: 1rem 0;
		border-top: 1px solid var(--pico-muted-border-color);
		border-bottom: 1px solid var(--pico-muted-border-color);
	}

	.law-navigation.bottom {
		margin-top: 3rem;
		border-top: 1px solid var(--pico-muted-border-color);
		border-bottom: none;
	}

	.law-navigation button {
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

	.law-navigation button:hover:not(:disabled) {
		background: var(--pico-primary-background);
		border-color: var(--pico-primary);
		color: var(--pico-primary-inverse);
	}

	.law-navigation button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.law-counter {
		padding: 0 1rem;
		font-size: 0.875rem;
		color: var(--pico-muted-color);
		white-space: nowrap;
	}

	@media (max-width: 576px) {
		.law-navigation {
			gap: 0.25rem;
		}

		.law-navigation button {
			min-width: 2rem;
			height: 2rem;
			padding: 0.25rem;
		}

		.law-counter {
			padding: 0 0.5rem;
			font-size: 0.75rem;
		}
	}
</style>
