import type { SavedCard } from "../../../../domain/entities/card";

export interface ChooseArtDailyCardRepository {
	chooseArtDailyCard(): Promise<SavedCard>;
}
