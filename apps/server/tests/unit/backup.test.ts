import { describe, it, expect } from "vitest";
import { backupService } from "../../src/modules/backup/backup.service";
import { retentionService } from "../../src/modules/backup/retention.service";
import { api } from "../helpers/testApp";

describe("Disaster Recovery & Backup Engine Unit Tests", () => {
  it("should generate timestamped backup snapshot with SHA-256 checksum", async () => {
    const snapshot = await backupService.createBackupSnapshot("MANUAL_BACKUP");

    expect(snapshot).toHaveProperty("id");
    expect(snapshot.checksum).toHaveLength(64);
    expect(snapshot.status).toBe("SUCCESS");
    expect(snapshot.collectionsCount).toBeGreaterThan(0);
  });

  it("should verify snapshot integrity in dry run mode", async () => {
    const snapshot = await backupService.createBackupSnapshot("MANUAL_BACKUP");
    const dryRun = await backupService.verifyBackupDryRun(snapshot.id);

    expect(dryRun.valid).toBe(true);
    expect(dryRun.checksumMatched).toBe(true);
  });

  it("should enforce retention policy cleaning expired backups older than 14 days", () => {
    const oldDate = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString();
    const mockBackups = [
      { id: "OLD-1", type: "AUTOMATED_DAILY", createdAt: oldDate },
      { id: "NEW-1", type: "AUTOMATED_DAILY", createdAt: new Date().toISOString() },
    ];

    const result = retentionService.cleanExpiredBackups(mockBackups);
    expect(result.purgedCount).toBe(1);
    expect(result.retainedCount).toBe(1);
  });

  it("should return RTO and RPO metrics from GET /api/v1/backup/status", async () => {
    const res = await api.get("/api/v1/backup/status");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.rtoMinutes).toBe(15);
    expect(res.body.data.rpoHours).toBe(1);
  });
});
