# Blog & Curated HTML Integration Solution

## Overview
This solution allows your blog to support both markdown-based posts and curated HTML content (like Laws of Software) in a unified structure.

## How It Works

### 1. Extended BlogPost Type
The `BlogPost` interface now supports two content types:
- **Markdown posts**: Use `markdownPath` property
- **HTML component posts**: Use `htmlComponent` property (e.g., 'LawsOfSoftware')

```typescript
export interface BlogPost {
  title: string;
  url: string;
  slug: string;
  markdownPath?: string;        // Optional for HTML posts
  htmlComponent?: string;        // Optional for markdown posts
  description: string;
  year: number;
}
```

### 2. Blog Data Integration
The Laws of Software is now part of the blog posts array in `src/lib/data/blog.ts`:

```typescript
{
  title: 'Laws of Software Engineering',
  url: '/blog/laws-of-software',
  slug: 'laws-of-software',
  htmlComponent: 'LawsOfSoftware',
  description: 'Collection of laws, principles, and aphorisms...',
  year: 2025
}
```

### 3. Conditional Rendering
The blog detail page (`src/routes/blog/[slug]/+page.svelte`) now checks the post type:

```svelte
{#if currentPost.htmlComponent === 'LawsOfSoftware'}
  <LawsOfSoftware />
{:else if currentPost.markdownPath}
  <MarkdownViewer src={markdownPath} />
{:else}
  <p>Content not available.</p>
{/if}
```

### 4. Reusable Components
Created `src/lib/components/LawsOfSoftware.svelte` - a standalone component that can be reused anywhere.

### 5. URL Structure
- Main laws page: `/blog/laws-of-software`
- Detail pages (e.g., Conway's Law): `/blog/laws-of-software/conway`
- Regular blog posts: `/blog/[slug]`

## Benefits

✅ **Unified Navigation**: Laws of Software appears in the blog list with navigation controls
✅ **Flexible Content**: Easy to add more HTML-based posts by creating new components
✅ **Consistent UX**: All content flows through the same blog interface
✅ **Maintainable**: Clear separation between markdown and HTML content
✅ **Scalable**: Simply add `htmlComponent: 'ComponentName'` to create new curated posts

## Adding New Curated HTML Posts

1. Create a Svelte component in `src/lib/components/YourComponent.svelte`
2. Add entry to `blogPosts` array with `htmlComponent: 'YourComponent'`
3. Import and add conditional rendering in blog detail page
4. (Optional) Create detail pages in `src/routes/blog/your-post/` subdirectory

## Migration Notes

- Old URL: `/laws-of-software` → New URL: `/blog/laws-of-software`
- Conway's Law: `/laws-of-software/conway` → `/blog/laws-of-software/conway`
- Original `/laws-of-software` route can be kept or redirected as needed
