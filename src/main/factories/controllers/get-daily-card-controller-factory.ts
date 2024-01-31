import { GetDailyCardController } from "../../../application/controllers/get-daily-card-controller";
import type { Controller } from "../../../contracts/application/controllers/controller";
import { makeGetArtDailyCard } from "../usecases/get-art-daily-card-factory";
import { makeGetClassicDailyCard } from "../usecases/get-classic-daily-card-factory";

export const makeGetDailyCardController = (): Controller => {
	const controller = new GetDailyCardController(
		makeGetArtDailyCard(),
		makeGetClassicDailyCard(),
	);
	return controller;
};
