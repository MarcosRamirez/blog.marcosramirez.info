#!/usr/bin/env node
/**
 * Blog post scheduler and publisher.
 * Scans _posts/ to find existing dates and calculates next free dates.
 * Handles draft publishing with automatic category detection.
 * Updates the Home Lab series index in home-lab-filosofia.md.
 *
 * Usage:
 *   node schedule.js next <type>              — Get next free date
 *   node schedule.js publish <slug> [date]    — Publish a draft
 *   node schedule.js update-series            — Update Home Lab series index
 *
 * Types: sistemas, home-lab, personal, general
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');
const POSTS_DIR = path.join(ROOT, '_posts');
const DRAFTS_DIR = path.join(ROOT, '_drafts');
const TIME = '08:30:00 +0200';

// ── Helpers ──────────────────────────────────────────────

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function dayName(d) {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
}

function isFriday(d) { return d.getDay() === 5; }
function isSunday(d) { return d.getDay() === 0; }

function nextFriday(from) {
  const d = new Date(from);
  d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7 || 7));
  return d;
}

function nextSunday(from) {
  const d = new Date(from);
  d.setDate(d.getDate() + ((0 - d.getDay() + 7) % 7 || 7));
  return d;
}

function nextDay(from) {
  const d = new Date(from);
  d.setDate(d.getDate() + 1);
  return d;
}

/** Get all published dates from _posts/ */
function getExistingDates() {
  const dates = new Set();
  try {
    const years = fs.readdirSync(POSTS_DIR);
    for (const year of years) {
      const yearDir = path.join(POSTS_DIR, year);
      if (!fs.statSync(yearDir).isDirectory()) continue;
      const files = fs.readdirSync(yearDir);
      for (const f of files) {
        if (!f.endsWith('.md')) continue;
        const m = f.match(/^(\d{4}-\d{2}-\d{2})-/);
        if (m) dates.add(m[1]);
      }
    }
  } catch { /* _posts/ may not exist yet */ }
  return dates;
}

/** Find next free date starting from `from` with step function */
function findNextFree(from, stepFn, existing) {
  let d = new Date(from);
  while (existing.has(formatDate(d))) {
    d = stepFn(d);
  }
  return d;
}

