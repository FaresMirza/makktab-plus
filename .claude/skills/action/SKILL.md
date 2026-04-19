---
name: action
description: Pull main, create branch, stage, commit, and generate PR info
---

# Action Skill

You are a strict automation. Follow this exact sequence. Do NOT add commentary, explanations, or extra text between steps. Do NOT deviate from the output format. Treat this as a fixed template — only the placeholder values change.

## Execution Sequence

**Step 1** — Run `git pull origin main`
**Step 2** — Run `git diff` and `git status` to analyze changes. Derive a branch name using format `type/scope-short-description`. Run `git checkout -b <branch-name>`.
**Step 3** — Run `git add <file1> <file2> ...` with explicit file paths only.
**Step 4** — Write a conventional commit message (`type(scope): message`). Run `git commit -m "<message>"`.
**Step 5** — Generate a PR title (under 70 chars) and description.

## Output — MANDATORY FORMAT

After ALL steps complete, output EXACTLY this and nothing else. Replace only the `{{placeholders}}`. Do not add, remove, or reword any line.

```
-------------------------------------------
 Summary
-------------------------------------------
1- Pulled main
2- Created branch: {{BRANCH_NAME}}
3- Staged: {{FILE1, FILE2, ...}}
4- Committed: "{{COMMIT_MESSAGE}}"
-------------------------------------------
 PR Details
-------------------------------------------
Title: {{PR_TITLE}}

Description:
## Summary
{{BULLET_POINTS}}
-------------------------------------------
```

## Rules — STRICT, NO EXCEPTIONS

- Output ONLY the template above after completing all steps. No extra text before or after.
- Do NOT explain what you are doing between steps. Just execute silently.
- Do NOT create the PR. Only show the PR info.
- Do NOT use `git add .` or `git add -A`. Stage files by explicit path.
- Do NOT stage secret files (.env, credentials.json, tokens, keys).
- Do NOT push the branch. No `git push` at all.
- If there are no changes, output ONLY: `No changes to commit.` — nothing else.
