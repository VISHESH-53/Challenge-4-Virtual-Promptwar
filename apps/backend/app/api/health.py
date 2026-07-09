import time
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from pydantic import BaseModel, Field

from app.config import get_settings
from app.database import get_db_session
from app.redis import RedisManager
from app.dependencies import get_redis

router = APIRouter()

START_TIME = time.time()

class HealthResponse(BaseModel):
    status: str = Field(..., description="Overall health status")
    version: str = Field(..., description="API Version")
    environment: str = Field(..., description="Deployment environment")
    timestamp: int = Field(..., description="Unix timestamp")

class ReadyResponse(BaseModel):
    status: str = Field(..., description="Readiness status")
    database: str = Field(..., description="Database connectivity status")
    redis: str = Field(..., description="Redis connectivity status")
    timestamp: int = Field(..., description="Unix timestamp")

@router.get("", response_model=HealthResponse)
async def health_check():
    settings = get_settings()
    return {
        "status": "healthy",
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "timestamp": int(time.time()),
    }

@router.get("/ready", response_model=ReadyResponse)
async def readiness_check(
    db: AsyncSession = Depends(get_db_session),
    redis: RedisManager = Depends(get_redis)
):
    db_status = "unhealthy"
    redis_status = "unhealthy"
    
    try:
        await db.execute(text("SELECT 1"))
        db_status = "healthy"
    except Exception:
        pass
        
    try:
        if await redis.is_healthy():
            redis_status = "healthy"
    except Exception:
        pass

    overall_status = "ready" if db_status == "healthy" and redis_status == "healthy" else "not_ready"
    
    return {
        "status": overall_status,
        "database": db_status,
        "redis": redis_status,
        "timestamp": int(time.time()),
    }

@router.get("/metrics")
async def metrics():
    uptime = time.time() - START_TIME
    return {
        "status": "healthy",
        "uptime_seconds": round(uptime, 2),
        "timestamp": int(time.time()),
    }
