import type { Page } from 'playwright';
import { elements } from '../elements/login.elem';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async doLogin() {
    // Check if email and password environment variables are set.
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      throw new Error('Email and password environment variables must be set');
    }

    // Provide user credentials.
    await this.page.fill(elements.emailInput, process.env.EMAIL);
    await this.page.fill(elements.passwordInput, process.env.PASSWORD);

    // Click the login button.
    await this.page.click(elements.loginButton);
  }
}

// import type { Page, Locator } from 'playwright'

// export class LoginPage {
//   readonly page: Page
//   readonly username: Locator
//   readonly password: Locator
//   readonly submit: Locator

//   constructor(page: Page) {
//     this.username = page.locator('#email');
//     this.password = page.locator('#password');
//     this.submit = page.locator('#submit');

//     this.page = page
//   }

//   async doLogin(email: string, password: string) {
//     await this.page.fill('#email', email)
//     await this.page.fill('#password', password)
//     await this.page.click('#submit')
//   }
// }
