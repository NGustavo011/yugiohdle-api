import cors from "@elysiajs/cors";
import Elysia from "elysia";
import { cardRoutes } from "../routes/card-routes";
import { changeDailyCardCron } from "../cron-jobs/change-daily-card-cron";

export const app = new Elysia();
app.use(cors());
app.use(cardRoutes);
app.use(changeDailyCardCron);
