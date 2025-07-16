<script lang="ts">
	import type { TabType } from '$lib/types.js';
	
	export let currentTab: TabType;
	export let onTabChange: (tab: TabType) => void;
	
	const tabs = [
		{ id: 'projects', label: 'Sandbox' },
		{ id: 'blog', label: 'Stream' },
		{ id: 'career', label: 'Stack' },
		{ id: 'social', label: 'Handshake' }
	] as const;
</script>

<nav>
	<ul>
		{#each tabs as tab}
			<li>
				<a 
					href="?tab={tab.id}"
					aria-current={currentTab === tab.id} 
					on:click={() => onTabChange(tab.id)}
				>
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
