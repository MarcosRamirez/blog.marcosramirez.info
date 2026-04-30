const fs = require('fs');
const path = require('path');

const BRANDS = require('./brands.js');
const { verifyRules } = require('./rules.js');

const arg = process.argv[2];

if (!arg) {
  console.log('Usage: node verify-post.js <file.md>');
  process.exit(1);
}

const filePath = path.resolve(arg);

if (!fs.existsSync(filePath)) {
  console.error(`\x1b[31m❌ File not found: ${filePath}\x1b[0m`);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');

console.log(`\x1b[36m🔍 Verifying: ${path.basename(filePath)}\x1b[0m\n`);

const results = verifyRules(content, filePath);

let hasErrors = false;

for (const result of results) {
  if (result.status === 'pass') {
    console.log(`\x1b[32m✅ ${result.category}: ${result.rule}\x1b[0m`);
    if (result.details) {
      console.log(`   \x1b[90m${result.details}\x1b[0m`);
    }
  } else {
    hasErrors = true;
    console.log(`\x1b[31m❌ ${result.category}: ${result.rule}\x1b[0m`);
    if (result.details) {
      console.log(`   \x1b[31m${result.details}\x1b[0m`);
    }
    if (result.line) {
      console.log(`   \x1b[90mLine ${result.line}\x1b[0m`);
    }
  }
}

console.log('');

if (hasErrors) {
  console.log(`\x1b[31m❌ ${results.filter(r => r.status === 'fail').length} errors found. Fix before committing.\x1b[0m`);
  process.exit(1);
} else {
  console.log(`\x1b[32m✅ All checks passed!\x1b[0m`);
  process.exit(0);
}