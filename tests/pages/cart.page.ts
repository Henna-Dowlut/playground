import { expect, Locator, Page } from "@playwright/test";
export class CartPage {
  readonly page: Page;
  readonly product: Locator;
  readonly addToCartBtn: Locator;
  readonly cartNavBtn: Locator;
  readonly cartCell: Locator;
  readonly checkoutBtn: Locator;
  readonly cartItemNames: Locator;
  readonly checkoutBtn2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.product = page.getByRole("link", { name: "Pliers Pliers $12.01" });
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.cartNavBtn = page.locator('[data-test="nav-cart"]');
    this.cartCell = page.getByRole("cell", { name: "Pliers", exact: true });
    this.checkoutBtn = page.locator('[data-test="proceed-1"]');
    this.checkoutBtn2 = page.locator('[data-test="proceed-2"]');
    this.cartItemNames = page.locator(".product-title");
  }

  async goToCart() {
    await this.cartNavBtn.waitFor({ state: "visible" });
    await this.cartNavBtn.click();
  }

  async verifyProductInCart() {
    await this.cartCell.isVisible();
  }

  async verifyCartPage() {
    await expect(this.cartItemNames).toBeVisible;
    await expect(this.checkoutBtn).toBeVisible;
  }

  async verifyItemInCart(expectedProductName: string): Promise<void> {
    await expect(this.cartItemNames).toBeVisible;
    await expect(this.cartItemNames).toHaveText(expectedProductName.trim());
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}
