import { describe, test, jest, beforeAll, expect, beforeEach } from "bun:test";
import { GetCards } from "../../../src/domain/usecases/get-cards";
import { mockSavedCard } from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";

describe("GetCards usecase", () => {
	let getCardsRepository: {
		getCards: jest.Mock;
	};
	let sut: GetCards;

	beforeAll(() => {
		getCardsRepository = {
			getCards: jest.fn().mockImplementation(() => {
				return [mockSavedCard(), mockSavedCard(), mockSavedCard()];
			}),
		};
	});

	beforeEach(() => {
		jest.restoreAllMocks();
		sut = new GetCards(getCardsRepository);
	});

	describe("GetCardsRepository dependency", () => {
		test("Should call GetCardsRepository correctly", async () => {
			await sut.execute();
			expect(getCardsRepository.getCards).toHaveBeenCalled();
		});

		test("Should pass exception if GetCardsRepository throws an error", async () => {
			getCardsRepository.getCards.mockImplementationOnce(throwError);
			const promise = sut.execute();
			await expect(promise).rejects.toThrow();
		});
	});

	test("Should return a successful SavedCard", async () => {
		const card = await sut.execute();
		expect(card).toEqual([mockSavedCard(), mockSavedCard(), mockSavedCard()]);
	});
});
