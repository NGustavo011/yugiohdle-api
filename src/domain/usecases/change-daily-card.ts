import type { ChangeDailyCardContract } from "../../contracts/domain/usecases/change-daily-card-contract";
import type { CheckAvailableDailyCardsRepository } from "../../contracts/infra/repositories/cards/check-available-daily-cards-repository";
import type { ChooseCardsRepository } from "../../contracts/infra/repositories/cards/choose-cards-repository";
import type { ChooseDailyCardRepository } from "../../contracts/infra/repositories/cards/choose-daily-card-repository";
import type { RefreshAvailableDailyCardsRepository } from "../../contracts/infra/repositories/cards/refresh-available-daily-cards-repository";
import type { SetCardsRepository } from "../../contracts/infra/repositories/cards/set-cards-repository";
import type { SetDailyCardRepository } from "../../contracts/infra/repositories/cards/set-daily-card-repository";

export class ChangeDailyCard implements ChangeDailyCardContract {
	constructor(
		private readonly checkAvailableDailyCardsRepository: CheckAvailableDailyCardsRepository,
		private readonly chooseCardsRepository: ChooseCardsRepository,
		private readonly chooseDailyCardRepository: ChooseDailyCardRepository,
		private readonly refreshAvailableDailyCardsRepository: RefreshAvailableDailyCardsRepository,
		private readonly setCardsRepository: SetCardsRepository,
		private readonly setDailyCardRepository: SetDailyCardRepository,
	) {}
	async execute(): Promise<void> {
		const cards = await this.chooseCardsRepository.chooseCards();
		await this.setCardsRepository.setCards(cards);
		const areCardsAvailable =
			await this.checkAvailableDailyCardsRepository.checkAvailableDailyCards();
		if (!areCardsAvailable) {
			await this.refreshAvailableDailyCardsRepository.refreshAvailableDailyCards();
		}
		const dailyCard = await this.chooseDailyCardRepository.chooseDailyCard();
		await this.setDailyCardRepository.setDailyCard(dailyCard);
	}
}
