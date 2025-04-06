import { test as setup, expect } from '../fixtures/base-test';

import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('should successfully log in', async ({ homePage, loginPage, page }) => {
  await homePage.open();
  await loginPage.doLogin();

  await expect(page).toHaveURL(/welcome/);

  // Saves auth state for subsequent tests.
  await page.context().storageState({ path: authFile });
});
