import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./connection";
await migrate(db, {
	migrationsFolder: "./src/infra/repositories/drizzle/migrations",
});
