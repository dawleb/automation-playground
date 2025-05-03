import { test, expect } from '../fixtures/base-test';

test('should verify welcome page elements after login', async ({ homePage, welcomePage, page }) => {
  // Navigate to home page
  await homePage.open();
  // await loginPage.doLogin();

  // Assert "welcome" in the URL after successful login
  await expect(page).toHaveURL(/welcome/);

  // Assert the heading contains a welcome message
  const headingText = await welcomePage.getHeading();
  expect(headingText).toBe('Welcome!');

  // Assert that the header is visible
  const isHeaderVisible = await welcomePage.getHeader().isVisible();
  expect(isHeaderVisible).toBe(true);

  // Assert the welcome message
  const welcomeText = await welcomePage.getHeader().getWelcomeText();
  expect(welcomeText).toBe('Hello Quality Engineer!');

  // Assert the order of buttons
  const buttonOrder = await welcomePage.getHeader().getButtonOrder();
  expect(buttonOrder).toEqual(['Help', 'Logout']);
});
