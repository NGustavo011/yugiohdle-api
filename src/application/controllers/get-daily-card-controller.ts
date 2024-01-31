import { Controller } from "../../contracts/application/controllers/controller";
import type {
	HttpRequest,
	HttpResponse,
} from "../../contracts/application/controllers/http";
import type { GetArtDailyCardContract } from "../../contracts/domain/usecases/get-art-daily-card-contract";
import type { GetClassicDailyCardContract } from "../../contracts/domain/usecases/get-classic-daily-card-contract";
import { ok } from "../helpers/http/http-helper";

export class GetDailyCardController extends Controller {
	constructor(
		private readonly getArtDailyCard: GetArtDailyCardContract,
		private readonly getClassicDailyCard: GetClassicDailyCardContract,
	) {
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const artDailyCard = await this.getArtDailyCard.execute();
		const classicDailyCard = await this.getClassicDailyCard.execute();
		return ok({
			art: artDailyCard,
			classic: classicDailyCard,
		});
	}
}
