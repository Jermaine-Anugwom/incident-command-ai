import httpx
import pytest
from incident_command_ai.servicenow import ServiceNowClient, ServiceNowConfig


@pytest.mark.asyncio
async def test_context_request_uses_scoped_endpoint():
    async def handler(request: httpx.Request):
        assert request.url.path == "/api/x_jana_ica/context/abc123"
        assert request.headers["accept"] == "application/json"
        return httpx.Response(200, json={"incident_id": "INC-1047"})

    client = ServiceNowClient(
        ServiceNowConfig("https://synthetic.service-now.example", "demo", "demo"),
        transport=httpx.MockTransport(handler),
    )
    assert (await client.get_context("abc123"))["incident_id"] == "INC-1047"
    await client.close()


@pytest.mark.asyncio
async def test_plan_request_carries_idempotency_key():
    async def handler(request: httpx.Request):
        assert request.headers["idempotency-key"] == "idem-01"
        return httpx.Response(201, json={"plan_id": "PLAN-1"})

    client = ServiceNowClient(
        ServiceNowConfig("https://synthetic.service-now.example", "demo", "demo"),
        transport=httpx.MockTransport(handler),
    )
    response = await client.create_plan({"incident_id": "INC-1047"}, "idem-01")
    assert response == {"plan_id": "PLAN-1"}
    await client.close()


@pytest.mark.asyncio
async def test_transport_error_is_not_swallowed():
    async def handler(_: httpx.Request):
        return httpx.Response(503, json={"error": "synthetic outage"})

    client = ServiceNowClient(
        ServiceNowConfig("https://synthetic.service-now.example", "demo", "demo"),
        transport=httpx.MockTransport(handler),
    )
    with pytest.raises(httpx.HTTPStatusError):
        await client.get_context("abc123")
    await client.close()
