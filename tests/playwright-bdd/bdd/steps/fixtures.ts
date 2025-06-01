import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../../pages/login.page.ts';
import { HomePage } from '../../pages/home.page.ts';
import { WelcomePage } from '../../pages/welcome.page.ts';
import { HelpPage } from '../../pages/help.page.ts';
// import { Page } from 'playwright-bdd';

type Fixtures = {
  // page: Page;
  loginPage: LoginPage;
  homePage: HomePage;
  welcomePage: WelcomePage;
  helpPage: HelpPage;
};

export const test = base.extend<Fixtures>({
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

export const { Given, When, Then } = createBdd(test);
