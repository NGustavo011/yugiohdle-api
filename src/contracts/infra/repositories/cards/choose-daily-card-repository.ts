import type { Modes, SavedCard } from "../../../../domain/entities/card";

export interface ChooseDailyCardRepository {
	chooseDailyCard(mode: Modes): Promise<SavedCard>;
}
