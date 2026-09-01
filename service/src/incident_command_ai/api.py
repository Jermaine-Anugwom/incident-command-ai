from __future__ import annotations

from fastapi import FastAPI, HTTPException

from .fixtures import demo_context
from .models import Approval, ApprovalRequest, ExecuteRequest, ExecutionEvent, PlanRequest
from .planner import DeterministicPlanner
from .repository import Repository
from .security import fingerprint, require_role

app = FastAPI(title="Incident Command AI", version="0.1.0")
repository = Repository()
repository.contexts["INC-1047"] = demo_context()
planner = DeterministicPlanner()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "healthy", "mode": "deterministic-offline"}


@app.get("/api/v1/incidents/{incident_id}/context")
def get_context(incident_id: str):
    context = repository.contexts.get(incident_id)
    if not context:
        raise HTTPException(404, "Synthetic incident not found")
    return context


@app.post("/api/v1/plans")
def create_plan(request: PlanRequest):
    context = repository.contexts.get(request.incident_id)
    if not context:
        raise HTTPException(404, "Synthetic incident not found")
    plan = planner.build(context)
    repository.plans[plan.plan_id] = plan
    return plan


@app.post("/api/v1/plans/{plan_id}/approve")
def approve_plan(plan_id: str, request: ApprovalRequest):
    plan = repository.plans.get(plan_id)
    if not plan:
        raise HTTPException(404, "Plan not found")
    if plan.abstained:
        raise HTTPException(409, "An abstained plan cannot be approved")
    try:
        require_role(request.role, "incident_commander")
    except PermissionError as error:
        raise HTTPException(403, str(error)) from error
    plan_fp = fingerprint(plan.model_dump(mode="json"))
    if request.plan_fingerprint != plan_fp:
        raise HTTPException(409, "Plan fingerprint changed; review the current plan")
    approval = Approval(
        approval_id=f"APR-{plan_id}",
        plan_id=plan_id,
        approver=request.approver,
        approver_role="incident_commander",
        plan_fingerprint=plan_fp,
    )
    repository.approvals[approval.approval_id] = approval
    return approval


@app.post("/api/v1/plans/{plan_id}/execute")
def execute_plan(plan_id: str, request: ExecuteRequest):
    plan = repository.plans.get(plan_id)
    approval = repository.approvals.get(request.approval_id)
    if not plan or not approval or approval.plan_id != plan_id:
        raise HTTPException(409, "A valid approval is required")
    try:
        require_role(request.role, "executor")
    except PermissionError as error:
        raise HTTPException(403, str(error)) from error
    if request.idempotency_key in repository.idempotency_keys:
        return repository.traces[plan_id][-1]
    repository.idempotency_keys.add(request.idempotency_key)
    event = ExecutionEvent(
        event_id=f"EXEC-{plan_id}",
        plan_id=plan_id,
        actor=request.actor,
        input_fingerprint=fingerprint({"plan": plan_id, "key": request.idempotency_key}),
        result="executed",
        detail="Synthetic rollback task created in the offline transport.",
    )
    repository.traces.setdefault(plan_id, []).append(event)
    return event


@app.get("/api/v1/plans/{plan_id}/trace")
def get_trace(plan_id: str):
    return repository.traces.get(plan_id, [])
