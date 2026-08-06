import { describe, it, expect } from "vitest";
import { lockoutService } from "../../src/security/lockout.service";
import { api } from "../helpers/testApp";

describe("Enterprise Zero-Trust Security Unit & Integration Tests", () => {
  it("should track failed login attempts and lock out after 5 failures", () => {
    const userKey = "user_test_lockout@example.com";
    lockoutService.resetAttempts(userKey);

    for (let i = 0; i < 4; i++) {
      const res = lockoutService.recordFailedAttempt(userKey);
      expect(res.locked).toBe(false);
    }

    const fifthRes = lockoutService.recordFailedAttempt(userKey);
    expect(fifthRes.locked).toBe(true);

    const isLocked = lockoutService.isLockedOut(userKey);
    expect(isLocked.locked).toBe(true);
    expect(isLocked.remainingSeconds).toBeGreaterThan(0);
  });

  it("should return OWASP ASVS posture metrics from GET /api/v1/security/status", async () => {
    const res = await api.get("/api/v1/security/status");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("owaspCompliance");
    expect(res.body.data).toHaveProperty("jwt");
    expect(res.body.data).toHaveProperty("rbac");
    expect(res.body.data).toHaveProperty("headers");
  });

  it("should include OWASP Helmet security headers in HTTP responses", async () => {
    const res = await api.get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.headers).toHaveProperty("x-content-type-options", "nosniff");
  });
});
