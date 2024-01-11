import type { SavedCard } from "../../../../domain/entities/card";

export interface SetDailyCardRepository {
	setDailyCard(dailyCard: SavedCard): Promise<void>;
}
