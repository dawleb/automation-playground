import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page.ts';
import { LoginPage } from '../pages/login.page.ts';
import { WelcomePage } from '../pages/welcome.page.ts';
import { HelpPage } from '../pages/help.page.ts';

interface PageObjects {
  loginPage: LoginPage;
  homePage: HomePage;
  welcomePage: WelcomePage;
  helpPage: HelpPage;
}

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
  helpPage: async ({ page }, use) => {
    await use(new HelpPage(page));
  },
});

export const expect = test.expect;
