export default {
	databaseUrl:
		process.env.DATABASE_URL ??
		"postgresql://user:pass@localhost:5432/yugiohdle?schema=public",
	cacheUrl: process.env.CACHE_URL ?? "redis://localhost:6379",
	cacheDailyCardKey: process.env.CACHE_DAILY_CARD_KEY ?? "DailyCard",
	cacheCardsKey: process.env.CACHE_CARDS_KEY ?? "Cards",
	cacheResetCron: process.env.CACHE_RESET_CRON ?? "0 0 * * *",
	port: process.env.PORT ?? 3333,
};
