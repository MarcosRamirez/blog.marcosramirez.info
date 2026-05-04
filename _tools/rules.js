const BRANDS = require('./brands.js');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CODE_BLOCK_REGEX = /```[\s\S]*?```/g;
const INLINE_CODE_REGEX = /`[^`]+`/g;
const WHITESPACE_REGEX = /\s+/g;

function parseFrontmatter(content) {
  const { data, content: body } = matter(content);
  return { frontmatter: data, body };
}

function stripCodeBlocks(content) {
  return content
    .replace(CODE_BLOCK_REGEX, '')
    .replace(INLINE_CODE_REGEX, '');
}

function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  const cleaned = text.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const words = cleaned.split(/\n\s*\n|\n/).filter(w => w.trim().length > 0);
  let count = 0;
  for (const paragraph of words) {
    const paragraphWords = paragraph.split(/\s+/).filter(w => w.length > 0).length;
    count += paragraphWords;
  }
  return count;
}

function getTextWithoutCode(content) {
  const body = content.body || content;
  const frontmatter = content.frontmatter || {};

  let text = body;
  if (typeof body === 'string') {
    text = stripCodeBlocks(body);
  }

  let frontmatterText = '';
  for (const [key, value] of Object.entries(frontmatter)) {
    if (key !== 'title' && key !== 'excerpt' && key !== 'description' && key !== 'twitter_description') {
      frontmatterText += ` ${value}`;
    }
  }

  return (frontmatterText + ' ' + text).trim();
}

function verifyRules(content, filePath) {
  const results = [];
  const normalizedPath = filePath.replace(/\\/g, '/');
  const { frontmatter, body } = parseFrontmatter(content);
  const textWithoutCode = stripCodeBlocks(body);
  const fullText = getTextWithoutCode({ frontmatter, body });

  const isDraft = normalizedPath.includes('_drafts/');
  const isPost = normalizedPath.includes('_posts/');

  if (!isDraft && !isPost) {
    results.push({
      category: 'General',
      rule: 'File location',
      status: 'pass',
      details: 'Not a draft or post, skipping post-specific rules'
    });
    return results;
  }

  verifySEO(frontmatter, textWithoutCode, results, filePath);
  verifyCopywriting(frontmatter, textWithoutCode, results);
  verifyLinks(body, results, filePath);
  verifySpelling(textWithoutCode, results);

  return results;
}

function verifySEO(frontmatter, body, results, filePath) {
  const title = frontmatter.title || '';
  const description = frontmatter.description || '';

  results.push({
    category: 'SEO',
    rule: 'Title length (55-65)',
    status: title.length >= 55 && title.length <= 65 ? 'pass' : 'fail',
    details: title.length >= 55 && title.length <= 65 ? `${title.length} chars` : `${title.length} chars (must be 55-65)`
  });

  results.push({
    category: 'SEO',
    rule: 'Description length (140-155)',
    status: description.length >= 140 && description.length <= 155 ? 'pass' : 'fail',
    details: description.length >= 140 && description.length <= 155
      ? `${description.length} chars`
      : `${description.length} chars (must be 140-155)`
  });

  results.push({
    category: 'SEO',
    rule: 'image_alt exists',
    status: frontmatter.image_alt ? 'pass' : 'fail',
    details: frontmatter.image_alt ? frontmatter.image_alt : 'Missing image_alt in frontmatter'
  });

  const tags = frontmatter.tags || [];
  if (Array.isArray(tags)) {
    results.push({
      category: 'SEO',
      rule: 'Tags count (3-8)',
      status: tags.length >= 3 && tags.length <= 8 ? 'pass' : 'fail',
      details: tags.length >= 3 && tags.length <= 8
        ? `${tags.length} tags`
        : `${tags.length} tags (must be 3-8)`
    });

    const titleLower = (frontmatter.title || '').toLowerCase();
    const productTags = tags.filter(tag => {
      const tagLower = tag.toLowerCase();
      return titleLower.includes(tagLower) || tagLower.includes(titleLower.split(' ')[0]?.toLowerCase() || '');
    });

    results.push({
      category: 'SEO',
      rule: 'Tags no product name',
      status: productTags.length === 0 ? 'pass' : 'fail',
      details: productTags.length === 0
        ? 'No product name in tags'
        : `Product name in tags: ${productTags.join(', ')}`
    });
  }

  const slug = frontmatter.slug || '';
  const slugWords = slug.split('-').length;
  results.push({
    category: 'SEO',
    rule: 'Slug word count (3-5)',
    status: slugWords >= 3 && slugWords <= 5 ? 'pass' : 'fail',
    details: slugWords >= 3 && slugWords <= 5
      ? `${slugWords} words`
      : `${slugWords} words (must be 3-5)`
  });

  const lines = body.split('\n');
  let hasH1 = false;
  for (const line of lines) {
    if (line.startsWith('# ') && line.trim().length > 1) {
      hasH1 = true;
      break;
    }
  }

  results.push({
    category: 'SEO',
    rule: 'No duplicate H1',
    status: hasH1 ? 'fail' : 'pass',
    details: hasH1 ? 'Found H1 heading in body (Chirpy auto-generates from title)' : 'No H1 in body'
  });

  const hasPostImage = body.trim().startsWith('![') || body.trim().startsWith('![ ');
results.push({
    category: 'Post Structure',
    rule: 'Post image at beginning of body',
    status: hasPostImage ? 'pass' : 'fail',
    details: hasPostImage ? 'Post image found at start of body' : 'Missing post image at beginning (should be ![{{ page.image_alt }}]({{ page.image }}))'
  });

  const imagePath = frontmatter.image || '';
  let imageExists = false;
  if (imagePath) {
    const pathParts = filePath.replace(/\\/g, '/').split('/');
    const projectRoot = pathParts.slice(0, pathParts.indexOf('_drafts') !== -1 ? pathParts.indexOf('_drafts') : pathParts.indexOf('_posts')).join('/');
    const fullImagePath = path.join(projectRoot, imagePath.replace(/^\//, ''));
    imageExists = fs.existsSync(fullImagePath);
  }

  results.push({
category: 'Post Structure',
    rule: 'Image file exists',
    status: imageExists ? 'pass' : 'fail',
    details: imageExists ? imagePath : `Image not found: ${imagePath}`
  });
}

function verifyCopywriting(frontmatter, body, results) {
  const title = frontmatter.title || '';

  const iaMatches = body.match(/\bIA\b/gi);
  if (iaMatches) {
    results.push({
      category: 'Copywriting',
      rule: 'No "IA" (use "Inteligencia Artificial")',
      status: 'fail',
      details: `Found ${iaMatches.length} occurrences of "IA"`,
      line: findLineWithWord(body, 'IA')
    });
  } else {
    results.push({
      category: 'Copywriting',
      rule: 'No "IA" (use "Inteligencia Artificial")',
      status: 'pass'
    });
  }

  const wordCount = countWords(body);
  results.push({
    category: 'Copywriting',
    rule: 'Word count (≥1200)',
    status: wordCount >= 1200 ? 'pass' : 'fail',
    details: wordCount >= 1200 ? `${wordCount} words` : `${wordCount} words (min 1200)`
  });

  results.push({
    category: 'Copywriting',
    rule: 'Authors field exists',
    status: frontmatter.authors ? 'pass' : 'fail',
    details: frontmatter.authors ? 'Authors found' : 'Missing authors in frontmatter'
  });

  const categories = frontmatter.categories || [];
  const mainCategories = ['Tecnología', 'Finanzas Personales', 'Personal', 'Productividad y Hacks', 'Juegos'];
  const hasMainCategory = categories.some(c => mainCategories.includes(c));

  results.push({
    category: 'Copywriting',
    rule: 'Categories have main category',
    status: hasMainCategory ? 'pass' : 'fail',
    details: hasMainCategory ? categories.join(', ') : 'Missing main category'
  });

  const excerpt = frontmatter.excerpt || '';
  const hasLinkInExcerpt = /\[.+\]\(.+\)/.test(excerpt) || /\(\)|\{:target/.test(excerpt);
  results.push({
    category: 'Copywriting',
    rule: 'Excerpt has no links',
    status: hasLinkInExcerpt ? 'fail' : 'pass',
    details: hasLinkInExcerpt ? 'Links found in excerpt (not supported)' : 'No links in excerpt'
  });

  const isLeadPost = title.toLowerCase().includes('ai') ||
                     title.toLowerCase().includes('inteligencia') ||
                     title.toLowerCase().includes('arquitectura') ||
                     title.toLowerCase().includes('software') ||
                     title.toLowerCase().includes('automatiz') ||
                     title.toLowerCase().includes('cloud') ||
                     title.toLowerCase().includes('devops') ||
                     title.toLowerCase().includes('llm') ||
                     title.toLowerCase().includes('llms') ||
                     title.toLowerCase().includes('routing') ||
                     title.toLowerCase().includes('modelo') ||
                     title.toLowerCase().includes('modelos') ||
                     title.toLowerCase().includes('agente') ||
                     title.toLowerCase().includes('api');

  const contactLinkPattern = /\[.+\]\(https?:\/\/(?!.*(?:youtube|vimeo|twitter|x\.com|github\.com|linkedin|instagram|facebook)\b)[^)]*contacto[^)]*\)/gi;
  const hasContactLink = contactLinkPattern.test(body) || /escr[ií]beme.*contacto/i.test(body);

  if (isLeadPost) {
    results.push({
      category: 'Copywriting',
      rule: 'Lead post CTA with contact link',
      status: hasContactLink ? 'pass' : 'fail',
      details: hasContactLink ? 'Contact CTA found' : 'Lead post requires contact CTA'
    });
  } else {
    const hasAnyCommentCTA = /déjame un comentario|compártelo si te ha|resultado útil|qué opinas/i.test(body);
    results.push({
      category: 'Copywriting',
      rule: 'No-lead post CTA (text only)',
      status: hasAnyCommentCTA ? 'pass' : 'fail',
      details: hasAnyCommentCTA ? 'Comment CTA found' : 'No-lead post requires comment CTA'
    });
  }
}

function verifyLinks(body, results, filePath) {
  const codeBlockRanges = [];
  let match;
  const codeRegex = /```[\s\S]*?```/g;
  while ((match = codeRegex.exec(body)) !== null) {
    codeBlockRanges.push({ start: match.index, end: match.index + match[0].length });
  }

  function isInCodeBlock(pos) {
    return codeBlockRanges.some(range => pos >= range.start && pos < range.end);
  }

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)(?:\{:target="_blank" rel="([^"]+)"\})?/g;
  const links = [];
  while ((match = linkRegex.exec(body)) !== null) {
    if (!isInCodeBlock(match.index)) {
      links.push({
        text: match[1],
        url: match[2],
        rel: match[3] || '',
        index: match.index
      });
    }
  }

  for (const link of links) {
    const isExternal = !link.url.startsWith('/') &&
                       !link.url.startsWith('{{') &&
                       !link.url.includes('marcosramirez.info') &&
                       !link.url.includes('saasquatch.es');

    const hasValidRel = link.rel.includes('nofollow') && link.rel.includes('noopener');

    if (isExternal && !hasValidRel) {
      results.push({
        category: 'Links',
        rule: 'External link has proper rel attributes',
        status: 'fail',
        details: `Link "${link.text}" missing {:target="_blank" rel="nofollow noopener"}`,
        line: findLineWithLink(body, link.index)
      });
    }
  }

  if (links.filter(l => {
    const isExternal = !l.url.startsWith('/') && !l.url.startsWith('{{') && !l.url.includes('marcosramirez.info') && !l.url.includes('saasquatch.es');
    return isExternal;
  }).every(l => {
    const hasValidRel = l.rel.includes('nofollow') && l.rel.includes('noopener');
    return hasValidRel;
  })) {
    results.push({
      category: 'Links',
      rule: 'All external links have proper rel attributes',
      status: 'pass',
      details: `${links.filter(l => !l.url.startsWith('/') && !l.url.includes('marcosramirez.info')).length} external links checked`
    });
  } else if (links.some(l => {
    const isExternal = !l.url.startsWith('/') && !l.url.includes('marcosramirez.info') && !l.url.includes('saasquatch.es');
    return isExternal;
  })) {
  }

  // Check {% post_url %} references point to existing posts
  const postUrlRegex = /\{%[-\s]*post_url\s+([^\s%]+)\s*[-\s]*%\}/g;
  const postUrlMatches = [...body.matchAll(postUrlRegex)];

  if (postUrlMatches.length > 0) {
    const normalizedFile = filePath.replace(/\\/g, '/');
    const postsIdx = normalizedFile.indexOf('/_posts/');
    const draftsIdx = normalizedFile.indexOf('/_drafts/');
    const rootEnd = postsIdx !== -1 ? postsIdx : draftsIdx;
    const projectRoot = normalizedFile.slice(0, rootEnd);
    const postsDir = path.join(projectRoot, '_posts');

    const broken = [];
    for (const m of postUrlMatches) {
      const ref = m[1];
      const refPath = path.join(postsDir, ref + '.md');
      if (!fs.existsSync(refPath)) {
        broken.push(ref);
      }
    }

    results.push({
      category: 'Links',
      rule: 'post_url references exist',
      status: broken.length === 0 ? 'pass' : 'fail',
      details: broken.length === 0
        ? `${postUrlMatches.length} post_url(s) verified`
        : `Broken post_url (post not found): ${broken.join(', ')}`
    });
  }
}

function verifySpelling(body, results) {
  const suspiciousWords = [
    'escolha', 'escolher',
    'demande', 'demandes', 'demander',
    'farà', 'fare', 'faccia',
    'fait', 'faire',
    'deixe', 'deixa',
    'fez', 'fazer', 'fazer',
    'quer', 'querer', 'quere', 'queren',
    'dites', 'dire', 'diga', 'digas',
    'parler', 'parla', 'parlar', 'parlare', 'parlou', 'parlò',
    'vou', 'voir', 'vedere', 'veure', 'vidit', 'videre',
    'dizem', 'dizer', 'dir', 'dice', 'dites', 'dit', 'dis',
    'feita', 'feito', 'fatto', 'factum',
    'fic', 'fec',
    '安妮', '安妮'
  ];

  const foundSuspicious = [];
  const bodyLower = body.toLowerCase();

  for (const word of suspiciousWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = body.match(regex);
    if (matches) {
      foundSuspicious.push({ word, count: matches.length });
    }
  }

  if (foundSuspicious.length > 0) {
    results.push({
      category: 'Spelling',
      rule: 'No non-Castilian words (PT, FR, IT, CAT)',
      status: 'fail',
      details: `Found: ${foundSuspicious.map(w => `"${w.word}" (${w.count}x)`).join(', ')}`
    });
  } else {
    results.push({
      category: 'Spelling',
      rule: 'No non-Castilian words (PT, FR, IT, CAT)',
      status: 'pass'
    });
  }

  const htmlEntityRegex = /&[a-zA-Z]+;|&#\d+;|&#x[a-fA-F0-9]+;/g;
  const htmlEntities = body.match(htmlEntityRegex);

  if (htmlEntities) {
    results.push({
      category: 'Spelling',
      rule: 'No HTML entities',
      status: 'fail',
      details: `Found: ${htmlEntities.join(', ')}`
    });
  } else {
    results.push({
      category: 'Spelling',
      rule: 'No HTML entities',
      status: 'pass'
    });
  }
}

function findLineWithWord(body, word) {
  const lines = body.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(word)) {
      return i + 1;
    }
  }
  return null;
}

function findLineWithLink(body, index) {
  const beforeLink = body.substring(0, index);
  const lines = beforeLink.split('\n');
  return lines.length;
}

module.exports = { verifyRules };