import type { SavedCard } from "../../../../domain/entities/card";

export interface GetCardsOptionsRepository {
	getCardsOptions(): Promise<SavedCard[]>;
}
