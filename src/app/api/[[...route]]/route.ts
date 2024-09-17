import { Hono, Context } from 'hono';

import { handle } from 'hono/vercel';
import {
  authHandler,
  initAuthConfig,
  verifyAuth,
  type AuthConfig,
} from '@hono/auth-js';
import GitHub from '@auth/core/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db/drizzle';
import tests from './tests';

function getAuthConfig(c: Context): AuthConfig {
  return {
    adapter: DrizzleAdapter(db),
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
  };
}

const app = new Hono().basePath('/api');

app.use('*', initAuthConfig(getAuthConfig));

app.use('/api/auth/*', authHandler());

app.use('/api/*', verifyAuth());

app.get('/api/protected', (c) => {
  const auth = c.get('authUser');
  return c.json(auth);
});

const route = app.route('/tests', tests);

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
