// pages/ConfirmationPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ConfirmationPage extends BasePage {
  private readonly emailCommunicationLabel = this.page.getByLabel(
    "Send email communications to"
  );
  private readonly confirmButton = this.page.getByRole("button", {
    name: "Confirm",
  });
  private readonly confirmationTextLocator =
    this.page.locator("app-confirmation");

  constructor(page: Page) {
    super(page);
  }

  async verifyInitialState(): Promise<void> {
    await this.expectElementToBeEmpty(
      this.emailCommunicationLabel,
      "Email communications label should be empty"
    );
    await this.expectElementToBeVisible(
      this.confirmButton,
      "Confirm button should be visible"
    );
  }

  async confirmOptOut(): Promise<void> {
    await this.clickElement(this.confirmButton);
  }

  async verifyConfirmationMessage(expectedText: string): Promise<void> {
    await this.expectElementToContainText(
      this.confirmationTextLocator,
      expectedText,
      `Confirmation text should contain "${expectedText}"`
    );
  }
}
