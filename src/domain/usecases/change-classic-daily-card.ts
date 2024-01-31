import type { ChangeClassicDailyCardContract } from "../../contracts/domain/usecases/change-classic-daily-card-contract";
import type { CheckAvailableClassicDailyCardsRepository } from "../../contracts/infra/repositories/cards/check-available-classic-daily-cards-repository";
import type { ChooseCardsRepository } from "../../contracts/infra/repositories/cards/choose-cards-repository";
import type { ChooseClassicDailyCardRepository } from "../../contracts/infra/repositories/cards/choose-classic-daily-card-repository";
import type { RefreshAvailableClassicDailyCardsRepository } from "../../contracts/infra/repositories/cards/refresh-available-classic-daily-cards-repository";
import type { SetCardsRepository } from "../../contracts/infra/repositories/cards/set-cards-repository";
import type { SetClassicDailyCardRepository } from "../../contracts/infra/repositories/cards/set-classic-daily-card-repository";

export class ChangeClassicDailyCard implements ChangeClassicDailyCardContract {
	constructor(
		private readonly checkAvailableClassicDailyCardsRepository: CheckAvailableClassicDailyCardsRepository,
		private readonly chooseCardsRepository: ChooseCardsRepository,
		private readonly chooseClassicDailyCardRepository: ChooseClassicDailyCardRepository,
		private readonly refreshAvailableClassicDailyCardsRepository: RefreshAvailableClassicDailyCardsRepository,
		private readonly setCardsRepository: SetCardsRepository,
		private readonly setClassicDailyCardRepository: SetClassicDailyCardRepository,
	) {}
	async execute(): Promise<void> {
		const cards = await this.chooseCardsRepository.chooseCards();
		await this.setCardsRepository.setCards(cards);
		const areCardsAvailable =
			await this.checkAvailableClassicDailyCardsRepository.checkAvailableClassicDailyCards();
		if (!areCardsAvailable) {
			await this.refreshAvailableClassicDailyCardsRepository.refreshAvailableClassicDailyCards();
		}
		const dailyCard =
			await this.chooseClassicDailyCardRepository.chooseClassicDailyCard();
		await this.setClassicDailyCardRepository.setClassicDailyCard(dailyCard);
	}
}
