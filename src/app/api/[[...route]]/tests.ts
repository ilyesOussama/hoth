import { Hono } from 'hono';
import { verifyAuth } from '@hono/auth-js';

const app = new Hono().get('/', verifyAuth(), async (c) => {
  return c.json({ message: 't' });
});

export default app;
