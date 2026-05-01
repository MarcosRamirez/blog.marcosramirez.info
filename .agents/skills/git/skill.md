---
name: git
description: Write commit messages following Conventional Commits with Gitmojis. Always use this when you're about to make a commit.
compatibility: Designed for Claude Code
allowed-tools: Bash(git:*) Bash(echo:*) Read
metadata:
  author: marcos-ramirez
  version: "1.0"
---

## Skill: Commit Message Generation (Direct Style)

### ⚠️ MANDATORY RULES
- **ALWAYS** use Conventional Commits
- **ALWAYS** include emoji at the start of the message
- **NEVER** push unless I explicitly indicate so
- **NEVER** commit without first reviewing with `git diff`
- **ALWAYS** use this EXACT format: `<type>(<scope>): <emoji> <summary>\n\n<body with change resume>`
- **NEVER** use another commit format
- **NEVER** make a commit for every relevant change in the code (batch related changes)
- **NEVER** do `git push` on a WIP (work in progress)
- **ALWAYS** include a commit body (separated from the summary line by an empty line) with a concise resume of all changes in the commit.

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
The format must be: `<type>(<scope>): <emoji> <summary>` followed by an empty line and the commit body.

Example structure:
```
<type>(<scope>): <emoji> <summary>

<body with change resume>
```

### Mapping Rules and Style
- `fix`: 🐛 (Bug fixes, errors, minor changes)
- `docs`: 📝 (Documentation or agent skills changes)
- `feat`: ✨ (New functionality)
- `style`: 🎨 (Style or UI changes)
- `refactor`: ♻️ (Code refactoring)
- `content`: ✍️ **(Only for blog posts - use the post title as summary)**
- `ui`: 🎯 (UI changes)
- `wip`: 🛠️ (Work in progress - do NOT push)

**IMPORTANT:** The emoji GOES AFTER THE COLONS, before the summary. Example: `fix(ui): 🎯 Move share`

### Golden Rules
1. **Language:** Always in **English**.
2. **Tone:** Use **imperative mood** (NOT past participle/infinitive): "Fix" (NOT "Fixed"/"Fixing"), "Add" (NOT "Added"/"Adding"), "Update" (NOT "Updated"/"Updating").
3. **Blog Posts:** For type `content`, don't invent a description, use the main title of the article being edited or created.
4. **Length:** Keep the summary under 50 characters.
5. **Single File Reference:** If only ONE file is modified, add the filename in parentheses right after the emoji. If MULTIPLE files are modified, do NOT include any filename.
6. **File in Body:** When a single file is modified, add the filename at the END of the commit body (after one empty line).

### Commit Body Rules
- **MANDATORY for ALL commits**: Include a body section separated by an empty line from the summary
- The body must summarize ALL changes made in the commit (in English, imperative mood)
- Single file: Add filename in summary line AND in body footer (existing rule)
- Multiple files: Body must cover changes across ALL modified files
- **Use bulleted points (-) for clarity when summarizing multiple changes**
- **For multiple files: Put the FULL FILENAME PATH before the changes description for each file**

### Golden Rules (continued)
7. **Body:** Always summarize all changes in English using imperative mood, preferably with bulleted points for readability.

### ❌ Common Mistakes (AIs Ignore These Rules)

**MISTAKE 1: Emoji in wrong position (BEFORE colon instead of AFTER)**
```markdown
# ❌ WRONG - emoji before colon
✨ docs: Update readme

# ✅ CORRECT - emoji after colon, before summary
docs: ✨ Update readme
```

**MISTAKE 2: Past tense instead of imperative mood**
```markdown
# ❌ WRONG - past tense ("Added")
content: ✍️ Added new post about Ansible

# ✅ CORRECT - imperative mood ("Add")
content: ✍️ Add new post about Ansible
```

**MISTAKE 3: Missing body section**
```markdown
# ❌ WRONG - no body
docs: ✨ Update readme

# ✅ CORRECT - body required with summary
docs: ✨ Update readme

- Added installation instructions
- Fixed broken links
```

**MISTAKE 4: Wrong scope format (parentheses around scope name)**
```markdown
# ❌ WRONG - parentheses around scope name
feat: ✨ (blog) Add new feature

# ✅ CORRECT - parentheses around scope VALUE only
feat(blog): ✨ Add new feature
```

**MISTAKE 5: Single file but no path in body footer**
```markdown
# ❌ WRONG - no path in body for single file
fix: 🐛 Fix typo

# ✅ CORRECT - path in body footer for single file
fix: 🐛 Fix typo

Fixed spelling error in _posts/2026/my-post.md
```

### Output Examples
Single file:
```
fix(blog): 🐛 Fix post_url in Lucía's post (_posts/2026/2026-04-18-lucia-asistente-open-claw.md)

Update the date reference to match the new filename.
(_posts/2026/2026-04-18-lucia-asistente-open-claw.md)
```

Multiple files:
```
docs(agents): 📝 Update SEO and copywriting skills
```

Multiple files with body (detailed resume):
```
docs(agents): 📝 Update SEO and copywriting skills

- _posts/2026/2026-04-28-dinero-efectivo-apagon-2025.md:
  - Fix broken RTVE link to Infobae source
  - Add Amazon affiliate links to caja fuerte and monedero RFID
  - Update CBDC link to Bank of Spain
- .agents/skills/SEO/skill.md:
  - Add rel=sponsored rule for Amazon links
  - Fix Kramdown format (remove colon before rel)
```

### Push Rules

**FUNDAMENTAL RULE**
**NEVER** execute `git push` automatically or without explicit user instruction.

**What counts as explicit push instruction:**
- User says "push", "gcp", "gcpo", "commit and push"
- User says "commit" followed by "push" in same message
- User explicitly names a branch to push to

**What does NOT count as explicit push instruction:**
- "commit", "gc" (commit only)
- Any variation that only mentions committing
- Silence or generic instructions

Push is only performed when explicitly indicated by the user.

**RECOMMENDED STEPS WHEN PUSH IS REQUESTED**
1. Verify status with `git status`.
2. Confirm all changes are committed.
3. Execute `git push <remote> <branch>` as requested by the user.
4. If an error occurs, inform the user and request new instruction.

**ADDITIONAL NOTES**
- If push fails, do not retry without permission.
- Do not combine `push` with `commit` in the same instruction unless the user explicitly authorizes it.