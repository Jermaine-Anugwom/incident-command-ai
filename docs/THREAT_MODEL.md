# Threat model

| Threat | Boundary | Control |
|---|---|---|
| Prompt injection in a work note | Intake | Pattern quarantine, authority isolation, abstention |
| Unsupported model claim | Planning | Evidence-ID validation; unknown IDs reject the plan |
| Stale approval after plan change | Approval | Exact plan fingerprint match |
| Unauthorized ServiceNow write | Execution | Scoped roles, ACLs, GlideRecordSecure, narrow action vocabulary |
| Duplicate task after retry | Execution | Required idempotency key and unique trace lookup |
| Secret disclosure to model | Integration | Local secret insertion; credentials excluded from prompt builder |
| Compromised public demo | Hosting | Static fixtures, no write endpoint, no credentials |
| PDI reclamation | Operations | Scoped-app source control and deterministic fixture restoration |

Out of scope: production incident response, autonomous remediation, production ServiceNow hosting, and model training on operator data.
