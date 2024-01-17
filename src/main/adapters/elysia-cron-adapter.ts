import type { Controller } from "../../contracts/application/controllers/controller";

export const adaptElysiaCron = async (controller: Controller) => {
	await controller.execute({});
};
