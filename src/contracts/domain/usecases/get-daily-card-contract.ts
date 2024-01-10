import type { SavedCard } from "../../../domain/entities/card";

export interface GetDailyCardContract {
	execute(): Promise<SavedCard>;
}
