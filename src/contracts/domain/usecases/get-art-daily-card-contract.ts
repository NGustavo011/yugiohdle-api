import type { SavedCard } from "../../../domain/entities/card";

export interface GetArtDailyCardContract {
	execute(): Promise<SavedCard>;
}
