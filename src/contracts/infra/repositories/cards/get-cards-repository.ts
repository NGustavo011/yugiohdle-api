import type { SavedCard } from "../../../../domain/entities/card";

export interface GetCardsRepository {
	getCards(): Promise<SavedCard[]>;
}
