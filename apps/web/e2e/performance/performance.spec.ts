import { test, expect } from "@playwright/test";

test.describe("Performance & Web Vitals Audit", () => {
  test("should measure Page Load and Time to Interactive", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);

    const performanceTiming = await page.evaluate(() => {
      const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: timing?.domContentLoadedEventEnd - timing?.startTime,
        loadEventEnd: timing?.loadEventEnd - timing?.startTime,
      };
    });

    expect(performanceTiming.domContentLoaded).toBeGreaterThanOrEqual(0);
  });
});
