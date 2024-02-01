import type { Modes } from "../../../../domain/entities/card";

export interface RefreshAvailableDailyCardsRepository {
	refreshAvailableDailyCards(mode: Modes): Promise<void>;
}
