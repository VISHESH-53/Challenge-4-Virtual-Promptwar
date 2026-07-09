$ErrorActionPreference = "Stop"

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "⚽ FIFA 2026 Smart Stadium Command Center - Setup Script ⚽" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan

Write-Host "Checking prerequisites..."
if (!(Get-Command node -ErrorAction SilentlyContinue)) { Throw "Node.js is required but not installed. Aborting." }
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) { Throw "pnpm is required but not installed. Aborting." }
if (!(Get-Command python -ErrorAction SilentlyContinue)) { Throw "Python is required but not installed. Aborting." }
if (!(Get-Command docker -ErrorAction SilentlyContinue)) { Throw "Docker is required but not installed. Aborting." }

Write-Host "Setting up environment variables..."
if (!(Test-Path .env)) {
    Copy-Item .env.example .env
    $bytes = New-Object Byte[] 32
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    $jwtSecret = -join ($bytes | ForEach-Object { $_.ToString("x2") })
    (Get-Content .env) -replace 'replace_me_with_a_secure_random_string', $jwtSecret | Set-Content .env
    Write-Host "Created .env"
}

if (!(Test-Path apps/frontend/.env.local)) {
    Copy-Item apps/frontend/.env.local.example apps/frontend/.env.local
    Write-Host "Created apps/frontend/.env.local"
}

if (!(Test-Path apps/backend/.env)) {
    Copy-Item apps/backend/.env.example apps/backend/.env
    if ($jwtSecret) {
        (Get-Content apps/backend/.env) -replace 'replace_me_with_a_secure_random_string', $jwtSecret | Set-Content apps/backend/.env
    }
    Write-Host "Created apps/backend/.env"
}

Write-Host "Installing frontend dependencies..."
pnpm install

Write-Host "Installing backend dependencies..."
Push-Location apps/backend
python -m venv .venv
. .venv\Scripts\Activate.ps1
pip install -e '.[dev]'
Pop-Location

Write-Host "Starting Docker services (PostgreSQL, Redis)..."
docker compose up -d postgres redis

Write-Host "Waiting for PostgreSQL to be ready..."
Start-Sleep -Seconds 10

Write-Host "Running database migrations..."
Push-Location apps/backend
alembic upgrade head
Pop-Location

Write-Host "=========================================================" -ForegroundColor Green
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "To start development:"
Write-Host "1. Backend: cd apps/backend ; .\.venv\Scripts\Activate.ps1 ; uvicorn app.main:app --reload"
Write-Host "2. Frontend: pnpm dev"
Write-Host "=========================================================" -ForegroundColor Green
