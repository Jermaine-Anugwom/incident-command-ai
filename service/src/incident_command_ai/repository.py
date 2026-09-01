from __future__ import annotations

from dataclasses import dataclass, field

from .models import Approval, ExecutionEvent, IncidentContext, ResponsePlan


@dataclass
class Repository:
    contexts: dict[str, IncidentContext] = field(default_factory=dict)
    plans: dict[str, ResponsePlan] = field(default_factory=dict)
    approvals: dict[str, Approval] = field(default_factory=dict)
    traces: dict[str, list[ExecutionEvent]] = field(default_factory=dict)
    idempotency_keys: set[str] = field(default_factory=set)
