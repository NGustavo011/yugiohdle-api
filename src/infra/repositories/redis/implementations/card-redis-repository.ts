import { redisClient } from "../config/connection";
import { SavedCard } from "../../../../domain/entities/card";
import type { GetDailyCardRepository } from "../../../../contracts/infra/repositories/cards/get-daily-card-repository";
import type { SetDailyCardRepository } from "../../../../contracts/infra/repositories/cards/set-daily-card-repository";
import env from "../../../../main/config/env";

export class CardRedisRepository
	implements GetDailyCardRepository, SetDailyCardRepository
{
	async getDailyCard(): Promise<SavedCard> {
		console.log("OI");
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
			atk: dailyCard.atk ? Number(dailyCard.atk) : null,
			def: dailyCard.def ? Number(dailyCard.def) : null,
			level: dailyCard.level ? Number(dailyCard.level) : null,
			available: Boolean(dailyCard.available),
		});
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
