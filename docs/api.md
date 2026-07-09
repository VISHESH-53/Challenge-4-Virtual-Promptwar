# API Documentation

The backend exposes a RESTful API and WebSocket endpoints under the `/api/v1` prefix.

## Authentication

Authentication is handled via JWT (JSON Web Tokens).

*   Obtain a token via `POST /api/v1/auth/login`.
*   Pass the token in the `Authorization` header as a Bearer token: `Authorization: Bearer <token>`.

## Common Headers

*   `Content-Type: application/json`
*   `X-Request-ID`: Included in all responses for tracing.

## Standard Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE",
  "details": { ... }
}
```

## Available Endpoints (Phase 1)

### System Health

*   `GET /api/v1/health` - Basic liveness probe.
*   `GET /api/v1/health/ready` - Readiness probe (checks DB and Redis).
*   `GET /api/v1/health/metrics` - Uptime and basic metrics.
