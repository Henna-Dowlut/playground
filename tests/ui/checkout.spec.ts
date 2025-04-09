import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../pages/checkout.page";
import { LoginPage } from "../pages/login.page";
import { ProductPage } from "../pages/products.page";
import { CartPage } from "../pages/cart.page";
import testData from "../test-data/testData.json";
import { PaymentMethod } from "../test-data/paymentMethod";

test.describe("Checkout & Complete Order", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.gotoLogin();
    await loginPage.enterEmailAndPassword(
      testData.validUser.email,
      testData.validUser.password
    );
    await testInfo.attach("login success", {
      body: await page.screenshot(),
      contentType: "image/png",
    });

    await productPage.gotoProducts();
    await productPage.addProductToCart("Combination Pliers");
    await productPage.viewCart();
    await testInfo.attach("cart", {
      body: await page.screenshot(),
      contentType: "image/png",
    });

    await cartPage.verifyCartPage();
    await cartPage.verifyItemInCart("Combination Pliers");
    await cartPage.proceedToCheckout();
    await testInfo.attach("proceed checkout", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  });

  test("Valid checkout with one product", async ({ page }, testInfo) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyCheckoutPage();
    await checkoutPage.fillBillingAddressDetails("State 1", "224");
    await testInfo.attach("billing details", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await checkoutPage.choosePaymentMethod(PaymentMethod.CashOnDelivery);
    await checkoutPage.confirmPayment();
    await checkoutPage.getConfirmationMessage();
    await testInfo.attach("payment confirmation", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  });

  test("Invalid checkout with bad payment", async ({ page }, testInfo) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyCheckoutPage();
    await checkoutPage.fillBillingAddressDetails("State 1", "224");
    await testInfo.attach("billing details", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await checkoutPage.choosePaymentMethod(PaymentMethod.BankTransfer);

    await checkoutPage.fillPaymentDetails(
      testData.validBankTransfer.bank_name,
      testData.validBankTransfer.account_name,
      testData.validBankTransfer.account_number
    );
    await testInfo.attach("payment details", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await checkoutPage.getErrorMessage();
    await testInfo.attach("payment confirmation", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  });

  test("Multiple Product Order", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyCheckoutPage();
  });
});
