import http from "http";

export interface BenchmarkResult {
  virtualUsers: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  durationMs: number;
  requestsPerSecond: number;
  latencies: {
    minMs: number;
    avgMs: number;
    p50Ms: number;
    p95Ms: number;
    p99Ms: number;
    maxMs: number;
  };
}

export class LoadRunner {
  async runLoadTest(
    targetUrl: string = "http://localhost:5001/api/v1/health",
    concurrency: number = 100,
    totalRequests: number = 500
  ): Promise<BenchmarkResult> {
    const latencies: number[] = [];
    let successful = 0;
    let failed = 0;

    const startTime = Date.now();

    const makeRequest = (): Promise<void> => {
      return new Promise((resolve) => {
        const reqStart = Date.now();
        http
          .get(targetUrl, (res) => {
            res.on("data", () => {});
            res.on("end", () => {
              const reqDuration = Date.now() - reqStart;
              latencies.push(reqDuration);
              if (res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
                successful++;
              } else {
                failed++;
              }
              resolve();
            });
          })
          .on("error", () => {
            failed++;
            latencies.push(Date.now() - reqStart);
            resolve();
          });
      });
    };

    // Execute in batch chunks matching concurrency
    const chunks = Math.ceil(totalRequests / concurrency);
    for (let i = 0; i < chunks; i++) {
      const batch = Array.from({ length: Math.min(concurrency, totalRequests - i * concurrency) }, makeRequest);
      await Promise.all(batch);
    }

    const durationMs = Date.now() - startTime;
    latencies.sort((a, b) => a - b);

    const getPercentile = (p: number) => {
      if (latencies.length === 0) return 0;
      const index = Math.floor((p / 100) * latencies.length);
      return latencies[Math.min(index, latencies.length - 1)];
    };

    const avgMs = latencies.length > 0 ? Number((latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2)) : 0;
    const requestsPerSecond = Number(((successful / (durationMs || 1)) * 1000).toFixed(2));

    return {
      virtualUsers: concurrency,
      totalRequests: successful + failed,
      successfulRequests: successful,
      failedRequests: failed,
      durationMs,
      requestsPerSecond,
      latencies: {
        minMs: latencies[0] || 0,
        avgMs,
        p50Ms: getPercentile(50),
        p95Ms: getPercentile(95),
        p99Ms: getPercentile(99),
        maxMs: latencies[latencies.length - 1] || 0,
      },
    };
  }
}

export const loadRunner = new LoadRunner();
