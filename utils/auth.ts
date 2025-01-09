import { Page } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const EMAIL = process.env.EMAIL!;
const PASSWORD = process.env.PW!;

export async function authenticate(page: Page): Promise<void> {
  await page.locator("input#okta-signin-username").fill(EMAIL);
  await page.locator("input#okta-signin-password").fill(PASSWORD);
  await page.locator("input#okta-signin-submit").click();
  await page.waitForLoadState('networkidle')
}
