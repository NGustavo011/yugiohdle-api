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
	let getArtDailyCardUsecase: {
		execute: Mock;
	};
	let getClassicDailyCardUsecase: {
		execute: Mock;
	};
	let getDescriptionDailyCardUsecase: {
		execute: Mock;
	};
	let sut: GetDailyCardController;
	const original = console.log;

	beforeAll(() => {
		getArtDailyCardUsecase = {
			execute: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
		getClassicDailyCardUsecase = {
			execute: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
		getDescriptionDailyCardUsecase = {
			execute: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
	});

	beforeEach(() => {
		console.log = vi.fn();
		vi.clearAllMocks();
		sut = new GetDailyCardController(
			getArtDailyCardUsecase,
			getClassicDailyCardUsecase,
			getDescriptionDailyCardUsecase,
		);
	});
	afterEach(() => {
		console.log = original;
	});

	describe("GetArtDailyCard dependency", () => {
		test("Should call GetArtDailyCard correctly", async () => {
			await sut.execute(mockRequest());

			expect(getArtDailyCardUsecase.execute).toHaveBeenCalled();
		});
		test("Should return 500 if GetArtDailyCard throws an exception", async () => {
			getArtDailyCardUsecase.execute.mockImplementationOnce(throwError);

			const httpResponse = await sut.execute(mockRequest());

			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	describe("GetClassicDailyCard dependency", () => {
		test("Should call GetClassicDailyCard correctly", async () => {
			await sut.execute(mockRequest());

			expect(getClassicDailyCardUsecase.execute).toHaveBeenCalled();
		});
		test("Should return 500 if GetClassicDailyCard throws an exception", async () => {
			getClassicDailyCardUsecase.execute.mockImplementationOnce(throwError);

			const httpResponse = await sut.execute(mockRequest());

			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	describe("GetDescriptionDailyCard dependency", () => {
		test("Should call GetDescriptionDailyCard correctly", async () => {
			await sut.execute(mockRequest());

			expect(getDescriptionDailyCardUsecase.execute).toHaveBeenCalled();
		});
		test("Should return 500 if GetDescriptionDailyCard throws an exception", async () => {
			getDescriptionDailyCardUsecase.execute.mockImplementationOnce(throwError);

			const httpResponse = await sut.execute(mockRequest());

			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test("Should return status 200 if there are no problems", async () => {
		const httpResponse = await sut.execute(mockRequest());

		expect(httpResponse).toEqual(
			ok({
				classic: mockSavedCard(),
				art: mockSavedCard(),
				description: mockSavedCard(),
			}),
		);
	});
});
