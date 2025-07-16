# GitHub Copilot Instructions

## Project Overview
This is a personal blog-style website built with Svelte, designed to be small, simple, and easy to maintain. The site will be deployed as a static page.

## Core Principles
- **Simplicity First**: Keep everything minimal and straightforward
- **Personal Touch**: This is a personal project, not a corporate site
- **Maintainability**: Code should be easy to understand and modify
- **Performance**: Static site generation with minimal JavaScript
- **Clean Code**: Readable, well-structured, and documented

## Technology Stack

### Framework
- **Svelte**: Primary framework for components and reactivity
- Use SvelteKit for static site generation (adapter-static)
- Prefer composition API and script setup style
- Keep components small and focused on single responsibilities

### Styling
- **Pico CSS**: Primary CSS framework
- Use Pico's semantic HTML approach - avoid complex custom markup
- Leverage Pico's built-in classes and CSS variables
- No additional CSS frameworks (no Tailwind, Bootstrap, etc.)
- Custom CSS should be minimal and follow Pico's conventions
- Use CSS custom properties for theming when needed

### Icons
- **Lucide Icons**: Only icon library to use
- Import individual icons to keep bundle size small
- Use semantic icon names that match their purpose
- Prefer outline style icons for consistency

### Deployment
- Static site generation for deployment
- No server-side rendering or API routes needed
- Optimize for build size and loading speed

## Code Style Guidelines

### Svelte Components
```svelte
<!-- Good: Simple, semantic structure -->
<script>
  import { Calendar } from 'lucide-svelte';
  
  export let title;
  export let date;
</script>

<article>
  <header>
    <h2>{title}</h2>
    <p>
      <Calendar size={16} />
      <time datetime={date}>{new Date(date).toLocaleDateString()}</time>
    </p>
  </header>
  <slot />
</article>
```

### HTML Structure
- Use semantic HTML elements (article, section, header, nav, etc.)
- Keep markup clean and minimal
- Let Pico CSS handle the styling with semantic elements
- Avoid div-heavy structures

### JavaScript
- Use modern ES6+ features
- Keep functions pure when possible
- Prefer readable code over clever optimizations
- Use TypeScript for better development experience when beneficial

## File Organization
```
src/
├── lib/
│   ├── components/     # Reusable components
│   ├── utils/         # Helper functions
│   └── stores/        # Svelte stores
├── routes/            # SvelteKit routes
├── app.html           # HTML template
└── app.css            # Global styles (minimal)
```

## Content Strategy
- Blog-style content with markdown support
- Simple navigation structure
- Focus on readability and accessibility
- Mobile-first responsive design (Pico handles this)

## Performance Considerations
- Lazy load images and heavy content
- Minimize JavaScript bundle size
- Use Svelte's built-in optimizations
- Optimize images for web delivery
- Keep dependencies minimal

## What to Avoid
- Complex state management libraries
- Heavy JavaScript frameworks or libraries
- Custom CSS frameworks or extensive custom styles
- Over-engineering simple features
- Non-semantic HTML structures
- Inline styles (use Pico's classes instead)
- Large dependencies that aren't essential

## Suggested Patterns

### Blog Post Component
```svelte
<script>
  import { Calendar, Clock } from 'lucide-svelte';
  
  export let post;
</script>

<article>
  <header>
    <h1>{post.title}</h1>
    <p>
      <Calendar size={16} />
      <time datetime={post.date}>{post.formattedDate}</time>
      <Clock size={16} />
      {post.readTime} min read
    </p>
  </header>
  
  <div class="content">
    {@html post.content}
  </div>
</article>
```

### Navigation Component
```svelte
<script>
  import { Home, User, Mail } from 'lucide-svelte';
</script>

<nav>
  <ul>
    <li><a href="/"><Home size={16} /> Home</a></li>
    <li><a href="/about"><User size={16} /> About</a></li>
    <li><a href="/contact"><Mail size={16} /> Contact</a></li>
  </ul>
</nav>
```

## Development Workflow
- Use SvelteKit's development server
- Test on multiple devices and screen sizes
- Validate HTML and accessibility
- Keep build output minimal
- Regular dependency updates but avoid unnecessary additions

## Documentation
- Comment complex logic
- Use JSDoc for functions and components
- Keep README updated with setup instructions
- Document any custom configurations

Remember: This is a personal project meant to be enjoyed and easily maintained. Prioritize simplicity, readability, and a pleasant development experience over complex features or optimizations.