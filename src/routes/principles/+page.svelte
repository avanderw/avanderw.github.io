<script lang="ts">
	import { onMount } from 'svelte';
	import { principleGroups } from '$lib/data/principles.js';
	import { setHeaderContent, setNavLinks } from '$lib/stores/layout';

	onMount(() => {
		setNavLinks([{ href: '/principles', text: 'Principles' }]);
		setHeaderContent({});
	});
</script>

<svelte:head>
	<title>Principles - Andrew van der Westhuizen</title>
	<meta
		name="description"
		content="Principles Andrew van der Westhuizen aims to adhere to in work and life."
	/>
</svelte:head>

<main class="container">
	<hgroup>
		<h2>Principles</h2>
		<p>Commitments I aim to live and work by.</p>
	</hgroup>

	{#each principleGroups as group}
		<section class="principle-group" aria-labelledby={`group-${group.title}`}>
			<hgroup>
				<h3 id={`group-${group.title}`}>{group.title}</h3>
				<p>{group.description}</p>
			</hgroup>
			<ol class="principles-list">
				{#each group.principles as principle}
					<li id={principle.id}>
						<h4>{principle.title}</h4>
						<p>{principle.description}</p>
					</li>
				{/each}
			</ol>
		</section>
		{/each}
</main>

<style>
	.principle-group {
		margin-top: 2rem;
	}

	.principle-group hgroup {
		margin-bottom: 1rem;
	}

	.principles-list {
		padding-left: 1.5rem;
	}

	.principles-list li {
		border-top: 1px solid var(--color-border);
		padding: 1rem 0;
	}

	.principles-list li:last-child {
		border-bottom: 1px solid var(--color-border);
	}

	.principles-list h4 {
		margin: 0;
	}

	.principles-list p {
		margin: 0.5rem 0 0;
	}
</style>