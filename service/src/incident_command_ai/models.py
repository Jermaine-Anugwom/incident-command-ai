from __future__ import annotations

from datetime import UTC, datetime
from enum import StrEnum
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class RecordKind(StrEnum):
    INCIDENT = "incident"
    CHANGE = "change_request"
    CONFIGURATION_ITEM = "cmdb_ci"
    WORK_NOTE = "work_note"


class EvidenceRecord(BaseModel):
    model_config = ConfigDict(frozen=True)

    evidence_id: str
    record_kind: RecordKind
    record_id: str
    observed_at: datetime
    statement: str
    source_field: str
    trust: Literal["authoritative", "operator", "untrusted"]
    stale: bool = False
    injection_flag: bool = False


class IncidentContext(BaseModel):
    incident_id: str
    severity: Literal["SEV-1", "SEV-2", "SEV-3"]
    service: str
    opened_at: datetime
    summary: str
    evidence: list[EvidenceRecord]


class Hypothesis(BaseModel):
    hypothesis_id: str
    statement: str
    confidence: int = Field(ge=0, le=100)
    evidence_ids: list[str]
    contradictions: list[str] = []


class ProposedAction(BaseModel):
    action_id: str
    label: str
    target_record: str
    operation: Literal["create_task", "append_note", "request_rollback"]
    evidence_ids: list[str]
    rollback_condition: str


class ResponsePlan(BaseModel):
    plan_id: str
    incident_id: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    observations: list[str]
    inferences: list[Hypothesis]
    blast_radius: list[str]
    actions: list[ProposedAction]
    abstained: bool
    abstention_reason: str | None = None
    context_fingerprint: str


class Approval(BaseModel):
    approval_id: str
    plan_id: str
    approver: str
    approver_role: Literal["incident_commander"]
    plan_fingerprint: str
    approved_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class ExecutionEvent(BaseModel):
    event_id: str
    plan_id: str
    actor: str
    occurred_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    input_fingerprint: str
    result: Literal["executed", "blocked", "duplicate", "rolled_back"]
    detail: str


class PlanRequest(BaseModel):
    incident_id: str


class ApprovalRequest(BaseModel):
    approver: str
    role: str
    plan_fingerprint: str


class ExecuteRequest(BaseModel):
    actor: str
    role: str
    approval_id: str
    idempotency_key: str
