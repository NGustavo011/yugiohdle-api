import type { Controller } from "../../contracts/application/controllers/controller";
import type { HttpRequest } from "../../contracts/application/controllers/http";

export const adaptRoute = (controller: Controller) => {
	return async (req: any) => {
		const queryParams: { [index: string]: any } = {};
		if (req.query) {
			const params = Object.keys(req.query);
			params.forEach((param) => {
				if (req.query[param]) {
					queryParams[param] = req.query[param];
				}
			});
		}
		const httpRequest: HttpRequest = {
			body: req.body,
			params: req.params,
			headers: req.headers,
			query: queryParams,
		};

		const httpResponse = await controller.execute(httpRequest);
		req.set.status = httpResponse.statusCode;
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
			return httpResponse.body;
		} else {
			return {
				error: httpResponse.body.message,
			};
		}
	};
};
