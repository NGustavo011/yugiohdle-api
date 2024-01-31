import { Controller } from "../../contracts/application/controllers/controller";
import type {
	HttpRequest,
	HttpResponse,
} from "../../contracts/application/controllers/http";
import type { GetClassicDailyCardContract } from "../../contracts/domain/usecases/get-classic-daily-card-contract";
import { ok } from "../helpers/http/http-helper";

export class GetDailyCardController extends Controller {
	constructor(
		private readonly getClassicDailyCard: GetClassicDailyCardContract,
	) {
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const dailyCard = await this.getClassicDailyCard.execute();
		return ok(dailyCard);
	}
}
