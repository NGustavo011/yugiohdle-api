import cors from "@elysiajs/cors";
import Elysia from "elysia";
import { cardRoutes } from "../routes/card-routes";

export const app = new Elysia();
app.use(cors());
app.use(cardRoutes);
