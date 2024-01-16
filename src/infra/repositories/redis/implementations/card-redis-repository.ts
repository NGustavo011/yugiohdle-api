import { redisClient } from "../config/connection";
import { SavedCard, type CardType } from "../../../../domain/entities/card";
import type { GetDailyCardRepository } from "../../../../contracts/infra/repositories/cards/get-daily-card-repository";
import type { SetDailyCardRepository } from "../../../../contracts/infra/repositories/cards/set-daily-card-repository";
import env from "../../../../main/config/env";
import type { GetCardsRepository } from "../../../../contracts/infra/repositories/cards/get-cards-repository";
import type { SetCardsRepository } from "../../../../contracts/infra/repositories/cards/set-cards-repository";

export class CardRedisRepository
	implements
		GetCardsRepository,
		GetDailyCardRepository,
		SetCardsRepository,
		SetDailyCardRepository
{
	async getCards(): Promise<SavedCard[]> {
		await redisClient.connect();
		const redisCards = (await redisClient.get(env.cacheCardsKey)) as string;
		await redisClient.disconnect();
		const cards = JSON.parse(redisCards);
		return cards.map((card: CardType) => {
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
				available: Boolean(card.available),
			});
		});
	}

	async getDailyCard(): Promise<SavedCard> {
		await redisClient.connect();
		const dailyCard = await redisClient.hGetAll(env.cacheDailyCardKey);
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
			available: Boolean(dailyCard.available),
		});
	}

	async setCards(cards: SavedCard[]): Promise<void> {
		await redisClient.connect();
		await redisClient.del(env.cacheDailyCardKey);
		const cardsDto = cards.map((card) => {
			return card.getDto();
		});
		const cardsStringify = JSON.stringify(cardsDto);
		await redisClient.set(env.cacheDailyCardKey, cardsStringify);
		await redisClient.disconnect();
	}

	async setDailyCard(dailyCard: SavedCard): Promise<void> {
		await redisClient.connect();
		await redisClient.del(env.cacheDailyCardKey);
		const dailyCardDto = dailyCard.getDto();
		await redisClient.hSet(env.cacheDailyCardKey, {
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
			available: String(dailyCardDto.available),
		});
		await redisClient.disconnect();
	}
}
