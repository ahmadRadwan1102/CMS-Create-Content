import { expect, Locator, Page } from "@playwright/test";
import { waitLoading } from "../utils/waitLoading";

export class Content {
  constructor(public readonly page: Page) {}

  /**
   * Locators
   */
  public createContentBtn = (): Locator =>
    this.page.getByRole("button", { name: "Create New Content" });
  
  public toolbar = (): Locator =>   this.page.getByTestId('toolbar');

  public titleInput = (): Locator => this.page.locator("#title p");

  public dekInput = (): Locator => this.page.locator("#dek p");

  public textAboveTestId = (): Locator => this.page.getByTestId("TEXT_ABOVE");

  public addImageHeading = (): Locator =>
    this.page.getByRole("heading", { name: "Add Image" });

  public secondCardArticle = (): Locator =>
    this.page.getByTestId("card-article").nth(1);

  public backBtn = (): Locator => this.page.locator("button[name='back']");

  public closeAsideBtn = (): Locator => this.page.getByLabel("Close");

  public settingsLink = (): Locator =>
    this.page.locator('button[data-testid$="settings"]');

  public headlinesLink = (): Locator =>
    this.page.locator('button[data-testid$="headlines"]');

  public slugInput = (): Locator => this.page.getByTestId("slug-input");

  public saveDraftBtn = (): Locator =>
    this.page.getByRole("button", { name: "Save Draft" });

  public publishBtn = (): Locator =>
    this.page.getByRole("button", { name: "publish" });

  /**
   * Navigates to the given URL.
   * @param url The URL to navigate to.
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Opens the Create Content page.
   */
  async openCreateContent(): Promise<void> {
    await this.createContentBtn().click();
    await waitLoading(this.page);
  }

  /**
   * Fills in the required fields for content.
   */
  async fillContentFields(headlineTitle: string, dek: string): Promise<void> {
    await this.titleInput().fill(headlineTitle);
    await this.dekInput().fill(dek);
  }

  /**
   * Adds an image to the content.
   */
  async addImage(): Promise<void> {
    await this.textAboveTestId().hover();
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Enter");

    await expect(this.addImageHeading()).toBeVisible();
    await this.secondCardArticle().click();
    await waitLoading(this.page);
  }
  /**
   * set a configration of Lead Image
   */
  async configureImage() : Promise<void> {
    const imageMetaId = 'leadImage.metadata.'
    await this.selectFirstOption(`${imageMetaId}copyright`);
    await this.selectFirstOption(`${imageMetaId}syndicationRights`);
    await this.selectFirstOption(`${imageMetaId}imageRights`);
    await this.closeAsideBtn().click();
  }

  /**
   * Sets a unique slug for the content.
   */
  async setSlug(headlineTitle: string): Promise<void> {
    await this.headlinesLink().click();
    const timeStamp = String(new Date().getTime());

    await this.slugInput().fill(`${headlineTitle}-${timeStamp}`);
    await this.closeAsideBtn().click();
  }

  /**
   * Configures settings for the content.
   */
  async configureSettings(): Promise<void> {
    await this.settingsLink().click();
    await this.selectFirstOption("content-type");
    await this.selectFirstOption("section");
    await this.closeAsideBtn().click();
  }

  /**
   * Saves the draft and publishes the content.
   */
  async saveAndPublish(): Promise<void> {
    if (await this.saveDraftBtn().isVisible()) {
      await this.saveDraftBtn().click();
    }

    await expect(this.publishBtn()).toBeVisible();
    await this.publishBtn().first().click();
    await this.publishBtn().last().click();
  }

  /**
   * Selects the first option from a dropdown menu.
   * @param selectionId The testId of the fieldset.
   */
  private async selectFirstOption(selectionId: string): Promise<void> {
    const selection = this.page.locator(
      `fieldset[data-testid="${selectionId}"]`
    );
    await selection.click();
    await this.isRelatedMenuOpen(selectionId);
    await this.page.keyboard.press("Enter");
  }

  /**
   * Checks if a menu related to a parent fieldset is open.
   * @param parentId The testId of the parent fieldset.
   */
  private async isRelatedMenuOpen(parentId: string): Promise<void> {
    const menu = this.page.locator(
      `fieldset[data-testid="${parentId}"] div[class$='-menu']`
    );
    await expect(menu).toBeVisible();
  }
}
