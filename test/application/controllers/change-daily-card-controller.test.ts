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
import { ChangeDailyCardController } from "../../../src/application/controllers/change-daily-card-controller";
import { throwError } from "../../mocks/mock-error";
import {
	noContent,
	serverError,
} from "../../../src/application/helpers/http/http-helper";

const mockRequest = (): HttpRequest => {
	return {};
};

describe("ChangeDailyCard Controller", () => {
	let changeArtDailyCardUsecase: {
		execute: Mock;
	};
	let changeClassicDailyCardUsecase: {
		execute: Mock;
	};
	let sut: ChangeDailyCardController;
	const original = console.log;

	beforeAll(() => {
		changeArtDailyCardUsecase = {
			execute: vi.fn().mockImplementation(() => {
				return;
			}),
		};
		changeClassicDailyCardUsecase = {
			execute: vi.fn().mockImplementation(() => {
				return;
			}),
		};
	});

	beforeEach(() => {
		console.log = vi.fn();
		vi.clearAllMocks();
		sut = new ChangeDailyCardController(
			changeArtDailyCardUsecase,
			changeClassicDailyCardUsecase,
		);
	});

	afterEach(() => {
		console.log = original;
	});

	describe("ChangeArtDailyCard dependency", () => {
		test("Should call ChangeArtDailyCard correctly", async () => {
			await sut.execute(mockRequest());

			expect(changeArtDailyCardUsecase.execute).toHaveBeenCalled();
		});
		test("Should return 500 if ChangeArtDailyCard throws an exception", async () => {
			changeArtDailyCardUsecase.execute.mockImplementationOnce(throwError);

			const httpResponse = await sut.execute(mockRequest());

			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	describe("ChangeClassicDailyCard dependency", () => {
		test("Should call ChangeClassicDailyCard correctly", async () => {
			await sut.execute(mockRequest());

			expect(changeClassicDailyCardUsecase.execute).toHaveBeenCalled();
		});
		test("Should return 500 if ChangeClassicDailyCard throws an exception", async () => {
			changeClassicDailyCardUsecase.execute.mockImplementationOnce(throwError);

			const httpResponse = await sut.execute(mockRequest());

			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test("Should return status 204 if there are no problems", async () => {
		const httpResponse = await sut.execute(mockRequest());

		expect(httpResponse).toEqual(noContent());
	});
});
