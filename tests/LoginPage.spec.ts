import { expect, test } from "@playwright/test";
import { landingPage } from "../Pages/LandingPage/landingPage";

test("Login with valid credentials", async ({ page }) => {
  await page.goto("/");
  const loginPage = new landingPage(page);
  await loginPage.loginWithValidCredentials();
  await expect(page.getByText("Products")).toBeVisible();
});
