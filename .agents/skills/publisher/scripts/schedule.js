#!/usr/bin/env node
/**
 * Blog post scheduler and publisher.
 * Scans _posts/ to find existing dates and calculates next free dates.
 * Handles draft publishing with automatic category detection.
 *
 * Usage:
 *   node schedule.js next <type>              — Get next free date
 *   node schedule.js publish <slug> [date]    — Publish a draft
 *
 * Types: sistemas, home-lab, personal, general
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');
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
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const lines = m[1].split('\n');
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

  // Default: general
  return 'general';
}

/** Build the schedule config */
function getSchedule(type) {
  const configs = {
    'home-lab':   { day: 'Friday',  nextFn: nextFriday,  label: 'Home Lab' },
    'personal':   { day: 'Sunday',  nextFn: nextSunday,  label: 'Personal' },
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
  if (type === 'home-lab' || type === 'personal') {
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
    if (type === 'home-lab' || type === 'personal') {
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

  console.log(JSON.stringify({
    status: 'published',
    date: dateStr,
    formatted: formatted,
    type: type,
    day: config.day,
    file: path.relative(ROOT, destFile),
    draft: path.relative(ROOT, draftFile)
  }, null, 2));
}

// ── Main ─────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage:');
  console.error('  schedule.js next <type>              — Get next free date');
  console.error('  schedule.js publish <slug> [date]    — Publish a draft');
  console.error('');
  console.error('Types: sistemas, home-lab, personal, general');
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
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
