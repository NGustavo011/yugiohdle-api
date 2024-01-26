import cors from "@elysiajs/cors";
import Elysia from "elysia";
import { cardRoutes } from "../routes/card-routes";
import { changeDailyCardCron } from "../cron-jobs/change-daily-card-cron";
import { healthCheckRoutes } from "../routes/health-check";

export const app = new Elysia();
app.use(cors());
app.use(cardRoutes);
app.use(healthCheckRoutes);
app.use(changeDailyCardCron);
