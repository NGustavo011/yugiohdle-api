import type { GetDescriptionDailyCardContract } from "../../contracts/domain/usecases/get-description-daily-card-contract";
import type { GetDailyCardRepository } from "../../contracts/infra/repositories/cards/get-daily-card-repository";
import type { Modes } from "../entities/card";
import type { SavedCard } from "../entities/card";

export class GetDescriptionDailyCard
	implements GetDescriptionDailyCardContract
{
	constructor(
		private readonly getDailyCardRepository: GetDailyCardRepository,
	) {}
	async execute(): Promise<SavedCard> {
		const mode: Modes = "availableDescriptionDailyCard";
		const card = await this.getDailyCardRepository.getDailyCard(mode);
		return card;
	}
}
