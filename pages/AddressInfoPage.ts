// pages/AddressInfoPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

interface AddressDetails {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  zipExtension?: string;
}

export class AddressInfoPage extends BasePage {
  private readonly addressLine1Field = this.page.getByRole("textbox", {
    name: "Address Line 1",
  });
  private readonly addressLine2Field = this.page.getByRole("textbox", {
    name: "Address Line 2",
  });
  private readonly cityField = this.page.getByRole("textbox", { name: "City" });
  private readonly stateDropdown = this.page.locator("#addressState");
  private readonly zipCodeField = this.page.getByRole("textbox", {
    name: "Zip Code",
  });
  private readonly zipExtensionField = this.page.getByRole("textbox", {
    name: "-Digit Zip Extension",
  });
  private readonly addAddressButton = this.page.getByRole("button", {
    name: "Add Address",
  });

  constructor(page: Page) {
    super(page);
  }

  async fillAddressDetails(details: AddressDetails): Promise<void> {
    await this.fillElement(this.addressLine1Field, details.addressLine1);
    if (details.addressLine2) {
      await this.fillElement(this.addressLine2Field, details.addressLine2);
    }
    await this.fillElement(this.cityField, details.city);
    await this.selectOptionByValue(this.stateDropdown, details.state);
    await this.fillElement(this.zipCodeField, details.zipCode);
    if (details.zipExtension) {
      await this.fillElement(this.zipExtensionField, details.zipExtension);
    }
  }

  async addAddress(): Promise<void> {
    await this.clickElement(this.addAddressButton);
  }
}
