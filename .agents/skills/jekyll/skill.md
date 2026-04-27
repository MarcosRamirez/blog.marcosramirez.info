```yaml
name: jekyll
description: Describes the technical information about Jekyll, the static site generator used to build this blog with the Chirpy theme.
```

# Instructions

You are an expert in Jekyll static site generator. You have access to all the Jekyll documentation and can answer any questions about it.
Also you know that this blog is hosted in Github Pages.
You must ensure the generated content is compatible with Jekyll and Github Pages.

There are no local build or preview commands. All build and deploy is done automatically on GitHub Pages via GitHub Actions when pushing to master.

## FrontMatter

The frontmatter must be in YAML format between triple dashes:

```yaml
---
title: "Post title"
date: 2026-04-26 09:30:00 +0200
excerpt: "Short summary without markdown"
author: Marcos Ramírez
categories:
  - Tecnología
tags:
  - example
image: /assets/img/headers/2026/image-name.webp
image_alt: "Alternative image description"
toc: true
twitter_description: "Short description for Twitter"
permalink: /permanent-url/
---
```

Or with multiple authors:

```yaml
---
title: "Post title"
date: 2026-04-26 09:30:00 +0200
excerpt: "Short summary without markdown"
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
tags:
  - example
image: /assets/img/headers/2026/image-name.webp
image_alt: "Alternative image description"
toc: true
twitter_description: "Short description for Twitter"
permalink: /permanent-url/
---
```

### FrontMatter Rules

- Excerpt cannot contain markdown links
- The frontmatter must contain all these required fields
- Use **author** (singular) when there is only one author
- Use **authors** (plural) when there are two or more authors

### FrontMatter YAML Characters

These characters break YAML parsing if not escaped correctly:

| Character | Problem |
|---|---|
| `:` | Interpreted as key/value separator |
| `#` | Interpreted as comment |
| `'` | Breaks single-quoted strings |
| `"` | Breaks double-quoted strings |
| `[` `]` `{` `}` | Array/map syntax |
| `-` at start of value | Interpreted as list item |

**Rule:** Always wrap `excerpt`, `title` and similar values in double quotes. If text contains double quotes, escape with `\"`.

```yaml
# Text with colon → double quotes
excerpt: "Learn Flask: a quick guide"

# Text with double quotes → escape with \"
excerpt: "He said \"hello\" and left"
```

## Slug, Filename, and Title (Three Different Concepts)

| Concept | Purpose | Format | Example |
|----------|--------|--------|--------|
| **Title** | Human reading, SEO (H1) | Full text with caps and punctuation | "Home Assistant: Your domotics brain in one place" |
| **Slug** | Public URL of the post | 3-5 keywords, lowercase, hyphens | `home-assistant-domotics-guide` |
| **Filename** | Internal .md identifier | Use title slug in lowercase (no date). Example: `my-proxmox-decision.md` |

**Rules:**

1. **Title:** Full text, can have punctuation, colons, etc. Used for H1 and metadata.
2. **Slug (URL):** 3-5 keywords max. Used in `permalink: /:slug/` and for public URL.
3. **Filename:** Must MATCH the slug in frontmatter (without date). Format: `YYYY-MM-DD-slug.md`

**CRITICAL: Jekyll 4.2+ requires filename to match slug exactly**

The filename (minus date) must be identical to the `slug` field in frontmatter:
- Frontmatter: `slug: my-post-slug` → Filename: `2026-01-15-my-post-slug.md`
- If they don't match, `{% post_url %}` will fail

**IMPORTANT: If you modify the slug, you MUST also rename the file**

If you change the `slug:` field in frontmatter, you MUST:
1. Rename the file to match the new slug
2. Update ALL `{% post_url %}` links in other posts that reference this post
3. Update the image path in frontmatter (`image:` field)
Failure to do this will break the build.

**Examples:**

| Title | Slug | Correct Filename | Incorrect Filename |
|--------|------|---------------|---------------|
| "Jellyfin 4K cuts" | `jellyfin-cortes-4k-disco` | `2026-04-23-jellyfin-cortes-4k-disco.md` | `2026-04-23-jellyfin-cortes-4k-disco-lleno.md` |
| "My recommendations" | `recomendaciones-libros` | `2021-02-25-recomendaciones-libros.md` | `2021-02-25-mis-lecturas-recomendadas.md` |


## Filenames

The format is `YYYY-MM-DD-title-slug.md`:

```
_posts/YYYY/YYYY-MM-DD-title-slug.md
```

## Paths

### Posts

Stored in `_posts/YYYY/`:

```
_posts/YYYY/YYYY-MM-DD-title.md
```

### Drafts

Stored in `_drafts/`:

```
_drafts/YYYY-MM-DD-title.md
```

## Images

Header images go in:

```
/assets/img/headers/AAAA/image-name.webp
```

Recommended formats: WebP with optimal quality.
Recommended height: 700px.
Recommended width: 1500px.

Use the create-images skill to generate images with AI.

## Liquid Tags

### Internal Links (between posts)

When mentioning a topic covered in another post, link to it.

- Use `{% post_url %}` tag with the filename in format `YYYY-MM-DD-slug` (DO NOT include year folder path):
  - ✅ `{% post_url 2026-04-23-jellyfin-cortes-4k-disco %}`
  - ❌ `{% post_url 2026/2026-04-23-jellyfin-cortes-4k-disco %}`
- Format: `[Link text]({% post_url YYYY-MM-DD-slug %})` — this is Jekyll's native tag and works even if domain or base URL changes

**CRITICAL: Filename must match the slug in frontmatter**

Jekyll 4.2+ requires the filename (without date) to match exactly the `slug` field in the frontmatter:
- If frontmatter has `slug: my-post-title`, filename must be `YYYY-MM-DD-my-post-title.md`
- Do NOT use the post title as filename - use the slug

Examples:
| Frontmatter slug | Correct filename | Incorrect filename |
|---------------|--------------|---------------|
| `jellyfin-cortes-4k-disco` | `2026-04-23-jellyfin-cortes-4k-disco.md` | `2026-04-23-jellyfin-cortes-4k-disco-lleno.md` |
| `recomendaciones-libros` | `2021-02-25-recomendaciones-libros.md` | `2021-02-25-mis-lecturas-recomendadas.md` |

- The filename passed to `post_url` must use hyphens instead of spaces
  - ✅ `{% post_url 2025-03-01-resumen-febrero-2025 %}`
  - ❌ `{% post_url 2025-03-01-Resumen Febrero 2025 %}`

## Categories

Main categories:
- Tecnología
- Finanzas Personales
- Personal y Desarrollo Profesional
- Productividad y Hacks

Subcategories:
- Inteligencia Artificial
- Software y Apps
- Sistemas
- Redes e Infraestructura
- Desarrollo Web
- Bancos y Fintech
- Ahorro e Inversión
- Automatización
- Life Hacks
- Metas y Resúmenes
- Reflexiones y Opinión
- Carrera Profesional
- Recomendaciones

NOTE: Use "Inteligencia Artificial", NOT "IA".