import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("Authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://practicesoftwaretesting.com/auth/login");
  await page
    .locator('[data-test="email"]')
    .fill("customer@practicesoftwaretesting.com");
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL("https://practicesoftwaretesting.com/account");
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole("button", { name: "Jane Doe" })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
