
import { test, expect } from '@playwright/test';
import { VehiclePage } from '../pages/VehiclePage';


test('Login and navigate to Vehicles page', async ({ page }) => {

    // Open Nexora
    await page.goto('https://admin.nexorabysoradis.com/');

    // Verify dashboard after authentication
    await expect(page).not.toHaveURL(/\/login$/);

    // Create Vehicle Page object
    const vehiclePage = new VehiclePage(page);

    // Navigate to Vehicles
    await vehiclePage.navigateToVehicles();

    // Verify Vehicles page
    await expect(
        page.getByRole('heading', { name: 'Fleet Management' })
    ).toBeVisible();

});
test('Login and open Add Vehicle form', async ({ page }) => {

    await page.goto('https://admin.nexorabysoradis.com/');

    const vehiclePage = new VehiclePage(page);

    await vehiclePage.navigateToVehicles();

    await vehiclePage.clickAddVehicle();

});

test('Add New Vehicle - Vehicle Details', async ({ page }) => {

    await page.goto('https://admin.nexorabysoradis.com/');

    const vehiclePage = new VehiclePage(page);

    await vehiclePage.navigateToVehicles();

    await vehiclePage.clickAddVehicle();

    await vehiclePage.fillVehicleDetailsAndContinue();

});