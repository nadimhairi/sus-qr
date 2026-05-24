import { Hono } from 'hono';
import { db } from '../db/index';
import { reportsTable } from '../db/schema';
const router = new Hono();
router.post('/report', async (c) => {
    try {
        const body = await c.req.json();
        const { qrImage, description, userId, qrDecodedData, proxyId } = body;
        if (!qrImage || !description || !userId) {
            return c.json({ error: 'Missing required fields' }, 400);
        }
        const result = await db
            .insert(reportsTable)
            .values({
            description,
            userId,
            qrDecodedData,
            proxyId,
        })
            .$returningId();
        return c.json({
            message: 'Report created successfully',
            report: {
                id: result[0].id,
                qrImage,
                description,
                userId,
            },
        }, 201);
    }
    catch (error) {
        console.error('Create report error:', error);
        return c.json({ error: 'Failed to create report' }, 500);
    }
});
export default router;
