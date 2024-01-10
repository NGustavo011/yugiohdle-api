import type { SavedCard } from "../../../domain/entities/card";

export interface GetUnlimitedCardsContract {
	execute(): Promise<SavedCard[]>;
}
