import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import authRoutes from "./routes/auth.routes";
import { connectKafkaProducer, disconnectKafkaProducer } from "./lib/kafka";
import prisma from "./lib/prisma";

const app = express();

// ─── Middleware ─────────────────────────────────────────────
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ─── Routes ────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

// ─── Root health ───────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ service: "auth-service", status: "running" });
});

// ─── Global error handler ──────────────────────────────────
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

// ─── Start server ──────────────────────────────────────────
async function start() {
  try {
    // Connect to database
    await prisma.$connect();
    console.log(" Database connected");

    // Connect Kafka (non-blocking — service works without Kafka)
    connectKafkaProducer().catch(console.error);

    app.listen(config.port, () => {
      console.log(` Auth service running on http://localhost:${config.port}`);
      console.log(`   Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error(" Failed to start auth service:", error);
    process.exit(1);
  }
}

// ─── Graceful shutdown ─────────────────────────────────────
async function shutdown() {
  console.log("\n Shutting down...");
  await disconnectKafkaProducer();
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
