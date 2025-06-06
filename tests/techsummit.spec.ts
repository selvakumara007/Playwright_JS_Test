// tests/techsummit.spec.ts (assuming you put your tests in a 'tests' folder)
import { test, expect } from "@playwright/test";
import { OptOutFormPage } from "../pages/OptOutFormPage";
import { PersonInfoPage } from "../pages/PersonInfoPage";
import { AddressInfoPage } from "../pages/AddressInfoPage";
import { ConfirmationPage } from "../pages/ConfirmationPage";

test.describe("LexisNexis Opt-Out Flow", () => {
  let optOutFormPage: OptOutFormPage;
  let personInfoPage: PersonInfoPage;
  let addressInfoPage: AddressInfoPage;
  let confirmationPage: ConfirmationPage;

  test.beforeEach(async ({ page }) => {
    optOutFormPage = new OptOutFormPage(page);
    personInfoPage = new PersonInfoPage(page);
    addressInfoPage = new AddressInfoPage(page);
    confirmationPage = new ConfirmationPage(page);
  });

  test("should successfully complete the opt-out process", async ({ page }) => {
    // Step 1: Initial Page and Navigation
    await optOutFormPage.navigateToForm();
    await optOutFormPage.verifyInitialPageElements();

    // Step 2: Instructions Page
    await optOutFormPage.clickNext();
    await optOutFormPage.verifyInstructionsPageElements(); // Includes the 3-second wait from original

    // Step 3: Opt-Out Reason Page
    await optOutFormPage.clickNext();
    await optOutFormPage.selectOptOutReason("CONSUMER");
    await optOutFormPage.clickNext();

    // Step 4: Add First Person Details
    await personInfoPage.verifyInitialState();
    await personInfoPage.fillPersonDetails({
      firstName: "Selva",
      middleName: "Kumar",
      lastName: "A",
      ssnPart1: "111",
      ssnPart2: "11",
      ssnPart3: "1111",
    });
    await personInfoPage.addPerson();

    // Step 5: Add Second Person Details (Example of reuse)
    // Original code had a dblclick/Ctrl+A which is slightly unusual for inputting details from scratch.
    // I'm simulating a fresh entry for the second person.
    await personInfoPage.fillPersonDetails({
      firstName: "Kapil",
      middleName: "Dev",
      lastName: "Selva",
      ssnPart1: "222",
      ssnPart2: "22",
      ssnPart3: "2222",
    });
    await personInfoPage.addPerson();
    await personInfoPage.verifyPersonAdded(); // Verifies 'Person to Opt Out' section and back button

    // Step 6: Navigate to Address Page
    await optOutFormPage.clickNext(); // Using optOutFormPage's clickNext as it's a generic "next" button

    // Step 7: Add Address Details
    await addressInfoPage.fillAddressDetails({
      addressLine1: "Chennai",
      addressLine2: "Chennai",
      city: "Chennai",
      state: "TX",
      zipCode: "11111",
      zipExtension: "1111",
    });
    await addressInfoPage.addAddress();

    // Step 8: Navigate to Confirmation Page
    await optOutFormPage.clickNext();

    // Step 9: Confirm Opt-Out
    await confirmationPage.verifyInitialState();
    await confirmationPage.confirmOptOut();
    await confirmationPage.verifyConfirmationMessage("Confirmation"); // Or specific ID if dynamic
  });
});
