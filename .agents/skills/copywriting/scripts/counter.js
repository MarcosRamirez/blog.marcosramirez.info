#!/usr/bin/env node
/**
 * Blog post counter script.
 * Counts words and characters in all frontmatter fields and body content.
 * No hardcoded limits — just returns raw numbers for the skill to validate.
 *
 * Usage:
 *   node counter.js <file>
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { fm: {}, body: text };
  const lines = m[1].split(/\r?\n/);
  const fm = {};
  let currentKey = null;

  for (const line of lines) {
    if (line.match(/^  - /)) {
      if (currentKey && Array.isArray(fm[currentKey])) {
        fm[currentKey].push(line.replace(/^  - /, '').replace(/^["']|["']$/g, ''));
      }
      continue;
    }
    const kv = line.match(/^(\w[\w_]*):\s*(.*)/);
    if (kv) {
      currentKey = kv[1];
      const val = kv[2].trim();
      if (val === '') {
        fm[currentKey] = [];
      } else if (val.startsWith('[') && val.endsWith(']')) {
        fm[currentKey] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        currentKey = null;
      } else {
        fm[currentKey] = val.replace(/^["']|["']$/g, '');
        currentKey = null;
      }
    }
  }

  const body = text.slice(m[0].length);
  return { fm, body };
}

function countWords(text) {
  const cleaned = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  const words = cleaned.trim().split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

function countParagraphs(text) {
  // Split by two or more newlines, filter out empty paragraphs
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  return paragraphs.length;
}

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~#>|]/g, '')
    .trim();
}

function cmdCount(filePath) {
  const file = path.resolve(ROOT, filePath);

  if (!fs.existsSync(file)) {
    console.error(`Error: File "${filePath}" not found`);
    process.exit(1);
  }

  const content = fs.readFileSync(file, 'utf-8');
  const { fm, body } = parseFrontmatter(content);

  const title = fm.title || '';
  const excerpt = fm.excerpt || '';
  const description = fm.description || '';
  const twitterDescription = fm.twitter_description || '';

  const bodyClean = stripMarkdown(body);
  const bodyWords = countWords(bodyClean);

  const excerptWords = countWords(excerpt);
  const excerptParagraphs = countParagraphs(excerpt);

  const result = {
    file: path.relative(ROOT, file),
    title: {
      text: title,
      characters: title.length
    },
    excerpt: {
      text: excerpt,
      words: excerptWords,
      characters: excerpt.length,
      paragraphs: excerptParagraphs
    },
    description: {
      text: description,
      characters: description.length
    },
    twitter_description: {
      text: twitterDescription,
      characters: twitterDescription.length
    },
    body: {
      words: bodyWords
    }
  };

  console.log(JSON.stringify(result, null, 2));
}

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage:');
  console.error('  counter.js <file>');
  console.error('');
  console.error('Example:');
  console.error('  counter.js _drafts/2026-05-01-mi-post.md');
  console.error('  counter.js _posts/2026/2026-04-27-mi-post.md');
  process.exit(1);
}

cmdCount(args[0]);
