import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_cors_headers(async_client: AsyncClient):
    response = await async_client.options(
        "/api/v1/health",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "GET"
        }
    )
    assert response.status_code == 200
    assert "access-control-allow-origin" in response.headers
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"

@pytest.mark.asyncio
async def test_rate_limit_headers(async_client: AsyncClient):
    # health endpoint is excluded from rate limit, so we should test an endpoint that has it,
    # but currently we only have health. Wait, the middleware says:
    # if path.startswith("/api/v1/health"): return await call_next(request)
    # Let's make a dummy call to /api/v1/missing to check rate limit headers on a 404
    response = await async_client.get("/api/v1/missing")
    assert response.status_code == 404
    assert "x-ratelimit-limit" in response.headers
    assert "x-ratelimit-remaining" in response.headers
    assert "x-ratelimit-reset" in response.headers
