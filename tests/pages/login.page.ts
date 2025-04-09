import { expect, Locator, Page } from "@playwright/test";
import path from "path";
export class LoginPage {
  readonly url = "https://practicesoftwaretesting.com/auth/login";
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly submitBtn: Locator;
  readonly passwordErrorMsg: Locator;
  readonly loginErrorMsg: Locator;
  readonly loggedInUserNavBar: Locator;
  readonly userNavBarDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.submitBtn = page.locator('[data-test="login-submit"]');
    this.passwordErrorMsg = page.getByText("Password is required");
    this.loginErrorMsg = page.locator('[data-test="login-error"]');
    this.loggedInUserNavBar = page.locator('[data-test="nav-menu"]');
    this.userNavBarDropdown = page.getByRole("list", { name: "Jack Howe" });
  }

  async gotoLogin() {
    await this.page.goto(this.url);
  }

  async enterEmailAndPassword(email: string, password: string) {
    await this.email.waitFor({ state: "visible" });
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitBtn.waitFor({ state: "visible" });
    await this.submitBtn.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickOnNavBarUsername() {
    await this.loggedInUserNavBar.click();
  }
}
