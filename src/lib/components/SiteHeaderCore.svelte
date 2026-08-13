<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { HomeIcon, Sun, Moon, Rss, MailPlus, Menu, X } from 'lucide-svelte';

	interface NavLink {
		href: string;
		text: string;
		tooltip?: string;
	}

	export let home: string = '/';
	export let rss: string = '';
	export let subscribe: string = '';
	export let subscribeToggleId: string = '8695011e49';
	export let subscribeLabel: string = 'Subscribe';
	export let subscribeTooltip: string = 'Subscribe';
	export let navLinks: NavLink[] = [];
	export let isDarkMode: boolean = false;

	const dispatch = createEventDispatcher<{ themeToggle: void }>();

	$: tooltipText = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

	let sheetOpen = false;

	function handleThemeToggle(event: MouseEvent) {
		event.preventDefault();
		dispatch('themeToggle');
		// Dismiss any data-tooltip by removing focus
		const btn = event.currentTarget as HTMLElement;
		btn.blur();
		btn.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
	}

	function openSheet() {
		sheetOpen = true;
	}

	function closeSheet() {
		sheetOpen = false;
	}

	function onSheetKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeSheet();
		}
	}
</script>

<svelte:window on:keydown={onSheetKeydown} />

<div class="header-row">
	<!-- Desktop navs (hidden on mobile) -->
	<div class="desktop-navs">
		<nav aria-label="breadcrumb">
			<ul>
				<li>
					<a href={home} data-tooltip="Home" data-placement="bottom" title="Home">
						<HomeIcon />
					</a>
				</li>
				{#each navLinks as link, index}
					<li>
						{#if index === navLinks.length - 1}
							<span aria-current="page">{link.text}</span>
						{:else}
							<a href={link.href} title={link.tooltip ?? link.text}>
								{link.text}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Site navigation">
			<ul>
				<li><a href="/stream" data-tooltip="Writing" data-placement="bottom" title="Writing">Stream</a></li>
				<li><a href="/sandbox" data-tooltip="Projects" data-placement="bottom" title="Projects">Sandbox</a></li>
				<li><a href="/books" data-tooltip="Reading list" data-placement="bottom" title="Reading list">Books</a></li>
			</ul>
		</nav>

		<nav aria-label="Site actions">
			<ul>
				<li>
					<button
						class="icon-btn"
						on:click={handleThemeToggle}
						data-tooltip={tooltipText}
						data-placement="bottom"
						title={tooltipText}
						aria-label={tooltipText}
						aria-pressed={isDarkMode}
					>
						{#if isDarkMode}
							<Sun />
						{:else}
							<Moon />
						{/if}
					</button>
				</li>
				{#if rss}
					<li>
						<a href={rss} class="icon-link" data-tooltip="RSS Feed" data-placement="bottom" title="RSS Feed">
							<Rss />
						</a>
					</li>
				{/if}
				{#if subscribe}
					<li>
						<a
							href={subscribe}
							class="subscribe-link"
							data-formkit-toggle={subscribeToggleId}
							data-tooltip={subscribeTooltip}
							data-placement="bottom"
							title={subscribeTooltip}
							aria-label={subscribeTooltip}
						>
							<MailPlus />
							<span class="action-label">{subscribeLabel}</span>
						</a>
					</li>
				{/if}
			</ul>
		</nav>
	</div>

	<!-- Mobile: essentials bar (hidden on desktop) -->
	<div class="mobile-bar">
		<a href={home} class="icon-link" data-tooltip="Home" data-placement="bottom" title="Home" aria-label="Home">
			<HomeIcon />
		</a>
		<button
			class="icon-btn"
			on:click={handleThemeToggle}
			data-tooltip={tooltipText}
			data-placement="bottom"
			title={tooltipText}
			aria-label={tooltipText}
			aria-pressed={isDarkMode}
		>
			{#if isDarkMode}
				<Sun />
			{:else}
				<Moon />
			{/if}
		</button>
		{#if subscribe}
			<a
				href={subscribe}
				class="subscribe-link mobile-subscribe"
				data-formkit-toggle={subscribeToggleId}
				aria-label={subscribeTooltip}
				title={subscribeTooltip}
			>
				<MailPlus />
				<span class="action-label">{subscribeLabel}</span>
			</a>
		{/if}
		<button
			class="icon-btn hamburger"
			on:click={openSheet}
			aria-label="Open navigation"
			aria-expanded={sheetOpen}
			aria-controls="nav-sheet"
		>
			<Menu />
		</button>
	</div>
</div>

<!-- Mobile slide-in navigation sheet -->
<div
	id="nav-sheet"
	class="nav-sheet"
	class:open={sheetOpen}
	aria-hidden={!sheetOpen}
	role="dialog"
	aria-modal="true"
	aria-label="Navigation"
>
	<button
			class="sheet-backdrop"
			aria-label="Close navigation"
			tabindex="-1"
			on:click={closeSheet}
		></button>
	<div class="sheet-panel" role="document" tabindex="-1">
		<div class="sheet-header">
			<span class="sheet-title">Menu</span>
			<button class="icon-btn" on:click={closeSheet} aria-label="Close navigation" title="Close navigation">
				<X />
			</button>
		</div>
		<nav aria-label="Breadcrumb">
			<ul class="sheet-list">
				<li>
					<a href={home} class="sheet-link" on:click={closeSheet}>
						<HomeIcon /> Home
					</a>
				</li>
				{#each navLinks as link}
					<li>
						<a href={link.href} class="sheet-link" title={link.tooltip ?? link.text} on:click={closeSheet}>
							{link.text}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<nav aria-label="Site navigation">
			<ul class="sheet-list">
				<li><a href="/stream" class="sheet-link" on:click={closeSheet}>Stream</a></li>
				<li><a href="/sandbox" class="sheet-link" on:click={closeSheet}>Sandbox</a></li>
				<li><a href="/books" class="sheet-link" on:click={closeSheet}>Books</a></li>
			</ul>
		</nav>
		<nav aria-label="Site actions">
			<ul class="sheet-list">
				{#if rss}
					<li>
						<a href={rss} class="sheet-link" on:click={closeSheet}>
							<Rss /> RSS Feed
						</a>
					</li>
				{/if}
			</ul>
		</nav>
	</div>
</div>

<style>
	.header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-4);
	}

	.desktop-navs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-4);
		width: 100%;
	}

	/* Consistent header link colour — all header nav links share the accent */
	.header-row a {
		color: var(--color-accent);
		text-decoration: none;
	}

	.header-row a:hover,
	.header-row a:focus-visible {
		color: var(--color-link-hover);
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.header-row [aria-current='page'] {
		color: var(--color-text);
		font-weight: 600;
	}

	.action-label {
		margin-left: 0.35rem;
	}

	/* Icon + subscribe links/buttons share a comfortable tap size (≥24px, aiming 44px) */
	.icon-link,
	.icon-btn,
	.subscribe-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.5rem;
		min-height: 2.5rem;
		padding: 0.5rem;
		border-radius: var(--radius-sm);
		transition: background var(--transition-fast), color var(--transition-fast);
		border: none;
		background: none;
		cursor: pointer;
		font: inherit;
		color: var(--color-accent);
	}

	.icon-btn {
		appearance: none;
	}

	.icon-link:hover,
	.icon-btn:hover,
	.subscribe-link:hover {
		background: var(--color-surface);
		color: var(--color-link-hover);
	}

	.subscribe-link {
		gap: 0.25rem;
		padding-left: 0.9rem;
		padding-right: 0.9rem;
	}

	/* Nav list spacing (G2-03: adjacent taps ≥24px effective) */
	nav ul {
		gap: var(--space-1);
	}

	.mobile-bar {
		display: none;
		align-items: center;
		gap: var(--space-2);
		width: 100%;
	}

	/* Mobile-only styles */
	@media (max-width: 768px) {
		.desktop-navs {
			display: none;
		}

		.mobile-bar {
			display: flex;
		}

		.mobile-bar .hamburger {
			margin-left: auto;
		}

		.mobile-subscribe .action-label {
			display: none; /* icon-only pill on small screens */
		}
	}

	/* Slide-in sheet */
	.nav-sheet {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: none;
	}

	.nav-sheet.open {
		display: block;
	}

	.sheet-backdrop {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	.nav-sheet.open .sheet-backdrop {
		opacity: 1;
	}

	.sheet-panel {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: min(320px, 85vw);
		background: var(--color-bg);
		color: var(--color-text);
		box-shadow: var(--shadow-md);
		padding: var(--space-4);
		transform: translateX(100%);
		transition: transform var(--transition-fast);
		overflow-y: auto;
	}

	.nav-sheet.open .sheet-panel {
		transform: translateX(0);
	}

	.sheet-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-4);
	}

	.sheet-title {
		font-size: 1.1rem;
		font-weight: 600;
	}

	.sheet-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.sheet-list li {
		margin: 0;
	}

	.sheet-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 0.5rem;
		min-height: 2.75rem;
		border-bottom: 1px solid var(--color-border);
		text-decoration: none;
		font-size: 1rem;
	}

	.sheet-link:hover {
		text-decoration: underline;
	}

	@media (prefers-reduced-motion: reduce) {
		.sheet-panel,
		.sheet-backdrop {
			transition: none;
		}
	}
</style>