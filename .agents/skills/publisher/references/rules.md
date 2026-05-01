# Publisher Schedule Rules

## Schedule by Category

| Main Category | Subcategory | Schedule |
|--------------|-------------|----------|
| Personal | (any) | Next free **Sunday** at 08:30:00 +0200 |
| (any) | Home Lab | Next free **Friday** at 08:30:00 +0200 |
| (any) | (none of above) | Next free **date** (any day) at 08:30:00 +0200 |

## Key Rules

1. **No `.proximafecha` file** — dates are calculated dynamically by scanning `_posts/` filenames. The source of truth is the actual published posts.
2. **Custom dates override everything** — if the user says "publish on 2026-07-14", that date is used regardless of category.
3. **One post per date** — the script skips dates that already have a post.
4. **08:30:00 +0200** — all posts use the same time and timezone offset.
5. **Filename must match date** — when publishing, the file is moved to `_posts/YYYY/YYYY-MM-DD-slug.md` where the date matches the frontmatter `date` field.

## Category Detection Logic

The script reads the draft's frontmatter `categories` field and applies these rules in order:

1. **Home Lab:** If `categories` contains "Home Lab", "home-lab", or "homelab" (case-insensitive) → Friday
2. **Personal:** If the first/main category is "Personal" → Sunday
3. **Everything else:** → Next free date (any day)

## Day Definitions

- **Friday:** The first Friday after today (or today if today is Friday) that has no post
- **Sunday:** The first Sunday after today (or today if today is Sunday) that has no post
- **Any day:** Tomorrow or the next day with no post (skips Saturdays, Sundays for general posts is not required — any day is valid)
