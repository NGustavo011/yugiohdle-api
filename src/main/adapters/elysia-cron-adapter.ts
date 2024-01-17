import type { Controller } from "../../contracts/application/controllers/controller";

export const adaptCron = async (controller: Controller) => {
	await controller.execute({});
};
