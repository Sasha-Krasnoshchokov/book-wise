import { AppDataSource } from '../config/data-source';
import { HealthStatus } from '../types/health';

export const dbHealthChecker = async (): Promise<HealthStatus> => {
  let answer: HealthStatus = {
    status: 'Healthy',
    message: 'Connected to database',
    error: '',
    uptime: process.uptime(),
  };
  try {
    await AppDataSource.query('SELECT 1');
    console.info('Database connection healthy');
  } catch (error: any) {
    answer = {
      status: 'Unhealthy',
      message: 'Some problem with database connection',
      error: error.message ?? 'Unknown error',
      uptime: process.uptime(),
    };
    console.warn('Database connection unhealthy');
    throw error;
  } finally {
    return answer;
  }
};
