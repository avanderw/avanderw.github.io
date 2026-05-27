import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

// Standalone Vite config that compiles Svelte components as Custom Elements
// and outputs a single self-contained ui-components.js to static/.
//
// Run with: npm run build:wc
// The file is deployed alongside the main site at /ui-components.js.
// Sub-projects consume it via:
//   <script src="https://avanderw.co.za/ui-components.js" defer></script>

export default defineConfig({
	plugins: [
		svelte({
			compilerOptions: {
				// Required so Svelte emits a Custom Element class.
				// SiteHeaderCore has no <svelte:options customElement> so it
				// compiles as a plain internal component used inside the shadow root.
				customElement: true
			}
		})
	],
	resolve: {
		alias: {
			// Mirror SvelteKit's $lib alias so web component files can share
			// the same import paths as the main site.
			$lib: fileURLToPath(new URL('./src/lib', import.meta.url))
		}
	},
	build: {
		lib: {
			entry: 'src/webcomponents/index.ts',
			// IIFE so the script can be dropped in with a plain <script> tag
			formats: ['iife'],
			name: 'AvandrwComponents',
			fileName: () => 'ui-components.js'
		},
		outDir: 'static',
		emptyOutDir: false,
		// Inline all CSS into the JS bundle so the single <script> tag is enough.
		// Without this, Vite extracts a separate .css file that sub-projects
		// would have to <link> separately.
		cssCodeSplit: false,
		// Keep the bundle self-contained (no external imports)
		rollupOptions: {
			external: []
		}
	}
});
