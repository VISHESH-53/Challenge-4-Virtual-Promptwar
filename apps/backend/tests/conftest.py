import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import AsyncSession
from typing import AsyncGenerator

from app.main import app
from app.config import get_settings
from app.database import get_db_session

# Override settings for tests
def get_test_settings():
    settings = get_settings()
    settings.DATABASE_URL = "postgresql+asyncpg://fifa_admin:secret@localhost:5432/fifa_test_db"
    return settings

app.dependency_overrides[get_settings] = get_test_settings

@pytest.fixture
async def async_client() -> AsyncGenerator[AsyncClient, None]:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        yield client

# Mock DB Session
class MockSession:
    async def execute(self, *args, **kwargs):
        pass

@pytest.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    yield MockSession() # type: ignore
