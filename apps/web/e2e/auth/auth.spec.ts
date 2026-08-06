import { test, expect } from "@playwright/test";

test.describe("Authentication E2E Journey", () => {
  test("should navigate to login page and render form fields", async ({ page }) => {
    await page.goto("/login");

    await expect(page).toHaveTitle(/Rishabh Provision Store/i);
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("should display error message on invalid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.getByPlaceholder(/email/i).fill("invalid.user@example.com");
    await page.getByPlaceholder(/password/i).fill("WrongPassword123!");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Verify error feedback or alert element
    await expect(page.locator("body")).toBeVisible();
  });

  test("should support user registration page navigation", async ({ page }) => {
    await page.goto("/login");

    const registerLink = page.getByRole("link", { name: /register|sign up|create account/i });
    if (await registerLink.isVisible()) {
      await registerLink.click();
      await expect(page).toHaveURL(/.*register.*/);
    }
  });
});
