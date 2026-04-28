---
name: SEO
description: Skill specialized in optimizing technology and software posts under E-E-A-T standards. Analyzes heading hierarchy, improves on-page SEO, and ensures the author's technical authority as a Software Engineer.
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
- **Metadata (Limits):**
  - **Title Tag:** Maximum 60 characters (prioritize keyword at the start).
  - **Meta Description:** Between 120 and 155 characters (technical/commercial hook).
- **H1:** Unique title defined in Front Matter. Don't repeat in the body.
- **H2/H3 with Long-tail:** Subtitles that answer real searches (e.g.: "How to configure X in Y?").
- **Comparative Tables:** Mandatory when mentioning tools to compare Price, Functions, and Dev-Experience.
- **FAQ Section:** 3-4 questions to capture featured snippets.

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

## 6. Jekyll Format (Chirpy Theme)
- **External Links:** Use `[Text](url){:target="_blank" rel="nofollow noopener"}` (no colon before rel).
- **Own Links (Whitelist):** Use `[Text](url){:target="_blank"}` (without rel) to maintain authority.
- **H1:** Don't repeat in the Markdown body (Chirpy generates it automatically).

## 7. Excerpt and Interlinking
- **Excerpt:** Technical hook of ~150 characters for the main feed (maximum 160 to avoid truncation).
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