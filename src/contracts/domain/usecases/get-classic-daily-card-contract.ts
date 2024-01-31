import type { SavedCard } from "../../../domain/entities/card";

export interface GetClassicDailyCardContract {
	execute(): Promise<SavedCard>;
}
