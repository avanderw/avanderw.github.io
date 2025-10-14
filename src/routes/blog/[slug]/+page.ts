import { blogPosts } from '$lib/data/blog';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function entries() {
	return blogPosts.map(post => ({
		slug: post.slug
	}));
}

export function load({ params }) {
	const post = blogPosts.find(p => p.slug === params.slug);
	
	if (!post) {
		throw error(404, 'Blog post not found');
	}
	
	return {
		post
	};
}
