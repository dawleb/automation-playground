import type { Page } from 'playwright'

export class LoginPage {
  readonly page: Page

  constructor(page: Page) {
    this.username = page.locator('#email');
    this.password = page.locator('#password');
    this.submit = page.locator('#submit');

    this.page = page
  }

  async doLogin(email: string, password: string) {
    await this.page.fill('#email', email)
    await this.page.fill('#password', password)
    await this.page.click('#submit')
  }
}
