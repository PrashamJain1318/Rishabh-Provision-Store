import { Queue } from "bullmq";
import redisClient from "../../config/redis";
import logger from "../../utils/logger";

const queueOptions = {
  connection: redisClient as any,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: 100,
    removeOnFail: 500,
  },
};

export const QUEUE_NAMES = {
  INVOICE: "InvoiceQueue",
  EMAIL: "EmailQueue",
  NOTIFICATION: "NotificationQueue",
  AI: "AIQueue",
  CLOUDINARY: "CloudinaryQueue",
  BACKUP: "BackupQueue",
  ANALYTICS: "AnalyticsQueue",
} as const;

let invoiceQueue: Queue | null = null;
let emailQueue: Queue | null = null;
let notificationQueue: Queue | null = null;
let aiQueue: Queue | null = null;
let cloudinaryQueue: Queue | null = null;
let backupQueue: Queue | null = null;
let analyticsQueue: Queue | null = null;

const inMemoryJobsStore: Map<string, Array<{ id: string; name: string; data: any; status: string; createdAt: string }>> = new Map();

try {
  if (redisClient) {
    invoiceQueue = new Queue(QUEUE_NAMES.INVOICE, queueOptions);
    emailQueue = new Queue(QUEUE_NAMES.EMAIL, queueOptions);
    notificationQueue = new Queue(QUEUE_NAMES.NOTIFICATION, queueOptions);
    aiQueue = new Queue(QUEUE_NAMES.AI, queueOptions);
    cloudinaryQueue = new Queue(QUEUE_NAMES.CLOUDINARY, queueOptions);
    backupQueue = new Queue(QUEUE_NAMES.BACKUP, queueOptions);
    analyticsQueue = new Queue(QUEUE_NAMES.ANALYTICS, queueOptions);
    logger.info("⚡ BullMQ Distributed Queues Initialized Successfully");
  }
} catch (err: any) {
  logger.warn(`BullMQ Queue Initialization Warning: ${err.message}. Operating in fallback queue mode.`);
}

export const addJobToQueue = async (queueName: string, jobName: string, data: any) => {
  const queueMap: Record<string, Queue | null> = {
    [QUEUE_NAMES.INVOICE]: invoiceQueue,
    [QUEUE_NAMES.EMAIL]: emailQueue,
    [QUEUE_NAMES.NOTIFICATION]: notificationQueue,
    [QUEUE_NAMES.AI]: aiQueue,
    [QUEUE_NAMES.CLOUDINARY]: cloudinaryQueue,
    [QUEUE_NAMES.BACKUP]: backupQueue,
    [QUEUE_NAMES.ANALYTICS]: analyticsQueue,
  };

  const targetQueue = queueMap[queueName];

  if (targetQueue && redisClient && redisClient.status === "ready") {
    try {
      const job = await targetQueue.add(jobName, data);
      logger.info(`[QUEUE ENQUEUE] Queue: ${queueName} | Job: ${jobName} | ID: ${job.id}`);
      return { success: true, jobId: job.id, mode: "REDIS" };
    } catch (err: any) {
      logger.warn(`Queue Enqueue Error (${queueName}): ${err.message}`);
    }
  }

  // Fallback memory queue
  if (!inMemoryJobsStore.has(queueName)) {
    inMemoryJobsStore.set(queueName, []);
  }
  const jobId = `mem_job_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
  inMemoryJobsStore.get(queueName)?.push({
    id: jobId,
    name: jobName,
    data,
    status: "completed",
    createdAt: new Date().toISOString(),
  });

  logger.info(`[MEMORY QUEUE ENQUEUE] Queue: ${queueName} | Job: ${jobName} | ID: ${jobId}`);
  return { success: true, jobId, mode: "MEMORY_FALLBACK" };
};

export const getQueueMetrics = async () => {
  const queueList = [
    { name: QUEUE_NAMES.INVOICE, queue: invoiceQueue },
    { name: QUEUE_NAMES.EMAIL, queue: emailQueue },
    { name: QUEUE_NAMES.NOTIFICATION, queue: notificationQueue },
    { name: QUEUE_NAMES.AI, queue: aiQueue },
    { name: QUEUE_NAMES.CLOUDINARY, queue: cloudinaryQueue },
    { name: QUEUE_NAMES.BACKUP, queue: backupQueue },
    { name: QUEUE_NAMES.ANALYTICS, queue: analyticsQueue },
  ];

  const metrics: Record<string, any> = {};

  for (const { name, queue } of queueList) {
    if (queue && redisClient && redisClient.status === "ready") {
      try {
        const counts = await queue.getJobCounts("waiting", "active", "completed", "failed", "delayed");
        metrics[name] = counts;
      } catch (err: any) {
        metrics[name] = { waiting: 0, active: 0, completed: 0, failed: 0, delayed: 0, error: err.message };
      }
    } else {
      const memJobs = inMemoryJobsStore.get(name) || [];
      metrics[name] = {
        waiting: 0,
        active: 0,
        completed: memJobs.length,
        failed: 0,
        delayed: 0,
        mode: "MEMORY_FALLBACK",
      };
    }
  }

  return metrics;
};

export {
  invoiceQueue,
  emailQueue,
  notificationQueue,
  aiQueue,
  cloudinaryQueue,
  backupQueue,
  analyticsQueue,
};
