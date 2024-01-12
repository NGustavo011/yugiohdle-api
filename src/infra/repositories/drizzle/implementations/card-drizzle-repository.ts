import { eq } from "drizzle-orm";
import type { CheckAvailableDailyCardsRepository } from "../../../../contracts/infra/repositories/cards/check-available-daily-cards-repository";
import type { GetCardsRepository } from "../../../../contracts/infra/repositories/cards/get-cards-repository";
import type { RefreshAvailableDailyCardsRepository } from "../../../../contracts/infra/repositories/cards/refresh-available-daily-cards-repository";
import { db } from "../config/connection";
import { card } from "../schemas/card";
import { SavedCard } from "../../../../domain/entities/card";
import type { ChooseDailyCardRepository } from "../../../../contracts/infra/repositories/cards/choose-daily-card-repository";

export class CardDrizzleRepository
	implements
		CheckAvailableDailyCardsRepository,
		ChooseDailyCardRepository,
		GetCardsRepository,
		RefreshAvailableDailyCardsRepository
{
	async checkAvailableDailyCards(): Promise<boolean> {
		const cardAvailables = await db
			.select()
			.from(card)
			.where(eq(card.available, true));
		if (cardAvailables.length === 0) return false;
		return true;
	}

	async chooseDailyCard(): Promise<SavedCard> {
		const cards = await db.select().from(card).where(eq(card.available, true));
		const shuffledCards = cards.sort(() => Math.random() - 0.5);
		const dailyCard = shuffledCards[0];
		await db
			.update(card)
			.set({ available: false })
			.where(eq(card.id, dailyCard.id));
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
			available: dailyCard.available,
		});
	}

	async getCards(): Promise<SavedCard[]> {
		const Cards = await db.select().from(card);
		return Cards.map((card) => {
			return new SavedCard({
				id: card.id,
				name: card.name,
				race: card.race,
				type: card.type,
				archetype: card.archetype,
				attribute: card.attribute,
				description: card.description,
				frameType: card.frameType,
				imageUrl: card.imageUrl,
				imageUrlSmall: card.imageUrlSmall,
				imageUrlCropped: card.imageUrlCropped,
				atk: card.atk ? Number(card.atk) : null,
				def: card.def ? Number(card.def) : null,
				level: card.level ? Number(card.level) : null,
				available: card.available,
			});
		});
	}

	async refreshAvailableDailyCards(): Promise<void> {
		await db.update(card).set({ available: true });
	}
}
