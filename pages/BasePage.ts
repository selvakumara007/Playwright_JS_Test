// pages/BasePage.ts
import { Page, expect, Locator } from "@playwright/test"; // <-- IMPORTANT: Import 'Locator'

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  // --- All methods below now accept a Playwright 'Locator' object directly ---

  async clickElement(
    locator: Locator,
    options?: { timeout?: number }
  ): Promise<void> {
    await locator.click(options); // Use the provided Locator directly
  }

  async fillElement(locator: Locator, value: string): Promise<void> {
    await locator.fill(value); // Use the provided Locator directly
  }

  async selectOptionByValue(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value); // Use the provided Locator directly
  }

  async expectElementToBeVisible(
    locator: Locator,
    message?: string
  ): Promise<void> {
    await expect(locator, message).toBeVisible(); // Use the provided Locator directly
  }

  async expectElementToContainText(
    locator: Locator,
    text: string,
    message?: string
  ): Promise<void> {
    await expect(locator, message).toContainText(text); // Use the provided Locator directly
  }

  async expectElementToBeEmpty(
    locator: Locator,
    message?: string
  ): Promise<void> {
    await expect(locator, message).toBeEmpty(); // Use the provided Locator directly
  }

  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }
}
