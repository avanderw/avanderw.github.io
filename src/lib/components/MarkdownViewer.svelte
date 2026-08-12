<script lang="ts">
    import { browser } from '$app/environment';
    import showdown from 'showdown';
    import { afterUpdate, onDestroy, onMount } from 'svelte';
    import hljs from 'highlight.js';
    import mermaid from 'mermaid';
    import katex from 'katex';
    import 'katex/dist/katex.min.css';
        import 'highlight.js/styles/github.css'; /* light baseline; dark overridden in hljs-theme.css */
        import '$lib/styles/hljs-theme.css';
    
    export let src = '';
    export let options = { tables: true };
    export let showToc = true;
    
    let htmlContent = '';
    let loading = false;
    let error: string | null = null;
    let tocItems: { level: number; text: string; id: string }[] = [];
    let tocOpen = false;
    let mermaidInitialized = false;
    let mermaidTheme: 'dark' | 'default' = 'default';
    let themeObserver: MutationObserver | null = null;
    let mounted = false;
    let fetchController: AbortController | null = null;
    let activeRequestId = 0;

    interface TocNode {
        text: string;
        id: string;
        children: TocNode[];
    }

    let tocTree: TocNode[] = [];

    function escapeHtml(value: string): string {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function buildTocHtml(nodes: TocNode[]): string {
        if (nodes.length === 0) return '';

        const title = nodes[0];
        const sections = title.children.length > 0 ? title.children : nodes.slice(1);
        let html = `<div class="toc-title"><a href="#${title.id}">${escapeHtml(title.text)}</a></div>`;

        if (sections.length === 0) return html;

        html += '<div class="toc-sections">';
        sections.forEach((section, index) => {
            html += `<section class="toc-section"><div class="toc-section-number">${String(index + 1).padStart(2, '0')}</div>`;
            html += `<div class="toc-section-body"><a class="toc-section-heading" href="#${section.id}">${escapeHtml(section.text)}</a>`;

            if (section.children.length > 0) {
                html += '<ul class="toc-subheadings">';
                for (const subheading of section.children) {
                    html += `<li><a href="#${subheading.id}">${escapeHtml(subheading.text)}</a></li>`;
                }
                html += '</ul>';
            }

            html += '</div></section>';
        });
        html += '</div>';
        return html;
    }

    function buildTocTree(items: { level: number; text: string; id: string }[]): TocNode[] {
        if (items.length === 0) return [];
        const root: TocNode[] = [];
        const stack: { node: TocNode; level: number }[] = [];

        for (const item of items) {
            const node: TocNode = { text: item.text, id: item.id, children: [] };

            // Pop stack until we find a parent with a lower level
            while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
                stack.pop();
            }

            if (stack.length === 0) {
                root.push(node);
            } else {
                stack[stack.length - 1].node.children.push(node);
            }

            stack.push({ node, level: item.level });
        }

        return root;
    }

    const converter = new showdown.Converter({
        ...options,
        ghCompatibleHeaderId: true,
        customizedHeaderId: true
    });
    
    $: if (browser && mounted && src) {
        void loadMarkdown(src);
    }

    $: if (browser && mounted && !src) {
        htmlContent = '';
        error = null;
        tocItems = [];
        tocTree = [];
    }

    function slugify(text: string): string {
        return text
            .toLowerCase()
            .replace(/<[^>]*>/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    function extractAndInjectHeadings(html: string): { html: string; headings: { level: number; text: string; id: string }[] } {
        const headings: { level: number; text: string; id: string }[] = [];
        const headingRegex = /<h([1-6])([^>]*)>(.*?)<\/h\1>/gi;

        const updatedHtml = html.replace(headingRegex, (_match, level, attrs, content) => {
            const plainText = content.replace(/<[^>]*>/g, '');
            const id = slugify(plainText);
            headings.push({ level: parseInt(level), text: plainText, id });
            // Preserve existing attributes but add/replace the id
            const existingId = attrs.match(/id="[^"]*"/);
            if (existingId) {
                attrs = attrs.replace(/id="[^"]*"/, `id="${id}"`);
            } else {
                attrs += ` id="${id}"`;
            }
            return `<h${level}${attrs}>${content}</h${level}>`;
        });

        return { html: updatedHtml, headings };
    }
    
    async function loadMarkdown(filePath:string) {
        if (!filePath) return;

        fetchController?.abort();
        const requestId = ++activeRequestId;
        const controller = new AbortController();
        fetchController = controller;
        
        loading = true;
        error = null;
        
        try {
            const response = await fetch(filePath, { signal: controller.signal });
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.status}`);
            }
            const markdown = await response.text();
            if (requestId !== activeRequestId) {
                return;
            }
            const mathProcessed = preprocessMath(markdown);
            const rawHtml = converter.makeHtml(mathProcessed);
            const mathRestored = restoreMath(rawHtml);
            const result = extractAndInjectHeadings(mathRestored);
            htmlContent = result.html;
            tocItems = result.headings;
            tocTree = buildTocTree(tocItems);
        } catch (err) {
            if (controller.signal.aborted || requestId !== activeRequestId) {
                return;
            }
            error = err instanceof Error ? err.message : String(err);
            htmlContent = '';
            tocItems = [];
            tocTree = [];
        } finally {
            if (requestId === activeRequestId) {
                loading = false;
                if (fetchController === controller) {
                    fetchController = null;
                }
            }
        }
    }

    /**
     * Extract math from raw markdown, render with KaTeX, and insert safe
     * placeholders so Showdown cannot mangle the output. Call restoreMath()
     * on the final HTML to swap placeholders back.
     */
    let mathStore: Map<string, string> = new Map();

    function preprocessMath(md: string): string {
        mathStore = new Map();
        let idx = 0;

        // Block math: $$...$$
        md = md.replace(/\$\$([\s\S]*?)\$\$/g, (_match, tex) => {
            const key = `KATEXBLK${idx++}XETAK`;
            try {
                mathStore.set(key, katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false }));
            } catch {
                mathStore.set(key, _match);
            }
            return key;
        });

        // Inline math: $...$  (single line, not greedy, avoid $$)
        md = md.replace(/(?<!\$)\$([^\$\n]+?)\$(?!\$)/g, (_match, tex) => {
            const key = `KATEXINL${idx++}XETAK`;
            try {
                mathStore.set(key, katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false }));
            } catch {
                mathStore.set(key, _match);
            }
            return key;
        });

        return md;
    }

    function restoreMath(html: string): string {
        for (const [key, rendered] of mathStore) {
            html = html.replace(key, rendered);
        }
        return html;
    }

    function renderMermaidBlocks() {
        const mermaidCodeBlocks = document.querySelectorAll('.markdown-content pre code.language-mermaid');

        mermaidCodeBlocks.forEach((block) => {
            const pre = block.parentElement;
            if (!pre) {
                return;
            }

            const mermaidSource = block.textContent ?? '';
            const container = document.createElement('div');
            container.className = 'mermaid';
            container.setAttribute('data-mermaid-source', mermaidSource);
            container.textContent = mermaidSource;

            pre.replaceWith(container);
        });

        if (!mermaidInitialized) {
            mermaid.initialize({
                startOnLoad: false,
                securityLevel: 'loose',
                theme: mermaidTheme
            });
            mermaidInitialized = true;
        }

        mermaid.run({ querySelector: '.markdown-content .mermaid' });
    }

    function getPreferredMermaidTheme(): 'dark' | 'default' {
        if (typeof document === 'undefined') {
            return 'default';
        }

        const htmlTheme = document.documentElement.getAttribute('data-theme');
        if (htmlTheme === 'dark') {
            return 'dark';
        }

        if (htmlTheme === 'light') {
            return 'default';
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default';
    }

    function rerenderMermaidForTheme() {
        const nextTheme = getPreferredMermaidTheme();
        if (nextTheme === mermaidTheme) {
            return;
        }

        mermaidTheme = nextTheme;
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: mermaidTheme
        });
        mermaidInitialized = true;

        document.querySelectorAll('.markdown-content .mermaid').forEach((diagram) => {
            const source = diagram.getAttribute('data-mermaid-source');
            if (!source) {
                return;
            }

            diagram.removeAttribute('data-processed');
            diagram.innerHTML = '';
            diagram.textContent = source;
        });

        mermaid.run({ querySelector: '.markdown-content .mermaid' });
    }

    onMount(() => {
        mounted = true;
        if (src) {
            void loadMarkdown(src);
        }
        mermaidTheme = getPreferredMermaidTheme();

        themeObserver = new MutationObserver(() => {
            rerenderMermaidForTheme();
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    });

    onDestroy(() => {
        fetchController?.abort();
        fetchController = null;
        themeObserver?.disconnect();
        themeObserver = null;
    });

    afterUpdate(() => {
        renderMermaidBlocks();
        document.querySelectorAll('.markdown-content pre code:not(.language-mermaid)').forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });
    });
</script>

{#if loading}
    <div class="loading">Loading markdown...</div>
{:else if error}
    <div class="error">Error: {error}</div>
{:else if htmlContent}
    {#if showToc && tocTree.length > 0}
        <details class="toc" bind:open={tocOpen}>
            <summary>Table of Contents</summary>
            <div class="toc-content">
                {@html buildTocHtml(tocTree)}
            </div>
        </details>
    {/if}
    <div class="markdown-content">
        {@html htmlContent}
    </div>
{/if}

<style>

    .loading, .error {
        padding: 1rem;
        text-align: center;
    }
    
    .error {
        color: #dc2626;
    }

    .toc {
        margin-bottom: 2.5rem;
        border: 1px solid var(--color-border);
        border-radius: 0;
        overflow: hidden;
        background: var(--color-bg);
        box-shadow: 0 0.35rem 1.25rem color-mix(in srgb, var(--color-text) 8%, transparent);
    }

    .toc summary {
        padding: 0.8rem 1.5rem;
        cursor: pointer;
        background: var(--color-text);
        color: var(--color-bg);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        user-select: none;
    }

    .toc summary::marker {
        color: var(--color-bg);
    }

    .toc-content {
        padding: 1.5rem 1.75rem 1.75rem;
        text-align: left;
    }

    :global(.toc-title) {
        padding-bottom: 1.15rem;
        border-bottom: 1px solid var(--color-border);
        font-size: clamp(1.15rem, 2vw, 1.45rem);
        font-weight: 600;
        line-height: 1.25;
    }

    :global(.toc-title a),
    :global(.toc-section-heading),
    :global(.toc-subheadings a) {
        color: var(--color-text);
        text-decoration: none;
    }

    :global(.toc-title a:hover),
    :global(.toc-section-heading:hover),
    :global(.toc-subheadings a:hover) {
        color: var(--color-accent);
    }

    :global(.toc-sections) {
        border-left: 1px solid var(--color-muted);
    }

    :global(.toc-section) {
        display: grid;
        grid-template-columns: 2.5rem minmax(0, 1fr);
        gap: 0.85rem;
        padding: 1.15rem 0 0.15rem 0.85rem;
    }

    :global(.toc-section-number) {
        padding-top: 0.1rem;
        color: var(--color-muted);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.85rem;
        font-variant-numeric: tabular-nums;
    }

    :global(.toc-section-heading) {
        display: block;
        font-size: 1.05rem;
        font-weight: 600;
        line-height: 1.3;
    }

    :global(.toc-subheadings) {
        display: grid;
        gap: 0.2rem;
        margin: 0.45rem 0 0;
        padding: 0;
        list-style: none;
    }

    :global(.toc-subheadings li) {
        margin: 0;
        padding: 0;
        line-height: 1.35;
    }

    :global(.toc-subheadings a) {
        color: var(--color-muted);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.74rem;
    }

    @media (max-width: 600px) {
        .toc-content {
            padding: 1.25rem 1rem 1.35rem;
        }

        :global(.toc-section) {
            grid-template-columns: 2rem minmax(0, 1fr);
            gap: 0.65rem;
            padding-left: 0.65rem;
        }
    }
</style>
