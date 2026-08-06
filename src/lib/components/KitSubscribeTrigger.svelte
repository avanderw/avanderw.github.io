<script lang="ts">
	export let label = 'Join the list';
	export let href = 'https://andrew-van-der-westhuizen.kit.com/8695011e49';
	export let uid = '8695011e49';
	export let className = '';
</script>

<a
	class={`kit-subscribe-trigger ${className}`.trim()}
	data-formkit-toggle={uid}
	href={href}
>
	{label}
</a>

<style>
	.kit-subscribe-trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1rem;
		border-radius: 999px;
		background: var(--pico-primary);
		color: var(--pico-primary-inverse);
		font-weight: 700;
		text-decoration: none;
		border: 1px solid transparent;
		transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease;
		white-space: nowrap;
	}

	.kit-subscribe-trigger:hover {
		transform: translateY(-1px);
		opacity: 0.95;
	}

	.kit-subscribe-trigger:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
</style>