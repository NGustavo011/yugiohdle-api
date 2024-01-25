import cron from "@elysiajs/cron";
import Elysia from "elysia";
import { adaptElysiaCron } from "../adapters/elysia-cron-adapter";
import { makeChangeDailyCardController } from "../factories/controllers/change-daily-card-controller-factory";

export const changeDailyCardCron = new Elysia().use(
	cron({
		name: "change daily card",
		pattern: "* * * * *",
		run() {
			adaptElysiaCron(makeChangeDailyCardController());
		},
	}),
);
