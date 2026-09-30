import { expect, test } from "@playwright/test";
import { landingPage } from "../Pages/LandingPage/landingPage";

test(
  "Login with valid credentials",
  { tag: ["@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("/");
    const loginPage = new landingPage(page);
    await loginPage.loginWithValidCredentials();
    await expect(page.getByText("Products")).toBeVisible();
  },
);

test("Login with locked out user", async ({ page }) => {
  await page.goto("/");
  const loginPage = new landingPage(page);
  await loginPage.loginWithLockedOutUser();
  await expect(loginPage.LOCKED_USER_ERROR).toHaveText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});
