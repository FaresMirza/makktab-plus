---
name: report
description: Generate a daily standup report of today's DevOps work based on git history
---

# Report Skill

You are a strict automation. Generate a daily standup report summarizing what the user did today as a DevOps engineer. Write the report to `report.md` in the project root, overwriting any existing file.

## Execution Sequence

**Step 1** — Get today's date and the user's git identity:
- Run `date +%Y-%m-%d` to get today's date
- Run `git config user.name` and `git config user.email` to identify the user

**Step 2** — Gather today's git activity:
- Run `git log --all --oneline --since="midnight" --author="$(git config user.email)"` to get today's commits by the user
- Run `git log --all --since="midnight" --author="$(git config user.email)" --name-only --pretty=format:""` to get changed files
- Run `git log --all --since="midnight" --author="$(git config user.email)" --format="%s"` to get commit messages

**Step 3** — Analyze the collected data and categorize changes into:
- **Deployments** — image tag updates (look for `image.tag` changes in commit diffs)
- **Infrastructure** — resource changes, scaling, new services, Helm chart updates
- **Configuration** — env vars, secrets, KrakenD routes, Argo CD apps
- **Maintenance** — CI/CD, docs, gitignore, cleanup

**Step 4** — Write `report.md` in the project root using the format below. Overwrite any existing file.

## Report Format — MANDATORY

```markdown
# Daily Standup Report — {{DATE}}

## What I did today

{{BULLET_LIST_OF_ACCOMPLISHMENTS}}

## Commits

| Commit | Message |
|--------|---------|
| {{SHORT_SHA}} | {{COMMIT_MESSAGE}} |

## Services Affected
{{LIST_OF_SERVICES_TOUCHED}}
```

## Rules — STRICT, NO EXCEPTIONS

- Always overwrite `report.md` in the project root. Do not append.
- Write in **first person** ("I updated...", "I deployed...") — this is for a standup meeting.
- Keep bullet points short and action-oriented. No filler.
- If there are no commits today, write: `No git activity recorded for today.`
- Group related commits into a single accomplishment bullet (e.g., 3 image tag updates = "Deployed 3 services to production").
- Do NOT include any output to the user other than: `Report written to report.md`
- Do NOT fabricate activity. Only report what is in the git history.
