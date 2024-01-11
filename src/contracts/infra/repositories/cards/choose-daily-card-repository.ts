import type { SavedCard } from "../../../../domain/entities/card";

export interface ChooseDailyCardRepository {
	chooseDailyCard(): Promise<SavedCard>;
}
