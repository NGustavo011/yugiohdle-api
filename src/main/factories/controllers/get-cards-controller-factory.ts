import { GetCardsController } from "../../../application/controllers/get-cards-controller";
import type { Controller } from "../../../contracts/application/controllers/controller";
import { makeGetCards } from "../usecases/get-cards-factory";

export const makeGetCardsController = (): Controller => {
	const controller = new GetCardsController(makeGetCards());
	return controller;
};
