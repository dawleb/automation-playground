import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures.ts';

Given('I am on the login page', async ({ homePage }) => {
  await homePage.open(process.env.BASE_URL);
});

When('I enter valid credentials', async ({ loginPage }) => {
  await loginPage.doLogin();
});

Then('I should see the welcome page', async ({ page }) => {
  await expect(page).toHaveURL(/welcome/);
});
