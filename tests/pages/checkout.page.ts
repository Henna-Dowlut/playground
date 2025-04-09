import { expect, Locator, Page } from "@playwright/test";
import { TIMEOUT } from "dns";
export class CheckoutPage {
  readonly page: Page;
  readonly streetField: Locator;
  readonly stateField: Locator;
  readonly postalCodeField: Locator;
  readonly proceedCheckoutBtn1: Locator;
  readonly proceedCheckoutBtn2: Locator;
  readonly paymentHeading: Locator;
  readonly paymentCombobox: Locator;
  readonly confirmPaymentBtn: Locator;
  readonly paymentSuccessMsg: Locator;
  readonly bankName: Locator;
  readonly accountName: Locator;
  readonly accountNumber: Locator;
  readonly bankErrorMsg: Locator;
  readonly accountNameErrorMsg: Locator;
  readonly accountNumberErrorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.streetField = page.getByLabel("Street");
    this.stateField = page.getByLabel("State");
    this.postalCodeField = page.getByLabel("Postal code");
    this.proceedCheckoutBtn1 = page.locator('[data-test="proceed-2"]');
    this.proceedCheckoutBtn2 = page.locator('[data-test="proceed-3"]');
    this.paymentHeading = page.getByRole("heading", { name: "Payment" });
    this.paymentCombobox = page.locator('[data-test="payment-method"]');
    this.confirmPaymentBtn = page.locator('[data-test="finish"]');
    this.paymentSuccessMsg = page.locator(
      '[data-test="payment-success-message"]'
    );
    this.bankName = page.locator('[data-test="bank_name"]');
    this.accountName = page.locator('[data-test="account_name"]');
    this.accountNumber = page.locator('[data-test="account_number"]');
    this.bankErrorMsg = page.getByText("Bank name can only contain");
    this.accountNameErrorMsg = page.getByText("Account name can contain");
    this.accountNumberErrorMsg = page.getByText("Account number must be");
  }

  async verifyCheckoutPage() {
    await this.proceedCheckoutBtn1.waitFor({ state: "visible" });
    await this.proceedCheckoutBtn1.click();
    await this.page.waitForLoadState();
    await expect(this.stateField).toBeVisible();
    await expect(this.postalCodeField).toBeVisible();
  }

  async fillBillingAddressDetails(state: string, postalCode: string) {
    await this.stateField.click();
    await this.stateField.fill("State 1");
    await this.page.waitForLoadState();
    await this.postalCodeField.click();
    await this.postalCodeField.fill("224");
    await this.page.waitForLoadState();
    // Wait for and click the final proceed button
    await expect(this.proceedCheckoutBtn2).toBeEnabled();
    await this.proceedCheckoutBtn2.click();
  }

  async choosePaymentMethod(method: string) {
    await expect(this.paymentHeading).toBeVisible();
    await this.paymentCombobox.waitFor({ state: "visible" });
    await this.paymentCombobox.selectOption(method);
    await this.confirmPaymentBtn.waitFor({ state: "visible" });
  }

  async fillPaymentDetails(
    bank_name: string,
    account_name: string,
    account_number: string
  ) {
    await this.bankName.fill(bank_name);
    await this.accountName.fill(account_name);
    await this.accountNumber.fill(account_number);
  }

  async confirmPayment() {
    expect(this.confirmPaymentBtn).toBeVisible();
    await this.confirmPaymentBtn.click();
  }

  async getConfirmationMessage() {
    await this.paymentSuccessMsg.waitFor({ state: "visible" });
    await expect(this.paymentSuccessMsg).toHaveText("Payment was successful");
  }

  async getErrorMessage() {
    await this.bankErrorMsg.waitFor({ state: "visible" });
    await this.accountNameErrorMsg.waitFor({ state: "visible" });
    await this.accountNumberErrorMsg.waitFor({ state: "visible" });
    await expect(this.bankErrorMsg).toHaveText(
      "Bank name can only contain letters and spaces."
    );
    await expect(this.accountNameErrorMsg).toHaveText(
      "Account name can contain letters, numbers, spaces, periods, apostrophes, and hyphens."
    );
    await expect(this.accountNumberErrorMsg).toHaveText(
      "Account number must be numeric."
    );
  }
}
