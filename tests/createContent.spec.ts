import { expect, test } from "../fixtures";
import { selectTenant, Tenant } from "../utils/selectTalent";
import { waitLoading } from "../utils/waitLoading";

const townAndCountryTenant: Tenant = {
  id: "befe5746-4ff4-4dfb-8792-814adb6c8a9f",
  name: "Town & Country",
  siteId: "115eff3b-95a0-4668-832c-9d02ea92500d",
};
const headlineTitle = "headline-test";
const dek = "dek-test";

test("create content", async ({ page, baseURL, content }) => {
  await content.goto(`${baseURL}/creation/content`);
  await waitLoading(page);
  
  await selectTenant(page, townAndCountryTenant);

  await content.openCreateContent();
  await expect(content.toolbar()).toBeVisible();

  await content.fillContentFields(headlineTitle, dek);
  await content.addImage();
  await content.configureImage();
  await expect(content.settingsLink()).toBeVisible();

  await content.configureSettings();
  await content.setSlug(headlineTitle);
  await content.saveAndPublish();
});
