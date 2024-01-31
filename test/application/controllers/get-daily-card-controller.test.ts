import {
	beforeAll,
	beforeEach,
	describe,
	vi,
	type Mock,
	test,
	expect,
	afterEach,
} from "vitest";
import type { HttpRequest } from "../../../src/contracts/application/controllers/http";
import { GetDailyCardController } from "../../../src/application/controllers/get-daily-card-controller";
import { throwError } from "../../mocks/mock-error";
import {
	ok,
	serverError,
} from "../../../src/application/helpers/http/http-helper";
import { mockSavedCard } from "../../mocks/mock-card";

const mockRequest = (): HttpRequest => {
	return {};
};

describe("GetDailyCard Controller", () => {
	let getClassicDailyCardUsecase: {
		execute: Mock;
	};
	let sut: GetDailyCardController;
	const original = console.log;

	beforeAll(() => {
		getClassicDailyCardUsecase = {
			execute: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
	});

	beforeEach(() => {
		console.log = vi.fn();
		vi.clearAllMocks();
		sut = new GetDailyCardController(getClassicDailyCardUsecase);
	});
	afterEach(() => {
		console.log = original;
	});

	describe("GetDailyCard dependency", () => {
		test("Should call GetDailyCard correctly", async () => {
			await sut.execute(mockRequest());

			expect(getClassicDailyCardUsecase.execute).toHaveBeenCalled();
		});
		test("Should return 500 if GetDailyCard throws an exception", async () => {
			getClassicDailyCardUsecase.execute.mockImplementationOnce(throwError);

			const httpResponse = await sut.execute(mockRequest());

			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test("Should return status 200 if there are no problems", async () => {
		const httpResponse = await sut.execute(mockRequest());

		expect(httpResponse).toEqual(ok(mockSavedCard()));
	});
});
