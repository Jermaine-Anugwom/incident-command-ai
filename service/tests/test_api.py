from fastapi.testclient import TestClient
from incident_command_ai.api import app
from incident_command_ai.security import fingerprint

client = TestClient(app)


def make_plan():
    response = client.post("/api/v1/plans", json={"incident_id": "INC-1047"})
    assert response.status_code == 200
    return response.json()


def test_health():
    assert client.get("/health").json()["mode"] == "deterministic-offline"


def test_missing_incident_is_404():
    assert client.get("/api/v1/incidents/INC-MISSING/context").status_code == 404


def test_approval_requires_commander_role():
    plan = make_plan()
    response = client.post(
        f"/api/v1/plans/{plan['plan_id']}/approve",
        json={"approver": "operator", "role": "viewer", "plan_fingerprint": fingerprint(plan)},
    )
    assert response.status_code == 403


def test_approval_rejects_stale_fingerprint():
    plan = make_plan()
    response = client.post(
        f"/api/v1/plans/{plan['plan_id']}/approve",
        json={"approver": "commander", "role": "incident_commander", "plan_fingerprint": "stale"},
    )
    assert response.status_code == 409


def test_execute_requires_valid_approval():
    plan = make_plan()
    response = client.post(
        f"/api/v1/plans/{plan['plan_id']}/execute",
        json={
            "actor": "executor",
            "role": "executor",
            "approval_id": "missing",
            "idempotency_key": "k1",
        },
    )
    assert response.status_code == 409


def test_approved_execution_is_idempotent():
    plan = make_plan()
    approval = client.post(
        f"/api/v1/plans/{plan['plan_id']}/approve",
        json={
            "approver": "commander",
            "role": "incident_commander",
            "plan_fingerprint": fingerprint(plan),
        },
    ).json()
    body = {
        "actor": "executor",
        "role": "executor",
        "approval_id": approval["approval_id"],
        "idempotency_key": "stable-execution-key",
    }
    first = client.post(f"/api/v1/plans/{plan['plan_id']}/execute", json=body)
    second = client.post(f"/api/v1/plans/{plan['plan_id']}/execute", json=body)
    assert first.status_code == 200
    assert first.json()["event_id"] == second.json()["event_id"]


def test_execute_requires_executor_role():
    plan = make_plan()
    approval = client.post(
        f"/api/v1/plans/{plan['plan_id']}/approve",
        json={
            "approver": "commander",
            "role": "incident_commander",
            "plan_fingerprint": fingerprint(plan),
        },
    ).json()
    response = client.post(
        f"/api/v1/plans/{plan['plan_id']}/execute",
        json={
            "actor": "viewer",
            "role": "viewer",
            "approval_id": approval["approval_id"],
            "idempotency_key": "k2",
        },
    )
    assert response.status_code == 403
