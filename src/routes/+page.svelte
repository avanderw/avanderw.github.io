<script>
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Feedback from './Feedback.svelte';
	import Link from './Link.svelte';
	import Tracking from './Tracking.svelte';
</script>

<svelte:head>
	<title>Andrew van der Westhuizen</title>
	<meta
		name="description"
		content="Discover a diverse collection of projects, tools, and code crafted by Andrew van der Westhuizen on his personal website. Explore a wide range of topics, from software development and design to innovative solutions, all in one place. Dive into Andrew van der Westhuizen's creative work and expertise today."
	/>
</svelte:head>

<Contact />
<Feedback />
<h1>Andrew van der Westhuizen</h1>
<h2>Getting things done and enjoying life</h2>

<p>
	Hey there, fellow tech enthusiast! I'm excited to welcome you to my digital domain, where I spend
	a lot of my time exploring new projects and passions. This site serves as the perfect hub for my
	online presence, where I can showcase my personal works and connect with other like-minded
	individuals. I'm confident that you'll find my latest creations and endeavors to be both
	fascinating and inspiring.
</p>

<div>
<Link
	href="https://avanderw.co.za/spyfall"
	title="Spyfall game"
	description="This Spyfall Web App that has greatly improved our gaming experience with friends. I initially built the app using WebSockets to learn go. I'm enthusiasticly aiming to offer a seamless and ad-free gaming experience to all."
/>
<Link
	href="https://avanderw.co.za/joke"
	title="Jokes web app"
	description="A Progressive Web App created with the goal of learning PWA development, delivering an array of dad jokes to brighten your day with just a tap."
/>
<Link
	href="https://avanderw.co.za/todo-txt/"
	title="Todo.txt editor"
	description="A privacy-focused web tool that locally edits and saves todo.txt files dropped into the browser, with no network traffic and no server components, ensuring data remains completely local."
/>
<Link
	href="https://avanderw.co.za/bookmarks/"
	title="Bookmarks"
	description="A local-first web tool that manages bookmarks. It is developed as an alternative to LinkDing."
/>
<Link
	href="https://github.com/avanderw/bitburner-ts"
	title="Bitburner scripts"
	description="I'm excited to share my Bitburner scripts repository, a collection of modular and customizable scripts designed to automate various tasks in the popular text-based hacking simulator, Bitburner."
/>
<Link
	href="https://github.com/avanderw/autohotkey"
	title="AutoHotkey scripts"
	description="A collection of AutoHotkey scripts that I use to automate various tasks and improve my productivity. These scripts are designed to be modular and customizable, allowing you to easily adapt them to your needs."
/>
<Link
	href="https://github.com/avanderw/git-templates"
	title="Git templates"
	description="This repository offers essential aliases and hooks for Git, enabling you to standardize and customize your terminal workflow across multiple computers."
/>
<Link
	href="https://www.codingame.com/profile/161aabfa51e53989d7f4fd4d5bcfb712259018"
	title="CodinGame profile"
	description="As an online platform that offers a variety of coding challenges and puzzles, Codingame is the perfect place to improve your programming abilities and show off your achievements."
/>
<Link
	href="https://avanderw.co.za/advent-of-code"
	title="Advent of Code"
	description="Every December, I eagerly participate in the Advent of Code, an annual coding challenge. It consists of increasingly complex programming problems, providing a fantastic opportunity for creative problem-solving."
/>
</div>
<About />
<Tracking />

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;
	}
</style>
