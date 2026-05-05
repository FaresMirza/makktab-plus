---
name: refresh
description: Re-scan any repo and regenerate .claude/CLAUDE.md to match the current project
---

# Refresh CLAUDE.md

You are a strict automation. Follow this exact sequence. Do NOT add commentary or explanations between steps. Execute silently and output only the final confirmation.

## Execution Sequence

**Step 1 — Detect project type**

Run these commands to understand what kind of project this is:

- `ls` — list top-level files and directories
- `ls -d */ 2>/dev/null` — list top-level directories
- `cat README.md 2>/dev/null | head -50` — read project description if available
- `git remote -v 2>/dev/null` — get repo name and origin
- `git log --oneline -5 2>/dev/null` — recent commit patterns

Then detect the project type by checking for key files:

- Terraform: `*.tf`, `modules/`, `environments/`
- Kubernetes/GitOps: `Chart.yaml`, `kustomization.yaml`, `apps-of-apps/`, `argocd/`
- Node.js: `package.json`
- Python: `pyproject.toml`, `requirements.txt`, `setup.py`
- Go: `go.mod`
- Rust: `Cargo.toml`
- Java/Kotlin: `pom.xml`, `build.gradle`
- Docker: `Dockerfile`, `docker-compose.yaml`
- Monorepo: `nx.json`, `turbo.json`, `lerna.json`, `pnpm-workspace.yaml`

A project may match multiple types (e.g. Node.js + Docker + Terraform). Include all detected types.

**Step 2 — Deep scan based on detected type**

Run additional scans relevant to the detected project type. Examples:

For **Terraform**: list modules, providers, environments, backend config, variable files
For **Kubernetes/GitOps**: list charts, apps, namespaces, environments, overlays
For **Node.js**: read package.json scripts, dependencies, check for frameworks (Next.js, Express, etc.)
For **Python**: read pyproject.toml or setup.py, detect frameworks (Django, FastAPI, Flask, etc.)
For **Go**: read go.mod, list packages
For **Monorepo**: list workspaces/packages, shared configs

Scan whatever is relevant — adapt to the project. The goal is to understand:
- What the project does
- What tools and technologies it uses
- How files and directories are organized
- What naming conventions are used
- What environments exist (if any)
- What the common workflows are

**Step 3 — Read current CLAUDE.md (if exists)**

Read `.claude/CLAUDE.md` if it exists. Note any custom sections or project-specific content worth preserving.

**Step 4 — Generate CLAUDE.md**

Write `.claude/CLAUDE.md` with these sections (adapt content to the project type):

1. **Header** — Project name and one-line description
2. **Technology Stack** — Table of all tools, frameworks, and services detected
3. **Repository Structure** — Annotated directory tree of key folders (not every file)
4. **Key Components** — Main modules, services, apps, or packages (grouped logically)
5. **Environments** — If applicable: env names, how they differ, how to target them
6. **Conventions** — Naming patterns, file organization, config patterns observed
7. **Common Workflows** — How to build, test, deploy, or make typical changes
8. **Commands** — Quick reference for daily use (build, test, lint, deploy, skills like `/action`)

Rules for content:
- Keep it under 200 lines
- Only include what actually exists in the repo — do not guess or assume
- Use markdown tables, code blocks, and headers for readability
- Be specific and concrete — include actual directory names, actual commands, actual file patterns
- Do NOT include generic advice — everything should be derived from the scan

**Step 5 — Verify**

Run `wc -l .claude/CLAUDE.md` to confirm line count is under 200.

## Output — MANDATORY FORMAT

After ALL steps complete, output EXACTLY this and nothing else:

```
-------------------------------------------
 CLAUDE.md Refreshed
-------------------------------------------
 Project: {{PROJECT_NAME}}
 Type: {{DETECTED_TYPES}}
 Lines: {{LINE_COUNT}}
 Key dirs: {{TOP_LEVEL_DIR_COUNT}}
-------------------------------------------
```

## Rules — STRICT, NO EXCEPTIONS

- Output ONLY the template above after completing all steps. No extra text before or after.
- Do NOT explain what you are doing between steps. Just execute silently.
- Do NOT exceed 200 lines in the generated CLAUDE.md.
- Do NOT include files, directories, or components that do not exist in the repo.
- Do NOT run any git mutation commands (commit, push, add, etc.).
- Do NOT make up information — only document what the scan reveals.
