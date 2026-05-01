---
name: seo
description: Skill specialized in optimizing technology and software posts under E-E-A-T standards. Analyzes heading hierarchy, improves on-page SEO, and ensures the author's technical authority as a Software Engineer.
compatibility: Designed for Claude Code
metadata:
  author: marcos-ramirez
  version: "1.0"
---

# SEO and Technical Style Manual (Skill Instructions)

## Order for Writing a Good Post
1. Follow this skill's instructions for writing, researching, etc.
2. Once the post is written, follow the links skill instructions
3. Once the post is written, follow the SEO skill instructions

## 1. Profile and Authority
- **Author:** Marcos Ramírez, Software Engineer.
- **E-E-A-T:** Inject paragraphs that demonstrate direct experience, software testing, and technical architecture understanding.

## 2. Content Structure (On-Page)

### ⚠️ MANDATORY VERIFICATION BEFORE COMMIT/PUSH

Before any commit or push, you MUST verify ALL of the following:

| Field | Limit | How to verify |
|-------|-------|---------------|
| `title` | 55-65 characters | Run counter script |
| `description` | 140-155 characters | Run counter script |
| Tags | 3-8 tags, NO product name | Check list |
| `image_alt` | Must exist | Check frontmatter |

**Do NOT commit if any of these fail. Fix first.**

Use the counter script to get all counts at once:

```bash
node .agents/skills/copywriting/scripts/counter.js <file>
```

The script returns JSON with `title.characters`, `description.characters`, and all other field counts. Validate the numbers against the limits above.

- **Metadata (Limits):**
  - **Title Tag:** Between 55 and 65 characters (prioritize keyword at the start).
  - **Meta Description (description):** Between 140 and 155 characters (shown to search results). Do NOT exceed 160 characters. This is a separate frontmatter field from excerpt.
  - **Verification:** Run `node .agents/skills/copywriting/scripts/counter.js <file>` — do NOT estimate.
- **H1:** Unique title defined in Front Matter. Don't repeat in the body (Chirpy auto-generates H1 from frontmatter title, adding `#` in the body creates a duplicate H1).
- **H2/H3 with Long-tail:** Subtitles that answer real searches (e.g.: "How to configure X in Y?").
- **Comparative Tables:** Mandatory when mentioning tools to compare Price, Functions, and Dev-Experience.
- **FAQ Section:** 3-4 questions to capture featured snippets. **Use HTML not markdown** `<details>`/`<summary>` tags for each Q&A — this creates collapsible entries and is compatible with Jekyll/Kramdown:

```html
<details>
<summary>¿Pregunta aquí?</summary>

Respuesta aquí. Puede incluir markdown, links, etc.

</details>
```

**Rules:**
- Leave a blank line after the opening `<summary>` tag and before `</details>` so Kramdown renders markdown inside correctly.
- Do NOT nest block-level markdown (headers, lists) directly inside `<summary>`.
- The `## Preguntas frecuentes` H2 heading stays as normal markdown above the first `<details>` block.

### Meta Description Generation Rules

**Related fields:** For `excerpt` and `twitter_description` rules, see **copywriting skill**. This section covers ONLY the `description` field (SEO meta for crawlers).

When writing the `description` field for a post, follow these mandatory rules:

#### Constraints & Requirements:

| Requirement | Details |
|--------------|---------|
| **Language** | MUST be written in Castilian Spanish (Spanish from Spain). NEVER write description in English or other languages. |
| **Length** | Keep between **140 and 155 characters** (including spaces). Do NOT exceed 160 characters. |
| **Keywords** | Naturally include the primary keyword near the beginning of the text. |
| **Tone** | Use an engaging, professional, and action-oriented tone. |
| **Structure** | Use 'Problem-Agitation-Solution' OR 'Benefit-driven' approach. |
| **CTA** | End with a strong Call to Action in Spanish: 'Lee más,' 'Aprende cómo,' 'Descubre los secretos,' or 'Empieza hoy.' |
| **Formatting** | Do NOT use double quotes (`"`) within the description to avoid HTML parsing errors. Use plain text only. |

