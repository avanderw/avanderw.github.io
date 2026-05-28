<script lang="ts">
	import { onMount } from 'svelte';
	import { books } from '$lib/data/books.js';
	import type { ReadBook } from '$lib/types.js';
	import { setHeaderContent, setNavLinks } from '$lib/stores/layout';

	const currentlyReading = books.filter((book) => book.status === 'reading');
	const readBooks: ReadBook[] = books
		.filter((book) => book.status === 'read')
		.sort((a, b) => (b.yearRead ?? 0) - (a.yearRead ?? 0));
	const standaloneBooks = readBooks.filter((book) => !book.seriesName);
	const seriesBooks = readBooks.filter((book) => book.seriesName);
	const groupedSeries = Array.from(
		seriesBooks.reduce((map, book) => {
			const key = book.seriesName as string;
			if (!map.has(key)) {
				map.set(key, [] as ReadBook[]);
			}
			map.get(key)?.push(book);
			return map;
		}, new Map<string, ReadBook[]>())
	)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([seriesName, entries]) => ({
			seriesName,
			author: new Set(entries.map((book) => book.author)).size === 1 ? entries[0].author : 'Various authors',
			progressTotal: Math.max(...entries.map((book) => book.seriesTotal ?? 0), entries.length),
			progressRead: entries.length,
			entries: entries.sort((a, b) => {
				if (a.seriesOrder && b.seriesOrder) {
					return a.seriesOrder - b.seriesOrder;
				}
				if (a.seriesOrder) {
					return -1;
				}
				if (b.seriesOrder) {
					return 1;
				}
				return (b.yearRead ?? 0) - (a.yearRead ?? 0);
			})
		}));

	function renderRating(rating: number): string {
		return `${rating}/5`;
	}

	onMount(() => {
		setNavLinks([{ href: '/books', text: 'Books' }]);
		setHeaderContent({});
	});
</script>

<svelte:head>
	<title>Books — Andrew van der Westhuizen</title>
	<meta
		name="description"
		content="Books Andrew van der Westhuizen has read and is currently reading, including notes and ratings."
	/>
</svelte:head>

<main class="container">
	<hgroup>
		<h2>Books</h2>
		<p>Books I have read and books I am currently reading.</p>
	</hgroup>

	<section class="books-section" aria-labelledby="currently-reading-heading">
		<h3 id="currently-reading-heading">Currently Reading</h3>
		{#if currentlyReading.length === 0}
			<p>No books in progress right now.</p>
		{:else}
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Author</th>
						<th>Series</th>
					</tr>
				</thead>
				<tbody>
					{#each currentlyReading as book}
						<tr>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.seriesName ?? '-'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</section>

	<section class="books-section" aria-labelledby="standalone-books-heading">
		<h3 id="standalone-books-heading">Standalone</h3>
		{#if standaloneBooks.length === 0}
			<p>No books logged yet.</p>
		{:else}
			<table>
				<thead>
					<tr>
						<th>Year</th>
						<th>Title</th>
						<th>Author</th>
						<th>Comment</th>
						<th>Rating</th>
					</tr>
				</thead>
				<tbody>
					{#each standaloneBooks as book}
						<tr>
							<td>{book.yearRead ?? '-'}</td>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.comment}</td>
							<td class="rating" title={`${book.rating}/5`}>{renderRating(book.rating)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</section>

	<section class="books-section" aria-labelledby="series-books-heading">
		<h3 id="series-books-heading">Series</h3>
		{#if groupedSeries.length === 0}
			<p>No series books logged yet.</p>
		{:else}
			{#each groupedSeries as series}
				<h4>{series.seriesName}</h4>
				<p class="series-subtitle">{series.author} · Completed {series.progressRead} of {series.progressTotal}</p>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Year</th>
							<th>Title</th>
							<th>Comment</th>
							<th>Rating</th>
						</tr>
					</thead>
					<tbody>
						{#each series.entries as book}
							<tr>
								<td>{book.seriesOrder ?? '-'}</td>
								<td>{book.yearRead ?? '-'}</td>
								<td>{book.title}</td>
								<td>{book.comment}</td>
								<td class="rating" title={`${book.rating}/5`}>{renderRating(book.rating)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/each}
		{/if}
	</section>
</main>

<style>
	.books-section {
		border-top: 1px solid var(--pico-muted-border-color);
		padding-top: 1rem;
		margin-top: 1.5rem;
	}

	.rating {
		white-space: nowrap;
		letter-spacing: 0.04em;
	}

	.series-subtitle {
		margin-top: -0.5rem;
		color: var(--pico-muted-color);
		font-size: 0.875rem;
	}
</style>
