---
description: Prevent secrets from being committed or exposed in the repository
---

# Secret Restrictions

- **Never commit raw secrets** (API keys, tokens, passwords, credentials, connection strings) to any file in this repository.
- All secrets must be managed via **ExternalSecret** resources backed by AWS Secrets Manager.
- If you encounter a hardcoded secret in a values file, template, or any other file, **flag it immediately** to the user and suggest migrating it to an ExternalSecret.
- Do not echo, log, or print secret values in shell commands or tool output.
- Files that commonly contain secrets (`.env`, `credentials.json`, `*.pem`, `*.key`) must never be staged or committed — warn the user if they attempt to do so.
- When adding new configuration that requires a secret, always use the ExternalSecret + ClusterSecretStore pattern already established in this repo.
