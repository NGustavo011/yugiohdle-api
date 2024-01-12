import type { GetCardsContract } from "../../contracts/domain/usecases/get-cards-contract";
import type { GetCardsRepository } from "../../contracts/infra/repositories/cards/get-cards-repository";
import type { SavedCard } from "../entities/card";

export class GetCards implements GetCardsContract {
	constructor(private readonly getCardsRepositroy: GetCardsRepository) {}
	async execute(): Promise<SavedCard[]> {
		const cards = await this.getCardsRepositroy.getCards();
		return cards;
	}
}
