from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class EvaluationCase:
    case_id: str
    condition: str
    expected: str


def build_cases() -> list[EvaluationCase]:
    cases: list[EvaluationCase] = []
    conditions = [
        ("healthy_authoritative_context", "plan"),
        ("prompt_injection_in_note", "abstain"),
        ("stale_change", "abstain"),
        ("missing_cmdb_dependency", "abstain"),
        ("contradictory_operator_note", "review"),
        ("duplicate_execution_key", "deduplicate"),
    ]
    for index in range(25):
        for condition, expected in conditions:
            cases.append(EvaluationCase(f"EVAL-{index:02d}-{condition}", condition, expected))
    return cases
