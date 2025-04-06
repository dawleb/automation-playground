import { test, expect } from '../fixtures/base-test';

test('should navigate to help page', async ({ homePage, welcomePage, helpPage }) => {
  await homePage.open();
  // await loginPage.doLogin();
  await welcomePage.getHeader().clickHelp();

  const url = await helpPage.getUrl();

  expect(url).toContain('/help');
});
