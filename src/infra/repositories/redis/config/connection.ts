import { createClient } from "redis";
import env from "../../../../main/config/env";

export const client = createClient({
	url: env.cacheUrl,
});

client.on("error", (err) => console.log("Redis Client", err));
