import type { Modes, SavedCard } from "../../../../domain/entities/card";

export interface GetDailyCardRepository {
	getDailyCard(mode: Modes): Promise<SavedCard>;
}
