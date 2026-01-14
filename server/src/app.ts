import express from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server Healthy",
    uptime: process.uptime(),
  });
});

// Centralized Error Handler (Must be last)
app.use(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: express.Request,
    res: express.Response
    // next: express.NextFunction
  ) => {
    const status = err.status || 500;
    res.status(status).json({
      error: {
        message: err.message || "Internal Server Error",
        ...(env.NODE_ENV === "development" && { stack: err.stack }),
      },
    });
  }
);

export default app;
