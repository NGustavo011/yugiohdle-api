import type { ChangeArtDailyCardContract } from "../../contracts/domain/usecases/change-art-daily-card-contract";
import type { CheckAvailableArtDailyCardsRepository } from "../../contracts/infra/repositories/cards/check-available-art-daily-cards-repository";
import type { ChooseCardsRepository } from "../../contracts/infra/repositories/cards/choose-cards-repository";
import type { ChooseArtDailyCardRepository } from "../../contracts/infra/repositories/cards/choose-art-daily-card-repository";
import type { RefreshAvailableArtDailyCardsRepository } from "../../contracts/infra/repositories/cards/refresh-available-art-daily-cards-repository";
import type { SetCardsRepository } from "../../contracts/infra/repositories/cards/set-cards-repository";
import type { SetArtDailyCardRepository } from "../../contracts/infra/repositories/cards/set-art-daily-card-repository";

export class ChangeArtDailyCard implements ChangeArtDailyCardContract {
	constructor(
		private readonly checkAvailableArtDailyCardsRepository: CheckAvailableArtDailyCardsRepository,
		private readonly chooseCardsRepository: ChooseCardsRepository,
		private readonly chooseArtDailyCardRepository: ChooseArtDailyCardRepository,
		private readonly refreshAvailableArtDailyCardsRepository: RefreshAvailableArtDailyCardsRepository,
		private readonly setCardsRepository: SetCardsRepository,
		private readonly setArtDailyCardRepository: SetArtDailyCardRepository,
	) {}
	async execute(): Promise<void> {
		const cards = await this.chooseCardsRepository.chooseCards();
		await this.setCardsRepository.setCards(cards);
		const areCardsAvailable =
			await this.checkAvailableArtDailyCardsRepository.checkAvailableArtDailyCards();
		if (!areCardsAvailable) {
			await this.refreshAvailableArtDailyCardsRepository.refreshAvailableArtDailyCards();
		}
		const dailyCard =
			await this.chooseArtDailyCardRepository.chooseArtDailyCard();
		await this.setArtDailyCardRepository.setArtDailyCard(dailyCard);
	}
}
