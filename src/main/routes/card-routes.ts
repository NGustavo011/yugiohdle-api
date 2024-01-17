import Elysia from "elysia";
import { adaptElysiaRoute } from "../adapters/elysia-route-adapter";
import { makeGetDailyCardController } from "../factories/controllers/get-daily-card-controller-factory";
import { makeGetCardsController } from "../factories/controllers/get-cards-controller-factory";

export const cardRoutes = new Elysia();
cardRoutes.get(
	"/get-daily-card",
	adaptElysiaRoute(makeGetDailyCardController()),
);
cardRoutes.get("/get-cards", adaptElysiaRoute(makeGetCardsController()));
