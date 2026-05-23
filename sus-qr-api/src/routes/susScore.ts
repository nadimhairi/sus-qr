import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../db/index'
import { reportsTable } from '../db/schema'

const router =  new Hono ()

type SusLevel = 'low' | 'medium' | 'high'
