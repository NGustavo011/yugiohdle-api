import { SavedCard } from "../../src/domain/entities/card";
import { redisClient } from "../../src/infra/repositories/redis/config/connection";
import env from "../../src/main/config/env";
import { mockSavedCard } from "./mock-card";

export const clearCache = async () => {
	await redisClient.connect();
	await redisClient.del(env.cacheDailyCardKey);
	await redisClient.disconnect();
};

export const insertDailyCard = async () => {
	await redisClient.connect();
	const dailyCard = mockSavedCard().getDto();
	await redisClient.hSet(env.cacheDailyCardKey, {
		id: dailyCard.id,
		name: dailyCard.name,
		race: dailyCard.race,
		type: dailyCard.type,
		archetype: dailyCard.archetype ?? "",
		attribute: dailyCard.attribute ?? "",
		description: dailyCard.description,
		frameType: dailyCard.frameType,
		imageUrl: dailyCard.imageUrl,
		imageUrlSmall: dailyCard.imageUrlSmall,
		imageUrlCropped: dailyCard.imageUrlCropped,
		atk: dailyCard.atk ?? 0,
		def: dailyCard.def ?? 0,
		level: dailyCard.level ?? 0,
		available: String(dailyCard.available),
	});
	await redisClient.disconnect();
};

export const receiveDailyCard = async (): Promise<SavedCard> => {
	await redisClient.connect();
	const dailyCard = await redisClient.hGetAll(env.cacheDailyCardKey);
	await redisClient.disconnect();
	return new SavedCard({
		id: dailyCard.id,
		name: dailyCard.name,
		race: dailyCard.race,
		type: dailyCard.type,
		archetype: dailyCard.archetype,
		attribute: dailyCard.attribute,
		description: dailyCard.description,
		frameType: dailyCard.frameType,
		imageUrl: dailyCard.imageUrl,
		imageUrlSmall: dailyCard.imageUrlSmall,
		imageUrlCropped: dailyCard.imageUrlCropped,
		atk: dailyCard.atk ? Number(dailyCard.atk) : null,
		def: dailyCard.def ? Number(dailyCard.def) : null,
		level: dailyCard.level ? Number(dailyCard.level) : null,
		available: Boolean(dailyCard.available),
	});
};
