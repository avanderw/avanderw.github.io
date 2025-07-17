<script lang="ts">
    import showdown from 'showdown';
    
    export let src = '';
    export let options = { tables: true };
    
    let htmlContent = '';
    let loading = false;
    let error: string | null = null;

    const converter = new showdown.Converter(options);
    
    $: if (src) {
        loadMarkdown(src);
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
            htmlContent = converter.makeHtml(markdown);
        } catch (err) {
            error = err.message;
            htmlContent = '';
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
</style>
