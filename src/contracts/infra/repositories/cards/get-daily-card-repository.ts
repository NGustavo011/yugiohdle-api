import type { SavedCard } from "../../../../domain/entities/card";

export interface GetDailyCardRepository {
	getDailyCard(): Promise<SavedCard>;
}
