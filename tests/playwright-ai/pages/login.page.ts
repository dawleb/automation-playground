import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://testing.byst.re/#/login');
  }

  async login(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Enter Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Enter Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}