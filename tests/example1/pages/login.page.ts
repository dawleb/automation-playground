import type { Page } from 'playwright';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async doLogin(email: string, password: string) {
        await this.page.fill('#email', email);
        await this.page.fill('#password', password);
        await this.page.click('#submit');
    }
}