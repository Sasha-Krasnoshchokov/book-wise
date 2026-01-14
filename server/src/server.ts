import app from "./app";
import { env } from "./config/env";

const { PORT, NODE_ENV } = env;

const server = app.listen(PORT, () => {
  console.info(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
});

// Graceful Shutdown
const shutdown = () => {
  console.info("Stopping server...");
  server.close(() => {
    console.info("Server stopped.");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
