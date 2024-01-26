import Elysia from "elysia";

export const healthCheckRoutes = new Elysia();
healthCheckRoutes.get("/health-check", () => {
	return {
		status: "ok",
	};
});
