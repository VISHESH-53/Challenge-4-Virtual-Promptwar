# Architecture Overview

The FIFA 2026 Smart Stadium GenAI Command Center employs a modern, loosely-coupled microservices-oriented architecture within a Turborepo monorepo. This balances the operational simplicity of a unified codebase with the independent deployability of services.

## Core Components

1.  **Frontend App (`apps/frontend`)**
    *   **Framework:** Next.js 15 with App Router and React 19.
    *   **Responsibilities:** Rendering the UI, handling client-side state (Zustand, React Query), server-side rendering for initial load performance, and communicating with the backend API.
    *   **Styling:** Tailwind CSS and shadcn/ui for a highly customizable, enterprise-grade design system.

2.  **Backend API (`apps/backend`)**
    *   **Framework:** Python FastAPI.
    *   **Responsibilities:** Core business logic, data persistence, authentication, AI orchestrations, and WebSocket management for real-time updates.
    *   **ORM:** SQLAlchemy 2.0 with asynchronous drivers (asyncpg) to maximize throughput.

3.  **Database Layer**
    *   **Primary Database:** PostgreSQL 16. Used for relational data (users, stadiums, incidents). Includes `pgvector` for storing and querying AI embeddings.
    *   **Cache & Pub/Sub:** Redis 7. Used for rate limiting, session caching, and WebSocket pub/sub for real-time dashboard updates.

4.  **AI Orchestration Layer**
    *   An abstraction over multiple LLM providers (OpenAI, Anthropic, Gemini) implemented in the Python backend. Facilitates Retrieval-Augmented Generation (RAG) using `pgvector`.

## Data Flow

*   **Client -> NGINX:** All traffic hits the NGINX reverse proxy.
*   **NGINX -> Frontend:** Requests to `/` and static assets are routed to Next.js.
*   **NGINX -> Backend:** Requests to `/api/*` and `/ws/*` are proxied to FastAPI.
*   **Backend -> Database:** FastAPI uses SQLAlchemy async sessions to interact with PostgreSQL.
*   **Backend -> Cache:** FastAPI uses `redis-py` for caching and rate-limiting.

## Scalability Considerations

*   **Stateless Backend:** The FastAPI application is entirely stateless. Sessions are managed via JWTs and Redis, allowing the backend containers to be scaled horizontally without issue.
*   **Edge Caching:** Next.js allows for caching static or infrequently changing data at the CDN level.
*   **Asynchronous Processing:** Python's `asyncio` and FastAPI's native async support allow high concurrency for I/O-bound tasks, particularly crucial for long-running AI requests.
