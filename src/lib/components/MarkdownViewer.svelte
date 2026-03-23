<script lang="ts">
    import showdown from 'showdown';
    
    export let src = '';
    export let options = { tables: true };
    export let showToc = true;
    
    let htmlContent = '';
    let loading = false;
    let error: string | null = null;
    let tocItems: { level: number; text: string; id: string }[] = [];
    let tocOpen = false;

    interface TocNode {
        text: string;
        id: string;
        children: TocNode[];
    }

    let tocTree: TocNode[] = [];

    function buildTocHtml(nodes: TocNode[]): string {
        if (nodes.length === 0) return '';
        let html = '<ul>';
        for (const node of nodes) {
            html += `<li><a href="#${node.id}">${node.text}</a>`;
            if (node.children.length > 0) {
                html += buildTocHtml(node.children);
            }
            html += '</li>';
        }
        html += '</ul>';
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
    
    $: if (src) {
        loadMarkdown(src);
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
        
        loading = true;
        error = null;
        
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.status}`);
            }
            const markdown = await response.text();
            const rawHtml = converter.makeHtml(markdown);
            const result = extractAndInjectHeadings(rawHtml);
            htmlContent = result.html;
            tocItems = result.headings;
            tocTree = buildTocTree(tocItems);
        } catch (err) {
            error = err.message;
            htmlContent = '';
            tocItems = [];
            tocTree = [];
        } finally {
            loading = false;
        }
    }
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
        color: var(--pico-color-red-500, #dc2626);
    }

    .toc {
        margin-bottom: 2rem;
        padding: 1rem 1.5rem;
        border: 1px solid var(--pico-muted-border-color);
        border-radius: var(--pico-border-radius);
        background: var(--pico-card-background-color, var(--pico-background-color));
    }

    .toc summary {
        cursor: pointer;
        font-weight: 600;
        font-size: 1.1rem;
        color: var(--pico-color);
        user-select: none;
    }

    .toc-content {
        text-align: left;
    }

    .toc-content :global(ul) {
        margin: 0.25rem 0 0 0;
        padding-left: 1.5rem;
    }

    .toc-content :global(li) {
        display: list-item;
        margin: 0;
        padding: 0;
        line-height: 1.4;
    }

    .toc-content :global(a) {
        text-decoration: none;
        color: var(--pico-primary);
    }

    .toc-content :global(a:hover) {
        text-decoration: underline;
    }
</style>
