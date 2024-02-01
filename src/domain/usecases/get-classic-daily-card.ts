import type { GetClassicDailyCardContract } from "../../contracts/domain/usecases/get-classic-daily-card-contract";
import type { GetDailyCardRepository } from "../../contracts/infra/repositories/cards/get-daily-card-repository";
import type { Modes } from "../entities/card";
import type { SavedCard } from "../entities/card";

export class GetClassicDailyCard implements GetClassicDailyCardContract {
	constructor(
		private readonly getDailyCardRepository: GetDailyCardRepository,
	) {}
	async execute(): Promise<SavedCard> {
		const mode: Modes = "availableClassicDailyCard";
		const card = await this.getDailyCardRepository.getDailyCard(mode);
		return card;
	}
}
