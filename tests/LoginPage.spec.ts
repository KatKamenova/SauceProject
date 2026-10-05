import { expect, test } from "@playwright/test";
import { landingPage } from "../Pages/LandingPage/landingPage";

test(
  "Login with valid credentials",
  { tag: ["@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("/");
    const loginPage = new landingPage(page);
    await loginPage.loginWithValidCredentials();
    //expect the user to be redirected to the products page successfully after login
    await expect(page.getByText("Products")).toBeVisible();
  },
);

test("Login with locked out user", async ({ page }) => {
  await page.goto("/");
  const loginPage = new landingPage(page);
  await loginPage.loginWithLockedOutUser();
  /* expect the user to see an error message 
  indicating the correct behaviour of the application 
  when a locked out user tries to login */
  await expect(loginPage.LOCKED_USER_ERROR).toHaveText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});
