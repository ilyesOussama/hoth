import { AuthConfig } from '@hono/auth-js';
import GitHub from '@auth/core/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from './src/db/drizzle';
import { config } from 'dotenv';
config({ path: '.env.local' });

export function getAuthConfig(): AuthConfig {
  return {
    adapter: DrizzleAdapter(db),
    secret: process.env.AUTH_SECRET,
    providers: [
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
  };
}
