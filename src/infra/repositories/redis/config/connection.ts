import { createClient } from "redis";
import env from "../../../../main/config/env";

export const redisClient = createClient({
	url: env.cacheUrl,
});

redisClient.on("error", (err) => console.log("Redis Client", err));
