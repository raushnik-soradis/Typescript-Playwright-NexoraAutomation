
import { Page, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async verifyDashboardDisplayed() {
    await expect(this.page).toHaveURL(/\/$/);
    await expect(this.page.getByText('Dashboard', { exact: true }).first())
      .toBeVisible();
  }
}
