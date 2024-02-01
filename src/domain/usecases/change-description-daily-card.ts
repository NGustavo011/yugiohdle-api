import type { ChangeDescriptionDailyCardContract } from "../../contracts/domain/usecases/change-description-daily-card-contract";
import type { CheckAvailableDailyCardsRepository } from "../../contracts/infra/repositories/cards/check-available-daily-cards-repository";
import type { ChooseCardsRepository } from "../../contracts/infra/repositories/cards/choose-cards-repository";
import type { ChooseDailyCardRepository } from "../../contracts/infra/repositories/cards/choose-daily-card-repository";
import type { RefreshAvailableDailyCardsRepository } from "../../contracts/infra/repositories/cards/refresh-available-daily-cards-repository";
import type { SetCardsRepository } from "../../contracts/infra/repositories/cards/set-cards-repository";
import type { SetDailyCardRepository } from "../../contracts/infra/repositories/cards/set-daily-card-repository";
import type { Modes } from "../entities/card";

export class ChangeDescriptionDailyCard
	implements ChangeDescriptionDailyCardContract
{
	constructor(
		private readonly checkAvailableDailyCardsRepository: CheckAvailableDailyCardsRepository,
		private readonly chooseDailyCardRepository: ChooseDailyCardRepository,
		private readonly refreshAvailableDailyCardsRepository: RefreshAvailableDailyCardsRepository,
		private readonly setDailyCardRepository: SetDailyCardRepository,
	) {}
	async execute(): Promise<void> {
		const mode: Modes = "availableDescriptionDailyCard";
		const areCardsAvailable =
			await this.checkAvailableDailyCardsRepository.checkAvailableDailyCards(
				mode,
			);
		if (!areCardsAvailable) {
			await this.refreshAvailableDailyCardsRepository.refreshAvailableDailyCards(
				mode,
			);
		}
		const dailyCard =
			await this.chooseDailyCardRepository.chooseDailyCard(mode);
		await this.setDailyCardRepository.setDailyCard(mode, dailyCard);
	}
}
