import { Controller } from "../../contracts/application/controllers/controller";
import type {
	HttpRequest,
	HttpResponse,
} from "../../contracts/application/controllers/http";
import type { ChangeArtDailyCardContract } from "../../contracts/domain/usecases/change-art-daily-card-contract";
import type { ChangeClassicDailyCardContract } from "../../contracts/domain/usecases/change-classic-daily-card-contract";
import type { ChangeDescriptionDailyCardContract } from "../../contracts/domain/usecases/change-description-daily-card-contract";
import { noContent } from "../helpers/http/http-helper";

export class ChangeDailyCardController extends Controller {
	constructor(
		private readonly changeArtDailyCard: ChangeArtDailyCardContract,
		private readonly changeClassicDailyCard: ChangeClassicDailyCardContract,
		private readonly changeDescriptionDailyCard: ChangeDescriptionDailyCardContract,
	) {
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		await this.changeArtDailyCard.execute();
		await this.changeClassicDailyCard.execute();
		await this.changeDescriptionDailyCard.execute();
		return noContent();
	}
}
