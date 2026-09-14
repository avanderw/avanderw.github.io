#!/usr/bin/env node
/**
 * Recalculates `readingMinutes` in src/lib/data/blog.ts from the word count
 * of each post's markdown file under static/.
 *
 * Usage:
 *   node scripts/update-reading-minutes.mjs          # update blog.ts in place
 *   node scripts/update-reading-minutes.mjs --check  # exit 1 if blog.ts is stale, no write
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const WORDS_PER_MINUTE = 200;

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const blogDataPath = join(repoRoot, 'src/lib/data/blog.ts');
const isCheck = process.argv.includes('--check');

const source = readFileSync(blogDataPath, 'utf8');

const arrayStart = source.indexOf('export const blogPosts');
const arrayOpen = source.indexOf('[', arrayStart);
const arrayClose = source.lastIndexOf('];');
if (arrayStart === -1 || arrayOpen === -1 || arrayClose === -1) {
	throw new Error('Could not locate blogPosts array in blog.ts');
}

// Find top-level object boundaries `{ ... }` inside the array, ignoring
// braces that appear inside string literals or nested objects (e.g. summary).
function findTopLevelObjects(text) {
	const objects = [];
	let depth = 0;
	let objectStart = -1;
	let quote = null;

	for (let i = 0; i < text.length; i++) {
		const ch = text[i];

		if (quote) {
			if (ch === '\\') {
				i++; // skip escaped char
			} else if (ch === quote) {
				quote = null;
			}
			continue;
		}

		if (ch === "'" || ch === '"' || ch === '`') {
			quote = ch;
			continue;
		}

		if (ch === '{') {
			if (depth === 0) objectStart = i;
			depth++;
		} else if (ch === '}') {
			depth--;
			if (depth === 0 && objectStart !== -1) {
				objects.push([objectStart, i + 1]);
				objectStart = -1;
			}
		}
	}

	return objects;
}

function countWords(markdown) {
	const withoutFrontmatter = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
	const words = withoutFrontmatter
		.replace(/```[\s\S]*?```/g, ' ') // drop fenced code blocks
		.split(/\s+/)
		.filter(Boolean);
	return words.length;
}

const arrayText = source.slice(arrayOpen, arrayClose);
const objectRanges = findTopLevelObjects(arrayText);

let updatedArrayText = arrayText;
let offsetShift = 0;
const changes = [];

for (const [start, end] of objectRanges) {
	const objectText = arrayText.slice(start, end);

	const markdownPathMatch = objectText.match(/markdownPath:\s*['"]([^'"]+)['"]/);
	if (!markdownPathMatch) continue; // HTML component posts have no word count to derive

	const readingMinutesMatch = objectText.match(/readingMinutes:\s*(\d+)/);
	if (!readingMinutesMatch) continue;

	const titleMatch = objectText.match(/title:\s*(['"])((?:\\.|(?!\1).)*)\1/);
	const title = titleMatch ? titleMatch[2].replace(/\\(['"])/g, '$1') : null;
	const markdownPath = markdownPathMatch[1];
	const mdFilePath = join(repoRoot, 'static', markdownPath.replace(/^\//, ''));

	if (!existsSync(mdFilePath)) {
		console.warn(`Skipping "${title ?? markdownPath}": markdown file not found at ${mdFilePath}`);
		continue;
	}

	const markdown = readFileSync(mdFilePath, 'utf8');
	const wordCount = countWords(markdown);
	const newMinutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
	const oldMinutes = Number(readingMinutesMatch[1]);

	if (newMinutes === oldMinutes) continue;

	changes.push({ title: title ?? markdownPath, oldMinutes, newMinutes, wordCount });

	const replacedObjectText = objectText.replace(
		/readingMinutes:\s*\d+/,
		`readingMinutes: ${newMinutes}`
	);

	const adjustedStart = start + offsetShift;
	const adjustedEnd = end + offsetShift;
	updatedArrayText =
		updatedArrayText.slice(0, adjustedStart) + replacedObjectText + updatedArrayText.slice(adjustedEnd);
	offsetShift += replacedObjectText.length - objectText.length;
}

if (changes.length === 0) {
	console.log('readingMinutes is already up to date for all posts.');
	process.exit(0);
}

for (const change of changes) {
	console.log(`${change.title}: ${change.oldMinutes} -> ${change.newMinutes} min (${change.wordCount} words)`);
}

if (isCheck) {
	console.error(`\n${changes.length} post(s) have stale readingMinutes. Run 'npm run blog:reading-minutes' to fix.`);
	process.exit(1);
}

const updatedSource = source.slice(0, arrayOpen) + updatedArrayText + source.slice(arrayClose);
writeFileSync(blogDataPath, updatedSource, 'utf8');
console.log(`\nUpdated ${changes.length} post(s) in ${blogDataPath}`);
