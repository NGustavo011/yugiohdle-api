import type { Modes } from "../../../../domain/entities/card";

export interface CheckAvailableDailyCardsRepository {
	checkAvailableDailyCards(mode: Modes): Promise<boolean>;
}
