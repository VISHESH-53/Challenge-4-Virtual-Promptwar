import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import structlog
from structlog.contextvars import bind_contextvars, clear_contextvars

logger = structlog.get_logger()

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        clear_contextvars()
        request_id = str(uuid.uuid4())
        bind_contextvars(request_id=request_id)
        
        path = request.url.path
        if path.startswith("/api/v1/health"):
            return await call_next(request)

        start_time = time.perf_counter()
        
        logger.info("request.started", method=request.method, path=path, client_ip=request.client.host if request.client else None)
        
        try:
            response = await call_next(request)
            process_time = (time.perf_counter() - start_time) * 1000
            
            logger.info("request.completed", 
                        status_code=response.status_code,
                        duration_ms=round(process_time, 2))
            
            response.headers["X-Request-ID"] = request_id
            return response
        except Exception as e:
            process_time = (time.perf_counter() - start_time) * 1000
            logger.error("request.failed", 
                         error=str(e),
                         duration_ms=round(process_time, 2))
            raise
