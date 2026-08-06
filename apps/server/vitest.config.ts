import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: [path.resolve(__dirname, "tests/setup.ts")],
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: [
        "src/modules/auth/**/*.ts",
        "src/modules/products/**/*.ts",
        "src/modules/inventory/**/*.ts",
        "src/modules/customers/**/*.ts",
        "src/modules/orders/**/*.ts",
        "src/modules/payment/**/*.ts",
        "src/modules/pos/**/*.ts",
        "src/modules/upload/**/*.ts",
        "src/modules/ai/**/*.ts",
        "src/modules/maps/**/*.ts",
        "src/modules/notifications/**/*.ts",
        "src/middlewares/**/*.ts",
        "src/utils/**/*.ts",
      ],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
    },
  },
});
