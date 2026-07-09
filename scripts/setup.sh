#!/bin/bash
set -euo pipefail

echo "========================================================="
echo "⚽ FIFA 2026 Smart Stadium Command Center - Setup Script ⚽"
echo "========================================================="

echo "Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo >&2 "Node.js is required but not installed. Aborting."; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo >&2 "pnpm is required but not installed. Aborting."; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo >&2 "Python 3 is required but not installed. Aborting."; exit 1; }
command -v docker >/dev/null 2>&1 || { echo >&2 "Docker is required but not installed. Aborting."; exit 1; }

echo "Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    # Generate random JWT secret
    JWT_SECRET=$(openssl rand -hex 32)
    sed -i.bak "s/replace_me_with_a_secure_random_string/$JWT_SECRET/g" .env
    rm -f .env.bak
    echo "Created .env"
fi

if [ ! -f apps/frontend/.env.local ]; then
    cp apps/frontend/.env.local.example apps/frontend/.env.local
    echo "Created apps/frontend/.env.local"
fi

if [ ! -f apps/backend/.env ]; then
    cp apps/backend/.env.example apps/backend/.env
    if [ -n "${JWT_SECRET:-}" ]; then
        sed -i.bak "s/replace_me_with_a_secure_random_string/$JWT_SECRET/g" apps/backend/.env
        rm -f apps/backend/.env.bak
    fi
    echo "Created apps/backend/.env"
fi

echo "Installing frontend dependencies..."
pnpm install

echo "Installing backend dependencies..."
cd apps/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'
cd ../..

echo "Starting Docker services (PostgreSQL, Redis)..."
docker compose up -d postgres redis

echo "Waiting for PostgreSQL to be ready..."
sleep 5

echo "Running database migrations..."
cd apps/backend
alembic upgrade head
cd ../..

echo "========================================================="
echo "✅ Setup complete!"
echo "To start development:"
echo "1. Backend: cd apps/backend && source .venv/bin/activate && uvicorn app.main:app --reload"
echo "2. Frontend: pnpm dev"
echo "========================================================="
