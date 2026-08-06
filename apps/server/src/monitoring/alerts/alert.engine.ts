import { metricsService } from "../metrics/metrics.service";
import { healthService } from "../health/health.service";

export interface Alert {
  id: string;
  severity: "CRITICAL" | "WARNING" | "INFO";
  component: string;
  message: string;
  timestamp: string;
}

export class AlertEngine {
  async evaluateAlerts(): Promise<Alert[]> {
    const alerts: Alert[] = [];
    const metrics = metricsService.getSystemMetrics();
    const dependencies = await healthService.getAllDependencies();

    // CPU threshold check
    if (metrics.cpuUsage.percentage > 85) {
      alerts.push({
        id: `cpu_high_${Date.now()}`,
        severity: "CRITICAL",
        component: "CPU Utilization",
        message: `High CPU utilization detected: ${metrics.cpuUsage.percentage}% (Threshold: 85%)`,
        timestamp: new Date().toISOString(),
      });
    }

    // Memory threshold check
    if (metrics.memory.usagePercentage > 85) {
      alerts.push({
        id: `mem_high_${Date.now()}`,
        severity: "CRITICAL",
        component: "RAM Memory",
        message: `High RAM memory usage detected: ${metrics.memory.usagePercentage}% (Threshold: 85%)`,
        timestamp: new Date().toISOString(),
      });
    }

    // MongoDB check
    if (dependencies.mongoDB.status !== "CONNECTED") {
      alerts.push({
        id: `mongo_down_${Date.now()}`,
        severity: "CRITICAL",
        component: "MongoDB Database",
        message: "MongoDB database connection disconnected or unreachable",
        timestamp: new Date().toISOString(),
      });
    }

    // Redis check
    if (dependencies.redis.status !== "CONNECTED") {
      alerts.push({
        id: `redis_down_${Date.now()}`,
        severity: "WARNING",
        component: "Redis Cache",
        message: "Redis cache server disconnected. Operating on fallback in-memory LRU cache.",
        timestamp: new Date().toISOString(),
      });
    }

    return alerts;
  }
}

export const alertEngine = new AlertEngine();
