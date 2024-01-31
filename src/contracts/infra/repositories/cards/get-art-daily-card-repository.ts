import type { SavedCard } from "../../../../domain/entities/card";

export interface GetArtDailyCardRepository {
	getArtDailyCard(): Promise<SavedCard>;
}
