import { z } from 'zod';
import 'dotenv/config';

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  // DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  PORT: z.string().transform(Number).default(3210),
  API_PREFIX: z.string().default('/api/v1'),
});

export const env = serverEnvSchema.parse(process.env);
