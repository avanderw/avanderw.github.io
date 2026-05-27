<script lang="ts">
	import type { TabType } from '$lib/types.js';
	
	export let currentTab: TabType;
	export let onTabChange: (tab: TabType) => void;
	
	const tabs = [
		{ id: 'projects', label: 'Sandbox', description: 'Projects' },
		{ id: 'blog', label: 'Stream', description: 'Blog' },
		{ id: 'career', label: 'Stack', description: 'Experience' }
	] as const;
</script>

<nav class="tab-navigation" aria-label="Primary sections">
	<ul class="tab-list" role="tablist">
		{#each tabs as tab}
			<li class="tab-item">
				<a 
					class="tab-link"
					href="?tab={tab.id}"
					role="tab"
					data-tooltip={tab.description}
					data-placement="bottom"
					aria-label="{tab.label}: {tab.description}"
					aria-current={currentTab === tab.id} 
					on:click|preventDefault={() => onTabChange(tab.id)}
				>
					{#if currentTab === tab.id}
						<span class="tab-caret" aria-hidden="true">&gt;</span>
					{/if}
					{tab.label}
				</a>
			</li>
		{/each}
	</ul>
	<ul>
		<li>
			<slot />
		</li>
	</ul>
</nav>

<style>
	.tab-list {
		display: flex;
		align-items: center;
		gap: 0;
	}

	.tab-item {
		margin: 0;
	}

	.tab-item + .tab-item {
		border-left: 1px solid var(--pico-muted-border-color);
	}

	.tab-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.45rem 0.9rem;
		text-decoration: none;
		cursor: pointer;
	}

	.tab-link:hover,
	.tab-link:focus-visible {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	.tab-link[aria-current='true'] {
		font-weight: 600;
		text-decoration: none;
	}

	.tab-caret {
		font-size: 0.95em;
		line-height: 1;
	}
</style>
