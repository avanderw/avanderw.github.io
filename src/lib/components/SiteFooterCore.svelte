<script lang="ts">
	import { PhoneCallIcon, AtSignIcon, Github, ChartNoAxesCombinedIcon, Component, Linkedin, Gamepad2 } from 'lucide-svelte';
</script>



<div class="footer-sep" aria-hidden="true">
	<svg xmlns="http://www.w3.org/2000/svg" width="160" height="20" viewBox="0 0 160 20">
		<path d="M0,10 C20,0 20,20 40,10 C60,0 60,20 80,10 C100,0 100,20 120,10 C140,0 140,20 160,10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
</div>
<p>
	Whether you have a project idea, want to discuss tech, or just say hello - I'd love to hear from
	you. I'm always open to interesting conversations and new opportunities.
</p>
<nav>
	<ul>
		<li>
			<a href="tel:+27763347342" data-tooltip="I prefer WhatsApp" data-placement="top" title="I prefer WhatsApp">
				<PhoneCallIcon /> +27 76 334 7342
			</a>
		</li>
		<li>
			<a href="mailto:avanderw@gmail.com" data-tooltip="Will respond within 48 hours" data-placement="top" title="Will respond within 48 hours">
				<AtSignIcon /> avanderw@gmail.com
			</a>
		</li>
	</ul>
	<ul>
		<li>
			<a href="https://www.linkedin.com/in/avanderw/" data-tooltip="LinkedIn" data-placement="top" title="LinkedIn">
				<Linkedin />
			</a>
		</li>
		<li>
			<a href="https://github.com/avanderw" data-tooltip="GitHub" data-placement="top" title="GitHub">
				<Github />
			</a>
		</li>
		<li>
			<a href="https://www.codingame.com/profile/161aabfa51e53989d7f4fd4d5bcfb712259018" data-tooltip="CodinGame" data-placement="top" title="CodinGame">
				<Gamepad2 />
			</a>
		</li>
		<li>
			<a href="https://tracking.avanderw.co.za/avanderw.co.za" data-tooltip="View analytics" data-placement="top" title="View analytics">
				<ChartNoAxesCombinedIcon />
			</a>
		</li>
		<li>
			<a href="/web-components" data-tooltip="Web component docs" data-placement="top" title="Web component docs">
				<Component />
			</a>
		</li>
	</ul>
</nav>

<style>
	.footer-sep {
		display: flex;
		justify-content: center;
		color: var(--pico-muted-border-color);
		margin: 1.5rem 0 1rem;
	}

	nav {
		padding-bottom: 2.5rem;
	}
</style>
