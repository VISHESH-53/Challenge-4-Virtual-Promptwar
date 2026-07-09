#!/usr/bin/env python3
"""Database seeder for FIFA 2026 Command Center.

Seeds the database with realistic mock data for development and demo.
Full implementation in Phase 2.
"""
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "apps" / "backend"))

async def seed_database() -> None:
    """Seed the database with initial data."""
    print("🌱 Database seeding will be available after Phase 2")
    print("   - Users and roles")
    print("   - Stadiums (16 FIFA 2026 venues)")
    print("   - Sample matches")
    print("   - Mock security incidents")
    print("   - Sample energy/sustainability data")
    print("   - Demo AI conversations")

if __name__ == "__main__":
    asyncio.run(seed_database())
