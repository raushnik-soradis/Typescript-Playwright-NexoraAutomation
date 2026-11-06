import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
test.use({ storageState: { cookies: [], origins: [] } });


test('Nexora login and dashboard verification', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);


    const username = process.env.NEXORA_USERNAME;
    const password = process.env.NEXORA_PASSWORD;

    if (!username || !password) {
        throw new Error(
            'Please configure NEXORA_USERNAME and NEXORA_PASSWORD.'
        );
    }

    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);

      await dashboardPage.verifyDashboardDisplayed();


    await expect(page).toHaveTitle('Nexora');
});
