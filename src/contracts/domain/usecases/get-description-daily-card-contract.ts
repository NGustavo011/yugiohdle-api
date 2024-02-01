import type { SavedCard } from "../../../domain/entities/card";

export interface GetDescriptionDailyCardContract {
	execute(): Promise<SavedCard>;
}
