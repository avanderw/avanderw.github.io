<script lang="ts">
	import {
			AtSignIcon,
			Github,
			ChartNoAxesCombinedIcon,
			Component,
			Linkedin,
			Gamepad2
		} from 'lucide-svelte';
</script>



<div class="footer-sep" aria-hidden="true">
	<svg xmlns="http://www.w3.org/2000/svg" width="160" height="20" viewBox="0 0 160 20">
		<path d="M0,10 C20,0 20,20 40,10 C60,0 60,20 80,10 C100,0 100,20 120,10 C140,0 140,20 160,10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
</div>
<p class="footer-blurb">
	Whether you have a project idea, want to discuss tech, or just say hello - I'd love to hear from
	you. I'm always open to interesting conversations and new opportunities.
</p>
<nav class="footer-links" aria-label="Contact and social links">
	<a href="mailto:website@avanderw.co.za" data-tooltip="Will respond within 48 hours" data-placement="top" title="Will respond within 48 hours">
		<AtSignIcon /> website@avanderw.co.za
	</a>
	<a href="https://www.linkedin.com/in/avanderw/" data-tooltip="LinkedIn" data-placement="top" title="LinkedIn" aria-label="LinkedIn">
		<Linkedin />
	</a>
	<a href="https://github.com/avanderw" data-tooltip="GitHub" data-placement="top" title="GitHub" aria-label="GitHub">
		<Github />
	</a>
	<a href="https://www.codingame.com/profile/161aabfa51e53989d7f4fd4d5bcfb712259018" data-tooltip="CodinGame" data-placement="top" title="CodinGame" aria-label="CodinGame">
		<Gamepad2 />
	</a>
	<a href="https://tracking.avanderw.co.za/avanderw.co.za" data-tooltip="View analytics" data-placement="top" title="View analytics" aria-label="View analytics">
		<ChartNoAxesCombinedIcon />
	</a>
	<a href="/web-components" data-tooltip="Web component docs" data-placement="top" title="Web component docs" aria-label="Web component docs">
		<Component />
	</a>
</nav>

<style>
	.footer-sep {
		display: flex;
		justify-content: center;
		color: var(--color-border);
		margin: 1.5rem 0 1rem;
	}

	/* One-line flex row; wraps gracefully on mobile without stacking vertically */
	.footer-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: var(--space-1) var(--space-2);
		padding-bottom: 2.5rem;
	}

	.footer-links a {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		min-height: 2.5rem; /* ≥24px touch target */
		padding: 0.5rem 0.6rem;
		color: var(--color-muted);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.footer-links a:hover,
	.footer-links a:focus-visible {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}
</style>