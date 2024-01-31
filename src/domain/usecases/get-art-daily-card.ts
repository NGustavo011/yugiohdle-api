import type { GetArtDailyCardContract } from "../../contracts/domain/usecases/get-art-daily-card-contract";
import type { GetArtDailyCardRepository } from "../../contracts/infra/repositories/cards/get-art-daily-card-repository";
import type { SavedCard } from "../entities/card";

export class GetArtDailyCard implements GetArtDailyCardContract {
	constructor(
		private readonly getArtDailyCardRepository: GetArtDailyCardRepository,
	) {}
	async execute(): Promise<SavedCard> {
		const card = await this.getArtDailyCardRepository.getArtDailyCard();
		return card;
	}
}
