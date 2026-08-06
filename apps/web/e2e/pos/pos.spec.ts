import { test, expect } from "@playwright/test";

test.describe("Cashier POS Terminal E2E Journey", () => {
  test("should render POS terminal cashier screen", async ({ page }) => {
    await page.goto("/pos");

    await expect(page.locator("body")).toBeVisible();
  });
});
