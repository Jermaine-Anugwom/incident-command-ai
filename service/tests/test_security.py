import pytest
from incident_command_ai.security import contains_prompt_injection, fingerprint, require_role


@pytest.mark.parametrize(
    "text",
    [
        "Gateway health check returned 502.",
        "Operator requested a normal rollback review.",
        "The incident record is authoritative for its identifier only.",
        "Do not execute before the incident commander approves.",
        "The word secret appears in a training example without a request to reveal it.",
        "系统服务暂时不可用。",
        "دليل تشغيل اصطناعي",
        "Payment initiation depends on the identity gateway.",
    ],
)
def test_benign_operational_text_is_not_injection(text: str):
    assert not contains_prompt_injection(text)


def test_role_match_passes():
    require_role("executor", "executor")


def test_role_mismatch_fails_closed():
    with pytest.raises(PermissionError):
        require_role("viewer", "executor")


def test_nested_fingerprint_is_stable():
    first = {"plan": {"actions": ["a", "b"]}, "state": "ready"}
    second = {"state": "ready", "plan": {"actions": ["a", "b"]}}
    assert fingerprint(first) == fingerprint(second)


def test_action_order_changes_fingerprint():
    assert fingerprint(["a", "b"]) != fingerprint(["b", "a"])
