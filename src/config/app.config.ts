import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  NAME: process.env.APP_NAME || "TypeScript Express Starter by @mazba",
  PORT: process.env.APP_PORT || 3000,
  ENVIRONMENT: process.env.APP_ENV || "development",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000,
    MAX: 100,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || "",
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
  DB: {
    MONGODB: {
      URI:
        process.env.MONGODB_URI || "",
      NAME: process.env.MONGODB_NAME || "",
      USER: process.env.MONGODB_USER || "",
      PASSWORD: process.env.MONGODB_PASSWORD || "",
      SERVER_SELECTION_TIMEOUT_MS: 5000,
    },
    REDIS: {
      HOST: process.env.REDIS_HOST || "localhost",
      PORT: parseInt(process.env.REDIS_PORT || "6379"),
      PASSWORD: process.env.REDIS_PASSWORD,
    },
  },
  I18N: {
    defaultLocale: "en",
    availableLocales: ["en", "bn"],
  },
  LOGGER: {
    LEVEL: process.env.LOG_LEVEL || "info",
    ERROR_LOG_FILE_PATH: process.env.LOG_PATH || "logs/error.log",
    COMBINED_LOG_FILE_PATH: process.env.LOG_PATH || "logs/combined.log",
    MAX_SIZE: 5 * 1024 * 1024,
    MAX_FILES: 3,
  },
};