import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string(),
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().optional().default(4000),
});

export type Env = z.infer<typeof envSchema>;
