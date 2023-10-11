<script>
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Feedback from './Feedback.svelte';
	import Link from './Link.svelte';
</script>

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

<Link
	href="https://avanderw.co.za/todo-txt/"
	title="Todo.txt - A simple and powerful way to manage your tasks"
	description="A privacy-focused web tool that locally edits and saves todo.txt files dropped into the browser, with no network traffic and no server components, ensuring data remains completely local."
/>
<Link
	href="https://avanderw.co.za/spyfall"
	title="Spyfall - A social deduction game"
	description="I created a Spyfall Web App that has greatly improved our gaming experience with friends. I initially built the app using WebSockets to learn go. I'm enthusiastic about the continued development of this PWA, aiming to offer a seamless and ad-free gaming experience to all."
/>
<Link
	href="https://avanderw.co.za/joke"
	title="Jokes - A Progressive Web App"
	description="A Progressive Web App created with the goal of learning PWA development, delivering an array of dad jokes to brighten your day with just a tap."
/>
<Link
	href="https://github.com/avanderw/bitburner-ts"
	title="Bitburner - A cyberpunk-themed incremental RPG!"
	description="I'm excited to share my Bitburner scripts repository, a collection of modular and customizable scripts designed to automate various tasks in the popular text-based hacking simulator, Bitburner. These scripts cover hacking, upgrading servers, and optimizing networks, and I'm constantly adding and refining them. Feel free to explore, download, modify, and share them, as I welcome feedback and suggestions. While not a formal project, this repository reflects my passion for programming and desire to inspire others in their programming endeavors."
/>
<Link
	href="https://www.codingame.com/profile/161aabfa51e53989d7f4fd4d5bcfb712259018"
	title="CodinGame - A gamified approach to coding"
	description="As an online platform that offers a variety of coding challenges and puzzles, Codingame is the perfect place to improve your programming abilities and show off your achievements.

    There, you'll be able to see my progress in various coding challenges and games, including my high scores and achievements. You can even compete against me in multiplayer games or send me a challenge request to test your skills against mine!"
/>
<Link
	href="https://avanderw.co.za/advent-of-code"
	title="Advent of Code"
	description="Every December, I eagerly participate in the Advent of Code, an annual coding challenge. It consists of increasingly complex programming problems, providing a fantastic opportunity for creative problem-solving. As I progress through the challenge, I document my journey and solutions, aiming to offer valuable insights to fellow participants and programming enthusiasts."
/>
<Link
	href="https://github.com/avanderw/git-templates"
	title="A collection of useful git templates"
	description="This repository offers essential aliases and hooks for Git, enabling you to standardize and customize your terminal workflow across multiple computers."
/>
<About />
<Contact />

<style>
	h2 {
		margin-top: 1rem;
		margin-bottom: 1rem;
		font-size: 1.8rem;
		line-height: 1;
	}
</style>
