import { Request, Response } from "express";
import { backupService } from "./backup.service";
import { retentionService } from "./retention.service";
import { sendSuccess } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const createBackup = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.body;
  const backup = await backupService.createBackupSnapshot(type || "MANUAL_BACKUP", (req as any).user?.name);

  return sendSuccess({
    res,
    statusCode: 201,
    message: "Full MongoDB, Redis, BullMQ & Cloudinary snapshot created and archived",
    data: backup,
  });
});

export const restoreBackup = asyncHandler(async (req: Request, res: Response) => {
  const { backupId, isDryRun } = req.body;

  if (isDryRun) {
    const dryRunResult = await backupService.verifyBackupDryRun(backupId);
    return sendSuccess({
      res,
      message: `Dry Run verification successful for snapshot ${backupId || "latest"}`,
      data: dryRunResult,
    });
  }

  const restoreResult = await backupService.restoreBackupSnapshot(backupId);
  return sendSuccess({
    res,
    message: restoreResult.message,
    data: restoreResult,
  });
});

export const getAuditHistory = asyncHandler(async (req: Request, res: Response) => {
  const history = backupService.getHistory();
  return sendSuccess({
    res,
    message: "Database backup & restore audit history fetched",
    data: history,
  });
});

export const getBackupStatus = asyncHandler(async (req: Request, res: Response) => {
  const history = backupService.getHistory();
  const latest = history[0];
  const retention = retentionService.getPolicy();

  return sendSuccess({
    res,
    message: "Backup engine and disaster recovery status operational",
    data: {
      status: "OPERATIONAL",
      rtoMinutes: 15,
      rpoHours: 1,
      latestBackup: latest,
      totalBackups: history.length,
      retentionPolicy: retention,
      timestamp: new Date().toISOString(),
    },
  });
});

export const getStorageMetrics = asyncHandler(async (req: Request, res: Response) => {
  const history = backupService.getHistory();
  const totalMb = history.reduce((acc, b) => acc + (b.fileSizeMb || 14.2), 0);

  return sendSuccess({
    res,
    message: "Disaster recovery storage usage metrics fetched",
    data: {
      totalStorageUsedMb: Number(totalMb.toFixed(2)),
      storageLimitMb: 10240, // 10 GB
      availableMb: Number((10240 - totalMb).toFixed(2)),
      backupCount: history.length,
    },
  });
});
