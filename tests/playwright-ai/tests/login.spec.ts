import { test, expect } from '@playwright/test';

test('login and verify welcome page', async ({ page }) => {
  // 1. Navigate to login page
  await page.goto('https://testing.byst.re/#/login');

  // 2. Fill in login credentials
  await page.getByRole('textbox', { name: 'Enter Email' }).fill('student@example.com');
  await page.getByRole('textbox', { name: 'Enter Password' }).fill('Test123!');
  
  // Click login button
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Verify welcome page
  await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
  await expect(page.getByText('You have successfully logged in')).toBeVisible();
  await expect(page.getByText('Hello Quality Engineer!')).toBeVisible();
});
