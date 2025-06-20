// import { expect } from '@playwright/test';
import type { Page } from 'playwright';
import { elements } from '../elements/welcome.elem.ts';
import { Header } from './header.comp.ts';
import { BasePage } from './base.page.ts';

export class WelcomePage extends BasePage {
  private readonly header: Header;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
  }

  getHeader(): Header {
    return this.header;
  }

  async getHeading(): Promise<string> {
    return this.getText(elements.mainHeading);
  }
}

// // import { expect } from '@playwright/test';
// import type { Page } from 'playwright';
// import { elements } from '../elements/welcome.elem';
// import { Header } from './header.comp.ts';

// export class WelcomePage {
//   private readonly page: Page;
//   private readonly header: Header;

//   constructor(page: Page) {
//     this.page = page;
//     this.header = new Header(page);
//   }

//   getHeader(): Header {
//     return this.header;
//   }

//   // Method to retrieve the text content of the Welcome message
//   async getHeading(): Promise<string> {
//     const text = await this.page.locator(elements.mainHeading).textContent();
//     if (!text) {
//       throw new Error('Heading text is empty or not found');
//     }
//     return text;
//   }

// // Generic method to get text content from an element
// private async getElementText(selector: string): Promise<string> {
//   const text = await this.page.locator(selector).textContent();
//   if (!text) {
//     throw new Error(`Text content for selector "${selector}" is empty or not found`);
//   }
//   return text;
// }

// // Method to retrieve the text content of the Welcome message
// async getHeading(): Promise<string> {
//   return this.getElementText(elements.mainHeading);
// }

// async isOpened(text: string) {
//   // Expect a title and heading to contain a welcome message.
//   await expect(this.page).toHaveURL(/welcome/);
//   await expect(this.page.locator(elements.mainHeading)).toHaveText(text);

//   // Verify that the header is visible
//   const isHeaderVisible = await this.header.isVisible();
//   expect(isHeaderVisible).toBe(true);

//   // Verify the welcome message
//   const welcomeText = await this.header.getWelcomeText();
//   expect(welcomeText).toBe('Hello Quality Engineer!');

//   // Verify the order of buttons
//   const buttonOrder = await this.header.getButtonOrder();
//   expect(buttonOrder).toEqual(['Help', 'Logout']);
// }
// }
