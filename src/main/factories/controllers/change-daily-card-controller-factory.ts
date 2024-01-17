import { ChangeDailyCardController } from "../../../application/controllers/change-daily-card-controller";
import type { Controller } from "../../../contracts/application/controllers/controller";
import { makeChangeDailyCard } from "../usecases/change-daily-card-factory";

export const makeChangeDailyCardController = (): Controller => {
	const controller = new ChangeDailyCardController(makeChangeDailyCard());
	return controller;
};
