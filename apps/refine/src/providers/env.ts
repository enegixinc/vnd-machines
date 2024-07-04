'use client';
import { z } from 'zod';

const env = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const envSchema = env.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
