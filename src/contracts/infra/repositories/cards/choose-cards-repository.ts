import type { SavedCard } from "../../../../domain/entities/card";

export interface ChooseCardsRepository {
	chooseCards(): Promise<SavedCard[]>;
}
