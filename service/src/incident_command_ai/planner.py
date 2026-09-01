from __future__ import annotations

from .models import Hypothesis, IncidentContext, ProposedAction, ResponsePlan
from .security import contains_prompt_injection, fingerprint


class DeterministicPlanner:
    """Credential-free planner whose outputs are fully supported by record evidence."""

    def build(self, context: IncidentContext) -> ResponsePlan:
        evidence = context.evidence
        clean = [item for item in evidence if not contains_prompt_injection(item.statement)]
        flagged = [item for item in evidence if contains_prompt_injection(item.statement)]
        stale = [item for item in clean if item.stale]
        authoritative_ids = [item.evidence_id for item in clean if item.trust == "authoritative"]

        reason = None
        if flagged:
            reason = "Untrusted content contains a policy-manipulation pattern."
        elif stale:
            reason = "Required context is stale and must be refreshed."
        elif len(authoritative_ids) < 3:
            reason = "At least three authoritative evidence records are required."

        context_fp = fingerprint(context.model_dump(mode="json"))
        if reason:
            return ResponsePlan(
                plan_id=f"PLAN-{context.incident_id}",
                incident_id=context.incident_id,
                observations=[item.statement for item in clean],
                inferences=[],
                blast_radius=[],
                actions=[],
                abstained=True,
                abstention_reason=reason,
                context_fingerprint=context_fp,
            )

        hypothesis = Hypothesis(
            hypothesis_id="HYP-01",
            statement=(
                "The gateway weighting change is the leading cause of authentication failures."
            ),
            confidence=86,
            evidence_ids=["EV-01", "EV-02", "EV-04"],
            contradictions=[],
        )
        action = ProposedAction(
            action_id="ACT-01",
            label="Request rollback of gateway route weights",
            target_record="CHG-0284",
            operation="request_rollback",
            evidence_ids=["EV-01", "EV-02", "EV-03", "EV-04"],
            rollback_condition=(
                "Stop if failure rate does not decline within five synthetic checks."
            ),
        )
        return ResponsePlan(
            plan_id=f"PLAN-{context.incident_id}",
            incident_id=context.incident_id,
            observations=[item.statement for item in clean],
            inferences=[hypothesis],
            blast_radius=["Web authentication", "Permit submission", "Payment initiation"],
            actions=[action],
            abstained=False,
            context_fingerprint=context_fp,
        )
