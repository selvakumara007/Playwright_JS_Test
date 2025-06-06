// pages/PersonInfoPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

interface PersonDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  ssnPart1: string; // First 3 digits
  ssnPart2: string; // Middle 2 digits
  ssnPart3: string; // Last 4 digits
}

export class PersonInfoPage extends BasePage {
  private readonly firstNameField = this.page.getByLabel("First Name");
  private readonly middleNameField = this.page.getByLabel(
    "Middle Name (Optional)"
  );
  private readonly lastNameField = this.page.getByLabel("Last Name");
  private readonly ssnPart1Field = this.page.getByLabel(
    "Social Security Number"
  );
  private readonly ssnPart2Field = this.page.getByRole("textbox", {
    name: "SSN (Middle 2 digits)",
  });
  private readonly ssnPart3Field = this.page.getByRole("textbox", {
    name: "SSN (Last 4 digits)",
  });
  private readonly addPersonButton = this.page.getByRole("button", {
    name: "Add Person",
  });
  private readonly personToOptOutText = this.page.locator("app-person");
  private readonly backButton = this.page.getByRole("button", {
    name: "Back",
  });

  constructor(page: Page) {
    super(page);
  }

  async verifyInitialState(): Promise<void> {
    await this.expectElementToBeEmpty(
      this.firstNameField,
      "First Name field should be empty"
    );
  }

  async fillPersonDetails(details: PersonDetails): Promise<void> {
    await this.fillElement(this.firstNameField, details.firstName);
    if (details.middleName) {
      await this.fillElement(this.middleNameField, details.middleName);
    }
    await this.fillElement(this.lastNameField, details.lastName);
    await this.fillElement(this.ssnPart1Field, details.ssnPart1);
    await this.fillElement(this.ssnPart2Field, details.ssnPart2);
    await this.fillElement(this.ssnPart3Field, details.ssnPart3);
  }

  async addPerson(): Promise<void> {
    await this.clickElement(this.addPersonButton);
  }

  async verifyPersonAdded(): Promise<void> {
    await this.expectElementToBeVisible(
      this.backButton,
      "Back button should be visible after adding person"
    ); // Assuming backButton is still visible
    await this.expectElementToContainText(
      this.personToOptOutText,
      "Person to Opt Out",
      "Person to Opt Out section should display"
    );
  }
}
