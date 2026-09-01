# Security policy

## Supported version

Only the latest tagged release is supported.

## Reporting

Do not open a public issue for a suspected credential exposure or security vulnerability. Use GitHub's private vulnerability reporting feature when enabled.

## Demonstration constraints

- Synthetic records only.
- No production ServiceNow instances.
- No credentials or session captures in source, screenshots, logs, issues, or releases.
- Model inputs are untrusted and never grant authority.
- Writes require a verified approval, current fingerprint, authorized role, and idempotency key.
- Prompt-injection fixtures are quarantined rather than executed.
