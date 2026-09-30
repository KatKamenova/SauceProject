import { Page, Locator } from "@playwright/test";
import { UserLoginDetails, UserPassword } from "../../Enums/userLoginDetails";

export class landingPage {
  readonly USERNAME: Locator;
  readonly PASSWORD: Locator;
  readonly LOGIN_BUTTON: Locator;
  readonly LOCKED_USER_ERROR: Locator;

  constructor(page: Page) {
    this.USERNAME = page.getByRole("textbox", { name: "Username" });
    this.PASSWORD = page.locator("#password");
    this.LOGIN_BUTTON = page.getByRole("button", { name: "Login" });
    this.LOCKED_USER_ERROR = page.locator('[data-test="error"]');
  }

  async login(username: string, password: string) {
    await this.USERNAME.fill(username);
    await this.PASSWORD.fill(password);
    await this.LOGIN_BUTTON.click();
  }

  async loginWithValidCredentials(
    username: UserLoginDetails = UserLoginDetails.StandardUser,
  ) {
    await this.login(username, UserPassword.SauceDemo);
  }

  async loginWithLockedOutUser(
    username: UserLoginDetails = UserLoginDetails.LockedOutUser,
  ) {
    await this.login(username, UserPassword.SauceDemo);
  }
}
