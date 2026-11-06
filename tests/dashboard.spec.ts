import { test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test('Verify Nexora dashboard after login', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Open Nexora using the saved authentication session
    await page.goto('https://admin.nexorabysoradis.com/');

    await page.goto('https://admin.nexorabysoradis.com/');

   console.log('Dashboard test URL:', page.url());

    // Verify dashboard is displayed
    await dashboardPage.verifyDashboardDisplayed();
});
