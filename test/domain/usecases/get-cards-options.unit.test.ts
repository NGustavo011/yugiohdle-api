import { describe, test, jest, beforeAll, expect, beforeEach } from "bun:test";
import { GetCardsOptions } from "../../../src/domain/usecases/get-cards-options";
import { mockSavedCard } from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";

describe("GetCardsOptions usecase", () => {
	let getCardsOptionsRepository: {
		getCardsOptions: jest.Mock;
	};
	let sut: GetCardsOptions;

	beforeAll(() => {
		getCardsOptionsRepository = {
			getCardsOptions: jest.fn().mockImplementation(() => {
				return [mockSavedCard(), mockSavedCard(), mockSavedCard()];
			}),
		};
	});

	beforeEach(() => {
		jest.restoreAllMocks();
		sut = new GetCardsOptions(getCardsOptionsRepository);
	});

	describe("GetCardsOptionsRepository dependency", () => {
		test("Should call GetCardsOptionsRepository correctly", async () => {
			await sut.execute();
			expect(getCardsOptionsRepository.getCardsOptions).toHaveBeenCalled();
		});

		test("Should pass exception if GetCardsOptionsRepository throws an error", async () => {
			getCardsOptionsRepository.getCardsOptions.mockImplementationOnce(
				throwError,
			);
			const promise = sut.execute();
			await expect(promise).rejects.toThrow();
		});
	});

	test("Should return a successful SavedCard", async () => {
		const card = await sut.execute();
		expect(card).toEqual([mockSavedCard(), mockSavedCard(), mockSavedCard()]);
	});
});
