import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { db } from '../db/index';
import { usersTable } from '../db/schema';
import { generateToken } from '../utils/jwt';
const router = new Hono();
// Register endpoint
router.post('/register', async (c) => {
    try {
        const body = await c.req.json();
        const { name, email, phone, password } = body;
        // Validation
        if (!name || !email || !phone || !password) {
            return c.json({ error: 'Missing required fields' }, 400);
        }
        // Check if user already exists
        const existingUser = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);
        if (existingUser.length > 0) {
            return c.json({ error: 'User with this email already exists' }, 409);
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const result = await db
            .insert(usersTable)
            .values({
            name,
            email,
            phone,
            password: hashedPassword,
        })
            .$returningId();
        // Generate token
        const token = generateToken({
            userId: result[0].id,
            email,
        });
        return c.json({
            message: 'User registered successfully',
            token,
            user: {
                id: result[0].id,
                name,
                email,
                phone,
            },
        }, 201);
    }
    catch (error) {
        console.error('Registration error:', error);
        return c.json({ error: 'Registration failed' }, 500);
    }
});
// Login endpoint
router.post('/login', async (c) => {
    try {
        const body = await c.req.json();
        const { email, password } = body;
        // Validation
        if (!email || !password) {
            return c.json({ error: 'Email and password are required' }, 400);
        }
        // Find user
        const users = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);
        if (users.length === 0) {
            return c.json({ error: 'Invalid email or password' }, 401);
        }
        const user = users[0];
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return c.json({ error: 'Invalid email or password' }, 401);
        }
        // Generate token
        const token = generateToken({
            userId: user.id,
            email: user.email,
        });
        return c.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        return c.json({ error: 'Login failed' }, 500);
    }
});
export default router;
