import { Given, When, Then } from '@cucumber/cucumber';
// import Cucumber from '@cucumber/cucumber';
// const { Given, When, Then } = Cucumber;

// const { Given, When, Then } = require('@cucumber/cucumber');

import { expect, chromium, Page, Browser, BrowserContext } from '@playwright/test';
import { HomePage } from '../../pages/home.page.ts';
import { LoginPage } from '../../pages/login.page.ts';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let loginPage: LoginPage;

Given('I am on the login page', async function () {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();

  homePage = new HomePage(page);
  loginPage = new LoginPage(page);

  await homePage.open(process.env.BASE_URL);
});

When('I enter valid credentials', async function () {
  await loginPage.doLogin();
});

Then('I should see the welcome page', async function () {
  await expect(page).toHaveURL(/welcome/);

  await browser.close();
});
