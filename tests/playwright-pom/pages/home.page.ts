import type { Page } from 'playwright';
import { env } from 'process';

export class HomePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the root page.
  async open(url: string = env.BASE_URL || '') {
    await this.page.goto(`${url}/`);
  }
}
