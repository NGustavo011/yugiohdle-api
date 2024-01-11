import { db } from "../../src/infra/repositories/drizzle/config/connection";
import { card } from "../../src/infra/repositories/drizzle/schemas/card";

type CardDb = typeof card.$inferInsert;

export const clearDatabase = async () => {
	await db.delete(card);
};

export const insertCard = async (available?: boolean) => {
	const cardDb: CardDb = {
		name: "any_name",
		race: "any_race",
		type: "any_type",
		archetype: "any_archetype",
		attribute: "any_attribute",
		description: "any_description",
		frameType: "any_frame_type",
		imageUrl: "any_image_url",
		imageUrlSmall: "any_image_url_small",
		imageUrlCropped: "any_image_url_cropped",
		atk: "0",
		def: "0",
		level: "0",
		available: available ?? true,
	};
	const cardCreated = await db.insert(card).values(cardDb).returning();
	return cardCreated[0].id;
};
