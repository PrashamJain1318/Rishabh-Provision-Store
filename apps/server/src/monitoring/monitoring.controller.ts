import { Request, Response } from "express";
import { healthService } from "./health/health.service";
import { metricsService } from "./metrics/metrics.service";
import { alertEngine } from "./alerts/alert.engine";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

export const getLiveness = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Server process live",
    data: { status: "ALIVE", timestamp: new Date().toISOString() },
  });
});

export const getReadiness = asyncHandler(async (req: Request, res: Response) => {
  const mongo = await healthService.checkMongoDB();
  const isReady = mongo.status === "CONNECTED";
  return sendSuccess({
    res,
    statusCode: isReady ? 200 : 503,
    message: isReady ? "Server ready to accept traffic" : "Server not ready",
    data: { ready: isReady, mongoDB: mongo },
  });
});

export const getSystemMetrics = asyncHandler(async (req: Request, res: Response) => {
  const metrics = metricsService.getSystemMetrics();
  return sendSuccess({
    res,
    message: "System CPU & RAM metrics retrieved",
    data: metrics,
  });
});

export const getDependenciesHealth = asyncHandler(async (req: Request, res: Response) => {
  const dependencies = await healthService.getAllDependencies();
  return sendSuccess({
    res,
    message: "All backend dependency health statuses fetched",
    data: dependencies,
  });
});

export const getMonitoringDashboardData = asyncHandler(async (req: Request, res: Response) => {
  const [metrics, dependencies, alerts] = await Promise.all([
    metricsService.getSystemMetrics(),
    healthService.getAllDependencies(),
    alertEngine.evaluateAlerts(),
  ]);

  return sendSuccess({
    res,
    message: "Full enterprise monitoring dashboard payload retrieved",
    data: {
      metrics,
      dependencies,
      alerts,
      timestamp: new Date().toISOString(),
    },
  });
});
