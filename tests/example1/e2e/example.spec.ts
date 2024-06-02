import { test } from '../base-test';

test('should successfully log in', async ({ homePage, loginPage, welcomePage }) => {
  await homePage.open();
  await loginPage.doLogin("student@example.com", "password")
  await welcomePage.isOpened("Welcome!");
});

