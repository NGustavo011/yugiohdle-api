import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./connection";
migrate(db, {
	migrationsFolder: "./src/infra/repositories/drizzle/migrations",
});
