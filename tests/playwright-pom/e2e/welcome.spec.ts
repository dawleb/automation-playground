import { test, expect } from '../fixtures/base-test.ts';

test('should verify welcome page elements after login', async ({ homePage, welcomePage, page }) => {
  // Navigate to home page
  await homePage.open();
  // await loginPage.doLogin();

  // 👇 Assert the welcome message
  const header = welcomePage.getHeader();
  const welcomeText = await header.getWelcomeText();
  expect(welcomeText).toBe('Hello Quality Engineer!');

  // Assert the order of buttons
  const buttonOrder = await welcomePage.getHeader().getButtonOrder();
  expect(buttonOrder).toEqual(['Help', 'Logout']);
});
