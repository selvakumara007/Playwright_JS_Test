// pages/OptOutFormPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OptOutFormPage extends BasePage {
  private readonly url = "https://prod.optout.lexisnexisrisk.com/";
  private readonly lexisNexisLink = this.page.getByRole("link", {
    name: "LexisNexis®",
  });
  private readonly formTitle = this.page.locator("h1");
  private readonly nextButton = this.page.getByRole("button", { name: "Next" });
  private readonly instructionsHeading = this.page.getByRole("heading", {
    name: "Instructions",
  });
  private readonly backButton = this.page.getByRole("button", { name: "Back" });
  private readonly optOutReasonHeading = this.page.getByRole("heading", {
    name: "Opt-Out Reason",
  });
  private readonly optOutReasonCombobox = this.page.getByRole("combobox");

  constructor(page: Page) {
    super(page);
  }

  async navigateToForm(): Promise<void> {
    await this.navigate(this.url);
    // Optional: Add a general wait or assertion here if the page takes time to load initially
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyInitialPageElements(): Promise<void> {
    await this.expectElementToBeVisible(
      this.lexisNexisLink,
      "LexisNexis® link should be visible"
    );
    await this.expectElementToContainText(
      this.formTitle,
      "LexisNexis Opt-Out Form",
      'Form title should contain "LexisNexis Opt-Out Form"'
    );
  }

  async clickNext(): Promise<void> {
    await this.clickElement(this.nextButton);
  }

  async verifyInstructionsPageElements(): Promise<void> {
    await this.wait(3000); // Consider replacing with explicit waits like expect.toBeVisible if possible
    await this.expectElementToBeVisible(
      this.instructionsHeading,
      "Instructions heading should be visible"
    );
    await this.expectElementToBeVisible(
      this.backButton,
      "Back button should be visible"
    );
  }

  async selectOptOutReason(reason: string): Promise<void> {
    await this.expectElementToBeVisible(
      this.optOutReasonHeading,
      "Opt-Out Reason heading should be visible"
    );
    await this.selectOptionByValue(this.optOutReasonCombobox, reason);
  }
}
