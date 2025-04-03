import type { Page } from 'playwright';

export class HomePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    // Navigate to the page.
    await this.page.goto('/');
  }
}
// import type { Page } from 'playwright'

// export class HomePage {
//   readonly page: Page

//   constructor(page: Page) {
//     this.page = page
//   }

//   async open() {
//     await this.page.goto('/')
//   }
// }
