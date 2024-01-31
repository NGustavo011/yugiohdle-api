import { GetDailyCardController } from "../../../application/controllers/get-daily-card-controller";
import type { Controller } from "../../../contracts/application/controllers/controller";
import { makeGetClassicDailyCard } from "../usecases/get-classic-daily-card-factory";

export const makeGetDailyCardController = (): Controller => {
	const controller = new GetDailyCardController(makeGetClassicDailyCard());
	return controller;
};
