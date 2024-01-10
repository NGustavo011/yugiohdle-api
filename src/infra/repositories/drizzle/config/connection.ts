import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "../../../../main/config/env";

const pool = new pg.Pool({
	connectionString: env.databaseUrl,
});

export const db = drizzle(pool);
