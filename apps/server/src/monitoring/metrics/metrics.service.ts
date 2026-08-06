import os from "os";

export interface SystemMetrics {
  cpuUsage: {
    user: number;
    system: number;
    percentage: number;
  };
  memory: {
    totalMb: number;
    freeMb: number;
    usedMb: number;
    usagePercentage: number;
    heapTotalMb: number;
    heapUsedMb: number;
    rssMb: number;
  };
  system: {
    platform: string;
    arch: string;
    nodeVersion: string;
    processUptimeSeconds: number;
    systemUptimeSeconds: number;
    loadAverage: number[];
    cpuCores: number;
  };
}

export class MetricsService {
  getSystemMetrics(): SystemMetrics {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memProc = process.memoryUsage();

    const cpuUsage = process.cpuUsage();
    const totalCpuTime = cpuUsage.user + cpuUsage.system;
    const cpuPercentage = Math.min(100, Math.round((totalCpuTime / (process.uptime() * 1000000 * os.cpus().length)) * 100));

    return {
      cpuUsage: {
        user: cpuUsage.user,
        system: cpuUsage.system,
        percentage: cpuPercentage,
      },
      memory: {
        totalMb: Math.round(totalMem / (1024 * 1024)),
        freeMb: Math.round(freeMem / (1024 * 1024)),
        usedMb: Math.round(usedMem / (1024 * 1024)),
        usagePercentage: Math.round((usedMem / totalMem) * 100),
        heapTotalMb: Math.round(memProc.heapTotal / (1024 * 1024)),
        heapUsedMb: Math.round(memProc.heapUsed / (1024 * 1024)),
        rssMb: Math.round(memProc.rss / (1024 * 1024)),
      },
      system: {
        platform: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version,
        processUptimeSeconds: Math.round(process.uptime()),
        systemUptimeSeconds: Math.round(os.uptime()),
        loadAverage: os.loadavg(),
        cpuCores: os.cpus().length,
      },
    };
  }
}

export const metricsService = new MetricsService();
