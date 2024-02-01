import type { Modes, SavedCard } from "../../../../domain/entities/card";

export interface SetDailyCardRepository {
	setDailyCard(mode: Modes, dailyCard: SavedCard): Promise<void>;
}
