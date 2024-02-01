import { eq } from "drizzle-orm";
import type { CheckAvailableDailyCardsRepository } from "../../../../contracts/infra/repositories/cards/check-available-daily-cards-repository";
import type { RefreshAvailableDailyCardsRepository } from "../../../../contracts/infra/repositories/cards/refresh-available-daily-cards-repository";
import { db } from "../config/connection";
import { card } from "../schemas/card";
import { SavedCard, type Modes } from "../../../../domain/entities/card";
import type { ChooseDailyCardRepository } from "../../../../contracts/infra/repositories/cards/choose-daily-card-repository";
import type { ChooseCardsRepository } from "../../../../contracts/infra/repositories/cards/choose-cards-repository";

export class CardDrizzleRepository
	implements
		CheckAvailableDailyCardsRepository,
		ChooseCardsRepository,
		ChooseDailyCardRepository,
		RefreshAvailableDailyCardsRepository
{
	async checkAvailableDailyCards(mode: Modes): Promise<boolean> {
		const cardsAvailable = await db
			.select()
			.from(card)
			.where(eq(card[mode], true));
		if (cardsAvailable.length === 0) return false;
		return true;
	}

	async chooseCards(): Promise<SavedCard[]> {
		const cards = await db.select().from(card);
		return cards
			.map((card) => {
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
					availableClassicDailyCard: card.availableClassicDailyCard,
					availableArtDailyCard: card.availableArtDailyCard,
					availableDescriptionDailyCard: card.availableDescriptionDailyCard,
				});
			})
			.sort((a, b) => {
				if (a.getDto().name < b.getDto().name) {
					return -1;
				}
				if (a.getDto().name > b.getDto().name) {
					return 1;
				}
				return 0;
			});
	}

	async chooseDailyCard(mode: Modes): Promise<SavedCard> {
		const cards = await db.select().from(card).where(eq(card[mode], true));
		const shuffledCards = cards.sort(() => Math.random() - 0.5);
		const dailyCard = shuffledCards[0];
		await db
			.update(card)
			.set({ [mode]: false })
			.where(eq(card.id, dailyCard.id));
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
			availableClassicDailyCard: dailyCard.availableClassicDailyCard,
			availableArtDailyCard: dailyCard.availableArtDailyCard,
			availableDescriptionDailyCard: dailyCard.availableDescriptionDailyCard,
		});
	}

	async refreshAvailableDailyCards(mode: Modes): Promise<void> {
		await db.update(card).set({ [mode]: true });
	}
}
