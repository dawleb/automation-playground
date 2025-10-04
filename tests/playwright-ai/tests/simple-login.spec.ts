import { test, expect } from '@playwright/test';

test('login and check welcome page', async ({ page }) => {
  // Go to login page
  await page.goto('https://testing.byst.re/#/login');

  // Fill login form
  await page.fill('input[name="email"]', 'student@example.com');
  await page.fill('input[name="password"]', 'Test123!');
  await page.click('button[type="submit"]');

  // Verify welcome page
  await expect(page).toHaveURL(/\/welcome$/);
  await expect(page.locator('h1')).toHaveText('Welcome!');
});