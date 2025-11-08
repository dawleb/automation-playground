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

    // If the test is already starting with an authenticated session (storageState), the app
    // may redirect straight to the welcome page. Detect that and skip login if already logged-in.
    const alreadyLoggedIn = await page.getByRole('heading', { name: 'Welcome!' }).isVisible();

    if (!alreadyLoggedIn) {
      await test.step('Perform login', async () => {
        await login.doLogin();
      });
    } else {
      await test.step('Skip login because session is present', async () => {
        // noop - session already authenticated
      });
    }

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