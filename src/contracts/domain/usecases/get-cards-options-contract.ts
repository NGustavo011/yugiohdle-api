import type { SavedCard } from "../../../domain/entities/card";

export interface GetCardsOptionsContract {
	execute(): Promise<SavedCard[]>;
}
