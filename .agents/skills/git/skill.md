---
name: git
description: Write commit messages following Conventional Commits with Gitmojis. Always use this when you're about to make a commit.
---

## Skill: Commit Message Generation (Direct Style)

### ⚠️ MANDATORY RULES
- **ALWAYS** use Conventional Commits
- **ALWAYS** include emoji at the start of the message
- **NEVER** push unless I explicitly indicate so
- **NEVER** commit without first reviewing with `git diff`
- **ALWAYS** use this EXACT format: `<type>(<scope>): <emoji> <summary>`
- **NEVER** use another commit format
- **NEVER** make a commit for every relevant change in the code (batch related changes)
- **NEVER** do `git push` on a WIP (work in progress)

### WIP (Work in Progress)
- A **WIP** is a work-in-progress commit to save intermediate changes that aren't ready to publish.
- **RULE: NEVER do `git push` on a WIP.**
- Use type `wip` for WIP commits: `wip(<scope>): 🛠️ <summary>`
- A WIP is only for local saving
- Push is only done when explicitly indicated by the user
- If a push is needed on a WIP, the commit message must clearly indicate it's a WIP

### Profile
You are a Git expert that writes commit messages following the **Conventional Commits** convention with **Gitmojis**, adapted to a descriptive tone in English.

### Message Structure
The format must be: `<type>(<scope>): <emoji> <summary>`

### Mapping Rules and Style
- `fix`: 🐛 (Bug fixes, errors, minor changes)
- `docs`: 📝 (Documentation or agent skills changes)
- `feat`: ✨ (New functionality)
- `style`: 🎨 (Style or UI changes)
- `refactor`: ♻️ (Code refactoring)
- `content`: ✍️ **(Only for blog posts - use the post title as summary)**
- `ui`: 🎯 (UI changes)
- `wip`: 🛠️ (Work in progress - do NOT push)

**IMPORTANT:** The emoji GOES AFTER THE COLONS, before the summary. Example: `fix(ui): 🎯 Moved share`

### Golden Rules
1. **Language:** Always in **English**.
2. **Tone:** Use **past participle** (NOT infinitive): "Fixed" (NOT "Fix"), "Added" (NOT "Add"), "Updated" (NOT "Update").
3. **Blog Posts:** For type `content`, don't invent a description, use the main title of the article being edited or created.
4. **Length:** Keep the summary under 50 characters.

### Output Examples
`fix(blog): 🐛 Fixed post_url in Lucía's post`
`feat(api): ✨ Added user endpoint`
`content(blog): ✍️ My experience migrating to Antigravity`
`fix(ui): 🐛 Fixed margin in the footer`
`wip(agents): 🛠️ Partially completed translation task`

### Push Rules

**FUNDAMENTAL RULE**
**NEVER** execute `git push` automatically.
Push is only performed when explicitly indicated by the user (e.g., "Push to `main`").

**RECOMMENDED STEPS WHEN PUSH IS REQUESTED**
1. Verify status with `git status`.
2. Confirm all changes are committed.
3. Execute `git push <remote> <branch>` as requested by the user.
4. If an error occurs, inform the user and request new instruction.

**ADDITIONAL NOTES**
- If push fails, do not retry without permission.
- Do not combine `push` with `commit` in the same instruction unless the user explicitly authorizes it.