import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("dev@example.com");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("dev123");
    await page.getByRole("button", { name: "Sign In" }).click();
  });

  test("Login page redirects to home page", async ({ page }) => {
    await expect(page).toHaveURL("/#/users");
  });

  test("Logout", async ({ page }) => {
    await page
      .locator('button.MuiIconButton-root[aria-label="Profile"]')
      .click();
    await page.getByRole("menuitem", { name: "Logout" }).click();
    await page.goto("/");
    await expect(page).toHaveURL("/#/login");
  });
});
