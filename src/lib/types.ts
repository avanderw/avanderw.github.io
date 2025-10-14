export interface Project {
	name: string;
	url: string;
	description: string;
}

export interface Year {
	number: number;
	projects: Project[];
}

export interface BlogPost {
	title: string;
	url: string;
	slug: string;
	markdownPath?: string; // Optional for HTML-based posts
	htmlComponent?: string; // Optional component name for curated HTML posts
	description: string;
	year: number;
}

export interface SocialLink {
	platform: string;
	url: string;
	description: string;
	year: number;
}

export interface CareerEntry {
	period: string;
	roles: string[];
	company: string;
	companyUrl: string;
	location: string;
}

export type TabType = 'projects' | 'blog' | 'career' | 'social';
