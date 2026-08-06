import logger from "../../utils/logger";

export interface RetentionPolicy {
  dailyRetentionDays: number;
  weeklyRetentionWeeks: number;
  monthlyRetentionMonths: number;
}

export class RetentionService {
  private readonly policy: RetentionPolicy = {
    dailyRetentionDays: 14,
    weeklyRetentionWeeks: 8,
    monthlyRetentionMonths: 12,
  };

  getPolicy(): RetentionPolicy {
    return this.policy;
  }

  cleanExpiredBackups(backups: any[]): { retainedCount: number; purgedCount: number } {
    const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    const initialCount = backups.length;

    const retained = backups.filter((b) => {
      const createdAt = new Date(b.createdAt || b.timestamp).getTime();
      return createdAt > fourteenDaysAgo || b.type === "MONTHLY_FULL";
    });

    const purgedCount = initialCount - retained.length;
    if (purgedCount > 0) {
      logger.info(`[RETENTION CLEANER] Purged ${purgedCount} expired backups older than retention window.`);
    }

    return {
      retainedCount: retained.length,
      purgedCount,
    };
  }
}

export const retentionService = new RetentionService();
