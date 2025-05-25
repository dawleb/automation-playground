import type { Page } from 'playwright';
import { elements } from '../elements/header.elem';
import { BasePage } from './base.page';

// 1 We have extended form base class
export class Header extends BasePage {
  // 1 We have called super cunstructor
  constructor(page: Page) {
    super(page);
  }

  // Method to check if all the header elements are visible
  async isVisible(): Promise<boolean> {
    const helpVisible = await this.page.locator(elements.helpButton).isVisible();
    const logoutVisible = await this.page.locator(elements.logoutButton).isVisible();
    const welcomeVisible = await this.page.locator(elements.welcomeText).isVisible();
    return helpVisible && logoutVisible && welcomeVisible;
  }

  // Method to get the order of buttons in the header by returning their text contents
  async getButtonOrder(): Promise<string[]> {
    return this.page.locator('button').allTextContents();
  }

  // Method to click the Help button in the header
  async clickHelp() {
    await this.page.locator(elements.helpButton).click();
  }

  // Method to click the Logout button in the header
  async clickLogout() {
    await this.page.locator(elements.logoutButton).click();
  }

  // 1We have added getter method
  getWelcomeText(): string {
    return elements.welcomeText;
  }

  // Method to retrieve the text content of the Welcome message
  // async getWelcomeText(): Promise<string> {
  //   const text = await this.getText(elements.welcomeText);
  //   if (!text) {
  //     throw new Error('Welcome text is empty or not found');
  //   }
  //   return text;
  // }
}
