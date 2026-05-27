<script lang="ts">
	import { PhoneCallIcon, AtSignIcon, Github, ChartNoAxesCombinedIcon, Component } from 'lucide-svelte';
</script>

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
			<a href="https://github.com/avanderw" data-tooltip="View source on GitHub" data-placement="top" title="View source on GitHub">
				<Github />
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
