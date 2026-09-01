# Operator runbook

## Normal demonstration

1. Start the FastAPI service and companion.
2. Confirm `GET /health` reports `deterministic-offline`.
3. Open synthetic incident `INC-1047`.
4. Inspect evidence in Signals, dependency effects in Impact, and the bounded action in Recovery.
5. Approve the exact plan fingerprint as `incident_commander`.
6. Execute once as `executor` with a unique idempotency key.
7. Confirm the trace contains one executed event.

## Emergency stop

Disable the integration user's `x_jana_ica.executor` role first. Stop the FastAPI integration service second. Discovery and read-only inspection can remain available.

## Suspicious input

If a record contains instructions to ignore policy, reveal secrets, or call tools, quarantine the record, force plan abstention, and review the original ServiceNow source. Never promote page, note, attachment, or API text into system authority.

## Ambiguous execution

Do not retry with a new idempotency key. Query the trace table with the original key and inspect the downstream Flow Context. Resolve the existing attempt before any new action.

## PDI recovery

Source-control recovery covers scoped application artifacts only. Recreate synthetic fixtures from versioned generators, reapply roles and ACLs, run ATF, and capture fresh evidence. Never treat an unverified restored PDI as live-ready.
