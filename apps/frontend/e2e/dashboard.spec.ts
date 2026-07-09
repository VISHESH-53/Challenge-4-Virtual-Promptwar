import { test, expect } from '@playwright/test';

test.describe('Command Center E2E', () => {
  test('Landing page loads and has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FIFA 2026/);
    await expect(page.locator('h1')).toContainText('Smart Stadium');
  });

  test('Navigation to Dashboard works', async ({ page }) => {
    await page.goto('/dashboard');
    // Ensure layout renders
    await expect(page.locator('nav').or(page.locator('aside'))).toBeVisible();
    await expect(page.getByText('Global Overview')).toBeVisible();
    
    // Check if KPIs render
    await expect(page.getByText('Total Attendance')).toBeVisible();
  });
});
