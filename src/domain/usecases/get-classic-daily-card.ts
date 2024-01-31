import type { GetClassicDailyCardContract } from "../../contracts/domain/usecases/get-classic-daily-card-contract";
import type { GetClassicDailyCardRepository } from "../../contracts/infra/repositories/cards/get-classic-daily-card-repository";
import type { SavedCard } from "../entities/card";

export class GetClassicDailyCard implements GetClassicDailyCardContract {
	constructor(
		private readonly getClassicDailyCardRepository: GetClassicDailyCardRepository,
	) {}
	async execute(): Promise<SavedCard> {
		const card = await this.getClassicDailyCardRepository.getClassicDailyCard();
		return card;
	}
}
