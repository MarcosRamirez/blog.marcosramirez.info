# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog at [https://blog.marcosramirez.info](https://blog.marcosramirez.info) built with **Jekyll + Chirpy theme**, deployed automatically to **GitHub Pages** on every push to `master`. Language: Castilian Spanish (Spain).

## Commands

```bash
# Local development (optional — build/deploy is automatic via GitHub Actions on push)
bundle install
bundle exec jekyll serve
# → Available at http://localhost:4000

# Generate a header image for a post
node _tools/image-generator/image_generator.js \
  --prompt "<visual description in English, no text, no watermarks>" \
  --output "assets/img/headers/YYYY/post-slug.webp"
# The script adds a provider suffix to the filename (e.g. -nanobanana.webp)
# Use the returned `finalPath` value in frontmatter, not the --output path

# Verify a post manually (also runs automatically on git commit)
node _tools/verify-post.js _posts/2026/2026-06-01-my-post.md
```

## Architecture

### Content structure

- `_posts/YYYY/YYYY-MM-DD-slug.md` — published posts (organized by year)
- `_drafts/YYYY-MM-DD-slug.md` — unpublished drafts
- `assets/img/headers/YYYY/` — header images (WebP, 1900×478px, provider suffix in filename)
- `assets/img/misc/` — user-supplied images for posts (**do not delete this folder**)
- `.proximafecha` — local-only file tracking next publication dates (never commit this)

### Post frontmatter (all fields required)

```yaml
---
title: "Post Title"
slug: post-slug
date: 2026-06-01 08:30:00 +0200
excerpt: "Human summary (20-30% of post length, no markdown links)"
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Inteligencia Artificial
tags: [tag1, tag2, tag3]
image: /assets/img/headers/2026/post-slug-nanobanana.webp
image_alt: "Descriptive alt text"
toc: true
pin: false
twitter_description: "160 chars max"
description: "SEO meta description 140-155 chars"
permalink: /:slug/
---
```

- Use `author` (singular) or `authors` (plural) depending on co-authorship
- `permalink` is always `/:slug/` — never hardcode a URL
- Jekyll 4.2+ requires filename (minus date) to exactly match the `slug` field

### Categories (single source of truth)

Main categories (exactly **one** per post): `Tecnología`, `Finanzas Personales`, `Personal`, `Productividad y Hacks`

Subcategories (add all that apply): `Inteligencia Artificial`, `Software y Apps`, `Sistemas`, `Redes e Infraestructura`, `Desarrollo Web`, `Bancos y Fintech`, `Ahorro e Inversión`, `Automatización`, `Life Hacks`, `Metas y Resúmenes`, `Reflexiones y Opinión`, `Carrera Profesional`, `Recomendaciones`, `Desarrollo Profesional`

**Never write "IA"** — always use "Inteligencia Artificial" (applies to body, headings, frontmatter).

### SEO constraints

| Field | Limit |
|-------|-------|
| `title` | 55–65 characters |
| `description` | 140–155 characters (verify with `echo "text" \| wc -c`) |
| `tags` | 3–8 tags, no product/post title as tag |
| `image_alt` | Required in frontmatter |

### Link format (Kramdown)

```markdown
# External links
[Text](https://example.com){:target="_blank" rel="nofollow noopener"}

# Own domains (marcosramirez.info, marcosramirez.dev, saasquatch.es)
[Text](https://marcosramirez.info){:target="_blank"}

# Affiliate links (Amazon, etc.)
[Text](https://amzn.to/xxx){:target="_blank" rel="sponsored nofollow noopener"}

# Internal links between posts
[Text]({% post_url YYYY/YYYY-MM-DD-slug %}){:target="_blank"}
```

**Note:** No colon before `rel`. `{% post_url %}` always requires the year subfolder.

### Internal links

`{% post_url %}` requires the year folder: `{% post_url 2026/2026-04-23-post-slug %}` — omitting it breaks the build.

### H1 rule

Never add `#` headings in post body — Chirpy auto-generates H1 from frontmatter `title`. Adding one creates a duplicate H1.

## Publication Scheduling

- `.proximafecha` tracks `proxima_fecha` (next Monday) and `proxima_fecha_personal` (next Friday)
- General posts publish **Monday 08:30 +0200**; `Personal` category posts publish **Friday 08:30 +0200**
- **Only update `.proximafecha` when publishing** (moving to `_posts/` or creating directly there) — drafts do not affect it

## Pre-commit Hook

`hooks/pre-commit` runs `node _tools/verify-post.js` on any staged `.md` or `.html` file. Fix errors before committing — do not bypass with `--no-verify`.

## Commit Format

Conventional Commits with Gitmoji. Emoji goes **after** the colon, before the summary. Body is mandatory.

```
<type>(<scope>): <emoji> <summary>

<bullet-point body summarizing all changes>
```

Types: `feat` ✨, `fix` 🐛, `docs` 📝, `style` 🎨, `refactor` ♻️, `content` ✍️ (blog posts only), `wip` 🛠️

- `content` commits use the post title as summary
- `wip` commits must **never** be pushed
- Summary in English, imperative mood, under 50 characters
- Single-file commit: include filename in summary and body footer
- **Never push without explicit instruction**

## Agent Skills

Skills in `.agents/skills/` define editorial workflows. Load the relevant skill before performing the associated task:

| Skill | When to use |
|-------|-------------|
| `copywriting` | Writing or editing any post |
| `copywriting/research` | MANDATORY before writing a new post |
| `copywriting/links` | Inserting links in posts |
| `copywriting/proofreading` | Reviewing spelling, grammar, style |
| `SEO` | Optimizing posts for search engines |
| `jekyll` | Verifying frontmatter and Jekyll compatibility |
| `create-images` | Generating header images with AI |
| `git` | Writing commit messages |

### Image generation workflow

1. Read the full post to identify concept and brands
2. Run `_tools/image-generator/image_generator.js` with a photorealistic English prompt
3. Read `finalPath` from the returned JSON — that is the actual saved filename (includes provider suffix)
4. Update `image:` in frontmatter with `finalPath`
5. If script returns code `2` or `4`, stop and inform the user — do not retry

### Publishing a draft workflow

1. Change `date` in frontmatter to the publication date
2. Generate header image (create-images skill)
3. Update frontmatter `image:` with `finalPath`
4. Apply SEO skill optimizations
5. Move file from `_drafts/` to `_posts/YYYY/` and rename to match publication date
6. Update `.proximafecha`
7. Commit with type `content`
8. Push only if explicitly requested
