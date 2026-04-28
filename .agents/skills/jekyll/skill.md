---
name: jekyll
description: Describes the technical information about Jekyll, the static site generator used to build this blog with the Chirpy theme.
---

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
slug: slug-name
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
pin: false
twitter_description: "Short description for Twitter"
permalink: /:slug/
---
```

Or with multiple authors:

```yaml
---
title: "Post title"
slug: slug-name
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
pin: false
twitter_description: "Short description for Twitter"
permalink: /:slug/
---
```

### FrontMatter Rules

- Excerpt cannot contain markdown links
- The frontmatter must contain all these required fields
- Use **author** (singular) when there is only one author
- Use **authors** (plural) when there are two or more authors
- `slug` is always required
- `permalink` is always `/:slug/` — no exceptions. Never use a hardcoded URL like `/my-post/`

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
| **Filename** | Internal .md identifier | Date + slug. Format: `YYYY-MM-DD-slug.md` | `2026-06-01-home-assistant-domotics-guide.md` |

**Rules:**

1. **Title:** Full text, can have punctuation, colons, etc. Used for H1 and metadata.
2. **Slug (URL):** 3-5 keywords max. Used in `permalink: /:slug/` and for public URL.
3. **Filename:** Must MATCH the slug in frontmatter (without date). Format: `YYYY-MM-DD-slug.md`

**CRITICAL: Jekyll 4.2+ requires filename to match slug exactly**

The filename (minus date) must be identical to the `slug` field in frontmatter:
- Frontmatter: `slug: my-post-slug` → Filename: `2026-01-15-my-post-slug.md`
- If they don't match, `{% post_url %}` will fail

**IMPORTANT: If you modify the slug, you MUST also:**
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

The format is `YYYY-MM-DD-slug.md`, stored inside a year subfolder:

```
_posts/YYYY/YYYY-MM-DD-slug.md
```

## Paths

### Posts

Stored in `_posts/YYYY/`:

```
_posts/YYYY/YYYY-MM-DD-slug.md
```

### Drafts

Stored in `_drafts/`:

```
_drafts/YYYY-MM-DD-slug.md
```

## Images

Header images go in:

```
/assets/img/headers/YYYY/image-name.webp
```

Recommended formats: WebP with optimal quality.
Recommended height: 700px.
Recommended width: 1500px.

Use the create-images skill to generate images with AI.

## Kramdown Link Format

Jekyll uses Kramdown as its Markdown parser. The correct format for links with attributes is:

```markdown
[Text](url){:target="_blank" rel="attribute"}
```

**CRITICAL:** Do NOT put a colon (`:`) before `rel` or other attributes inside the braces.

**Correct:**
```markdown
[Link](https://example.com){:target="_blank" rel="nofollow noopener"}
```

**Incorrect:**
```markdown
[Link](https://example.com){:target="_blank" :rel="nofollow noopener"}
```

**Special case - Amazon Affiliate Links:**
```markdown
[Text](https://amzn.to/xxxxx){:target="_blank" rel="sponsored nofollow noopener"}
```

## Liquid Tags

### Internal Links (between posts)

When mentioning a topic covered in another post, link to it.

**CRITICAL: Always include the year subfolder in `post_url`.**

Posts are stored in `_posts/YYYY/` subfolders. Jekyll 4.2 on GitHub Pages requires the year folder to be included in `{% post_url %}`, otherwise the build will fail or produce deprecation warnings.

- ✅ `{% post_url 2026/2026-04-23-jellyfin-cortes-4k-disco %}`
- ❌ `{% post_url 2026-04-23-jellyfin-cortes-4k-disco %}`

Format: `[Link text]({% post_url YYYY/YYYY-MM-DD-slug %})`

**CRITICAL: Filename must match the slug in frontmatter**

Jekyll 4.2+ requires the filename (without date) to match exactly the `slug` field in the frontmatter:
- If frontmatter has `slug: my-post-title`, filename must be `YYYY-MM-DD-my-post-title.md`
- Do NOT use the post title as filename — use the slug

Examples:

| Frontmatter slug | Correct post_url | Incorrect post_url |
|---------------|--------------|---------------|
| `jellyfin-cortes-4k-disco` | `{% post_url 2026/2026-04-23-jellyfin-cortes-4k-disco %}` | `{% post_url 2026-04-23-jellyfin-cortes-4k-disco %}` |
| `recomendaciones-libros` | `{% post_url 2021/2021-02-25-recomendaciones-libros %}` | `{% post_url 2021-02-25-recomendaciones-libros %}` |

- The filename passed to `post_url` must use hyphens instead of spaces
  - ✅ `{% post_url 2025/2025-03-01-resumen-febrero-2025 %}`
  - ❌ `{% post_url 2025-03-01-Resumen Febrero 2025 %}`

## Categories

See [Copywriting Skill - Categories (Single Source of Truth)](file:///D:/Code/Marcos%20Ram%C3%ADrez/blog.marcosramirez.info/.agents/skills/copywriting/skill.md) for the full list of available categories and subcategories.

**Rule**: Always use the exact category names defined in the Copywriting skill.
- Main categories: `Tecnología`, `Finanzas Personales`, `Personal`, `Productividad y Hacks`
- Subcategories: `Inteligencia Artificial`, `Software y Apps`, etc.

### Category URL Structure
- Category archive pages are accessible at `/categories/<category-slug>/` (plural "categories")
- `<category-slug>` is generated by converting the category name to lowercase and replacing spaces with hyphens (`-`)
- Example: `Inteligencia Artificial` → slug `inteligencia-artificial` → full URL `https://blog.marcosramirez.info/categories/inteligencia-artificial/`

### Linking to Categories in Posts
Jekyll does not have a `category_url` Liquid tag like `post_url`. To link to a category archive page, use the `slugify` filter on the category name to generate the correct slug with the `/categories/` prefix:

```liquid
{% comment %} Static link to a known category {% endcomment %}
[Inteligencia Artificial]({{ "/categories/inteligencia-artificial/" | relative_url }})

{% comment %} Dynamic link for a post's categories {% endcomment %}
{% for category in post.categories %}
<a href="/categories/{{ category | slugify }}/">{{ category }}</a>
{% endfor %}
```