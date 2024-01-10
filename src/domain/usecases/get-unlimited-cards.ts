import type { GetUnlimitedCardsContract } from "../../contracts/domain/usecases/get-unlimited-cards-contract";
import type { GetUnlimitedCardsRepository } from "../../contracts/infra/repositories/cards/get-unlimited-cards-repository";
import type { SavedCard } from "../entities/card";

export class GetUnlimitedCards implements GetUnlimitedCardsContract {
	constructor(
		private readonly getUnlimitedCardsRepositroy: GetUnlimitedCardsRepository,
	) {}
	async execute(): Promise<SavedCard[]> {
		const cards = await this.getUnlimitedCardsRepositroy.getUnlimitedCards();
		return cards;
	}
}
