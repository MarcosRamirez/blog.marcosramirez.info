# Skill: sponsors

## Referral Links - User Provided

This skill manages the user's affiliate/referral links. ALWAYS use these links when mentioning the corresponding products/services in posts.

### Warp

**Referral URL**: `https://app.warp.dev/referral/PNMP8M`

**Domains**: warp.dev, warp.com

**Rule**: When mentioning Warp terminal, ALWAYS use the referral URL instead of the official website.

**Format**:
```markdown
[Warp](https://app.warp.dev/referral/PNMP8M){:target="_blank" rel="sponsored nofollow noopener"}
```

---

### Amazon

**Affiliate Tag**: `marcosramir0f-21`

**Domains**: amazon.es, amazon.com, amazon.mx, amazon.co.uk, amazon.de, amazon.fr, amazon.it, amazon.co.jp, amazon.com.br, amazon.ca, amazon.in, amazon.com.au, amazon.sa, amazon.com.tr, amazon.nl, amazon.se, amazon.pl

**Rule**: When mentioning any Amazon product or linking to Amazon, ALWAYS add the affiliate tag.

### How to format Amazon links

1. **Product links** (with ASIN):
   ```
   https://amazon.es/dp/ASIN?tag=marcosramir0f-21
   ```

2. **Search links**:
   ```
   https://amazon.es?tag=marcosramir0f-21&keyword=product+name
   ```

3. **Short links from SiteStripe**: If using amzn.to short links generated from Amazon Associates SiteStripe, they already include the tag - no need to modify.

4. **External links without tag**: If you find an Amazon link without your tag, add `?tag=marcosramir0f-21` before any other query parameters.

**Format**:
```markdown
[Product Name](https://amazon.es/dp/B08XXXXXX?tag=marcosramir0f-21){:target="_blank" rel="sponsored nofollow noopener"}
```

---

## General Rules

1. **Affiliate Disclosure**: Any post containing affiliate/referral links MUST include the disclosure at the end of the post body (before the closing):
   ```markdown
   *Este artículo contiene enlaces de afiliado.*
   ```

2. **rel="sponsored"**: Always add `rel="sponsored nofollow noopener"` to any affiliate link.

3. **Detection**: When writing about products, check this skill first to see if there's a referral link available.

4. **Priority**: User-provided referral links always take priority over official URLs.

---

## Adding New Sponsors

To add a new sponsor/referral link:

1. Add the sponsor details to this skill file
2. Include: name, referral URL or affiliate tag, domains, format examples
3. Update the skill by running it again when needed

---

## Quick Reference

| Product | Referral URL / Tag | Format |
|---------|-------------------|--------|
| Warp | `https://app.warp.dev/referral/PNMP8M` | Direct link |
| Amazon | `tag=marcosramir0f-21` | `?tag=marcosramir0f-21` |