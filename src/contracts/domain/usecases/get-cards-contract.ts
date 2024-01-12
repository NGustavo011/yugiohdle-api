import type { SavedCard } from "../../../domain/entities/card";

export interface GetCardsContract {
	execute(): Promise<SavedCard[]>;
}
