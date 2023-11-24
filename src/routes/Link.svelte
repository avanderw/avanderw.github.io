<script lang="ts">
	export let href: string;
	export let title: string;
	export let description: string;
</script>

<div>
	<h2><a {href}>{title}</a></h2>
	<p>{description}</p>
</div>

<style>
	div {
        width: 375px;
		border-radius: 1rem;
		border: solid 1px var(--primary-7);
		background-color: var(--primary-2);
		padding: 1rem;
	}
</style>
