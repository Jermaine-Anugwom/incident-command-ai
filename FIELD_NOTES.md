# Field notes

## Discovery questions

- Which incident decisions currently rely on copying data between tools?
- Which ServiceNow records are authoritative for each decision?
- Where do responders lose time verifying whether a recent change is related?
- Which actions are reversible, and who may authorize them?
- What must remain visible during a degraded integration or model outage?
- Which metrics indicate recovery rather than merely activity?

## Working constraints

- The operator owns the decision; the model does not gain authority from a prompt.
- Existing ServiceNow roles and ACLs remain authoritative.
- The demo uses synthetic records and a deterministic planner by default.
- Recommendations must survive without a live model provider.
- Every write needs approval, fingerprint continuity, role authorization, and idempotency.

## Tradeoffs

- A narrow action vocabulary is less flexible than arbitrary tool use, but easier to review and transfer.
- Requiring three authoritative records can delay planning, but makes unsupported certainty visible.
- Static GitHub Pages proves the workflow and interaction without pretending a PDI is permanent hosting.

## Success measures

- Unsupported evidence citations: 0.
- Unauthorized writes: 0.
- Duplicate task creation under retry: 0.
- Time from evidence lock to approved response plan.
- Operator override, rejection, and abstention rates.
- Time to restore the affected synthetic service.

## Handoff

- Review table dictionary, ACLs, integration-user roles, and data retention with the customer team.
- Replace synthetic fixtures only after a field-level data-classification review.
- Run ATF, API contract, evaluation, and rollback tests in the target sub-production instance.
- Document on-call ownership, kill switch, trace retention, and rollback escalation.
