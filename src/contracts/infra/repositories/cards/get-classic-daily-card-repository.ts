import type { SavedCard } from "../../../../domain/entities/card";

export interface GetClassicDailyCardRepository {
	getClassicDailyCard(): Promise<SavedCard>;
}
