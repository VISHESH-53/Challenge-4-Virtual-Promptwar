import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_health_endpoint_returns_200(async_client: AsyncClient):
    response = await async_client.get("/api/v1/health")
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_health_response_schema(async_client: AsyncClient):
    response = await async_client.get("/api/v1/health")
    data = response.json()
    assert "status" in data
    assert "version" in data
    assert "environment" in data
    assert "timestamp" in data
    assert data["status"] == "healthy"

@pytest.mark.asyncio
async def test_ready_endpoint(async_client: AsyncClient):
    response = await async_client.get("/api/v1/health/ready")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "database" in data
    assert "redis" in data
