import { test } from '../fixtures/base-test';

test('should successfully log in', async ({ homePage, welcomePage }) => {
  await homePage.open();
  // await loginPage.doLogin();
  await welcomePage.isOpened('Welcome!');
});
