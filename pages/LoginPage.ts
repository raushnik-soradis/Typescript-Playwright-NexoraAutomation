import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('e.g. admin123');
        this.passwordInput = page.getByPlaceholder('Enter your password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    async navigateToLoginPage(): Promise<void> {
    await this.page.goto(
        'https://admin.nexorabysoradis.com/login',
        {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        }
    );

    await this.usernameInput.waitFor({
        state: 'visible',
        timeout: 15000
    });
}

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}