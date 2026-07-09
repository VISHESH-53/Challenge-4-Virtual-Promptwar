import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from app.redis import RedisManager
from app.config import get_settings

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        if path.startswith("/api/v1/health"):
            return await call_next(request)

        settings = get_settings()
        limit = settings.RATE_LIMIT_PER_MINUTE
        
        # Simple IP-based rate limit
        client_ip = request.client.host if request.client else "unknown"
        key = f"rate_limit:{client_ip}"
        
        redis_manager = RedisManager()
        try:
            client = redis_manager.get_client()
            current_time = time.time()
            window_start = current_time - 60
            
            # Remove old entries
            await client.zremrangebyscore(key, 0, window_start)
            # Count entries in current window
            request_count = await client.zcard(key)
            
            if request_count >= limit:
                return JSONResponse(
                    status_code=429,
                    content={"success": False, "message": "Too many requests. Please try again later."},
                    headers={
                        "Retry-After": "60",
                        "X-RateLimit-Limit": str(limit),
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": str(int(current_time + 60))
                    }
                )
            
            # Add current request with a unique member to avoid overwriting same-second requests
            import uuid
            member = f"{current_time}-{uuid.uuid4()}"
            await client.zadd(key, {member: current_time})
            await client.expire(key, 60)
            
            response = await call_next(request)
            
            # Inject headers into successful response
            response.headers["X-RateLimit-Limit"] = str(limit)
            response.headers["X-RateLimit-Remaining"] = str(max(0, limit - request_count - 1))
            response.headers["X-RateLimit-Reset"] = str(int(current_time + 60))
            
            return response
            
        except Exception as e:
            # If Redis fails, allow request but log error
            import structlog
            logger = structlog.get_logger()
            logger.error("rate_limit_error", error=str(e))
            
        return await call_next(request)
