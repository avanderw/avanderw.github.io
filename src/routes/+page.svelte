<script lang="ts">
	let page = 'projects';
</script>

<svelte:head>
	<title>Andrew van der Westhuizen</title>
	<meta
		name="description"
		content="Discover a diverse collection of projects, tools, and code crafted by Andrew van der Westhuizen on his personal website. Explore a wide range of topics, from software development and design to innovative solutions, all in one place. Dive into Andrew van der Westhuizen's creative work and expertise today."
	/>
</svelte:head>

<h1>Andrew van der Westhuizen</h1>

<h2>Getting things done and enjoying life</h2>

<p>
	Welcome to my digital space! I share my tech passions and projects here. Let’s connect and explore
	together.
</p>

<div>
<h3><a class:selected={page==='projects'} href="?projects" on:click={() => (page = 'projects')}>Projects</a></h3>
<h3><a class:selected={page==='career'} href="?career" on:click={() => (page = 'career')}>Career</a></h3>
<h3><a class:selected={page==='social'} href="?social" on:click={() => (page = 'social')}>Social</a></h3>
</div>

{#if page === 'projects'}
	<table>
		<tr>
			<td rowspan="2" class="year">2024</td>
			<td><a href="https://avanderw.co.za/image-flood-fill">2D Flood Fill</a></td>
			<td>Old retro image loading effect which flood fills an image from bottom to top.</td>
		</tr>
		<tr>
			<td><a href="https://avanderw.co.za/sudoku">Sudoku</a></td>
			<td>Exploring solving, generating and grading sudoku puzzles.</td>
		</tr>
		<tr>
			<td rowspan="4" class="year">2023</td>
			<td><a href="https://avanderw.co.za/spyfall">Spyfall</a></td>
			<td>I built a Spyfall web app to enhance group fun. It's ad-free and easy to use.</td>
		</tr>
		<tr>
			<td><a href="https://avanderw.co.za/todo-txt">Todo.txt Editor</a></td>
			<td>Securely manage your todo list offline with this web tool.</td>
		</tr>
		<tr>
			<td><a href="https://github.com/avanderw/bitburner-ts">Bitburner</a></td>
			<td>Automate Bitburner with my modular scripts.</td>
		</tr>
		<tr>
			<td><a href="https://github.com/avanderw/autohotkey">AutoHotkey</a></td>
			<td>Automate your tasks with my AutoHotkey scripts.</td>
		</tr>
		<tr>
			<td class="year">2022</td>
			<td><a href="https://avanderw.co.za/joke">Jokes</a></td>
			<td>Need a laugh? This PWA serves up dad jokes on demand.</td>
		</tr>
		<tr>
			<td class="year">2020</td>
			<td><a href="https://avanderw.co.za/bookmarks">Bookmarks</a></td>
			<td>Local bookmark manager, a LinkDing alternative.</td>
		</tr>
		<tr>
			<td class="year">2019</td>
			<td><a href="https://github.com/avanderw/git-templates">Git Templates</a></td>
			<td>Streamline your Git workflow with these aliases and hooks.</td>
		</tr>
		<tr>
			<td class="year">2018</td>
			<td><a href="https://avanderw.co.za/advent-of-code">Advent of Code</a></td>
			<td>Annual Advent of Code participant. Love coding challenges!</td>
		</tr>
		<tr>
			<td class="year">2016</td>
			<td><a href="https://avanderw.co.za/icebreaker">Icebreaker</a></td>
			<td>A web app for team-building activities.</td>
		</tr>
	</table>
{/if}

{#if page === 'social'}
	<table>
		<tr>
			<td class="year">2010</td>
			<td><a href="https://www.linkedin.com/in/avanderw/">LinkedIn</a></td>
			<td>1 billion members | Manage your professional identity.</td>
		</tr>
		<tr>
			<td class="year">2005</td>
			<td>
				<a href="https://www.codingame.com/profile/161aabfa51e53989d7f4fd4d5bcfb712259018">
					CodinGame
				</a>
			</td>
			<td>Codingame: Level up your coding skills through fun challenges.</td>
		</tr>
	</table>
{/if}

{#if page === 'career'} 
<table>
	<tr>
		<td class="year">2014 -</td>
		<td>Product Head<br/>Development Manager<br/>Scrum Master<br/>Senior Developer</td>
		<td><a href="https://www.capitecbank.co.za/">Capitec Bank</a></td>
		<td>Cape Town</td>
	</tr>
	<tr>
		<td class="year">2010 - 2014</td>
		<td>Senior Developer</td>
		<td><a href="https://www.sun.ac.za/">University of Stellenbosch</a></td>
		<td>Cape Town</td>
	</tr>
	<tr>
		<td class="year">2007 - 2010</td>
		<td>Developer</td>
		<td><a href="?#" title="Site no longer exists">eSight</a></td>
		<td>Cape Town</td>
	</tr>
	<tr>
		<td class="year">2003 - 2004</td>
		<td>Tutor</td>
		<td><a href="https://www.mastermaths.co.za/">Master Maths</a></td>
		<td>Cape Town</td>
	</tr>
</table>
{/if}

<p>
	I've built a diverse career spanning consulting, academia, and finance. My tech expertise and
	leadership skills grew across these roles. I'm passionate about tech and education, eager for new
	challenges.
</p>

<div>
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
</div>

<style>
	h3 {
		display: inline-block;
		padding: 0.5rem 1.5rem;
		margin: 0;
		border-right: var(--neutral-4) 1px dashed;
	}
	h3:last-child {
		border-right: none;
	}
	div {
		font-size: smaller;
		display: flex;
	}
	div h3 {
		font-size: x-large;
	}
	svg {
		width: 1rem;
		height: 1rem;
		margin: 0rem 0.5rem;
	}
	.year {
		color: var(--neutral-4);
		padding: 0.5rem 1rem;
		vertical-align: top;
		font-size: xx-large;
		border-bottom: none;
	}
	.selected {
		color: var(--secondary-3);
	}
	td {
		border-bottom: 1px dashed var(--neutral-4);
	}
	a {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		text-decoration: none;
	}
</style>
