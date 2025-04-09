import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import testData from "../test-data/testData.json";
import { ProductPage } from "../pages/products.page";
import { CartPage } from "../pages/cart.page";

test.describe("Purchase flow", () => {
  test("Add a product to cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.enterEmailAndPassword(
      testData.validUser.email,
      testData.validUser.password
    );

    const productPage = new ProductPage(page);
    await productPage.gotoProducts();
    await productPage.addProductToCart("Combination Pliers");
    await productPage.viewCart();

    const cartPage = new CartPage(page);
    await cartPage.verifyItemInCart("Combination Pliers");
    await cartPage.proceedToCheckout();
  });
});
