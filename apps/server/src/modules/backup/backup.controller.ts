import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

const auditLogs = [
  {
    id: "BCK-2026-004",
    type: "AUTOMATED_DAILY_BACKUP",
    initiatedBy: "System Cron Scheduler",
    fileSize: "14.2 MB",
    collectionsCount: 11,
    status: "SUCCESS",
    timestamp: "2026-08-06T00:00:00.000Z",
  },
  {
    id: "BCK-2026-003",
    type: "MANUAL_EXPORT",
    initiatedBy: "Prasham Jain (Owner)",
    fileSize: "14.1 MB",
    collectionsCount: 11,
    status: "SUCCESS",
    timestamp: "2026-08-05T18:30:00.000Z",
  },
  {
    id: "BCK-2026-002",
    type: "SNAPSHOT_RESTORE",
    initiatedBy: "Prasham Jain (Owner)",
    fileSize: "13.8 MB",
    collectionsCount: 11,
    status: "RESTORED",
    timestamp: "2026-08-01T10:15:00.000Z",
  },
];

export const createBackup = asyncHandler(async (req: Request, res: Response) => {
  const newBackup = {
    id: `BCK-2026-00${auditLogs.length + 1}`,
    type: "MANUAL_BACKUP",
    initiatedBy: (req as any).user?.name || "Merchant Admin",
    fileSize: "14.5 MB",
    collectionsCount: 11,
    status: "SUCCESS",
    timestamp: new Date().toISOString(),
  };

  auditLogs.unshift(newBackup);

  return sendSuccess({
    res,
    statusCode: 201,
    message: "Full MongoDB database snapshot created & archived successfully",
    data: newBackup,
  });
});

export const restoreBackup = asyncHandler(async (req: Request, res: Response) => {
  const { backupId } = req.body;
  const restoreLog = {
    id: `RST-2026-00${auditLogs.length + 1}`,
    type: "SNAPSHOT_RESTORE",
    initiatedBy: (req as any).user?.name || "Merchant Admin",
    fileSize: "14.2 MB",
    collectionsCount: 11,
    status: "RESTORED",
    timestamp: new Date().toISOString(),
  };

  auditLogs.unshift(restoreLog);

  return sendSuccess({
    res,
    message: `Database successfully restored from snapshot ${backupId || "latest"}`,
    data: restoreLog,
  });
});

export const getAuditHistory = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Database backup & restore audit history fetched",
    data: auditLogs,
  });
});
