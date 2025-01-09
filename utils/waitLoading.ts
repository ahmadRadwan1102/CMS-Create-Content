import { expect, Page } from "@playwright/test";

export async function waitLoading(page: Page) {
    await expect(page.getByTestId('loading-icon').last()).toBeHidden({timeout: 7000});
}