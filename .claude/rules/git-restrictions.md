---
description: Restrict git mutation commands to the /action skill only
---

# Git Restrictions

- **Never run git mutation commands** (`git pull`, `git checkout`, `git add`, `git commit`, `git push`, `git branch`, `git merge`, `git rebase`, `git reset`, `git stash`) unless the `/action` or `/report` skill has been invoked.
- Read-only git commands (`git status`, `git diff`, `git log`, `git show`, `git branch --list`) are always allowed.
- If the user asks to commit, push, or create a branch outside of `/action` or `/report`, remind them to use `/action` instead.
