import { Page, expect } from '@playwright/test';

export class WelcomePage {
  constructor(private page: Page) {}

  /**
   * Verifies that all elements of the welcome page are displayed
   */
  async verifyPage() {
    await expect(this.page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
    await expect(this.page.getByText('Hello Quality Engineer!')).toBeVisible();
    await expect(this.page.getByText('You have successfully logged in')).toBeVisible();
    await expect(this.page).toHaveURL(/welcome/);
  }

  /**
   * Gets the welcome message text
   */
  async getWelcomeMessage() {
    return this.page.getByRole('heading', { name: 'Welcome!' });
  }

  /**
   * Gets the user greeting message
   */
  async getUserGreeting() {
    return this.page.getByText('Hello Quality Engineer!');
  }

  /**
   * Clicks the logout button and expects to be redirected to login page
   */
  async logout() {
    await this.page.getByRole('button', { name: 'Logout' }).click();
    await expect(this.page).toHaveURL(/login/);
  }

  /**
   * Clicks the help button and expects to be redirected to help page
   */
  async navigateToHelp() {
    await this.page.getByRole('button', { name: 'Help' }).click();
    await expect(this.page).toHaveURL(/help/);
  }

  /**
   * Verifies if user is logged in by checking for presence of welcome elements
   */
  async isLoggedIn() {
    return await this.page.getByText('Hello Quality Engineer!').isVisible();
  }
}