import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './config/data-source';
import { env } from './config/env';

const { PORT, NODE_ENV } = env;

const server = app.listen(PORT, async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error('Error during Data Source initialization', error);
    throw error;
  } finally {
  }
  console.info(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
});

// Graceful Shutdown
const shutdown = async () => {
  console.info('Stopping server...');
  await AppDataSource.destroy();
  server.close(() => {
    console.info('Server stopped.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
