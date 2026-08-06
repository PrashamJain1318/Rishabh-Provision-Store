import { Request, Response, NextFunction } from "express";

export const timingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  const originalSend = res.send.bind(res);
  res.send = (body: any): Response => {
    const diff = process.hrtime(start);
    const timeInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    if (!res.headersSent) {
      res.setHeader("Server-Timing", `total;dur=${timeInMs};desc="Total Request Latency"`);
    }
    return originalSend(body);
  };

  next();
};
