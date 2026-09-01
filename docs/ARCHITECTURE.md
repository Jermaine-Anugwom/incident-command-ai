# Architecture

```text
Synthetic ServiceNow PDI
  incident / change_request / cmdb_ci / work notes
                 │ least-privilege Scripted REST
                 ▼
FastAPI integration boundary
  typed client → input quarantine → deterministic planner
                 │ structured evidence-bound plan
                 ▼
Next.js command board
  Signals → Impact → Recovery → Guarded action gate
                 │ exact fingerprint approval
                 ▼
ServiceNow scoped app
  approval → Flow Designer action → immutable trace → rollback
```

## Trust boundaries

1. Incident descriptions, notes, attachments, API responses, and model output are untrusted data.
2. The planner may recommend only operations from a fixed action vocabulary.
3. The browser companion cannot directly write to ServiceNow.
4. The ServiceNow scoped app rechecks role, approval, fingerprint, target, and idempotency.
5. Execution traces are append-only from the application path.

## Offline mode

The default deterministic planner consumes the same typed context contract as an optional model adapter. It makes the complete repository runnable without credentials and preserves a stable evaluation oracle.
