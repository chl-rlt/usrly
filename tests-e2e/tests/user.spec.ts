import { test, expect } from "@playwright/test";

test.describe("User Management", () => {
  test("Create and Update User", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("dev@example.com");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("dev123");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL("/#/users");
    await page.locator('a[aria-label="Create"]').click();
    await expect(page).toHaveURL("/#/users/create");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("test@example.com");
    await page.locator('[data-testid="password"] input').click();
    await page.locator('[data-testid="password"] input').fill("Testdev123!");
    await page.locator('[data-testid="password-confirm"] input').click();
    await page
      .locator('[data-testid="password-confirm"] input')
      .fill("Testdev123!");
    await page.getByTestId("save-button").click();
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("test2@example.com");
    await page.getByLabel("Last name").click();
    await page.getByLabel("Last name").fill("Doe");
    await page.getByLabel("First name").click();
    await page.getByLabel("First name").fill("John");
    await page.getByTestId("save-button").click();
  });
});
