<script lang="ts">
	import TabNavigation from '$lib/components/TabNavigation.svelte';
	import ProjectsTable from '$lib/components/ProjectsTable.svelte';
	import BlogTable from '$lib/components/BlogTable.svelte';
	import SocialTable from '$lib/components/SocialTable.svelte';
	import CareerTable from '$lib/components/CareerTable.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { TabType } from '$lib/types.js';
	import { years } from '$lib/data/projects.js';
	import { blogPosts } from '$lib/data/blog.js';
	import { socialLinks } from '$lib/data/social.js';
	import { careerEntries } from '$lib/data/career.js';
	import { setHeaderContent, setNavLinks } from '$lib/stores/layout';

	let page: TabType = 'projects';
	let searchTerm = '';

	// Handle URL state
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const activeTab = urlParams.get('tab') || 'projects';
		page = activeTab as TabType;

		// Clear navigation links for the home page
		setNavLinks([]);
		
		// Set header content for this page
		setHeaderContent({});
	});

	function navigateToTab(tab: TabType) {
		page = tab;
		goto(`?tab=${tab}`, { replaceState: true });
	}


</script>

<svelte:head>
	<title>Andrew van der Westhuizen</title>
	<meta
		name="description"
		content="Discover a diverse collection of projects, tools, and code crafted by Andrew van der Westhuizen on his personal website. Explore a wide range of topics, from software development and design to innovative solutions, all in one place. Dive into Andrew van der Westhuizen's creative work and expertise today."
	/>
</svelte:head>

<main class="container">
	<hgroup>
		<h2>Andrew van der Westhuizen</h2>

		<p>Leading with the why. Getting things done!</p>
	</hgroup>

	<p>
		Welcome to my digital space! I share my tech passions and projects here. Let's connect and
		explore together.
	</p>

	<TabNavigation currentTab={page} onTabChange={navigateToTab}>
		<input
			type="search"
			name="search"
			placeholder="Search {page === 'projects'
				? 'projects'
				: page === 'blog'
					? 'posts'
					: page === 'career'
						? 'career'
						: 'social'}"
			aria-label="Search {page === 'projects'
				? 'projects'
				: page === 'blog'
					? 'posts'
					: page === 'career'
						? 'career'
						: 'social'}"
			bind:value={searchTerm}
		/>
	</TabNavigation>

	{#if page === 'projects'}
		<ProjectsTable {years} {searchTerm} />
	{:else if page === 'blog'}
		<BlogTable {blogPosts} {searchTerm} />
	{:else if page === 'social'}
		<SocialTable {socialLinks} {searchTerm} />
	{:else if page === 'career'}
		<CareerTable {careerEntries} {searchTerm} />
	{/if}

	<p>
		I've built a diverse career spanning consulting, academia, and finance. My tech expertise and
		leadership skills grew across these roles. I'm passionate about tech and education, eager for
		new challenges.
	</p>

	<p>
		Whether you have a project idea, want to discuss tech, or just say hello - I'd love to hear from
		you. I'm always open to interesting conversations and new opportunities.
	</p>
</main>



<style>
	/* Component-specific styles are now in individual components */
	/* This page only contains layout-specific styles */
</style>
