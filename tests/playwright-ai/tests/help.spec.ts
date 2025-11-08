import { test, expect } from '../fixtures/base-test.ts';

test('should navigate to help page', async ({ homePage, loginPage, welcomePage, helpPage }) => {
  await homePage.open();
  // await loginPage.doLogin();
  // await welcomePage.getHeader().clickHelp();

  const url = await helpPage.getUrl();

  expect(url).toContain('/help');
});

