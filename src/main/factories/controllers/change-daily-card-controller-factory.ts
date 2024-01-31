import { ChangeDailyCardController } from "../../../application/controllers/change-daily-card-controller";
import type { Controller } from "../../../contracts/application/controllers/controller";
import { makeChangeClassicDailyCard } from "../usecases/change-classic-daily-card-factory";

export const makeChangeDailyCardController = (): Controller => {
	const controller = new ChangeDailyCardController(
		makeChangeClassicDailyCard(),
	);
	return controller;
};
