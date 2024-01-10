import type { GetCardsOptionsContract } from "../../contracts/domain/usecases/get-cards-options-contract";
import type { GetCardsOptionsRepository } from "../../contracts/infra/repositories/cards/get-cards-options-repository";
import type { SavedCard } from "../entities/card";

export class GetCardsOptions implements GetCardsOptionsContract {
	constructor(
		private readonly getCardsOptionsRepositroy: GetCardsOptionsRepository,
	) {}
	async execute(): Promise<SavedCard[]> {
		const cards = await this.getCardsOptionsRepositroy.getCardsOptions();
		return cards;
	}
}
