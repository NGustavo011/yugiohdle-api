import type { SavedCard } from "../../src/domain/entities/card";
import { db } from "../../src/infra/repositories/drizzle/config/connection";
import { card } from "../../src/infra/repositories/drizzle/schemas/card";

type CardDb = typeof card.$inferInsert;

export const clearDatabase = async () => {
	await db.delete(card);
};

export const insertCard = async (
	savedCard: SavedCard,
	availableClassicDailyCard?: boolean,
	name?: string,
) => {
	const savedCardDto = savedCard.getDto();
	const cardDb: CardDb = {
		name: name ?? savedCardDto.name,
		race: savedCardDto.race,
		type: savedCardDto.type,
		archetype: savedCardDto.archetype,
		attribute: savedCardDto.attribute,
		description: savedCardDto.description,
		frameType: savedCardDto.frameType,
		imageUrl: savedCardDto.imageUrl,
		imageUrlSmall: savedCardDto.imageUrlSmall,
		imageUrlCropped: savedCardDto.imageUrlCropped,
		atk: savedCardDto.atk ? savedCardDto.atk.toString() : "0",
		def: savedCardDto.def ? savedCardDto.def.toString() : "0",
		level: savedCardDto.level ? savedCardDto.level.toString() : "0",
		availableClassicDailyCard: availableClassicDailyCard ?? true,
	};
	const cardCreated = await db.insert(card).values(cardDb).returning();
	return cardCreated[0].id;
};
