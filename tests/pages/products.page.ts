import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly product: Locator;
  readonly addToCartBtn: Locator;
  readonly addedToCartConfirmationMsg: Locator;
  readonly viewCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.addedToCartConfirmationMsg = page
      .locator("div")
      .filter({ hasText: "Product added to shopping" })
      .nth(2);
    this.viewCartBtn = page.locator('[data-test="nav-cart"]');
  }

  async gotoProducts() {
    await this.page.goto("https://practicesoftwaretesting.com/");
  }

  async addProductToCart(productName: string) {
    const productCard = this.page.locator(`xpath=//img[@alt='${productName}']`);
    await productCard.click();
    await this.addToCartBtn.click();
    await expect(this.addedToCartConfirmationMsg).toHaveText(
      "Product added to shopping cart."
    );
  }

  async viewCart() {
    await this.viewCartBtn.click();
  }
}
