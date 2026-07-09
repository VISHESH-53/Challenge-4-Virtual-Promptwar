from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import structlog

from app.config import get_settings
from app.database import init_db, close_db
from app.redis import RedisManager
from app.middleware.cors import setup_cors
from app.middleware.logging import LoggingMiddleware
from app.api import health

logger = structlog.get_logger()

@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    logger.info("startup.starting", version=settings.APP_VERSION, environment=settings.ENVIRONMENT)
    
    # Initialize DB
    await init_db()
    
    # Initialize Redis
    redis_manager = RedisManager()
    await redis_manager.connect(settings.REDIS_URL)
    
    yield
    
    # Shutdown
    logger.info("shutdown.starting")
    await close_db()
    await redis_manager.disconnect()

def create_app() -> FastAPI:
    settings = get_settings()
    
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="API for FIFA 2026 Smart Stadium GenAI Command Center",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )
    
    # Middleware
    setup_cors(app, settings)
    app.add_middleware(LoggingMiddleware)
    
    # Exception Handlers
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        logger.error("global.exception", exc_info=exc, path=request.url.path)
        return JSONResponse(
            status_code=500,
            content={"message": "Internal Server Error", "success": False},
        )
    
    # Routers
    app.include_router(health.router, prefix="/api/v1/health", tags=["Health"])
    
    return app

app = create_app()
