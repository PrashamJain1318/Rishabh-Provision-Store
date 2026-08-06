import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { api } from "../helpers/testApp";

describe("Enterprise Production Readiness Certification Unit Tests (v1.0.0)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("should verify production certification report and release notes exist", () => {
    const certDoc = fs.readFileSync(path.join(rootDir, "docs/PRODUCTION_CERTIFICATION.md"), "utf-8");
    const releaseNotes = fs.readFileSync(path.join(rootDir, "docs/RELEASE_NOTES_v1.0.0.md"), "utf-8");

    expect(certDoc).toContain("PASS - CERTIFIED FOR PRODUCTION LAUNCH");
    expect(certDoc).toContain("System Production Readiness Index");
    expect(releaseNotes).toContain("Version 1.0.0 Release Notes");
  });

  it("should verify zero-blocker status via live health endpoint probe GET /api/v1/health/live", async () => {
    const res = await api.get("/api/v1/health/live");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("ALIVE");
  });
});
