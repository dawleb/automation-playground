import type { Page } from 'playwright';

export class HomePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the root page.
  async open(url: string = '') {
    await this.page.goto(`${url}/`);
  }
}
