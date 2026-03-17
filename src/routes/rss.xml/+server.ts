import type { RequestHandler } from './$types';
import { blogPosts } from '$lib/data/blog.js';
import { years } from '$lib/data/projects.js';

const SITE_URL = 'https://avanderw.co.za';
const SITE_TITLE = 'Andrew van der Westhuizen';
const SITE_DESCRIPTION = 'Projects, blog posts, and updates from Andrew van der Westhuizen.';

interface FeedItem {
	title: string;
	url: string;
	description: string;
	date: Date;
	category: 'blog' | 'project';
}

/**
 * Extract a date from a blog post's markdownPath filename.
 * Format: /blog/20260316T094038_...
 */
function extractDateFromMarkdownPath(markdownPath: string | undefined, year: number): Date {
	if (markdownPath) {
		const match = markdownPath.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/);
		if (match) {
			const [, y, m, d, h, min, s] = match;
			return new Date(`${y}-${m}-${d}T${h}:${min}:${s}Z`);
		}
	}
	// Fallback: use Jan 1 of the post's year
	return new Date(`${year}-01-01T00:00:00Z`);
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const prerender = true;

export const GET: RequestHandler = async () => {
	const items: FeedItem[] = [];

	// Add blog posts
	for (const post of blogPosts) {
		items.push({
			title: post.title,
			url: `${SITE_URL}${post.url}`,
			description: post.description,
			date: extractDateFromMarkdownPath(post.markdownPath, post.year),
			category: 'blog'
		});
	}

	// Add projects
	for (const year of years) {
		for (const project of year.projects) {
			items.push({
				title: project.name,
				url: project.url.startsWith('http') ? project.url : `${SITE_URL}${project.url}`,
				description: project.description,
				date: new Date(`${year.number}-01-01T00:00:00Z`),
				category: 'project'
			});
		}
	}

	// Sort by date descending (newest first)
	items.sort((a, b) => b.date.getTime() - a.date.getTime());

	const lastBuildDate = items.length > 0 ? items[0].date.toUTCString() : new Date().toUTCString();

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items
	.map(
		(item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <category>${item.category}</category>
    </item>`
	)
	.join('\n')}
  </channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
