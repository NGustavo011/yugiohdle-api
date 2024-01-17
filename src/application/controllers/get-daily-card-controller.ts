import { Controller } from "../../contracts/application/controllers/controller";
import type {
	HttpRequest,
	HttpResponse,
} from "../../contracts/application/controllers/http";
import type { GetDailyCardContract } from "../../contracts/domain/usecases/get-daily-card-contract";
import { ok } from "../helpers/http/http-helper";

export class GetDailyCardController extends Controller {
	constructor(private readonly getDailyCard: GetDailyCardContract) {
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const dailyCard = await this.getDailyCard.execute();
		return ok(dailyCard);
	}
}
