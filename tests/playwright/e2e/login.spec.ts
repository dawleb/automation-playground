import { test } from '../core/fixtures/base-test';

test('should successfully log in', async ({ homePage, loginPage, welcomePage }) => {
  await homePage.open();
  await loginPage.doLogin();
  await welcomePage.isOpened('Welcome!');
});
