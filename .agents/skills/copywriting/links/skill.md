---
name: copywriting-links
description: Complete rules for inserting links in blog posts.
compatibility: Designed for Claude Code
metadata:
  author: marcos-ramirez
  version: "1.0"
---

## Skill: Links in Posts

### 1. Main Rule
**EVERY software, service, tool, or brand you mention MUST have a link** to its official website.

### 2. Whitelist of Own Domains (NO nofollow or noopener required)
The following domains are own and only need `target="_blank"`:
- `marcosramirez.info`
- `marcosramirez.dev`
- `saasquatch.es`

**Format for own links:** `[Text](URL){:target="_blank"}`

### 3. External Links (Require security)
Any domain NOT in the above whitelist is external.

**Format:** `[Text](URL){:target="_blank" rel="nofollow noopener"}`

This is mandatory for security and to avoid passing "link juice" to external sites.

### 4. When to Put Links
- **The first time you mention** something, it must have a link.
- Subsequent mentions don't need one.
- Correct example: "I use [AdGuard Home](https://adguard.com/){:target="_blank" rel="nofollow noopener"} to block ads"

### 5. Internal Links (Between Blog Posts)
- If the post body mentions a topic already covered in another blog post, link to it.
- Use the Jekyll native tag: `{% post_url YYYY/YYYY-MM-DD-slug %}`
- **All links (internal and external) must have** `{:target="_blank"}`
- The filename must use hyphens instead of spaces and always include the year subfolder:
  - ✅ `{% post_url 2025/2025-03-01-resumen-febrero-2025 %}`
  - ❌ `{% post_url 2025-03-01-Resumen Febrero 2025 %}` (missing year folder, has spaces)
- If you can't find a post that fits clearly, don't invent the link.

### 6. Format Summary

| Link Type | Format |
|-----------|--------|
| Own domain | `[Text](URL){:target="_blank"}` |
| External domain | `[Text](URL){:target="_blank" rel="nofollow noopener"}` |
| Affiliate link | `[Text](URL){:target="_blank" rel="sponsored nofollow noopener"}` |
| Internal link (Jekyll) | `[Text]({% post_url YYYY/YYYY-MM-DD-slug %}){:target="_blank"}` |

### 7. Affiliate Links
Any link that includes affiliate/referral parameters must use `rel="sponsored"`.

**Common affiliate patterns:**
- Amazon: `amazon.com`, `amazon.es`, `amzn.to`, `/dp/`, `?tag=`
- Generic: `?aff=`, `?partner=`, `?ref=` (in any non-own domain URL)

**Format:** `[Text](URL){:target="_blank" rel="sponsored nofollow noopener"}`

```markdown
[Product](https://amzn.to/4tOaPqs){:target="_blank" rel="sponsored nofollow noopener"}
```

### 8. Examples

**Correct - External link:**
```markdown
[btop](https://github.com/aristocratos/btop){:target="_blank" rel="nofollow noopener"} is a modern system monitor.
```

**Correct - Link to own domain:**
```markdown
Check out [my post about Home Assistant]({% post_url 2026/2026-06-01-home-assistant-guia-domotica %}){:target="_blank"} for more details.
```

**Correct - Internal link:**
```markdown
[Previous post]({% post_url 2025/2025-03-01-resumen-febrero-2025 %}){:target="_blank"}
```

### 9. SEO Rules
- External links must have `rel="nofollow noopener"` for security and to avoid losing authority.
- Internal links help SEO and user navigation.
- Own links should NOT have nofollow or noopener - they're from the same site.
- Don't overuse external links - only link when relevant and adds value.