import { ServerError } from "../../../application/errors/server-error";
import { serverError } from "../../../application/helpers/http/http-helper";
import { type HttpRequest, type HttpResponse } from "./http";

export abstract class Controller {
	async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const output = await this.handle(httpRequest);
			return output;
		} catch (error) {
			console.log(error);
			return serverError(new ServerError());
		}
	}

	abstract handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
