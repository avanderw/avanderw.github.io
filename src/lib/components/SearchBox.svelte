<script lang="ts">
	export let value = '';
	export let placeholder = 'Search';
	export let ariaLabel = 'Search';
	export let name = 'search';

	let inputRef: HTMLInputElement;

	function clear() {
		value = '';
		inputRef?.focus();
	}
</script>

<div class="search-row">
	<input
		bind:this={inputRef}
		type="search"
		{name}
		{placeholder}
		aria-label={ariaLabel}
		bind:value
	/>
	{#if value}
		<button class="search-clear" type="button" on:click={clear} aria-label="Clear search">Clear</button>
	{/if}
</div>

<style>
	.search-row {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin: var(--space-4) 0 var(--space-6);
	}

	.search-row input[type='search'] {
		flex: 1;
		min-width: 0;
		padding: 0.55rem 0.85rem;
		font-size: 1rem;
		font-family: inherit;
		color: var(--color-text);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}

	.search-row input[type='search']:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-color: var(--color-accent);
	}

	.search-clear {
		padding: 0.5rem 0.85rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface);
		color: var(--color-text);
		font: inherit;
		font-size: 0.875rem;
		cursor: pointer;
	}
	.search-clear:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}
</style>