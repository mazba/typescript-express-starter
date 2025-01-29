import winston from "winston";
import { injectable } from "tsyringe";
import config from "../../config";

@injectable()
export class Logger {
  private logger: winston.Logger;

  constructor() {
    // Log format
    const logFormat = winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.errors({ stack: true }),
      winston.format.json()
    );

    // Create logger
    this.logger = winston.createLogger({
      level: config.app.LOGGER.LEVEL || "info",
      format: logFormat,
      transports: [
        // File transport for error logs
        new winston.transports.File({
          filename: config.app.LOGGER.ERROR_LOG_FILE_PATH || "logs/error.log",
          level: "error",
          maxsize: config.app.LOGGER.MAX_SIZE,
          maxFiles: config.app.LOGGER.MAX_FILES,
        }),
        // File transport for combined logs
        new winston.transports.File({
          filename: config.app.LOGGER.COMBINED_LOG_FILE_PATH || "logs/combined.log",
          maxsize: config.app.LOGGER.MAX_SIZE,
          maxFiles: config.app.LOGGER.MAX_FILES,
        }),
      ],
    });
    // Keeping console transport in non-production environments only
    if (config.app.ENVIRONMENT !== "production") {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        })
      );
    }
  }

  // Log info messages
  info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  // Log error messages
  error(message: string, meta?: any): void {
    this.logger.error(message, meta);
  }

  // Log warning messages
  warn(message: string, meta?: any): void {
    this.logger.warn(message, meta);
  }

  // Log debug messages
  debug(message: string, meta?: any): void {
    this.logger.debug(message, meta);
  }
}