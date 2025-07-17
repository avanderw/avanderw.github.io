import { writable } from 'svelte/store';

export interface NavLink {
	href: string;
	text: string;
	tooltip?: string;
}

export interface HeaderContent {
	title?: string;
	description?: string;
	component?: any;
}

export const navLinks = writable<NavLink[]>([]);
export const headerContent = writable<HeaderContent | null>(null);

// Helper functions to update the stores
export function setNavLinks(links: NavLink[]) {
	navLinks.set(links);
}

export function setHeaderContent(content: HeaderContent | null) {
	headerContent.set(content);
}

export function clearLayoutContent() {
	navLinks.set([]);
	headerContent.set(null);
}
