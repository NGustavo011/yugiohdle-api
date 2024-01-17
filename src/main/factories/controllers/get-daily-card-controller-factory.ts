import { GetDailyCardController } from "../../../application/controllers/get-daily-card-controller";
import type { Controller } from "../../../contracts/application/controllers/controller";
import { makeGetDailyCard } from "../usecases/get-daily-card-factory";

export const makeGetDailyCardController = (): Controller => {
	const controller = new GetDailyCardController(makeGetDailyCard());
	return controller;
};
