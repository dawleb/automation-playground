import type { Page, Locator } from 'playwright';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async getText(selector: string | Locator): Promise<string> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    const text = await locator.textContent();
    if (!text?.trim()) {
      throw new Error(`Text not found or empty for selector: ${selector}`);
    }
    return text.trim();
  }
}

// import type { Page, Locator } from 'playwright';

// export class BasePage {
//   protected readonly page: Page;

//   constructor(page: Page) {
//     this.page = page;
//   }

//   async getText(selector: string | Locator): Promise<string> {
//     const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
//     const text = await locator.textContent();
//     if (!text) {
//       throw new Error(`Text not found or empty for selector: ${selector}`);
//     }
//     return text;
//   }
// }
