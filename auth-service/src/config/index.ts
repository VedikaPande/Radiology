import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "access-secret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret",
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  kafka: {
    brokers: (process.env.KAFKA_BROKERS || "localhost:9094").split(","),
    clientId: process.env.KAFKA_CLIENT_ID || "auth-service",
  },

  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
} as const;
