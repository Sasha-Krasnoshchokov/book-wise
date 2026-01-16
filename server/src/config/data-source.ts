import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { env } from './env';

const { DATABASE_URL, NODE_ENV } = env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: DATABASE_URL || 'postgresql://localhost:5432/dev_db',
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  synchronize: NODE_ENV === 'development', // Auto-creates tables in dev
  logging: NODE_ENV === 'development',
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
});
