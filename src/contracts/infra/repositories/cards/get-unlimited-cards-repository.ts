import type { SavedCard } from "../../../../domain/entities/card";

export interface GetUnlimitedCardsRepository {
	getUnlimitedCards(): Promise<SavedCard[]>;
}
