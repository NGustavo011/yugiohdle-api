import { Controller } from "../../contracts/application/controllers/controller";
import type {
	HttpRequest,
	HttpResponse,
} from "../../contracts/application/controllers/http";
import type { ChangeDailyCardContract } from "../../contracts/domain/usecases/change-daily-card-contract";
import { noContent } from "../helpers/http/http-helper";

export class ChangeDailyCardController extends Controller {
	constructor(private readonly changeDailyCard: ChangeDailyCardContract) {
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		await this.changeDailyCard.execute();
		return noContent();
	}
}
