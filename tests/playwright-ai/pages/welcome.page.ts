import { Page, expect } from '@playwright/test';

export class WelcomePage {
  constructor(private page: Page) {}

  async verifyWelcomePage() {
    await expect(this.page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
    await expect(this.page.getByText('You have successfully logged in')).toBeVisible();
    await expect(this.page.getByText('Hello Quality Engineer!')).toBeVisible();
    await expect(this.page).toHaveURL(/welcome/);
  }
}