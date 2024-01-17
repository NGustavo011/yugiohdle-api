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
	let changeDailyCardUsecase: {
		execute: Mock;
	};
	let sut: ChangeDailyCardController;

	beforeAll(() => {
		changeDailyCardUsecase = {
			execute: vi.fn().mockImplementation(() => {
				return;
			}),
		};
	});

	beforeEach(() => {
		vi.clearAllMocks();
		sut = new ChangeDailyCardController(changeDailyCardUsecase);
	});

	describe("ChangeDailyCard dependency", () => {
		test("Should call ChangeDailyCard correctly", async () => {
			await sut.execute(mockRequest());

			expect(changeDailyCardUsecase.execute).toHaveBeenCalled();
		});
		test("Should return 500 if ChangeDailyCard throws an exception", async () => {
			changeDailyCardUsecase.execute.mockImplementationOnce(throwError);

			const httpResponse = await sut.execute(mockRequest());

			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test("Should return status 204 if there are no problems", async () => {
		const httpResponse = await sut.execute(mockRequest());

		expect(httpResponse).toEqual(noContent());
	});
});
