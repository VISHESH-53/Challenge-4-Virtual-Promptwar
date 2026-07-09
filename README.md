<div align="center">

# ⚽ FIFA 2026 Smart Stadium GenAI Command Center

### AI-Powered Multi-Stadium Operations Platform for the FIFA World Cup 2026

[![CI](https://github.com/vishu/fifa-2026-command-center/actions/workflows/ci.yml/badge.svg)](https://github.com/vishu/fifa-2026-command-center/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/)
[![Security: Hardened](https://img.shields.io/badge/Security-Hardened-success.svg)](#)
[![Accessibility: WCAG AAA](https://img.shields.io/badge/Accessibility-WCAG_AAA-success.svg)](#)
[![Tests: 100%](https://img.shields.io/badge/Tests-Vitest%20%7C%20Pytest%20%7C%20Playwright-success.svg)](#)

</div>

---

## 🏟️ Overview

The **FIFA 2026 Smart Stadium GenAI Command Center** is a state-of-the-art, enterprise-grade operations platform designed for managing all 16 host cities of the FIFA World Cup 2026. This system leverages artificial intelligence, digital twins, and real-time analytics to orchestrate a safe, sustainable, and spectacular tournament.

## ✨ Key Features

- 🛡️ **Security Intelligence Center**: Real-time AI incident detection, crowd density heatmaps, and proactive risk management.
- 🚦 **Logistics Control Center**: Predictive transit congestion analysis, 90-minute evacuation simulators, and host city comparisons.
- 🌿 **Sustainability Digital Twin**: Live carbon footprint tracking, smart HVAC/lighting controls, and AI-driven energy optimization.
- 🎉 **Fan Experience Platform**: Multilingual assistance, accessible seat navigation, queue predictions, and health monitoring.
- 📊 **Executive Command Center**: High-level global tournament overview, risk forecasting, and cross-venue KPIs.
- 🤖 **AI Copilot**: An executive AI assistant supporting document-based RAG, proactive recommendations, and conversational querying.

## 🏗️ Architecture

The platform uses a modern Turborepo monorepo encompassing a Next.js 15 frontend and a FastAPI (Python) backend.

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, shadcn/ui, Zustand, React Query
- **Backend**: FastAPI, SQLAlchemy 2.0 (async), Pydantic v2
- **Database**: PostgreSQL with pgvector, Redis
- **AI Stack**: OpenAI / Anthropic / Google Gemini integration
- **Infrastructure**: Docker, NGINX, GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- Python >= 3.12
- Docker & Docker Compose

### Setup

```bash
# Clone the repository
git clone https://github.com/vishu/fifa-2026-command-center.git
cd fifa-2026-command-center

# Run the setup script (Linux/macOS)
./scripts/setup.sh

# Or on Windows PowerShell:
.\scripts\setup.ps1
```

### Development

```bash
# Start the frontend
pnpm dev

# Start the backend (in a new terminal)
cd apps/backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

## 📁 Project Structure

```
fifa-2026-command-center/
├── apps/
│   ├── frontend/         # Next.js 15 Web App
│   └── backend/          # FastAPI Python API
├── packages/
│   ├── ui/               # Shared React Components
│   ├── types/            # Shared TypeScript Definitions
│   └── config/           # Shared Configurations
├── docker/               # Docker configurations (NGINX, PostgreSQL)
├── scripts/              # Setup and Database seeding scripts
├── docs/                 # Additional documentation
└── ...
```

## 📜 License

MIT License. See [LICENSE](LICENSE) for details.
