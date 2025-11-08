import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { WelcomePage } from '../pages/welcome.page';

test.describe('Welcome page @mcp', () => {
  test('should log in and validate welcome page elements', async ({ page }) => {
    const login = new LoginPage(page);
    const welcome = new WelcomePage(page);

    await test.step('Go to login page', async () => {
      await login.goto();
    });

    await test.step('Perform login', async () => {
      await login.doLogin();
    });

    await test.step('Validate welcome page elements using POM', async () => {
      await welcome.verifyPage();
    });

    await test.step('Verify isLoggedIn returns true', async () => {
      const loggedIn = await welcome.isLoggedIn();
      expect(loggedIn).toBeTruthy();
    });

    await test.step('Exercise navigation and logout', async () => {
      // Navigate to Help and back
      await welcome.navigateToHelp();
      // go back to welcome (use page.goBack or navigate)
      await page.goBack();
      await welcome.logout();
    });
  });
});