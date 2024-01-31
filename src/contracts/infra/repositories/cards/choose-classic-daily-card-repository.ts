import type { SavedCard } from "../../../../domain/entities/card";

export interface ChooseClassicDailyCardRepository {
	chooseClassicDailyCard(): Promise<SavedCard>;
}
