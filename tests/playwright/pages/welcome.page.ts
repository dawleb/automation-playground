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
import { elements } from '../elements/welcome.elem';

export class WelcomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isOpened(text: string) {
    // Expect a title and heading to contain a welcome message.
    await expect(this.page).toHaveURL(/welcome/);
    await expect(this.page.locator(elements.mainHeading)).toHaveText(text);
  }
}

// const element = this.page.getByRole('heading', { name: 'Welcome!' });

// await expect(element).toHaveText(text);
// await expect(this.page).toHaveURL(/welcome/);
// await expect(element).toBeVisible();

// async isOpened(heading: string) {
//   // Expect a title and heading to contain a welcome message.
//   await expect(this.page).toHaveURL(/welcome/);
//   await expect(this.page.getByRole('heading', { name: heading })).toBeVisible();
// }
