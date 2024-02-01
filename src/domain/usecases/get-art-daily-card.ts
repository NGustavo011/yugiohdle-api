import type { GetArtDailyCardContract } from "../../contracts/domain/usecases/get-art-daily-card-contract";
import type { GetDailyCardRepository } from "../../contracts/infra/repositories/cards/get-daily-card-repository";
import type { Modes } from "../entities/card";
import type { SavedCard } from "../entities/card";

export class GetArtDailyCard implements GetArtDailyCardContract {
	constructor(
		private readonly getDailyCardRepository: GetDailyCardRepository,
	) {}
	async execute(): Promise<SavedCard> {
		const mode: Modes = "availableArtDailyCard";
		const card = await this.getDailyCardRepository.getDailyCard(mode);
		return card;
	}
}
