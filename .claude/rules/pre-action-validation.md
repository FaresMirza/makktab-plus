---
description: Validate files for typos and missing fields before running the /action skill
---

# Pre-Action Validation

Before executing the `/action` skill, always perform the following checks on all changed files:

- **YAML syntax** — Validate that all modified YAML files are well-formed (no indentation errors, unclosed quotes, or missing colons).
- **Typos** — Scan changed lines for obvious typos in key names, image tags, and values (e.g. misspelled field names like `replcias` instead of `replicas`).
- **Missing required fields** — Verify that critical fields are not accidentally left empty or removed (e.g. `image.tag`, `image.repository`, `replicaCount`, `service.port`).
- **Incomplete edits** — Check for placeholder text, partial values, or orphaned single characters that suggest an unfinished edit.
- **Consistency** — If the same field exists in both `values-staging.yaml` and `values-prod.yaml`, ensure the change is intentional and not a copy-paste error across environments.

If any issue is found, **stop and report it to the user** before proceeding with the action.
