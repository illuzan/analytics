import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';
import { countries } from './schema';

export interface Env {
    DB: D1Database;
}

// env.DB from cloudflare worker environment
const db: DrizzleD1Database = drizzle(env.DB);
const result = db.select().from(countries).all();