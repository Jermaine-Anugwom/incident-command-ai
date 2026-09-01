from __future__ import annotations

import hashlib
import json
import re
from typing import Any

INJECTION_PATTERNS = (
    r"ignore (all|any|the) (previous|prior|system) instructions",
    r"reveal (the )?(system prompt|credentials|secret)",
    r"execute (this|the following) (command|tool)",
    r"override (the )?(policy|approval|guardrail)",
)


def fingerprint(value: Any) -> str:
    payload = json.dumps(value, sort_keys=True, separators=(",", ":"), default=str)
    return hashlib.sha256(payload.encode()).hexdigest()


def contains_prompt_injection(text: str) -> bool:
    normalized = " ".join(text.lower().split())
    return any(re.search(pattern, normalized) for pattern in INJECTION_PATTERNS)


def require_role(actual: str, expected: str) -> None:
    if actual != expected:
        raise PermissionError(f"role {actual!r} cannot perform this operation")
