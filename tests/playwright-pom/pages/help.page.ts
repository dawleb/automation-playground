import type { Page } from 'playwright';
import { Header } from './header.comp.ts';

export class HelpPage {
  private readonly page: Page;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
  }

  // Method to get the URL of the page
  async getUrl(): Promise<string> {
    return this.page.url();
  }
}
