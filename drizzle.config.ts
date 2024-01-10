import type { Config } from "drizzle-kit";
import env from "./src/main/config/env";

export default {
	schema: "./src/infra/repositories/drizzle/schemas",
	out: "./src/infra/repositories/drizzle/migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: env.databaseUrl,
	},
} satisfies Config;
