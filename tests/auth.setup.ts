import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import path from 'path';

const authFile = path.join(__dirname, '../auth/user.json');

setup('authenticate with Nexora', async ({ page }) => {

    const username = process.env.NEXORA_USERNAME;
    const password = process.env.NEXORA_PASSWORD;

    if (!username || !password) {
        throw new Error(
            'Please configure NEXORA_USERNAME and NEXORA_PASSWORD in .env'
        );
    }

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);

    // Wait until the Dashboard is visible.
    await expect(
        page.getByText('Dashboard', { exact: true }).first()
    ).toBeVisible({ timeout: 30000 });

    // Step 2: Print authentication information.
    console.log('Login completed URL:', page.url());

    const state = await page.context().storageState({
        path: authFile
    });

    console.log('Saved cookies:', state.cookies.length);

    console.log(
        'Saved origins:',
        state.origins.map(origin => ({
            origin: origin.origin,
            localStorageKeys: origin.localStorage.map(item => item.name)
        }))
    );

    // Step 3: Save authentication state.
    console.log('Authentication state saved:', authFile);
});