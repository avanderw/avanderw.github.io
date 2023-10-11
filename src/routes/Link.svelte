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
        border-radius: 1rem;
        border: solid 1px var(--border);
        background-color: var(--panel);
        padding: 1rem;
        margin-top: 1rem;
    }
</style>