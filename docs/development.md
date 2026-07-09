# Development Guide

## Environment Setup

1.  **Dependencies:** Ensure Node.js (>= 20), Python (>= 3.12), pnpm, and Docker are installed.
2.  **Initialization:** Run `./scripts/setup.sh` (or `.ps1` on Windows). This installs dependencies, creates `.env` files, and starts local Docker services.

## Monorepo Workflow (Turborepo)

*   `pnpm build`: Builds all packages and apps in dependency order.
*   `pnpm dev`: Starts the development servers for all apps.
*   `pnpm lint`: Lints all code.
*   `pnpm typecheck`: Runs TypeScript compiler checks.

## Frontend Conventions (Next.js)

*   **App Router:** Use the `src/app` directory for routing.
*   **Client vs. Server Components:** Default to Server Components. Use `'use client'` explicitly for components requiring interactivity, state, or browser APIs.
*   **State Management:**
    *   Use `Zustand` (`src/stores/`) for global client state (e.g., UI toggles, active themes).
    *   Use `React Query` for server state (fetching, caching, synchronizing data).
*   **Styling:** Use Tailwind CSS utility classes. For complex conditional classes, use the `cn()` utility function from `src/lib/utils.ts`.

## Backend Conventions (FastAPI)

*   **Async First:** Use `async def` and `await` for all endpoints and database operations.
*   **Dependency Injection:** Use FastAPI's `Depends()` heavily for database sessions, Redis clients, and authentication contexts.
*   **Routing:** Organize routes logically in `app/api/` and include them in `main.py` via an `APIRouter`.
*   **Pydantic:** Use Pydantic v2 models for all request validation and response serialization.
*   **Migrations:** Whenever database models change, generate a new migration: `alembic revision --autogenerate -m "description"` and apply it: `alembic upgrade head`.

## Git Workflow

*   We use feature branches (`feature/add-auth`, `fix/login-bug`).
*   Open Pull Requests against the `main` branch.
*   CI actions will enforce linting, type-checking, and tests.