#### Structure Templates:

**Problem-Agitation-Solution:**
```
[Primary keyword near start] + [Problem description] + [Agitation: why it matters] + [Solution: what reader will learn] + [CTA]
```

**Benefit-Driven:**
```
[Primary keyword near start] + [Main benefit/value proposition] + [How it helps reader] + [CTA]
```

#### Examples:

**Tutorial Post (Benefit-Driven):**
```yaml
description: "Aprende a usar los comandos pct y qm en Proxmox. Guía completa para gestionar contenedores LXC y máquinas virtuales mediante CLI. Descúbrelo aquí."
```
(146 characters)

**Opinion Post (Problem-Agitation-Solution):**
```yaml
description: "Por qué elegí Proxmox para mi Home Lab. Comparativa completa: Proxmox vs ESXi, Hyper-V y Docker standalone para encontrar la mejor solución. Lee más."
```
(149 characters)

**Finance Post (Benefit-Driven):**
```yaml
description: "Frugalismo vs minimalismo: diferencias reales. Aprende a vivir mejor gastando menos sin renunciar a lo que más importa. Descubre los secretos."
```
(142 characters)

#### YAML Formatting Note:
- In YAML frontmatter, use double quotes around the entire description: `description: "text here"`
- Do NOT use double quotes INSIDE the description text itself
- Use plain text only within the description.

#### Verification Checklist:
- [ ] **`description` length verified: 140-155 characters** — Run counter script
- [ ] **`title` length: 55–65 characters** — Run counter script
- [ ] Primary keyword appears near the beginning of `description`
- [ ] Tone is engaging, professional, action-oriented
- [ ] Structure follows Problem-Agitation-Solution OR Benefit-driven
- [ ] Ends with proper CTA in Spanish (Lee más/Aprende cómo/Descubre los secretos/Empieza hoy)
- [ ] NO double quotes (`"`) inside the description text
- [ ] YAML format uses double quotes: `description: "..."`
- [ ] `image_alt` field exists in frontmatter

### Keyword Identification
Before writing any content, first identify and list the most effective primary keyword based on the topic. Additionally, suggest 3-5 relevant LSI (Latent Semantic Indexing) keywords to be naturally integrated into the text.

### Target Keyword Density
Maintain a density between 0.5% and 1.5% for the primary keyword. Never use keyword stuffing.

### Strategic Placement
Ensure the primary keyword is placed in the H1, the first paragraph (within the first 100 words), at least one H2 or H3, and the conclusion.

### Semantic Integration
Use the identified LSI keywords and synonyms throughout the text to build topical authority naturally.

### Structure & Readability
Organize the content with clear headers (H1, H2, H3) and bullet points. Always prioritize human readability and flow over mechanical keyword insertion.

## 3. Tag Management (Tags) and Relational Thinking
- **Quantity:** Between 3 and 8 tags per post.
- **Anti-Canibalization Rule:** PROHIBITED from using the product name, app, or main topic that gives the post title as a tag.
- **Semantic Expansion:** The AI must reason related tags through the technical ecosystem:
  - **Adjacent Technologies:** If the post is about a framework, suggest the base language or its environment (e.g.: for `Next.js`, use `react` or `vercel`).
  - **Technical Abstraction:** Identify the upper category (e.g.: for `PostgreSQL`, use `databases` or `sql`).
  - **Use Cases:** Relate to the benefit (e.g.: `performance`, `automation`, `security`).
- **Logic:** 1-2 Core Tech (base technology), 2-3 Professional Context (role/sector), 1 Intent (post purpose).
- **Format:** Lowercase, no spaces (use hyphens), avoid repeating the post title.
- **YAML:** `tags: [tag1, tag2, tag3]`.

## 4. Image Optimization (Visual SEO)
- **ALT Attributes:** Technical and descriptive (e.g.: `alt="Terminal with Node.js error output"`). Mandatory for accessibility and image indexing.
- **image_alt in Frontmatter:** Every post MUST have the `image_alt` field in frontmatter with a descriptive alt text for the header image. This is mandatory for SEO and accessibility.

