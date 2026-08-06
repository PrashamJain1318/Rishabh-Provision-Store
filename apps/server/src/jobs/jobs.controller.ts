import { Request, Response } from "express";
import { getQueueMetrics } from "./queues/queue.manager";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

export const getJobStatus = asyncHandler(async (req: Request, res: Response) => {
  const metrics = await getQueueMetrics();
  return sendSuccess({
    res,
    message: "BullMQ background job queue status metrics fetched successfully",
    data: {
      timestamp: new Date().toISOString(),
      queues: metrics,
    },
  });
});
