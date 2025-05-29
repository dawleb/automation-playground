import { test as setup, expect } from '../fixtures/base-test.ts';

import path from 'path';

// const authFile = path.join(__dirname, '../.auth/user.json');
// const authFile = path.join(__dirname, '..', '.auth', 'user.json');

import { fileURLToPath } from 'url';
// import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.join(__dirname, '../.auth/user.json');

setup('should successfully log in', async ({ homePage, loginPage, page }) => {
  await homePage.open();
  await loginPage.doLogin();

  await expect(page).toHaveURL(/welcome/);

  // Saves auth state for subsequent tests.
  await page.context().storageState({ path: authFile });
});
