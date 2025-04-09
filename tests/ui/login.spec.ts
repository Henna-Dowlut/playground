import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import testData from "../test-data/testData.json";

/*User Authentication
• Valid Login (Enter correct credentials & verify login)
• Invalid Login (Enter wrong credentials & validate error message)*/

test.describe("Authentication Flow", () => {
  test("Invalid login", async ({ page }, testInfo) => {
    const loginpage = new LoginPage(page);
    await loginpage.gotoLogin();
    await testInfo.attach("login page", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await loginpage.enterEmailAndPassword(
      testData.invalidUser.email,
      testData.invalidUser.password
    );
    await expect(loginpage.loginErrorMsg).toHaveText(
      "Invalid email or password"
    );
    await testInfo.attach("login error", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  });

  test("Valid login", async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.gotoLogin();
    await loginpage.enterEmailAndPassword(
      testData.validUser.email,
      testData.validUser.password
    );
    await expect(loginpage.loggedInUserNavBar).toHaveText("Jack Howe");
    await loginpage.clickOnNavBarUsername();
    await expect(loginpage.userNavBarDropdown).toContainText([
      "My accountMy favoritesMy profileMy invoicesMy messagesSign out",
    ]);
  });
});
