import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { db } from '../db/index';
import { reportsTable } from '../db/schema';
const router = new Hono();
router.get('/:proxyId', async (c) => {
    const proxyId = c.req.param('proxyId');
    if (!proxyId) {
        return c.json({ error: 'Missing proxyId' }, 400);
    }
    try {
        const reports = await db
            .select()
            .from(reportsTable)
            .where(eq(reportsTable.proxyId, proxyId));
        // Process the reports and calculate SUS score
        const reportCount = reports.length;
        let susLevel = 'low';
        if (reportCount >= 3) {
            susLevel = 'high';
        }
        else if (reportCount >= 1) {
            susLevel = 'medium';
        }
        return c.json({
            success: true,
            proxyId,
            reportCount,
            susLevel,
            reports,
        });
    }
    catch (error) {
        console.error('Failed to calculate susScore:', error);
        return c.json({
            success: false,
            message: 'An error occurred while evaluating the fraud score. Please try again later.',
        }, 500);
    }
});
export default router;
