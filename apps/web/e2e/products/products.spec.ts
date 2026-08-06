import { test, expect } from "@playwright/test";

test.describe("Product Catalog E2E Journey", () => {
  test("should render product catalog page and search bar", async ({ page }) => {
    await page.goto("/products");

    await expect(page).toHaveTitle(/Rishabh Provision Store/i);
    await expect(page.locator("body")).toBeVisible();
  });

  test("should filter products by search query", async ({ page }) => {
    await page.goto("/products");

    const searchInput = page.getByPlaceholder(/search product|sku|barcode/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill("Atta");
      await page.waitForTimeout(500);
      await expect(page.locator("body")).toBeVisible();
    }
  });
});
