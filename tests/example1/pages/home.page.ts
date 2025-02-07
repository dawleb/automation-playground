import type { Page } from 'playwright'

export class HomePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async open() {
    await this.page.goto('http://localhost:3000/')
  }
}
