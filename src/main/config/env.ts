export default {
	databaseUrl:
		process.env.DATABASE_URL ??
		"postgresql://user:pass@localhost:5432/yugiohdle?schema=public",
	cacheUrl: process.env.CACHE_URL ?? "redis://localhost:6379",
	cacheClassicDailyCardKey:
		process.env.CACHE_CLASSIC_DAILY_CARD_KEY ?? "ClassicDailyCard",
	cacheArtDailyCardKey: process.env.CACHE_ART_DAILY_CARD_KEY ?? "ArtDailyCard",
	cacheCardsKey: process.env.CACHE_CARDS_KEY ?? "Cards",
	cacheResetCron: process.env.CACHE_RESET_CRON ?? "0 0 * * *",
	port: process.env.PORT ?? 3333,
};
