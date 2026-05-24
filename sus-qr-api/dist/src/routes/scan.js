import { Hono } from 'hono';
import { Jimp } from 'jimp';
import jsQR from 'jsqr';
const router = new Hono();
router.post('/', async (c) => {
    try {
        const body = await c.req.json();
        const { imageBase64 } = body;
        if (!imageBase64) {
            return c.json({ error: 'Missing imageBase64' }, 400);
        }
        const buffer = Buffer.from(imageBase64, 'base64');
        const image = await Jimp.read(buffer);
        const { data, width, height } = image.bitmap;
        const decoded = jsQR(new Uint8ClampedArray(data.buffer), width, height);
        if (!decoded) {
            return c.json({ found: false });
        }
        return c.json({ found: true, data: decoded.data });
    }
    catch (error) {
        console.error('Scan error:', error);
        return c.json({ error: 'Failed to decode QR code' }, 500);
    }
});
export default router;
