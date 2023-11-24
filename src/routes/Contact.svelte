<div>
	<a
		aria-label="Chat on WhatsApp"
		href="https://wa.me/27763347342"
		title="Please don't say just hello in chat"
	>
		<img alt="Chat on WhatsApp" src="ChatOnWhatsAppButton/WhatsAppButtonGreenSmall.svg" /></a
	>
	<a href="mailto:avanderw@gmail.com" title="Will respond within 48 hours"
		><svg><use href="feather-sprite.svg#at-sign" /></svg>avanderw@gmail.com</a
	>
	<a href="tel:+27763347342" title="I prefer WhatsApp"
		><svg><use href="feather-sprite.svg#phone" /></svg>+27&nbsp;(0)76&nbsp;334&nbsp;7342</a
	>
</div>

<style>
	@media (orientation: landscape) {
		div {
			flex-direction: row-reverse;
			align-items: center;
			justify-content: right;
		}
	}
	@media (orientation: portrait) {
		div {
			flex-direction: column;
			align-items: end;
			justify-content: space-between;
		}
	}
	div {
		display: flex;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: normal;
		margin: 1rem 0rem;
		gap: 1rem;
	}
	a {
		display: flex;
		gap: 0.2rem;
	}
</style>
