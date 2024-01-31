import { SavedCard, type CardType } from "../../src/domain/entities/card";
import { redisClient } from "../../src/infra/repositories/redis/config/connection";
import env from "../../src/main/config/env";
import { mockSavedCard, mockSavedCardWithPropsNull } from "./mock-card";

export const clearCache = async () => {
	await redisClient.connect();
	await redisClient.del(env.cacheClassicDailyCardKey);
	await redisClient.disconnect();
};

export const insertArtDailyCard = async (dailyCard: SavedCard) => {
	await redisClient.connect();
	const dailyCardDto = dailyCard.getDto();
	await redisClient.hSet(env.cacheArtDailyCardKey, {
		id: dailyCardDto.id,
		name: dailyCardDto.name,
		race: dailyCardDto.race,
		type: dailyCardDto.type,
		archetype: dailyCardDto.archetype ?? "",
		attribute: dailyCardDto.attribute ?? "",
		description: dailyCardDto.description,
		frameType: dailyCardDto.frameType,
		imageUrl: dailyCardDto.imageUrl,
		imageUrlSmall: dailyCardDto.imageUrlSmall,
		imageUrlCropped: dailyCardDto.imageUrlCropped,
		atk: dailyCardDto.atk ?? 0,
		def: dailyCardDto.def ?? 0,
		level: dailyCardDto.level ?? 0,
		availableArtDailyCard: String(dailyCardDto.availableArtDailyCard),
	});
	await redisClient.disconnect();
};

export const insertCards = async () => {
	await redisClient.connect();
	const cards = [
		mockSavedCard().getDto(),
		mockSavedCardWithPropsNull().getDto(),
	];
	await redisClient.set(env.cacheCardsKey, JSON.stringify(cards));
	await redisClient.disconnect();
};

export const insertClassicDailyCard = async (dailyCard: SavedCard) => {
	await redisClient.connect();
	const dailyCardDto = dailyCard.getDto();
	await redisClient.hSet(env.cacheClassicDailyCardKey, {
		id: dailyCardDto.id,
		name: dailyCardDto.name,
		race: dailyCardDto.race,
		type: dailyCardDto.type,
		archetype: dailyCardDto.archetype ?? "",
		attribute: dailyCardDto.attribute ?? "",
		description: dailyCardDto.description,
		frameType: dailyCardDto.frameType,
		imageUrl: dailyCardDto.imageUrl,
		imageUrlSmall: dailyCardDto.imageUrlSmall,
		imageUrlCropped: dailyCardDto.imageUrlCropped,
		atk: dailyCardDto.atk ?? 0,
		def: dailyCardDto.def ?? 0,
		level: dailyCardDto.level ?? 0,
		availableClassicDailyCard: String(dailyCardDto.availableClassicDailyCard),
	});
	await redisClient.disconnect();
};

export const receiveArtDailyCard = async (): Promise<SavedCard> => {
	await redisClient.connect();
	const dailyCard = await redisClient.hGetAll(env.cacheArtDailyCardKey);
	await redisClient.disconnect();
	return new SavedCard({
		id: dailyCard.id,
		name: dailyCard.name,
		race: dailyCard.race,
		type: dailyCard.type,
		archetype: dailyCard.archetype ? dailyCard.archetype : null,
		attribute: dailyCard.attribute ? dailyCard.attribute : null,
		description: dailyCard.description,
		frameType: dailyCard.frameType,
		imageUrl: dailyCard.imageUrl,
		imageUrlSmall: dailyCard.imageUrlSmall,
		imageUrlCropped: dailyCard.imageUrlCropped,
		atk: Number(dailyCard.atk) ? Number(dailyCard.atk) : null,
		def: Number(dailyCard.def) ? Number(dailyCard.def) : null,
		level: Number(dailyCard.level) ? Number(dailyCard.level) : null,
		availableClassicDailyCard: Boolean(dailyCard.availableClassicDailyCard),
		availableArtDailyCard: Boolean(dailyCard.availableArtDailyCard),
	});
};

export const receiveCards = async (): Promise<SavedCard[]> => {
	await redisClient.connect();
	const cards = (await redisClient.get(env.cacheCardsKey)) as string;
	await redisClient.disconnect();
	const redisCards: CardType[] = JSON.parse(cards);
	return redisCards.map((card) => {
		return new SavedCard({
			id: card.id,
			name: card.name,
			race: card.race,
			type: card.type,
			archetype: card.archetype ? card.archetype : null,
			attribute: card.attribute ? card.attribute : null,
			description: card.description,
			frameType: card.frameType,
			imageUrl: card.imageUrl,
			imageUrlSmall: card.imageUrlSmall,
			imageUrlCropped: card.imageUrlCropped,
			atk: Number(card.atk) ? Number(card.atk) : null,
			def: Number(card.def) ? Number(card.def) : null,
			level: Number(card.level) ? Number(card.level) : null,
			availableClassicDailyCard: Boolean(card.availableClassicDailyCard),
			availableArtDailyCard: Boolean(card.availableArtDailyCard),
		});
	});
};

export const receiveClassicDailyCard = async (): Promise<SavedCard> => {
	await redisClient.connect();
	const dailyCard = await redisClient.hGetAll(env.cacheClassicDailyCardKey);
	await redisClient.disconnect();
	return new SavedCard({
		id: dailyCard.id,
		name: dailyCard.name,
		race: dailyCard.race,
		type: dailyCard.type,
		archetype: dailyCard.archetype ? dailyCard.archetype : null,
		attribute: dailyCard.attribute ? dailyCard.attribute : null,
		description: dailyCard.description,
		frameType: dailyCard.frameType,
		imageUrl: dailyCard.imageUrl,
		imageUrlSmall: dailyCard.imageUrlSmall,
		imageUrlCropped: dailyCard.imageUrlCropped,
		atk: Number(dailyCard.atk) ? Number(dailyCard.atk) : null,
		def: Number(dailyCard.def) ? Number(dailyCard.def) : null,
		level: Number(dailyCard.level) ? Number(dailyCard.level) : null,
		availableClassicDailyCard: Boolean(dailyCard.availableClassicDailyCard),
		availableArtDailyCard: Boolean(dailyCard.availableArtDailyCard),
	});
};