/** Parse YAML frontmatter — simple key: value extraction */
function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const lines = m[1].split(/\r?\n/);
  const fm = {};
  let currentKey = null;

  for (const line of lines) {
    // Array item
    if (line.match(/^  - /)) {
      if (currentKey && Array.isArray(fm[currentKey])) {
        fm[currentKey].push(line.replace(/^  - /, '').replace(/^["']|["']$/g, ''));
      }
      continue;
    }
    // Key: value
    const kv = line.match(/^(\w[\w_]*):\s*(.*)/);
    if (kv) {
      currentKey = kv[1];
      const val = kv[2].trim();
      if (val === '') {
        // Will be an array or multiline — init as array
        fm[currentKey] = [];
      } else if (val.startsWith('[') && val.endsWith(']')) {
        // Inline array: [Tecnología, Sistemas]
        fm[currentKey] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        currentKey = null;
      } else {
        fm[currentKey] = val.replace(/^["']|["']$/g, '');
        currentKey = null;
      }
    }
  }
  return fm;
}

/** Detect schedule type from draft frontmatter */
function detectType(fm) {
  const categories = fm.categories || [];
  // Ensure categories is always an array
  const cats = Array.isArray(categories) ? categories : [categories];

  // Check for Home Lab subcategory
  if (cats.some(c => c.toLowerCase() === 'home lab' || c.toLowerCase() === 'home-lab' || c.toLowerCase() === 'homelab')) {
    return 'home-lab';
  }

  // Check for Personal main category
  if (cats.some(c => c.toLowerCase() === 'personal')) {
    return 'personal';
  }

  // Check for Juegos main category (same rules as Personal)
  if (cats.some(c => c.toLowerCase() === 'juegos')) {
    return 'juegos';
  }

  // Default: general
  return 'general';
}

const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

const SERIES_FILE_SLUG = 'home-lab-filosofia';

function formatSpanishDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${d} de ${MONTHS_ES[m - 1]} de ${y}`;
}

/** Get all posts that have Home Lab category, sorted by date */
function getHomeLabPosts() {
  const posts = [];
  try {
    const years = fs.readdirSync(POSTS_DIR);
    for (const year of years) {
      const yearDir = path.join(POSTS_DIR, year);
      if (!fs.statSync(yearDir).isDirectory()) continue;
      const files = fs.readdirSync(yearDir);
      for (const f of files) {
        if (!f.endsWith('.md')) continue;
        const dateMatch = f.match(/^(\d{4}-\d{2}-\d{2})-/);
        if (!dateMatch) continue;
        const filePath = path.join(yearDir, f);
        const content = fs.readFileSync(filePath, 'utf-8');
        const fm = parseFrontmatter(content);
        const categories = fm.categories || [];
        const cats = Array.isArray(categories) ? categories : [categories];
        if (cats.some(c => c.toLowerCase() === 'home lab' || c.toLowerCase() === 'home-lab' || c.toLowerCase() === 'homelab')) {
          posts.push({
            date: dateMatch[1],
            filename: f,
            year: year,
            title: fm.title || f,
            slug: fm.slug || f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''),
          });
        }
      }
    }
  } catch { /* _posts/ may not exist yet */ }
  posts.sort((a, b) => a.date.localeCompare(b.date));
  return posts;
}

/** Build the series index section content */
function buildSeriesSection(posts, today) {
  const published = posts.filter(p => p.date <= today);
  const future = posts.filter(p => p.date > today);

  let publishedSection = 'Posts publicados de la serie:\n';
  if (published.length === 0) {
    publishedSection += '\n';
    publishedSection += '*(Aún no hay posts publicados en esta serie.)*\n';
  } else {
    publishedSection += '\n';
    for (const p of published) {
      const jekyllUrl = p.filename.replace(/\.md$/, '');
      publishedSection += `- ${formatSpanishDate(p.date)}: [${p.title}]({% post_url ${p.year}/${jekyllUrl} %})\n`;
    }
  }

  publishedSection += '\n';
  publishedSection += 'Próximos posts de la serie (fecha de publicación):\n';
  publishedSection += '\n';
  if (future.length === 0) {
    publishedSection += '*(No hay posts futuros planificados.)*\n';
  } else {
    for (const p of future) {
      publishedSection += `- ${formatSpanishDate(p.date)}: ${p.title}\n`;
    }
  }

  return publishedSection;
}

/** Update the series section in home-lab-filosofia.md. Returns status object. */
function updateSeriesInPlace(today, allPosts) {
  const homeLabWithoutRoot = allPosts.filter(p => p.slug !== SERIES_FILE_SLUG);

  // Find the series index file
  let seriesFile = null;
  try {
    const years = fs.readdirSync(POSTS_DIR);
    for (const year of years) {
      const yearDir = path.join(POSTS_DIR, year);
      if (!fs.statSync(yearDir).isDirectory()) continue;
      const files = fs.readdirSync(yearDir);
      const match = files.find(f => f.includes(SERIES_FILE_SLUG));
      if (match) {
        seriesFile = path.join(yearDir, match);
        break;
      }
    }
  } catch { /* ignore */ }

  if (!seriesFile) {
    return { status: 'error', message: 'Series index file not found' };
  }

  const content = fs.readFileSync(seriesFile, 'utf-8');
  const seriesSectionRegex = /(Posts publicados de la serie:\r?\n[\s\S]*?)(?=\r?\n## |\r?\n# )/;
  const match = content.match(seriesSectionRegex);

  if (!match) {
    return { status: 'error', message: 'Could not find series section' };
  }

  const newSection = buildSeriesSection(homeLabWithoutRoot, today);
  const updatedContent = content.replace(seriesSectionRegex, newSection);

  if (content === updatedContent) {
    return { status: 'unchanged' };
  }

  fs.writeFileSync(seriesFile, updatedContent);

  const publishedCount = homeLabWithoutRoot.filter(p => p.date <= today).length;
  const futureCount = homeLabWithoutRoot.filter(p => p.date > today).length;

  return {
    status: 'updated',
    published: publishedCount,
    future: futureCount
  };
}

/** Update the series index in home-lab-filosofia.md (standalone command) */
function cmdUpdateSeries() {
  const today = formatDate(new Date());
  const allPosts = getHomeLabPosts();
  const homeLabWithoutRoot = allPosts.filter(p => p.slug !== SERIES_FILE_SLUG);

  if (homeLabWithoutRoot.length === 0) {
    console.log(JSON.stringify({
      status: 'skipped',
      message: 'No Home Lab posts found (excluding series root).'
    }, null, 2));
    return;
  }

  const result = updateSeriesInPlace(today, allPosts);

  if (result.status === 'error') {
    console.error(`Error: ${result.message}`);
    process.exit(1);
  }

  console.log(JSON.stringify(result, null, 2));
}

/** Build the schedule config */
function getSchedule(type) {
  const configs = {
    'home-lab':   { day: 'Friday',  nextFn: nextFriday,  label: 'Home Lab' },
    'personal':   { day: 'Sunday',  nextFn: nextSunday,  label: 'Personal' },
    'juegos':     { day: 'Sunday',  nextFn: nextSunday,  label: 'Juegos' },
    'general':    { day: 'Any day', nextFn: nextDay,     label: 'General' },
  };
  return configs[type] || configs.general;
}

// ── Commands ─────────────────────────────────────────────

function cmdNext(type) {
  const config = getSchedule(type);
  const existing = getExistingDates();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // For Friday/Sunday: start from next matching day; for general: start from tomorrow
  let start;
  if (type === 'home-lab' || type === 'personal' || type === 'juegos') {
    start = config.nextFn(today);
  } else {
    start = nextDay(today);
  }

  const result = findNextFree(start, config.nextFn, existing);
  const dateStr = formatDate(result);

  console.log(JSON.stringify({
    date: dateStr,
    formatted: `${dateStr} ${TIME}`,
    type: type,
    day: config.day,
    label: config.label
  }, null, 2));
}

function cmdPublish(slug, customDate) {
  // Find draft file
  const draftFile = path.join(DRAFTS_DIR, slug.endsWith('.md') ? slug : `${slug}.md`);

  if (!fs.existsSync(draftFile)) {
    console.error(`Error: Draft "${slug}" not found in _drafts/`);
    process.exit(1);
  }

  const content = fs.readFileSync(draftFile, 'utf-8');
  const fm = parseFrontmatter(content);

  // Detect category
  const type = detectType(fm);
  const config = getSchedule(type);
  const existing = getExistingDates();

  let dateStr;
  let formatted;

  if (customDate) {
    // Validate custom date
    const d = parseDate(customDate);
    if (isNaN(d.getTime())) {
      console.error(`Error: Invalid date format "${customDate}". Use YYYY-MM-DD.`);
      process.exit(1);
    }
    if (existing.has(customDate)) {
      console.error(`Warning: Date ${customDate} already has a post. Proceeding anyway.`);
    }
    dateStr = customDate;
    formatted = `${customDate} ${TIME}`;
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let start;
    if (type === 'home-lab' || type === 'personal' || type === 'juegos') {
      start = config.nextFn(today);
    } else {
      start = nextDay(today);
    }
    const result = findNextFree(start, config.nextFn, existing);
    dateStr = formatDate(result);
    formatted = `${dateStr} ${TIME}`;
  }

  // Extract slug from frontmatter or use filename slug
  const slugField = fm.slug || slug.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');

  // Update frontmatter: replace the date line
  const updatedContent = content.replace(/^(date:\s*).+$/m, `$1${formatted}`);

  // Move to _posts/YYYY/
  const year = dateStr.split('-')[0];
  const yearDir = path.join(POSTS_DIR, year);
  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, { recursive: true });
  }

  const newFilename = `${dateStr}-${slugField}.md`;
  const destFile = path.join(yearDir, newFilename);

  fs.writeFileSync(destFile, updatedContent);
  fs.unlinkSync(draftFile);

  const publishResult = {
    status: 'published',
    date: dateStr,
    formatted: formatted,
    type: type,
    day: config.day,
    file: path.relative(ROOT, destFile),
    draft: path.relative(ROOT, draftFile)
  };

  // Auto-update Home Lab series index if this is a Home Lab post
  if (type === 'home-lab') {
    const today = formatDate(new Date());
    const allPosts = getHomeLabPosts();
    const seriesResult = updateSeriesInPlace(today, allPosts);
    publishResult.seriesUpdated = seriesResult;
  }

  console.log(JSON.stringify(publishResult, null, 2));
}

// ── Main ─────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage:');
  console.error('  schedule.js next <type>              — Get next free date');
  console.error('  schedule.js publish <slug> [date]    — Publish a draft');
  console.error('  schedule.js update-series            — Update Home Lab series index');
  console.error('');
  console.error('Types: sistemas, home-lab, personal, juegos, general');
  process.exit(1);
}

const [command, ...rest] = args;

if (command === 'next') {
  const type = rest[0] || 'general';
  cmdNext(type);
} else if (command === 'publish') {
  if (rest.length < 1) {
    console.error('Error: publish requires a draft slug');
    process.exit(1);
  }
  const [slug, customDate] = rest;
  cmdPublish(slug, customDate);
} else if (command === 'update-series') {
  cmdUpdateSeries();
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
