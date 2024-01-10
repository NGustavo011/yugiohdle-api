import type { GetDailyCardContract } from "../../contracts/domain/usecases/get-daily-card-contract";
import type { GetDailyCardRepository } from "../../contracts/infra/repositories/cards/get-daily-card-repository";
import type { SavedCard } from "../entities/card";

export class GetDailyCard implements GetDailyCardContract {
	constructor(
		private readonly getDailyCardRepositroy: GetDailyCardRepository,
	) {}
	async execute(): Promise<SavedCard> {
		const card = await this.getDailyCardRepositroy.getDailyCard();
		return card;
	}
}
