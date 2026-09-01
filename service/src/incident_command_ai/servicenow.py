from __future__ import annotations

from dataclasses import dataclass
from typing import Any

import httpx


@dataclass(frozen=True)
class ServiceNowConfig:
    instance_url: str
    username: str
    password: str
    timeout_seconds: float = 10.0


class ServiceNowClient:
    """Small typed boundary for a PDI. Secrets never enter a model prompt."""

    def __init__(self, config: ServiceNowConfig, transport: httpx.AsyncBaseTransport | None = None):
        self.config = config
        self._client = httpx.AsyncClient(
            base_url=config.instance_url.rstrip("/"),
            auth=(config.username, config.password),
            timeout=config.timeout_seconds,
            transport=transport,
            headers={"Accept": "application/json", "Content-Type": "application/json"},
        )

    async def get_context(self, incident_sys_id: str) -> dict[str, Any]:
        response = await self._client.get(f"/api/x_jana_ica/context/{incident_sys_id}")
        response.raise_for_status()
        return response.json()

    async def create_plan(self, payload: dict[str, Any], idempotency_key: str) -> dict[str, Any]:
        response = await self._client.post(
            "/api/x_jana_ica/plans",
            json=payload,
            headers={"Idempotency-Key": idempotency_key},
        )
        response.raise_for_status()
        return response.json()

    async def close(self) -> None:
        await self._client.aclose()
