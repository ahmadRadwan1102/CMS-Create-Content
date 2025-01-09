import { expect, Page } from "@playwright/test";
type Tenant = {
  id: string;
  name: string;
  siteId: string;
};

async function selectTenant(page: Page, tenant: Tenant) {
  const nav = page.getByLabel("Navigation");
  await nav.locator('button[aria-label="Select Site"]').click();
  const searchInput = nav.locator('[data-testid="search-input"] ');
  await expect(searchInput).toBeVisible();
  await searchInput.fill(tenant.name);
  await nav.getByTestId(tenant.id).click();
  await page.getByTestId(tenant.siteId).click();
  await expect(searchInput).toBeHidden();
}

export { selectTenant, Tenant };