## 5. Link and Domain Policy
To maximize "Link Juice" and security, the AI must identify the link destination:

### A. Own Domains (Whitelist - Dofollow)
Do NOT apply `nofollow` or `noopener` to the following domains:
- `marcosramirez.info`
- `marcosramirez.dev`
- `saasquatch.es`

### B. External Links (Security)
Any domain NOT included in the above list must be treated as external.

### C. Affiliate Link Detection
The AI must identify affiliate/referral links and mark them with `rel="sponsored"`.

**Common affiliate URL patterns:**
| Platform | Look for |
|----------|----------|
| Amazon | `amazon.com`, `amazon.es`, `amzn.to`, `/dp/`, `?tag=`, `?ref=` |
| Alibaba Group | `alibaba.com`, `aliexpress.com`, `aliexpress.*` |
| eBay | `ebay.com`, `ebay.*`, `/ref=`, `?affiliate` |
| Generic | `?aff=`, `?partner=`, `?campaign=`, `/ref=` (in any URL) |

**Rule:** If a link matches ANY affiliate pattern:
1. Add `rel="sponsored nofollow noopener"` to the link
2. Use Kramdown format: `{:target="_blank" rel="sponsored nofollow noopener"}`
3. Do NOT add colon (`:`) before `rel`

**Examples:**
```markdown
# Amazon product page
[Product](https://amazon.com/dp/B08XXXXXX){:target="_blank" rel="sponsored nofollow noopener"}

# Amazon short link
[Product](https://amzn.to/4tOaPqs){:target="_blank" rel="sponsored nofollow noopener"}

# Generic affiliate parameter
[Service](https://example.com/?ref=user123){:target="_blank" rel="sponsored nofollow noopener"}
```

## 6. Jekyll Format (Chirpy Theme)
- **External Links:** Use `[Text](url){:target="_blank" rel="nofollow noopener"}` (no colon before rel).
- **Affiliate Links:** Use `[Text](url){:target="_blank" rel="sponsored nofollow noopener"}` (see Affiliate Link Detection section).
- **Own Links (Whitelist):** Use `[Text](url){:target="_blank"}` (without rel) to maintain authority.
- **H1:** Don't repeat in the Markdown body (Chirpy generates it automatically).

## 7. Excerpt and Interlinking
- **Excerpt:** See **copywriting skill** for rules (20-30% of post length, paragraph format, double quotes).
- **⚠️ Excerpt does NOT support links** — CTA for lead capture must go ONLY in the article body, not in excerpt.
- **Interlinking:** Suggest internal links to Whitelist domains to improve user navigation.

## 8. URL Structure (Slugs)
- **Length:** Between 3 and 5 keywords.
- **Cleanup:** Remove "stop words" (articles, prepositions, conjunctions, possessives).
- **Smart Selection:** Prioritize the words that best describe the content:
  - Main product or service
  - Key action or benefit
  - SEO keyword
- **Format:** Always lowercase, words separated only by hyphens (`-`).
- **Semantics:** Must be descriptive of the post's technical content without special characters or accents.
- **Example:** "AdGuard Home: Your own advertisement blocker and DNS" → `adguard-home-publicidad` (not `adguard-home-bloqueador` because "publicidad" is the searched keyword)

## 9. Rule for Slugs (Existing vs. New Posts)

**State discrimination:**

| Post State | Action on Slug |
|-----------|--------------|
| **New post (unpublished)** | Generate 3-5 word slug from title |
| **Already published** | DO NOT modify existing slug (maintain current URL) |

**Rational:**
- Existing posts are already indexed in search engines
- Changing their URL would cause 404 errors and ranking loss
- Only new posts can have shortened slugs

**SEO Verification:**

- When analyzing a post, verify the number of words in the slug (separated by hyphens)
- **Only warn** if:
  - The post is new (doesn't exist in repository or is in `_drafts/`)
  - The slug has more than 5 words
- **Don't warn** if the post is already published (current slug must be maintained)