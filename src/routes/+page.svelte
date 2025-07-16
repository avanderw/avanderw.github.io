<script lang="ts">
	import Header from './Header.svelte';
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

	let page: TabType = 'projects';
	let searchTerm = '';

	// Handle URL state
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const activeTab = urlParams.get('tab') || 'projects';
		page = activeTab as TabType;
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

<Header />
<main class="container">
	<h1>Andrew van der Westhuizen</h1>

	<h2>Getting things done and enjoying life</h2>

	<p>
		Welcome to my digital space! I share my tech passions and projects here. Let's connect and
		explore together.
	</p>

	<TabNavigation currentTab={page} onTabChange={navigateToTab}>
		<input
			type="search"
			name="search"
			placeholder="Search {page === 'projects' ? 'projects' : page === 'blog' ? 'posts' : page === 'career' ? 'career' : 'social'}"
			aria-label="Search {page === 'projects' ? 'projects' : page === 'blog' ? 'posts' : page === 'career' ? 'career' : 'social'}"
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
</main>

<footer>
	<a
		aria-label="Chat on WhatsApp"
		href="https://wa.me/27763347342"
		title="Please don't just say hello in chat"
	>
		<svg><use href="feather-sprite.svg#phone" /></svg> WhatsApp
	</a>
	<a href="tel:+27763347342" title="I prefer WhatsApp">
		<svg><use href="feather-sprite.svg#phone-call" /></svg>+27&nbsp;(0)76&nbsp;334&nbsp;7342
	</a>
	<a href="mailto:avanderw@gmail.com" title="Will respond within 48 hours">
		<svg><use href="feather-sprite.svg#at-sign" /></svg>avanderw@gmail.com
	</a>
</footer>

<style>
	/* Component-specific styles are now in individual components */
	/* This page only contains layout-specific styles */
</style>
