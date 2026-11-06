import { Page, expect } from '@playwright/test';

export class VehiclePage {
    constructor(private page: Page) {}
    async navigateToVehicles() {

    const vehiclesButton = this.page.getByText('Vehicles', {
        exact: true
    });

    await expect(vehiclesButton).toBeVisible();

    await vehiclesButton.click();

    await expect(
        this.page.getByRole('heading', {
            name: 'Fleet Management'
        })
    ).toBeVisible();
}
async clickAddVehicle() {

    await this.page.getByRole('button', {
        name: 'Add Vehicle',
        exact: true
    }).click();

    // Verify Add Vehicle form opens
    await expect(
        this.page.getByRole('dialog')
    ).toBeVisible();
}
async fillVehicleDetailsAndContinue() {

    const dialog = this.page.getByRole('dialog');

    // Vehicle Details
    await dialog.getByPlaceholder('e.g., MH-02-AB-1234')
        .fill('MH-12-XY-6789');

    await dialog.getByPlaceholder('e.g., Tata LPT 3118')
        .fill('Tata LPT 3118');

    await dialog.getByPlaceholder('e.g., Truck - 32ft')
        .fill('Truck - 32ft');

    await dialog.getByPlaceholder('e.g., 2021')
        .fill('2022');

    await dialog.getByPlaceholder('17-character VIN')
        .fill('1HGCM82633A123456');

    await dialog.getByPlaceholder('Engine identification number')
        .fill('ENG123456789');


// Open Branch / Warehouse dropdown
await dialog.getByRole('combobox').click();

// Select warehouse (dropdown is outside the dialog)
const warehouseOption = this.page.getByText(
    'Western Superfresh warehouse - Panvel, Maharashtra',
    { exact: true }
);

await expect(warehouseOption).toBeVisible();

await warehouseOption.click();

// Verify selection
await expect(
    dialog.getByText(
        'Western Superfresh warehouse - Panvel, Maharashtra',
        { exact: true }
    )
).toBeVisible();

 // Click Next
    await dialog.getByRole('button', {
        name: 'Next',
        exact: true
    }).click();
}


}


