import {
	beforeAll,
	beforeEach,
	describe,
	vi,
	type Mock,
	test,
	expect,
} from "vitest";
import type { HttpRequest } from "../../../src/contracts/application/controllers/http";
import { throwError } from "../../mocks/mock-error";
import {
	ok,
	serverError,
} from "../../../src/application/helpers/http/http-helper";
import { mockSavedCard } from "../../mocks/mock-card";
import { GetCardsController } from "../../../src/application/controllers/get-cards-controller";

const mockRequest = (): HttpRequest => {
	return {};
};

describe("GetCards Controller", () => {
	let getCardsUsecase: {
		execute: Mock;
	};
	let sut: GetCardsController;

	beforeAll(() => {
		getCardsUsecase = {
			execute: vi.fn().mockImplementation(() => {
				return [mockSavedCard(), mockSavedCard(), mockSavedCard()];
			}),
		};
	});

	beforeEach(() => {
		vi.clearAllMocks();
		sut = new GetCardsController(getCardsUsecase);
	});

	describe("GetCards dependency", () => {
		test("Should call GetCards correctly", async () => {
			await sut.execute(mockRequest());

			expect(getCardsUsecase.execute).toHaveBeenCalled();
		});
		test("Should return 500 if GetCards throws an exception", async () => {
			getCardsUsecase.execute.mockImplementationOnce(throwError);

			const httpResponse = await sut.execute(mockRequest());

			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test("Should return status 200 if there are no problems", async () => {
		const httpResponse = await sut.execute(mockRequest());

		expect(httpResponse).toEqual(
			ok([mockSavedCard(), mockSavedCard(), mockSavedCard()]),
		);
	});
});
