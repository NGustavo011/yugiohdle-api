import type { SavedCard } from "../../../../domain/entities/card";

export interface SetClassicDailyCardRepository {
	setClassicDailyCard(dailyCard: SavedCard): Promise<void>;
}
