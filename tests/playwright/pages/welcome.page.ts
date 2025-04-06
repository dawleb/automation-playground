import { expect } from '@playwright/test';
import type { Page } from 'playwright';
import { elements } from '../elements/welcome.elem';
import { Header } from './header.comp.ts';

export class WelcomePage {
  readonly page: Page;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
  }

  async isOpened(text: string) {
    // Expect a title and heading to contain a welcome message.
    await expect(this.page).toHaveURL(/welcome/);
    await expect(this.page.locator(elements.mainHeading)).toHaveText(text);

    // Verify that the header is visible
    const isHeaderVisible = await this.header.isVisible();
    expect(isHeaderVisible).toBe(true);

    // Verify the welcome message
    const welcomeText = await this.header.getWelcomeText();
    expect(welcomeText).toBe('Hello Quality Engineer!');

    // Verify the order of buttons
    const buttonOrder = await this.header.getButtonOrder();
    expect(buttonOrder).toEqual(['Help', 'Logout']);
  }
}
