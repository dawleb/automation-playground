import { Page } from '@playwright/test';
import { EMAIL, PASSWORD } from '../.auth/credentials.ts';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://testing.byst.re/#/login');
  }

  async doLogin() {
    await this.page.getByRole('textbox', { name: 'Enter Email' }).fill(EMAIL);
    await this.page.getByRole('textbox', { name: 'Enter Password' }).fill(PASSWORD);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}