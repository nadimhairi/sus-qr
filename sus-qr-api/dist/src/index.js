import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import authRouter from './routes/auth.js';
import reportRouter from './routes/report.js';
const app = new Hono();
app.get('/', (c) => {
    return c.json({ message: 'SUS QR API' });
});
// Mount auth routes
app.route('/api/auth', authRouter);
app.route('/api/report', reportRouter);
serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
