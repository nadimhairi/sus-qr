import 'dotenv/config'
import { drizzle } from 'drizzle-orm/mysql2'
import { createPool } from 'mysql2/promise'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('Missing DATABASE_URL environment variable')
}

const pool = createPool(connectionString)

export const db = drizzle(pool)
