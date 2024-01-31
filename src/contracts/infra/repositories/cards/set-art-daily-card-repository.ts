import type { SavedCard } from "../../../../domain/entities/card";

export interface SetArtDailyCardRepository {
	setArtDailyCard(dailyCard: SavedCard): Promise<void>;
}
