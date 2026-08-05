import morgan, { StreamOptions } from "morgan";
import { logger } from "../config/logger";

// Stream morgan logs to Winston logger
const stream: StreamOptions = {
  write: (message: string) => logger.info(message.trim()),
};

// Skip morgan request logging during automated test suite execution
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "test";
};

export const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

export default requestLogger;
