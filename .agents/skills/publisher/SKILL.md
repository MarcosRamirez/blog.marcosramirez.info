---
name: publisher
description: Manages blog post scheduling and draft publishing. Calculates next free publication date based on category rules (Home Lab on Friday, Personal on Sunday, everything else next free date). Load when publishing drafts or managing the publication calendar.
compatibility: Designed for Claude Code, requires Node.js
metadata:
  author: marcos-ramirez
  version: "1.0"
---

## When to load this skill

Load the publisher skill when:
- Publishing a draft from `_drafts/` to `_posts/`
- Calculating the next available publication date for a category
- The user asks about the publication schedule or calendar
- Moving a draft to `_posts/` with the correct date
- Updating the Home Lab series index in `home-lab-filosofia.md`

## Schedule rules

| Detection | Schedule |
|---|---|
| Draft has **Home Lab** subcategory | Next free **Friday** at 08:30:00 +0200 |
| Draft has **Personal** as main category | Next free **Sunday** at 08:30:00 +0200 |
| Everything else (any other category) | Next free **date** (any day) at 08:30:00 +0200 |

## How to use the script

The scheduling script is located at `.agents/skills/publisher/scripts/schedule.js`.

### Get next free date

```bash
node .agents/skills/publisher/scripts/schedule.js next home-lab
node .agents/skills/publisher/scripts/schedule.js next personal
node .agents/skills/publisher/scripts/schedule.js next general
```

Output is JSON with `date`, `formatted`, `type`, `day`, and `label` fields.

### Publish a draft (full workflow)

```bash
# Auto-calculate date from categories
node .agents/skills/publisher/scripts/schedule.js publish my-draft-slug

# Use a specific custom date
node .agents/skills/publisher/scripts/schedule.js publish my-draft-slug 2026-07-14
```

The script:
1. Reads the draft from `_drafts/`
2. Parses frontmatter to detect categories
3. Calculates the correct date (or uses the custom date if provided)
4. Updates the `date` field in frontmatter
5. Moves the file to `_posts/YYYY/YYYY-MM-DD-slug.md`
6. If category is **Home Lab**, automatically updates the series index in `home-lab-filosofia.md`
7. Returns JSON confirmation

### Custom dates

If the user specifies a date, **always use it**. Pass it as the second argument to the publish command. Custom dates override all category rules.

### Update Home Lab series index

The post `home-lab-filosofia.md` contains a series index listing published and future Home Lab posts. The script automatically updates this section:

```bash
# Manually update the series index
node .agents/skills/publisher/scripts/schedule.js update-series
```

When a draft with **Home Lab** category is published, the series index is **automatically updated** after the file is moved to `_posts/`.

The series section format:
- **Published posts:** `- DD de month de YYYY: [Title]({% post_url year/filename %})`
- **Future posts:** `- DD de month de YYYY: Title`
- Posts are sorted by date, ascending
- The `home-lab-filosofia.md` file itself is excluded from the list
- If no published posts exist, shows a placeholder message
- If no future posts exist, shows a placeholder message

## Category detection

The script reads the draft's frontmatter `categories` field:

- **Home Lab detection:** checks for `Home Lab`, `home-lab`, or `homelab` in subcategories
- **Personal detection:** checks for `Personal` as the first (main) category
- **Everything else:** falls through to `general` (next free date)

## Workflow for publishing a draft

1. **Identify the draft** in `_drafts/` (filename: `YYYY-MM-DD-slug.md`)
2. **Run the publish command** with the slug (without `.md`)
3. **Verify the JSON output** — check date, type, and target file
4. **If needed, review the moved file** to confirm frontmatter and content are correct
5. **Commit and push** only when the user explicitly asks

## Error handling

- **Draft not found:** script exits with error message
- **Invalid custom date:** script exits with error, expects `YYYY-MM-DD` format
- **Date collision:** script warns but proceeds if a post already exists on that date

## Integration with other skills

- **copywriting** skill delegates all date calculation and draft publishing to this skill
- **seo** skill runs on the post after publishing (frontmatter verification)
- **create-images** skill generates the header image before publishing
- **git** skill handles the commit message
- **Home Lab series index** (`home-lab-filosofia.md`): automatically updated when publishing Home Lab posts

See [references/rules.md](references/rules.md) for the complete schedule rules reference.
