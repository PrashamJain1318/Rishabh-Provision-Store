import winston from "winston";
import path from "path";
import fs from "fs";

// Ensure logs directory exists
const logsDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// 1. Console Format (Colorized & Human Readable for Development)
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ timestamp, level, message, stack }) =>
      `[${timestamp}] ${level}: ${stack || message}`
  )
);

// 2. File Format (Structured JSON for Production Audit & File Transports)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: process.env.NODE_ENV === "production" ? fileFormat : consoleFormat,
  transports: [
    // Console Output
    new winston.transports.Console({
      format: consoleFormat,
    }),
    // 2. Error Log File (captures level: 'error' only)
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
      format: fileFormat,
      maxsize: 5242880, // 5MB limit
      maxFiles: 5,
    }),
    // 3. Combined Log File (captures all logs: 'info', 'warn', 'error')
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"),
      format: fileFormat,
      maxsize: 10485760, // 10MB limit
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logsDir, "exceptions.log") }),
  ],
});

export default logger;
