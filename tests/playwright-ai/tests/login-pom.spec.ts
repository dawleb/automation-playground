import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { WelcomePage } from '../pages/welcome.page';

test('login and verify welcome page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const welcomePage = new WelcomePage(page);

  // 1. Navigate to login page
  await loginPage.goto();

  // 2. Login with credentials
  await loginPage.login('student@example.com', 'Test123!');

  // 3. Verify welcome page
  // await welcomePage.verifyWelcomePage();
    await expect(page).toHaveURL(/\/welcome$/);
    await expect(page.locator('h1')).toHaveText('Welcome!');
});