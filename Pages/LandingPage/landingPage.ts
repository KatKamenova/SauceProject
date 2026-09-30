import { Page, Locator } from "@playwright/test";
import { UserLoginDetails, UserPassword } from "../../Enums/userLoginDetails";

export class landingPage {
  readonly USERNAME: Locator;
  readonly PASSWORD: Locator;
  readonly LOGIN_BUTTON: Locator;

  constructor(page: Page) {
    this.USERNAME = page.getByRole("textbox", { name: "Username" });
    this.PASSWORD = page.locator("#password");
    this.LOGIN_BUTTON = page.getByRole("button", { name: "Login" });
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
}
