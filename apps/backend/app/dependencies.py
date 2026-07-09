from typing import AsyncGenerator, Callable
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db_session
from app.redis import RedisManager

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async for session in get_db_session():
        yield session

async def get_redis() -> RedisManager:
    return RedisManager()

async def get_current_user(token: str = Depends(oauth2_scheme)):
    # Placeholder for Phase 2 authentication
    # This should decode token, verify it, and return user from DB
    return None

def require_role(role: str) -> Callable:
    async def role_checker(current_user = Depends(get_current_user)):
        # Placeholder for Phase 2 RBAC
        # if not current_user or current_user.role != role:
        #     raise HTTPException(status_code=403, detail="Not enough permissions")
        return current_user
    return role_checker
