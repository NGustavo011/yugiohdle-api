import type { ChangeDailyCardContract } from "../../contracts/domain/usecases/change-daily-card-contract";
import type { CheckAvailableDailyCardsRepository } from "../../contracts/infra/repositories/cards/check-available-daily-cards-repository";
import type { RefreshAvailableDailyCardsRepository } from "../../contracts/infra/repositories/cards/refresh-available-daily-cards-repository";
import type { SetDailyCardRepository } from "../../contracts/infra/repositories/cards/set-daily-card-repository";

export class ChangeDailyCard implements ChangeDailyCardContract {
	constructor(
		private readonly checkAvailableDailyCardsRepository: CheckAvailableDailyCardsRepository,
		private readonly refreshAvailableDailyCardsRepository: RefreshAvailableDailyCardsRepository,
		private readonly setDailyCardRepository: SetDailyCardRepository,
	) {}
	async execute(): Promise<void> {
		const areCardsAvailable =
			await this.checkAvailableDailyCardsRepository.checkAvailableDailyCards();
		if (!areCardsAvailable)
			await this.refreshAvailableDailyCardsRepository.refreshAvailableDailyCards();
		await this.setDailyCardRepository.setDailyCard();
	}
}
