export default {
	databaseUrl:
		process.env.DATABASE_URL ??
		"postgresql://user:pass@localhost:5432/yugiohdle?schema=public",
};
