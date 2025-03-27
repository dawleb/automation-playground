// import type { Page } from 'playwright'
// import { expect } from '@playwright/test'

// export class WelcomePage {
//   readonly page: Page

//   constructor(page: Page) {
//     this.page = page
//   }

//   async isOpened(name: string) {
//     const element = this.page.getByRole('heading', { name })

//     await expect(this.page).toHaveURL(/welcome/)
//     await expect(element).toBeVisible()
//   }
// }
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class WelcomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isOpened(text: string) {
    const element = this.page.getByRole('heading', { name: 'Welcome!' });

    await expect(element).toHaveText(text);
    await expect(this.page).toHaveURL(/welcome/);
    await expect(element).toBeVisible();
  }
}
