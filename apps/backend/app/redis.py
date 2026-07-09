import json
from typing import Any, Optional
import redis.asyncio as redis
import structlog

logger = structlog.get_logger()

class RedisManager:
    _instance = None
    _client: Optional[redis.Redis] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(RedisManager, cls).__new__(cls)
        return cls._instance

    async def connect(self, url: str) -> None:
        if self._client is None:
            try:
                self._client = redis.from_url(url, decode_responses=True)
                await self._client.ping()
                logger.info("redis.connected", url=url)
            except Exception as e:
                logger.error("redis.connection_error", error=str(e))
                raise

    async def disconnect(self) -> None:
        if self._client:
            await self._client.close()
            self._client = None
            logger.info("redis.disconnected")

    def get_client(self) -> redis.Redis:
        if not self._client:
            raise RuntimeError("Redis is not connected")
        return self._client

    async def set_json(self, key: str, value: Any, expire: int | None = None) -> None:
        client = self.get_client()
        await client.set(key, json.dumps(value), ex=expire)

    async def get_json(self, key: str) -> Any | None:
        client = self.get_client()
        val = await client.get(key)
        return json.loads(val) if val else None

    async def is_healthy(self) -> bool:
        try:
            if self._client:
                return await self._client.ping()
            return False
        except Exception:
            return False
