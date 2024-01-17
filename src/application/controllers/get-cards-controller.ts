import { Controller } from "../../contracts/application/controllers/controller";
import type {
	HttpRequest,
	HttpResponse,
} from "../../contracts/application/controllers/http";
import type { GetCardsContract } from "../../contracts/domain/usecases/get-cards-contract";
import { ok } from "../helpers/http/http-helper";

export class GetCardsController extends Controller {
	constructor(private readonly getCards: GetCardsContract) {
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const cards = await this.getCards.execute();
		return ok(cards);
	}
}
